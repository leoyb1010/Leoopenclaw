/**
 * mentors.js - 导师列表页逻辑
 * 从 MentorData 渲染卡片，支持筛选和搜索
 */
(function () {
  'use strict';

  var container = document.getElementById('mentorsContainer');
  var searchInput = document.getElementById('mentorSearch');
  var filterIndustry = document.getElementById('filterIndustry');
  var filterPrice = document.getElementById('filterPrice');

  /** 渲染单张导师卡片 */
  function renderCard(m) {
    var badgeClass = m.badge || 'bronze';
    var badgeLabel = m.badge === 'gold' ? '金牌导师' : m.badge === 'silver' ? '银牌导师' : '认证导师';
    var availLabel = m.available ? '可预约' : '暂满';
    var availClass = m.available ? 'text-green-400' : 'text-yellow-400';
    var skillsHtml = m.skills.map(function (s) {
      return '<span class="glass-light px-2 py-0.5 rounded text-xs text-white/70">' + DomUtils.escapeHtml(s) + '</span>';
    }).join(' ');

    return '<div class="mentor-card fade-in">' +
      '<div class="glass rounded-2xl p-6">' +
        '<div class="flex items-start gap-4 mb-4">' +
          '<div class="w-16 h-16 rounded-2xl bg-gradient-to-br ' + m.gradient + ' flex items-center justify-center text-2xl font-bold flex-shrink-0">' +
            DomUtils.escapeHtml(m.initial) +
          '</div>' +
          '<div class="flex-1 min-w-0">' +
            '<div class="flex items-center gap-2 mb-1">' +
              '<h3 class="font-semibold text-lg">' + DomUtils.escapeHtml(m.name) + '</h3>' +
              '<span class="trust-badge ' + badgeClass + '">' + badgeLabel + '</span>' +
            '</div>' +
            '<p class="text-white/60 text-sm">' + DomUtils.escapeHtml(m.title) + ' · ' + DomUtils.escapeHtml(m.company) + '</p>' +
            '<p class="text-sm ' + availClass + ' mt-1">' + availLabel + ' · ' + m.years + '年经验</p>' +
          '</div>' +
        '</div>' +
        '<p class="text-white/70 text-sm mb-4 line-clamp-2">' + DomUtils.escapeHtml(m.bio) + '</p>' +
        '<div class="flex flex-wrap gap-2 mb-4">' + skillsHtml + '</div>' +
        '<div class="flex items-center justify-between">' +
          '<div class="flex items-center gap-3">' +
            '<span class="text-yellow-400 text-sm">★ ' + m.rating + '</span>' +
            '<span class="text-white/40 text-xs">' + m.reviews + ' 条评价</span>' +
          '</div>' +
          '<div class="text-right">' +
            '<span class="text-white/40 text-xs">30分钟</span>' +
            '<span class="text-lg font-bold gradient-text ml-1">¥' + m.price + '</span>' +
          '</div>' +
        '</div>' +
        '<a href="chat.html" class="btn-primary w-full mt-4 py-3 rounded-xl text-center block font-medium">' +
          '预约咨询' +
        '</a>' +
      '</div>' +
    '</div>';
  }

  /** 渲染列表 */
  function renderList() {
    if (!container || !window.MentorAPI) return;

    var mentors = window.MentorAPI.getAll();

    // 行业筛选
    if (filterIndustry && filterIndustry.value) {
      mentors = window.MentorAPI.filterByIndustry(filterIndustry.value);
    }

    // 价格筛选
    if (filterPrice && filterPrice.value) {
      var price = parseInt(filterPrice.value, 10);
      mentors = mentors.filter(function (m) { return m.price <= price; });
    }

    // 搜索
    if (searchInput && searchInput.value.trim()) {
      var query = searchInput.value.trim().toLowerCase();
      mentors = mentors.filter(function (m) {
        return m.name.toLowerCase().indexOf(query) !== -1 ||
               m.company.toLowerCase().indexOf(query) !== -1 ||
               m.title.toLowerCase().indexOf(query) !== -1 ||
               m.skills.some(function (s) { return s.toLowerCase().indexOf(query) !== -1; });
      });
    }

    if (mentors.length === 0) {
      container.innerHTML = '<div class="text-center py-16">' +
        '<p class="text-white/50 text-lg">未找到匹配的导师</p>' +
        '<p class="text-white/40 text-sm mt-2">试试调整筛选条件</p>' +
      '</div>';
    } else {
      container.innerHTML = mentors.map(renderCard).join('');
    }
  }

  function init() {
    renderList();
    if (searchInput) searchInput.addEventListener('input', DomUtils.debounce(renderList, 300));
    if (filterIndustry) filterIndustry.addEventListener('change', renderList);
    if (filterPrice) filterPrice.addEventListener('change', renderList);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
