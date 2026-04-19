/**
 * privacy.js - 隐私页交互（极简，仅导航高亮）
 */
(function () {
  'use strict';

  // 页面加载时滚动到对应锚点（如果有 hash）
  function init() {
    if (window.location.hash) {
      var target = document.querySelector(window.location.hash);
      if (target) {
        setTimeout(function () {
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100);
      }
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
