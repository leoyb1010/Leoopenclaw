/**
 * dom.js - DOM 工具函数库
 * 提供安全的 DOM 操作、事件绑定、HTML 转义等通用方法
 */
(function () {
  'use strict';

  var DomUtils = {};

  /** 安全查询单个元素 */
  DomUtils.$ = function (selector, context) {
    return (context || document).querySelector(selector);
  };

  /** 安全查询元素列表，返回数组 */
  DomUtils.$$ = function (selector, context) {
    return Array.prototype.slice.call(
      (context || document).querySelectorAll(selector)
    );
  };

  /** HTML 转义，防止 XSS */
  DomUtils.escapeHtml = function (text) {
    var div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  };

  /** 获取当前时间 HH:MM */
  DomUtils.getCurrentTime = function () {
    var now = new Date();
    var h = now.getHours().toString().padStart(2, '0');
    var m = now.getMinutes().toString().padStart(2, '0');
    return h + ':' + m;
  };

  /** 防抖函数 */
  DomUtils.debounce = function (fn, delay) {
    var timer = null;
    return function () {
      var args = arguments;
      var ctx = this;
      if (timer) clearTimeout(timer);
      timer = setTimeout(function () {
        fn.apply(ctx, args);
      }, delay);
    };
  };

  /** 平滑滚动到底部 */
  DomUtils.scrollToBottom = function (el) {
    if (el) {
      el.scrollTop = el.scrollHeight;
    }
  };

  /** 显示 Toast 通知 */
  DomUtils.showToast = function (message, type, duration) {
    var container = DomUtils.$('.toast-container');
    if (!container) {
      container = document.createElement('div');
      container.className = 'toast-container';
      document.body.appendChild(container);
    }
    var toast = document.createElement('div');
    toast.className = 'toast ' + (type || 'info');
    toast.textContent = message;
    container.appendChild(toast);

    // 触发重排以启动动画
    toast.offsetHeight; // eslint-disable-line no-unused-expressions
    toast.classList.add('show');

    var dur = duration || 3000;
    setTimeout(function () {
      toast.classList.remove('show');
      setTimeout(function () {
        if (toast.parentNode) {
          toast.parentNode.removeChild(toast);
        }
      }, 300);
    }, dur);
  };

  /** 本地存储安全封装 */
  DomUtils.storage = {
    get: function (key, fallback) {
      try {
        var val = localStorage.getItem(key);
        return val ? JSON.parse(val) : fallback;
      } catch (e) {
        return fallback;
      }
    },
    set: function (key, value) {
      try {
        localStorage.setItem(key, JSON.stringify(value));
      } catch (e) {
        // 静默失败
      }
    },
    remove: function (key) {
      try {
        localStorage.removeItem(key);
      } catch (e) {
        // 静默失败
      }
    }
  };

  window.DomUtils = DomUtils;
})();
