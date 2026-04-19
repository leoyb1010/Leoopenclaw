/**
 * verify.js - 身份验证页表单逻辑
 * 功能：表单校验、文件上传、提交模拟、进度反馈
 */
(function () {
  'use strict';

  // ========== DOM 缓存 ==========
  var els = {
    form: null,
    submitBtn: null,
    progressBar: null,
    successView: null
  };

  // ========== 配置 ==========
  var CONFIG = {
    MAX_FILE_SIZE: 5 * 1024 * 1024, // 5MB
    ALLOWED_TYPES: ['image/jpeg', 'image/png', 'image/webp', 'application/pdf'],
    NAME_MIN: 2,
    NAME_MAX: 50,
    BIO_MAX: 500
  };

  // ========== 校验规则 ==========

  /** 校验单个字段 */
  function validateField(field) {
    var name = field.name || field.id;
    var value = field.value.trim();
    var error = '';

    switch (name) {
      case 'fullName':
      case 'realName':
        if (!value) error = '请输入真实姓名';
        else if (value.length < CONFIG.NAME_MIN) error = '姓名至少 ' + CONFIG.NAME_MIN + ' 个字符';
        else if (value.length > CONFIG.NAME_MAX) error = '姓名不能超过 ' + CONFIG.NAME_MAX + ' 个字符';
        break;

      case 'email':
      case 'workEmail':
        if (!value) error = '请输入邮箱';
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) error = '请输入有效的邮箱地址';
        else if (!/^[^\s@]+@.+\.[^\s@]+$/.test(value)) error = '邮箱格式不正确';
        break;

      case 'phone':
        if (value && !/^1[3-9]\d{9}$/.test(value)) error = '请输入有效的手机号';
        break;

      case 'bio':
      case 'introduction':
        if (value.length > CONFIG.BIO_MAX) error = '简介不能超过 ' + CONFIG.BIO_MAX + ' 个字符';
        break;

      case 'company':
        if (!value) error = '请输入公司名称';
        break;

      case 'title':
        if (!value) error = '请输入职位';
        break;

      case 'agree':
        if (!field.checked) error = '请阅读并同意服务条款和隐私政策';
        break;

      case 'fileUpload':
        // 文件校验由 handleFileInput 单独处理
        break;
    }

    renderFieldError(field, error);
    return !error;
  }

  /** 渲染字段错误提示 */
  function renderFieldError(field, error) {
    var group = field.closest('.form-group') || field.parentElement;
    var errorEl = group.querySelector('.field-error') || group.querySelector('.error-message');

    if (!errorEl) {
      errorEl = document.createElement('p');
      errorEl.className = 'field-error error-message';
      errorEl.setAttribute('role', 'alert');
      errorEl.setAttribute('aria-live', 'polite');
      group.appendChild(errorEl);
    }

    errorEl.textContent = error || '';
    errorEl.style.display = error ? 'block' : 'none';

    if (error) {
      group.classList.add('error');
      field.setAttribute('aria-invalid', 'true');
      field.setAttribute('aria-describedby', errorEl.id || '');
    } else {
      group.classList.remove('error');
      field.removeAttribute('aria-invalid');
    }
  }

  /** 校验整个表单 */
  function validateForm() {
    var fields = els.form.querySelectorAll('input, textarea, select');
    var valid = true;
    var firstInvalid = null;

    for (var i = 0; i < fields.length; i++) {
      var f = fields[i];
      if (f.type === 'hidden' || f.type === 'submit' || f.type === 'button') continue;
      if (!validateField(f)) {
        valid = false;
        if (!firstInvalid) firstInvalid = f;
      }
    }

    if (firstInvalid) {
      firstInvalid.focus();
    }

    return valid;
  }

  // ========== 文件上传 ==========

  /** 处理文件选择 */
  function handleFileInput(inputEl) {
    var file = inputEl.files[0];
    var zone = inputEl.closest('.upload-zone') || inputEl.parentElement;
    var nameEl = zone.querySelector('.file-name');

    if (!file) {
      zone.classList.remove('has-file');
      if (nameEl) nameEl.textContent = '';
      return true;
    }

    // 类型校验
    if (CONFIG.ALLOWED_TYPES.indexOf(file.type) === -1) {
      DomUtils.showToast('仅支持 JPG、PNG、WebP 或 PDF 格式', 'error');
      inputEl.value = '';
      return false;
    }

    // 大小校验
    if (file.size > CONFIG.MAX_FILE_SIZE) {
      DomUtils.showToast('文件大小不能超过 5MB', 'error');
      inputEl.value = '';
      return false;
    }

    zone.classList.add('has-file');
    if (nameEl) nameEl.textContent = file.name + ' (' + (file.size / 1024).toFixed(1) + 'KB)';
    return true;
  }

  /** 序列化表单数据 */
  function serializeForm() {
    var data = {};
    var fields = els.form.querySelectorAll('input, textarea, select');
    for (var i = 0; i < fields.length; i++) {
      var f = fields[i];
      if (f.name && f.type !== 'submit' && f.type !== 'button') {
        if (f.type === 'checkbox') {
          data[f.name] = f.checked;
        } else if (f.type === 'file') {
          data[f.name] = f.files[0] ? f.files[0].name : '';
        } else {
          data[f.name] = f.value.trim();
        }
      }
    }
    return data;
  }

  // ========== 提交处理 ==========

  /** 处理表单提交 */
  function handleSubmit(e) {
    e.preventDefault();

    if (!validateForm()) {
      DomUtils.showToast('请检查表单填写', 'error');
      return;
    }

    // 锁定提交按钮
    if (els.submitBtn) {
      els.submitBtn.disabled = true;
      els.submitBtn.textContent = '提交中...';
    }

    // 模拟提交进度
    var progress = 0;
    var timer = setInterval(function () {
      progress += 10;
      if (els.progressBar) {
        els.progressBar.style.width = progress + '%';
      }
      if (progress >= 100) {
        clearInterval(timer);
        showSuccess();
      }
    }, 200);
  }

  /** 显示提交成功 */
  function showSuccess() {
    var formData = serializeForm();
    DomUtils.storage.set('zhimai_verify_data', formData);

    if (els.form) els.form.style.display = 'none';
    if (els.successView) els.successView.style.display = 'block';

    DomUtils.showToast('申请已提交，我们将在 3 个工作日内审核', 'success', 5000);
  }

  // ========== 事件绑定 ==========

  function bindEvents() {
    if (!els.form) return;

    // 提交
    els.form.addEventListener('submit', handleSubmit);

    // 实时校验（失焦时）
    var inputs = els.form.querySelectorAll('input, textarea');
    for (var i = 0; i < inputs.length; i++) {
      inputs[i].addEventListener('blur', function () {
        if (this.value || this.dataset.touched) {
          this.dataset.touched = 'true';
          validateField(this);
        }
      });
    }

    // 文件上传
    var fileInputs = els.form.querySelectorAll('input[type="file"]');
    for (var j = 0; j < fileInputs.length; j++) {
      fileInputs[j].addEventListener('change', function () {
        handleFileInput(this);
      });
    }

    // 上传区域点击
    var zones = document.querySelectorAll('.upload-zone');
    for (var k = 0; k < zones.length; k++) {
      zones[k].addEventListener('click', function () {
        var input = this.querySelector('input[type="file"]');
        if (input) input.click();
      });
    }
  }

  // ========== 初始化 ==========

  function init() {
    els.form = document.getElementById('verifyForm');
    els.submitBtn = document.getElementById('submitBtn');
    els.progressBar = document.querySelector('.progress-bar-fill');
    els.successView = document.getElementById('successView');

    bindEvents();

    // 恢复暂存数据（如果有）
    var saved = DomUtils.storage.get('zhimai_verify_data', null);
    if (saved && els.form) {
      for (var key in saved) {
        var el = els.form.querySelector('[name="' + key + '"]');
        if (el && saved[key]) {
          if (el.type === 'checkbox') {
            el.checked = !!saved[key];
          } else if (el.type !== 'file') {
            el.value = saved[key];
          }
        }
      }
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
