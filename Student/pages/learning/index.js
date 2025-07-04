// pages/learning/index.js
Page({
  data: {
    messages: [],
    isPanelOpen: false, // 控制滑动面板的打开状态
    // showCameraIcon: true, // 此状态不再由此页面控制，由tabBar的特殊按钮样式决定
    hasMoreMessages: true, // 是否还有更多消息可加载
    isLoadingMore: false, // 是否正在加载更多
    currentPage: 1, // 当前页码，用于分页加载
  },

  onLoad(options) {
    this.loadInitialMessages();
  },

  onShow() {
    if (typeof this.getTabBar === 'function' &&
      this.getTabBar()) {
      this.getTabBar().setData({
        selected: 2 // 2 表示学习对应的索引
      })
    }
    // 每次进入页面，如果面板是打开的，则关闭
    if (this.data.isPanelOpen) {
      this.setData({ isPanelOpen: false });
    }
  },

  // 加载初始消息
  loadInitialMessages() {
    this.setData({ currentPage: 1, messages: [], hasMoreMessages: true });
    this.loadMoreMessages();
  },

  // 加载更多消息（模拟分页）
  loadMoreMessages() {
    if (this.data.isLoadingMore || !this.data.hasMoreMessages) {
      return;
    }
    this.setData({ isLoadingMore: true });

    // 模拟网络请求
    setTimeout(() => {
      const newMessages = this.generateMockMessages(this.data.currentPage, 5);
      this.setData({
        messages: this.data.messages.concat(newMessages),
        currentPage: this.data.currentPage + 1,
        isLoadingMore: false,
        hasMoreMessages: newMessages.length > 0 && this.data.currentPage <= 3 // 假设最多3页数据
      });
    }, 1000);
  },

  // 生成模拟消息数据
  generateMockMessages(page, count) {
    const mockData = [
      { idSuffix: 'teacher', sender: '王老师', avatar: '/assets/images/teacher-avatar1.png', previewPrefix: '数学作业问题', unreadBase: 1 },
      { idSuffix: 'physics', sender: '物理小组', avatar: '/assets/images/group-avatar1.png', previewPrefix: '[物理文件]', unreadBase: 0 },
      { idSuffix: 'system', sender: '系统通知', avatar: '/assets/images/system-avatar.png', previewPrefix: '账户安全', unreadBase: 0 },
      { idSuffix: 'li', sender: '李明', avatar: '/assets/images/student-avatar1.png', previewPrefix: '函数题讨论', unreadBase: 2 },
      { idSuffix: 'eng', sender: '英语老师', avatar: '/assets/images/teacher-avatar2.png', previewPrefix: '口语练习安排', unreadBase: 0 },
      { idSuffix: 'chem', sender: '化学兴趣小组', avatar: '/assets/images/group-avatar2.png', previewPrefix: '实验报告提交', unreadBase: 1 },
    ];
    const messages = [];
    for (let i = 0; i < count; i++) {
      const baseIndex = ((page - 1) * count + i) % mockData.length;
      const item = mockData[baseIndex];
      messages.push({
        id: `chat${page}-${i}-${item.idSuffix}`,
        sender: item.sender,
        avatar: item.avatar,
        time: `P${page} ${new Date().getHours()}:${new Date().getMinutes() - i}`,
        preview: `${item.previewPrefix} - 内容${(page-1)*count + i +1}`,
        unreadCount: Math.random() < 0.3 ? item.unreadBase + Math.floor(Math.random() * 3) : 0
      });
    }
    return messages;
  },

  // 页面滚动到底部时触发加载更多
  onReachBottom() {
    this.loadMoreMessages();
  },

  // 下拉刷新
  onPullDownRefresh() {
    this.loadInitialMessages();
    wx.stopPullDownRefresh();
  },

  // 点击消息，跳转到聊天页面
  navigateToChat(event) {
    const chatId = event.currentTarget.dataset.chatid;
    const senderName = event.currentTarget.dataset.sender;
    const messages = this.data.messages.map(msg => {
      if (msg.id === chatId) {
        return { ...msg, unreadCount: 0 };
      }
      return msg;
    });
    this.setData({ messages });

    wx.navigateTo({ 
      url: `/pages/chat/index?chatId=${chatId}&name=${encodeURIComponent(senderName)}` 
    });
  },

  // 切换滑动面板的显示/隐藏 (此方法由tabBar的特殊按钮触发，但面板状态仍在此页面管理)
  togglePanel() {
    this.setData({
      isPanelOpen: !this.data.isPanelOpen
    });
  },

  // 点击滑动面板中的“拍照提问”或“文字提问”
  handlePanelOption(event) {
    const optionType = event.currentTarget.dataset.type;
    console.log('选择了:', optionType);
    // 关闭面板
    this.setData({ isPanelOpen: false });
    // 根据类型跳转到不同页面或执行不同操作
    if (optionType === 'photo') {
      wx.showToast({ title: '跳转到拍照提问', icon: 'none' });
      // wx.navigateTo({ url: '/pages/askQuestion/photo/index' });
    } else if (optionType === 'text') {
      wx.showToast({ title: '跳转到文字提问', icon: 'none' });
      // wx.navigateTo({ url: '/pages/askQuestion/text/index' });
    }
  }
  // navigateToAskQuestion 方法不再需要，因为提问入口已集成到滑动面板中
});