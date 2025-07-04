// pages/chat/index.js
Page({
  data: {
    chatName: '', // 聊天对象名称
    messages: [], // 消息列表
    inputValue: '', // 输入框内容
    myAvatar: '/assets/images/my-avatar.png', // 替换为当前用户头像
    otherAvatar: '/assets/images/default-avatar.png', // 替换为对方默认或实际头像
    scrollToView: '' // 用于滚动到最新的消息
  },

  onLoad(options) {
    const chatName = decodeURIComponent(options.name || '聊天');
    const chatId = options.chatId;

    wx.setNavigationBarTitle({ title: chatName });
    this.setData({
      chatName: chatName,
      // 模拟加载历史消息
      messages: this.loadInitialMessages(chatId),
      // 根据chatId可以设置不同的对方头像
      otherAvatar: this.getOtherAvatar(chatId) 
    });
    this.scrollToBottom();
  },

  // 模拟加载初始消息
  loadInitialMessages(chatId) {
    // 根据chatId从后端或本地存储加载消息
    // 这里是示例数据
    if (chatId === 'chat001') {
      return [
        { id: 1, content: '你好！上次的作业你看了吗？', isMe: false, time: '10:25' },
        { id: 2, content: '看了，有几个地方不太明白，想请教一下。', isMe: true, time: '10:26' },
        { id: 3, content: '当然，随时问！', isMe: false, time: '10:27' }
      ];
    }
    return [
      { id: 1, content: '你好！', isMe: false, time: '09:10' },
      { id: 2, content: '你好呀！有什么可以帮你的吗？', isMe: true, time: '09:11' }
    ];
  },

  // 根据chatId获取对方头像（示例）
  getOtherAvatar(chatId) {
    if (chatId === 'chat001') return '/assets/images/teacher-avatar1.png';
    if (chatId === 'chat002') return '/assets/images/group-avatar1.png';
    if (chatId === 'chat004') return '/assets/images/student-avatar1.png';
    return '/assets/images/default-avatar.png'; // 默认头像
  },

  onInput(event) {
    this.setData({
      inputValue: event.detail.value
    });
  },

  sendMessage() {
    if (this.data.inputValue.trim() === '') {
      wx.showToast({
        title: '消息不能为空',
        icon: 'none'
      });
      return;
    }

    const newMessage = {
      id: this.data.messages.length + 1, // 简单ID生成，实际应使用更可靠方式
      content: this.data.inputValue,
      isMe: true,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    this.setData({
      messages: [...this.data.messages, newMessage],
      inputValue: '' // 清空输入框
    });
    this.scrollToBottom();

    // 模拟对方回复
    this.simulateReply(newMessage.content);
  },

  // 模拟对方回复
  simulateReply(myMessageContent) {
    setTimeout(() => {
      const replyContent = `已收到你的消息："${myMessageContent.substring(0,10)}..." 我稍后回复你。`;
      const replyMessage = {
        id: this.data.messages.length + 1,
        content: replyContent,
        isMe: false,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      this.setData({
        messages: [...this.data.messages, replyMessage]
      });
      this.scrollToBottom();
    }, 1000 + Math.random() * 1000);
  },

  // 滚动到列表底部
  scrollToBottom() {
    if (this.data.messages.length > 0) {
      const lastMessageId = this.data.messages[this.data.messages.length - 1].id;
      this.setData({
        scrollToView: `msg-${lastMessageId}`
      });
    }
  },

  // 页面卸载时可以做一些清理工作
  onUnload() {

  }
});