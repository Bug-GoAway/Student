// pages/learning/index.js
Page({
  data: {
    messages: [],
    isPanelOpen: false,
    hasMoreMessages: true,
    isLoadingMore: false,
    currentPage: 1,
    searchText: "",
    searchHistory: ["三角函数", "极值点偏移", "调和点对", "电磁感应", "热力学定律", "电桥效应"],
    showHistory: false,
  },

  onLoad(options) {
    this.loadInitialMessages();
  },

  onShow() {
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      this.getTabBar().setData({
        selected: 2 
      })
    }
    if (this.data.isPanelOpen) {
      this.setData({ isPanelOpen: false });
    }
  },
  selectHistory(e) {
    const keyword = e.currentTarget.dataset.keyword;
    this.setData(
      { searchText: keyword, showHistory: false },
      () => this.performSearch(keyword)   // 填入后立即搜索
    );
  },

  loadInitialMessages() {
    this.setData({ currentPage: 1, messages: [], hasMoreMessages: true });
    this.loadMoreMessages();
  },

  loadMoreMessages() {
    if (this.data.isLoadingMore || !this.data.hasMoreMessages) {
      return;
    }
    this.setData({ isLoadingMore: true });

    setTimeout(() => {
      const newMessages = this.generateMockMessages(this.data.currentPage, 5);
      this.setData({
        messages: this.data.messages.concat(newMessages),
        currentPage: this.data.currentPage + 1,
        isLoadingMore: false,
        hasMoreMessages: this.data.currentPage < 3
      });
    }, 1000);
  },

  generateMockMessages(page, count) {
    const mockData = [
      { idSuffix: 'teacher', sender: '王老师', avatar: '/assets/images/teacher-avatar1.png', previewPrefix: '数学作业问题', unreadBase: 1 },
      { idSuffix: 'physics', sender: '物理小组', avatar: '/assets/images/group-avatar1.png', previewPrefix: '[物理文件]', unreadBase: 0 },
      { idSuffix: 'system', sender: '系统通知', avatar: '/assets/images/system-avatar.png', previewPrefix: '账户安全', unreadBase: 0 },
      { idSuffix: 'li', sender: '李明', avatar: '/assets/images/student-avatar1.png', previewPrefix: '函数题讨论', unreadBase: 2 },
      { idSuffix: 'eng', sender: '英语老师', avatar: '/assets/images/teacher-avatar2.png', previewPrefix: '口语练习安排', unreadBase: 0 },
      { idSuffix: 'chem', sender: '化学兴趣小组', avatar: '/assets/images/group-avatar2.png', previewPrefix: '实验报告提交', unreadBase: 1 },
    ];
    
    const timestamp = Date.now();
    const messages = [];
    
    for (let i = 0; i < count; i++) {
      const baseIndex = ((page - 1) * count + i) % mockData.length;
      const item = mockData[baseIndex];
      messages.push({
        id: `${timestamp}-${page}-${i}-${item.idSuffix}`,
        sender: item.sender,
        avatar: item.avatar,
        time: `P${page} ${new Date().getHours()}:${new Date().getMinutes()}`,
        preview: `${item.previewPrefix} - 内容${(page-1)*count + i +1}`,
        unreadCount: Math.random() < 0.3 ? item.unreadBase + Math.floor(Math.random() * 3) : 0
      });
    }
    return messages;
  },

  onReachBottom() {
    this.loadMoreMessages();
  },

  onPullDownRefresh() {
    this.loadInitialMessages();
    wx.stopPullDownRefresh();
  },

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

  togglePanel() {
    this.setData({
      isPanelOpen: !this.data.isPanelOpen
    });
  },

  toggleSearchBox() {
    this.setData({
      showHistory: !this.data.showHistory
    });
  },

  onSearchInput(e) {
    this.setData({
      searchText: e.detail.value,
      showHistory: true
    });
  },
  
  performSearch() {
    const query = this.data.searchText.trim();
    if (query) {
      wx.showToast({
        title: `搜索: ${query}`,
        icon: "none"
      });
    } else {
      wx.showToast({
        title: "请输入搜索内容",
        icon: "none"
      });
    }
  },

  takePhoto() {
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['camera'],
      success: (res) => {
        wx.showToast({
          title: '上传成功',
          icon: 'success',
          duration: 2000
        });
      },
      fail: (err) => {
        console.error('上传失败:', err);
      }
    });
  },
  
  navigateBack() {
    wx.navigateBack({
      delta: 1
    });
  }
});