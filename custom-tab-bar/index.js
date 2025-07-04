Component({
  data: {
    selected: 0,
    color: "#999999",
    selectedColor: "#1296db", // 主题蓝色
    list: [
      {
        pagePath: "/pages/home/index",
        iconPath: "/assets/tabs/home.png",
        selectedIconPath: "/assets/tabs/home-active.png",
        text: "首页"
      },
      {
        pagePath: "/pages/studyRoom/index",
        iconPath: "/assets/tabs/study-room.png",
        selectedIconPath: "/assets/tabs/study-room-active.png",
        text: "自习室"
      },
      {
        pagePath: "/pages/learning/index",
        iconPath: "/assets/tabs/learning.png",
        selectedIconPath: "/assets/tabs/learning-active.png",
        text: "学习",
        isSpecial: true // 标记为特殊按钮
      },
      {
        pagePath: "/pages/aiStudy/index",
        iconPath: "/assets/tabs/ai-study.png",
        selectedIconPath: "/assets/tabs/ai-study-active.png",
        text: "AI伴学"
      },
      {
        pagePath: "/pages/profile/index",
        iconPath: "/assets/tabs/profile.png",
        selectedIconPath: "/assets/tabs/profile-active.png",
        text: "我的"
      }
    ]
  },
  attached() {
  },
  methods: {
    switchTab(e) {
      const data = e.currentTarget.dataset;
      const url = data.path;
      wx.switchTab({ url });
      this.setData({
        selected: data.index
      });
    }
  }
});