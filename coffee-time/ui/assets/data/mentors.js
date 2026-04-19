/**
 * mentors.js - 导师数据
 * 从 HTML 中提取的导师列表数据，供页面渲染使用
 */
(function () {
  'use strict';

  window.MentorData = [
    {
      id: 'zhang-mingyuan',
      name: '张明远',
      initial: '张',
      title: '产品总监',
      company: '字节跳动',
      industry: '互联网',
      years: 12,
      price: 399,
      rating: 4.9,
      reviews: 236,
      trustScore: 95,
      badge: 'gold',
      available: true,
      skills: ['产品规划', '用户增长', '数据分析', '团队管理'],
      bio: '12年互联网产品经验，曾主导DAU千万级产品的从0到1搭建。擅长用户增长策略、数据驱动决策和产品团队管理。',
      gradient: 'from-blue-400 to-blue-600'
    },
    {
      id: 'li-xueting',
      name: '李雪婷',
      initial: '李',
      title: '设计总监',
      company: '阿里巴巴',
      industry: '互联网',
      years: 10,
      price: 349,
      rating: 4.8,
      reviews: 189,
      trustScore: 90,
      badge: 'gold',
      available: true,
      skills: ['UI/UX设计', '设计体系', '品牌策略', '用户体验'],
      bio: '10年设计管理经验，主导过多个亿级用户产品的设计体系搭建。擅长品牌设计、用户体验优化和设计团队管理。',
      gradient: 'from-purple-400 to-purple-600'
    },
    {
      id: 'wang-jianhua',
      name: '王建华',
      initial: '王',
      title: '技术VP',
      company: '腾讯',
      industry: '互联网',
      years: 15,
      price: 499,
      rating: 4.9,
      reviews: 312,
      trustScore: 98,
      badge: 'gold',
      available: true,
      skills: ['技术架构', '团队管理', '技术选型', '性能优化'],
      bio: '15年技术研发与管理经验，曾带领百人技术团队完成多个核心系统的架构设计与迁移。',
      gradient: 'from-pink-400 to-pink-600'
    },
    {
      id: 'chen-yuqing',
      name: '陈雨晴',
      initial: '陈',
      title: '运营总监',
      company: '小红书',
      industry: '社交媒体',
      years: 8,
      price: 299,
      rating: 4.7,
      reviews: 145,
      trustScore: 85,
      badge: 'silver',
      available: true,
      skills: ['内容运营', '社群运营', '增长黑客', '品牌营销'],
      bio: '8年互联网运营经验，擅长内容生态搭建、社群增长和用户留存策略。',
      gradient: 'from-green-400 to-green-600'
    },
    {
      id: 'liu-zhihao',
      name: '刘子豪',
      initial: '刘',
      title: 'HRD',
      company: '华为',
      industry: '科技',
      years: 14,
      price: 399,
      rating: 4.8,
      reviews: 201,
      trustScore: 92,
      badge: 'gold',
      available: false,
      skills: ['职业规划', '面试辅导', '薪酬谈判', '组织发展'],
      bio: '14年人力资源管理经验，深耕科技行业人才发展与组织效能提升。',
      gradient: 'from-orange-400 to-orange-600'
    },
    {
      id: 'zhao-meng',
      name: '赵梦',
      initial: '赵',
      title: '市场总监',
      company: '美团',
      industry: '本地生活',
      years: 9,
      price: 329,
      rating: 4.6,
      reviews: 98,
      trustScore: 80,
      badge: 'silver',
      available: true,
      skills: ['品牌营销', '渠道拓展', '市场分析', '投放策略'],
      bio: '9年市场营销经验，主导过多个亿级投放项目，擅长增长策略和渠道建设。',
      gradient: 'from-teal-400 to-teal-600'
    }
  ];

  /** 获取所有导师 */
  function getAll() {
    return MentorData;
  }

  /** 按行业筛选 */
  function filterByIndustry(industry) {
    if (!industry) return MentorData;
    return MentorData.filter(function (m) {
      return m.industry === industry;
    });
  }

  /** 按技能筛选 */
  function filterBySkill(skill) {
    if (!skill) return MentorData;
    var lowerSkill = skill.toLowerCase();
    return MentorData.filter(function (m) {
      return m.skills.some(function (s) {
        return s.toLowerCase().indexOf(lowerSkill) !== -1;
      });
    });
  }

  /** 按价格区间筛选 */
  function filterByPrice(min, max) {
    return MentorData.filter(function (m) {
      if (min && m.price < min) return false;
      if (max && m.price > max) return false;
      return true;
    });
  }

  /** 获取可用导师 */
  function getAvailable() {
    return MentorData.filter(function (m) {
      return m.available;
    });
  }

  window.MentorAPI = {
    getAll: getAll,
    filterByIndustry: filterByIndustry,
    filterBySkill: filterBySkill,
    filterByPrice: filterByPrice,
    getAvailable: getAvailable
  };
})();
