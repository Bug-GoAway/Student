// pages/aiStudy/index.js
Page({
  data: {
    practiceTasks: []
  },

  onLoad(options) {
    // 模拟加载巩固训练任务数据
    this.setData({
      practiceTasks: [
        {
          id: 'task001',
          subject: '数学',
          topic: '三角函数',
          description: '根据今日复习的三角函数定义，完成以下变式练习。',
          type: '选择题',
          isNew: true
        },
        {
          id: 'task002',
          subject: '物理',
          topic: '牛顿第二定律',
          description: '应用牛顿第二定律解决相关的力学问题。',
          type: '计算题',
          isNew: false
        },
        {
          id: 'task003',
          subject: '化学',
          topic: '氧化还原反应',
          description: '判断下列反应是否为氧化还原反应，并指出氧化剂和还原剂。',
          type: '综合题',
          isNew: true
        }
      ]
    });
  },

  onShow() {
    if (typeof this.getTabBar === 'function' &&
      this.getTabBar()) {
      this.getTabBar().setData({
        selected: 3 // 3 表示AI伴学对应的索引
      })
    }
  },

  // 跳转到学情报告页面
  navigateToLearningReport() {
    // wx.showToast({
    //   title: '功能开发中',
    //   icon: 'none'
    // });
    wx.navigateTo({ url: '/pages/learningReport/index' });
  },

  // 开始练习
  startPractice(event) {
    const taskId = event.currentTarget.dataset.taskid;
    wx.showToast({
      title: `开始练习 ${taskId}`,
      icon: 'none'
    });
    // wx.navigateTo({ url: `/pages/practice/index?id=${taskId}` });
  }
});