import Toast from '@vant/weapp/toast/toast';

Page({
  data: {
    userInfo: {
      avatarUrl: '/assets/icons/default-avatar.png', // 默认头像
      nickName: 'AI小助手', // 默认昵称
      userId: '10001' // 模拟用户ID
    }
  },

  onLoad: function (options) {
    // 模拟获取用户信息
    // 在实际应用中，这里会调用 wx.login, wx.getUserProfile 或其他API获取用户信息
    // this.fetchUserInfo();
  },

  // fetchUserInfo() {
  //   // 示例：模拟异步获取用户信息
  //   setTimeout(() => {
  //     this.setData({
  //       userInfo: {
  //         avatarUrl: '/assets/images/avatar-example.png', // 替换为真实或模拟的用户头像
  //         nickName: '勇敢的小龙虾',
  //         userId: 'USR12345678'
  //       }
  //     });
  //   }, 500);
  // },

  navigateToFavorites: function() {
    Toast('老师收藏功能敬请期待');
    // wx.navigateTo({ url: '/pages/favorites/teachers/index' });
  },

  navigateToMaterials: function() {
    Toast('资料收藏功能敬请期待');
    // wx.navigateTo({ url: '/pages/favorites/materials/index' });
  },

  navigateToMistakes: function() {
    Toast('错题本功能敬请期待');
    // wx.navigateTo({ url: '/pages/mistakes/index' });
  },

  navigateToAccountInfo: function() {
    Toast('账户信息功能敬请期待');
    // wx.navigateTo({ url: '/pages/account/info/index' });
  },

  navigateToWeaknessNotebook: function() {
    Toast('薄弱点笔记功能敬请期待');
    // wx.navigateTo({ url: '/pages/notebook/weakness/index' });
  },

  navigateToLearningReport: function() {
    wx.navigateTo({ 
      url: '/pages/learningReport/index' 
    });
  },

  navigateToSettingsPlaceholder: function() {
    Toast('设置功能敬请期待');
  },

  navigateToAbout: function() {
    Toast('关于我们页面敬请期待');
    // wx.navigateTo({ url: '/pages/about/index' });
  },

  onShow() {
    if (typeof this.getTabBar === 'function' &&
      this.getTabBar()) {
      this.getTabBar().setData({
        selected: 4 // 4 表示我的对应的索引
      })
    }
    // 如果需要每次显示页面都刷新用户信息，可以在这里调用
    // this.fetchUserInfo(); 
  }
})