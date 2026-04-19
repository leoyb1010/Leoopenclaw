/**
 * navigation.js - 公共导航逻辑
 * 移动端菜单切换、导航高亮
 */
(function () {
  'use strict';

  var Navigation = {};

  /** 初始化导航高亮 */
  Navigation.initActiveLink = function () {
    var currentPath = window.location.pathname;
    var links = document.querySelectorAll('.nav-link');
    for (var i = 0; i < links.length; i++) {
      var href = links[i].getAttribute('href') || '';
      if (currentPath.indexOf(href) !== -1 && href !== '' && href !== '#') {
        links[i].classList.add('active');
        links[i].setAttribute('aria-current', 'page');
      }
    }
  };

  /** 移动端汉堡菜单切换 */
  Navigation.initMobileMenu = function (menuId) {
    var menuBtn = document.querySelector('[data-mobile-menu]');
    var menu = document.getElementById(menuId || 'mobileMenu');
    if (!menuBtn || !menu) return;

    menuBtn.addEventListener('click', function () {
      var isOpen = menu.classList.contains('hidden');
      menu.classList.toggle('hidden');
      menuBtn.setAttribute('aria-expanded', !isOpen);
    });

    // 点击菜单外关闭
    document.addEventListener('click', function (e) {
      if (!menu.contains(e.target) && !menuBtn.contains(e.target)) {
        menu.classList.add('hidden');
        menuBtn.setAttribute('aria-expanded', 'false');
      }
    });
  };

  /** 滚动时导航栏背景增强 */
  Navigation.initScrollNav = function () {
    var nav = document.querySelector('nav.fixed');
    if (!nav) return;

    window.addEventListener('scroll', function () {
      if (window.scrollY > 20) {
        nav.style.background = 'rgba(15, 23, 42, 0.9)';
      } else {
        nav.style.background = '';
      }
    });
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () {
      Navigation.initActiveLink();
    });
  } else {
    Navigation.initActiveLink();
  }

  window.Navigation = Navigation;
})();
