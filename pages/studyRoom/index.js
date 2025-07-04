// pages/studyRoom/index.js
import Toast from '@vant/weapp/toast/toast';

Page({
  data: {
    searchQuery: '',
    myStudyRooms: [],
    recommendedStudyRooms: [],
    showCreateRoomDialog: false,
    newRoomName: '',
    newRoomDesc: '',
    newRoomIsSupervised: false, // 默认无监督
  },

  onLoad(options) {
    // 模拟加载我的自习室和推荐自习室数据
    this.setData({
      myStudyRooms: [
        {
          id: 'room001',
          name: '高数冲刺小分队',
          description: '每日打卡，互相监督，一起进步！',
          cover: '/assets/images/study-room-sample1.png',
          isSupervised: true,
          memberCount: 5
        },
        {
          id: 'room002',
          name: '英语晨读打卡',
          description: '坚持就是胜利，口语练习。',
          cover: '/assets/images/study-room-sample2.png',
          isSupervised: false,
          memberCount: 12
        }
      ],
      recommendedStudyRooms: [

        {
          id: 'room102',
          name: 'Python编程互助',
          description: '从入门到实践，一起coding。',
          cover: '/assets/images/study-room-sample3.png',
          isSupervised: true,
          memberCount: 20
        },
        {
          id: 'room103',
          name: '雅思备考7分+',
          description: '听说读写全面提升。',
          cover: '/assets/images/study-room-sample1.png',
          isSupervised: true,
          memberCount: 15
        }
      ]
    });
  },

  onSearchQueryChange(event) {
    this.setData({ searchQuery: event.detail });
  },

  onSearchStudyRoom(event) {
    const query = event.detail || this.data.searchQuery;
    if (!query.trim()) {
      Toast('请输入搜索内容');
      return;
    }
    console.log('搜索自习室:', query);
    Toast(`搜索: ${query}`);
    // 实际项目中，这里会根据 query 发起网络请求搜索自习室
    // 并更新 recommendedStudyRooms 或显示搜索结果列表
  },

  onCreateStudyRoom() {
    this.setData({ 
      showCreateRoomDialog: true,
      newRoomName: '',
      newRoomDesc: '',
      newRoomIsSupervised: false
    });
  },

  onJoinStudyRoom() {
    Toast('加入自习室功能开发中');
    // 实际可能跳转到搜索页或弹出输入ID的对话框
  },

  enterStudyRoom(event) {
    const roomId = event.currentTarget.dataset.roomid;
    Toast(`进入自习室 ${roomId}`);
    // wx.navigateTo({ url: `/pages/studyRoomDetail/index?id=${roomId}` });
  },

  onNewRoomNameInput(event) {
    this.setData({ newRoomName: event.detail });
  },
  onNewRoomDescInput(event) {
    this.setData({ newRoomDesc: event.detail });
  },
  onNewRoomSupervisedChange(event) {
    this.setData({ newRoomIsSupervised: event.detail });
  },

  confirmCreateStudyRoom() {
    if (!this.data.newRoomName.trim()) {
      Toast('请输入自习室名称');
      return;
    }
    console.log('创建自习室:', this.data.newRoomName, this.data.newRoomDesc, this.data.newRoomIsSupervised);
    Toast.success('创建成功');
    // 实际创建成功后，可能需要刷新“我的自习室”列表
    // this.loadMyStudyRooms(); 
    this.setData({ showCreateRoomDialog: false });
  },

  cancelCreateStudyRoom() {
    this.setData({ showCreateRoomDialog: false });
  },

  onShow() {
    if (typeof this.getTabBar === 'function' &&
      this.getTabBar()) {
      this.getTabBar().setData({
        selected: 1 // 1 表示自习室对应的索引
      })
    }
  },
});