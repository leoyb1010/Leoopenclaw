/**
 * chat.js - 聊天页交互逻辑
 * 功能：消息发送/接收模拟、localStorage 持久化、快捷回复、清空会话
 * 修复：原 typing indicator 在模拟回复结束后未正确隐藏的 bug
 */
(function () {
  'use strict';

  // ========== DOM 缓存 ==========
  var els = {
    input: document.getElementById('messageInput'),
    sendBtn: document.getElementById('sendButton'),
    container: document.getElementById('messagesContainer'),
    typingEl: document.getElementById('typingIndicator'),
    clearBtn: document.getElementById('clearChatBtn'),
    quickReplies: null // 延迟获取
  };

  // ========== 状态 ==========
  var state = {
    isSending: false,
    messages: [],
    STORAGE_KEY: 'zhimai_chat_messages'
  };

  // ========== 导师模拟回复池 ==========
  var mentorReplies = [
    '非常好的问题！让我来帮你分析一下。从你描述的情况来看，核心是要明确自己的职业定位。',
    '这是一个很常见的情况。我给你几个建议：第一，先梳理自己的核心能力；第二，找到差异化的竞争优势。',
    '好的，我理解你的困惑。我们可以从几个方面来思考：短期目标、中期规划、长期愿景。',
    '感谢你的分享！基于你的情况，我建议你可以先从内部转岗或争取更多项目机会开始。',
    '很有代表性的问题。3-5年经验的产品经理通常会遇到这个瓶颈，关键是要建立自己的方法论体系。'
  ];
  var replyIndex = 0;

  // ========== 工具函数 ==========

  /** 渲染单条消息气泡 */
  function renderMessage(role, text, time) {
    var safeText = DomUtils.escapeHtml(text);
    var timeStr = time || DomUtils.getCurrentTime();

    if (role === 'user') {
      return '<div class="flex gap-3 justify-end message-bubble">' +
        '<div class="flex-1 max-w-[70%]">' +
          '<div class="bg-gradient-to-br from-blue-500/30 to-purple-500/30 rounded-2xl rounded-tr-sm p-4 border border-blue-500/20">' +
            '<p class="text-white/90 leading-relaxed">' + safeText + '</p>' +
          '</div>' +
          '<span class="text-xs text-white/40 mt-1 block text-right">' + timeStr + '</span>' +
        '</div>' +
        '<div class="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-400 to-indigo-600 flex items-center justify-center text-base font-bold flex-shrink-0" aria-hidden="true">我</div>' +
      '</div>';
    } else {
      return '<div class="flex gap-3 message-bubble">' +
        '<div class="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-base font-bold flex-shrink-0" aria-hidden="true">张</div>' +
        '<div class="flex-1 max-w-[70%]">' +
          '<div class="glass-light rounded-2xl rounded-tl-sm p-4">' +
            '<p class="text-white/90 leading-relaxed">' + safeText + '</p>' +
          '</div>' +
          '<span class="text-xs text-white/40 mt-1 block">' + timeStr + '</span>' +
        '</div>' +
      '</div>';
    }
  }

  /** 控制 typing indicator 显隐 */
  function setTyping(visible) {
    if (els.typingEl) {
      els.typingEl.style.display = visible ? 'flex' : 'none';
    }
  }

  /** 滚动到底部 */
  function scrollBottom() {
    DomUtils.scrollToBottom(els.container);
  }

  /** 持久化消息到 localStorage */
  function persistMessages() {
    DomUtils.storage.set(state.STORAGE_KEY, state.messages);
  }

  /** 从 localStorage 恢复消息 */
  function restoreMessages() {
    var saved = DomUtils.storage.get(state.STORAGE_KEY, null);
    if (saved && saved.length > 0) {
      state.messages = saved;
      // 清空初始 mock 消息，替换为存储的
      var wrapper = els.container.querySelector('.max-w-3xl');
      if (wrapper) {
        // 保留日期分隔和 typing indicator，移除旧消息
        var bubbles = wrapper.querySelectorAll('.message-bubble');
        for (var i = 0; i < bubbles.length; i++) {
          // 不要移除 typing indicator
          if (bubbles[i].id !== 'typingIndicator') {
            wrapper.removeChild(bubbles[i]);
          }
        }
        // 重新渲染
        for (var j = 0; j < state.messages.length; j++) {
          var msg = state.messages[j];
          wrapper.insertAdjacentHTML('beforeend', renderMessage(msg.role, msg.text, msg.time));
        }
      }
      scrollBottom();
    }
  }

  /** 清空会话 */
  function clearChat() {
    if (!confirm('确定要清空当前会话吗？此操作不可恢复。')) return;
    var wrapper = els.container.querySelector('.max-w-3xl');
    if (!wrapper) return;
    var bubbles = wrapper.querySelectorAll('.message-bubble');
    for (var i = 0; i < bubbles.length; i++) {
      if (bubbles[i].id !== 'typingIndicator') {
        wrapper.removeChild(bubbles[i]);
      }
    }
    state.messages = [];
    DomUtils.storage.remove(state.STORAGE_KEY);
    DomUtils.showToast('会话已清空', 'info', 2000);
  }

  // ========== 核心逻辑 ==========

  /** 发送消息 */
  function sendMessage() {
    if (state.isSending) return;

    var text = els.input ? els.input.value.trim() : '';
    if (!text) return;

    state.isSending = true;
    var time = DomUtils.getCurrentTime();

    // 渲染用户消息
    var wrapper = els.container.querySelector('.max-w-3xl');
    if (wrapper) {
      wrapper.insertAdjacentHTML('beforeend', renderMessage('user', text, time));
    }

    // 记录并持久化
    state.messages.push({ role: 'user', text: text, time: time });
    persistMessages();

    // 清空输入框并重置高度
    if (els.input) {
      els.input.value = '';
      els.input.style.height = 'auto';
      updateSendButton();
    }

    scrollBottom();

    // 模拟导师回复
    setTimeout(function () {
      simulateReply();
    }, 1500 + Math.random() * 1000);
  }

  /** 模拟导师回复 */
  function simulateReply() {
    // 先显示 typing
    setTyping(true);
    scrollBottom();

    var delay = 1500 + Math.random() * 1500;
    setTimeout(function () {
      // 关键修复：先隐藏 typing，再插入回复
      setTyping(false);

      var replyText = mentorReplies[replyIndex % mentorReplies.length];
      replyIndex++;
      var time = DomUtils.getCurrentTime();

      var wrapper = els.container.querySelector('.max-w-3xl');
      if (wrapper) {
        wrapper.insertAdjacentHTML('beforeend', renderMessage('mentor', replyText, time));
      }

      state.messages.push({ role: 'mentor', text: replyText, time: time });
      persistMessages();

      scrollBottom();
      state.isSending = false;
    }, delay);
  }

  /** 更新发送按钮状态 */
  function updateSendButton() {
    if (!els.sendBtn) return;
    var hasText = els.input && els.input.value.trim().length > 0;
    els.sendBtn.disabled = !hasText;
    els.sendBtn.setAttribute('aria-disabled', !hasText ? 'true' : 'false');
  }

  /** 自动调整输入框高度 */
  function autoResizeInput() {
    if (!els.input) return;
    els.input.style.height = 'auto';
    var newH = Math.min(els.input.scrollHeight, 128);
    els.input.style.height = newH + 'px';
    updateSendButton();
  }

  /** 处理快捷回复按钮 */
  function handleQuickReply(e) {
    var btn = e.target.closest('[data-quick-reply]');
    if (!btn) return;
    var text = btn.getAttribute('data-quick-reply') || btn.textContent.trim();
    if (els.input) {
      els.input.value = text;
      els.input.focus();
      autoResizeInput();
    }
  }

  // ========== 事件绑定 ==========

  function bindEvents() {
    // 发送按钮
    if (els.sendBtn) {
      els.sendBtn.addEventListener('click', sendMessage);
    }

    // 输入框
    if (els.input) {
      els.input.addEventListener('input', autoResizeInput);
      els.input.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' && !e.shiftKey) {
          e.preventDefault();
          sendMessage();
        }
      });
      updateSendButton();
    }

    // 快捷回复
    var quickContainer = DomUtils.$('.flex-wrap.gap-2.mb-4');
    if (quickContainer) {
      quickContainer.addEventListener('click', handleQuickReply);
    }

    // 清空按钮
    if (els.clearBtn) {
      els.clearBtn.addEventListener('click', clearChat);
    }

    // 窗口 resize 时滚动到底部
    window.addEventListener('resize', DomUtils.debounce(scrollBottom, 200));
  }

  // ========== 初始化 ==========

  function init() {
    bindEvents();
    restoreMessages();
    scrollBottom();
    // 初始隐藏 typing indicator（修复原 bug：页面加载时 typing 是可见的）
    setTyping(false);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
