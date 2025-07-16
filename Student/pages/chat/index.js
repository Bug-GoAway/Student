// pages/chat/index.js
Page({
  data: {
    chatName: '',
    messages: [],
    inputValue: '',
    myAvatar: '/assets/images/my-avatar.png',
    otherAvatar: '/assets/images/default-avatar.png',
    scrollToView: ''
  },

  onLoad(options) {
    const chatName = decodeURIComponent(options.name || '聊天');
    const chatId   = options.chatId;

    // 不再手动设置系统标题，交由 navigation-bar 组件
    this.setData({
      chatName,
      messages: this.loadInitialMessages(chatId),
      otherAvatar: this.getOtherAvatar(chatId)
    });
    this.scrollToBottom();
  },

  loadInitialMessages(chatId) {
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

  getOtherAvatar(chatId) {
    if (chatId === 'chat001') return '/assets/images/teacher-avatar1.png';
    if (chatId === 'chat002') return '/assets/images/group-avatar1.png';
    if (chatId === 'chat004') return '/assets/images/student-avatar1.png';
    return '/assets/images/default-avatar.png';
  },

  onInput(e) {
    this.setData({ inputValue: e.detail.value });
  },

  sendMessage() {
    if (!this.data.inputValue.trim()) {
      wx.showToast({ title: '消息不能为空', icon: 'none' });
      return;
    }
    const newMsg = {
      id: this.data.messages.length + 1,
      content: this.data.inputValue,
      isMe: true,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    this.setData({
      messages: [...this.data.messages, newMsg],
      inputValue: ''
    });
    this.scrollToBottom();
    this.simulateReply(newMsg.content);
  },

  simulateReply(myMessageContent) {
    setTimeout(() => {
      const replyMsg = {
        id: this.data.messages.length + 1,
        content: `已收到你的消息："${myMessageContent.substring(0, 10)}..." 我稍后回复你。`,
        isMe: false,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      this.setData({ messages: [...this.data.messages, replyMsg] });
      this.scrollToBottom();
    }, 1000 + Math.random() * 1000);
  },

  scrollToBottom() {
    if (this.data.messages.length) {
      const lastId = this.data.messages[this.data.messages.length - 1].id;
      this.setData({ scrollToView: `msg-${lastId}` });
    }
  },

  onUnload() {}
});