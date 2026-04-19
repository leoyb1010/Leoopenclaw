/**
 * pwa.js - PWA 注册与更新提示
 * 注册 Service Worker，处理应用安装提示
 */
(function () {
  'use strict';

  var PWA = {};

  /** 注册 Service Worker */
  PWA.registerSW = function () {
    if (!('serviceWorker' in navigator)) return;

    window.addEventListener('load', function () {
      navigator.serviceWorker.register('/sw.js')
        .then(function (reg) {
          console.log('[PWA] Service Worker registered');

          // 监听更新
          reg.addEventListener('updatefound', function () {
            var newWorker = reg.installing;
            newWorker.addEventListener('statechange', function () {
              if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                PWA.showUpdatePrompt();
              }
            });
          });
        })
        .catch(function (err) {
          console.warn('[PWA] Service Worker registration failed:', err);
        });
    });
  };

  /** 显示更新提示 */
  PWA.showUpdatePrompt = function () {
    if (DomUtils && DomUtils.showToast) {
      var btn = '<button onclick="location.reload()" style="background:#3b82f6;color:#fff;border:none;padding:4px 12px;border-radius:6px;margin-left:8px;cursor:pointer">更新</button>';
      DomUtils.showToast('新版本可用，点击刷新以更新' + btn, 'info', 10000);
    }
  };

  /** 监听安装事件 */
  PWA.initInstallPrompt = function () {
    var deferredPrompt = null;

    window.addEventListener('beforeinstallprompt', function (e) {
      e.preventDefault();
      deferredPrompt = e;
    });

    // 可通过 window.PWA.install() 手动触发
    PWA.install = function () {
      if (deferredPrompt) {
        deferredPrompt.prompt();
        deferredPrompt.userChoice.then(function (result) {
          deferredPrompt = null;
        });
      }
    };
  };

  PWA.registerSW();
  PWA.initInstallPrompt();

  window.PWA = PWA;
})();
