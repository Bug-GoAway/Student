// pages/home/index.js 是首页的逻辑文件，负责处理页面的数据、事件和生命周期。
// 引入 Vant Weapp 的 Toast 组件，用于在页面中显示轻提示。
import Toast from '@vant/weapp/toast/toast';

// 定义推荐列表和热门问题列表的每页加载数量。
const recommendPageSize = 5;
const hotPageSize = 5;

// Page() 函数用于注册一个页面。接受一个 Object 参数，其指定页面的初始数据、生命周期函数、事件处理函数等。
Page({
  // data 是页面的初始数据，页面加载时会使用这些数据来渲染。
  data: {
    activeTab: 0, // 当前激活的标签页索引，默认为第一个（推荐解答）。
    tabsOffsetTop: 0, // 用于 Vant Weapp 的 van-tabs 组件的 `offset-top` 属性，实现吸顶效果。
    // announcements 数组存储轮播公告的数据。
    announcements: [
      { id: 1, text: "欢迎使用 Trae AI 智能学习助手！" },
      { id: 2, text: "新功能上线：AI 错题本分析，快去体验吧！" },
      { id: 3, text: "周末学习挑战赛开始啦，参与赢取积分奖励！" }
    ],
    // recommendList 存储推荐解答的数据列表。
    recommendList: [],
    recommendPage: 1, // 推荐解答当前加载的页码。
    recommendPageSize: 5, // 推荐解答每页加载的数量。
    recommendIsLoading: false, // 推荐解答是否正在加载中，用于避免重复加载。
    recommendHasMore: true, // 推荐解答是否还有更多数据可加载。

    // hotList 存储热门问题的数据列表。
    hotList: [],
    hotPage: 1, // 热门问题当前加载的页码。
    hotPageSize: 5, // 热门问题每页加载的数量。
    hotIsLoading: false, // 热门问题是否正在加载中。
    hotHasMore: true, // 热门问题是否还有更多数据可加载。

    // notificationList 存储系统通知的数据列表。
    notificationList: [
      { id: 'n1', title: '系统维护通知', time: '2024-03-10 10:00', url: '/pages/notificationDetail/index?id=n1' },
      { id: 'n2', title: 'V1.2版本更新公告', time: '2024-03-08 15:30', url: '/pages/notificationDetail/index?id=n2' },
    ]
  },

  // onLoad 生命周期回调函数：页面加载时触发。一个页面只调用一次。
  onLoad: function (options) {
    // 首次加载推荐解答数据。
    this.loadInitialRecommendData();
    // 首次加载热门问题数据。
    this.loadInitialHotData();
    // 计算并设置 tabs 的吸顶偏移量。
    this.calculateTabsOffset();
  },

  // 模拟生成推荐数据的方法，用于演示无限滚动加载。
  _generateMockRecommendData(page, size) {
    const items = [];
    const subjects = ['数学', '语文', '英语', '物理', '化学'];
    const grades = ['高一', '高二', '高三', '初一', '初二', '初三'];
    for (let i = 0; i < size; i++) {
      const uniqueId = `rec_p${page}_${i}`;
      items.push({
        id: uniqueId,
        title: `推荐问题 ${uniqueId}：如何解这个题目？`, // 动态生成标题
        description: `这是关于 ${subjects[i % subjects.length]} 科目 ${grades[i % grades.length]} 年级的一个详细解答。`, // 动态生成描述
        thumb: `/assets/images/${subjects[i % subjects.length].toLowerCase()}.png`, // 假设有对应图片路径
        subject: subjects[i % subjects.length], // 科目标签
        grade: grades[i % grades.length] // 年级标签
      });
    }
    // 模拟没有更多数据的情况，当页码达到 3 时，hasMore 设置为 false。
    const hasMore = page < 3; // 假设总共3页数据
    return { items, hasMore };
  },

  // 模拟生成热门数据的方法，用于演示无限滚动加载。
  _generateMockHotData(page, size) {
    const items = [];
    for (let i = 0; i < size; i++) {
      const uniqueId = `hot_p${page}_${i}`;
      items.push({
        id: uniqueId,
        title: `热门讨论 ${uniqueId}：这个知识点怎么理解？`, // 动态生成标题
        description: '很多人都在讨论这个问题，快来看看吧。', // 描述
        thumb: '/assets/images/hot.png' // 假设有对应图片路径
      });
    }
    const hasMore = page < 3; // 假设总共3页数据
    return { items, hasMore };
  },

  // 初始化加载推荐数据，通常在页面首次加载或需要刷新时调用。
  loadInitialRecommendData() {
    this.setData({
      recommendCurrentPage: 1, // 重置页码为 1
      recommendList: [], // 清空现有列表
      recommendHasMore: true, // 标记为有更多数据
      recommendIsLoading: false // 标记为不在加载中
    });
    this.loadMoreRecommendData(); // 调用加载更多数据的方法
  },

  // 加载更多推荐数据，用于实现上拉加载更多。
  loadMoreRecommendData() {
    // 如果正在加载中或者没有更多数据了，则直接返回，避免重复请求。
    if (this.data.recommendIsLoading || !this.data.recommendHasMore) return;

    // 设置加载状态为 true。
    this.setData({ recommendIsLoading: true });
    // 显示加载中的 Toast 提示，并禁止点击。
    Toast.loading({
      message: '加载中...', 
      forbidClick: true,
      duration: 0 // 持续显示直到手动清除
    });

    // 模拟网络请求，延迟 1 秒后执行。
    setTimeout(() => {
      // 调用模拟数据生成方法，获取当前页的数据和是否还有更多数据。
      const { items, hasMore } = this._generateMockRecommendData(this.data.recommendCurrentPage, recommendPageSize);
      // 更新页面数据：将新加载的数据追加到现有列表中，更新页码和加载状态。
      this.setData({
        recommendList: this.data.recommendList.concat(items), // 合并新旧数据
        recommendCurrentPage: this.data.recommendCurrentPage + 1, // 页码加 1
        recommendHasMore: hasMore, // 更新是否有更多数据
        recommendIsLoading: false // 标记为加载完成
      });
      Toast.clear(); // 清除加载中的 Toast 提示。
    }, 1000);
  },

  // 初始化加载热门数据。
  loadInitialHotData() {
    this.setData({
      hotCurrentPage: 1,
      hotList: [],
      hotHasMore: true,
      hotIsLoading: false
    });
    this.loadMoreHotData();
  },

  // 加载更多热门数据。
  loadMoreHotData() {
    if (this.data.hotIsLoading || !this.data.hotHasMore) return;

    this.setData({ hotIsLoading: true });
    Toast.loading({
      message: '加载中...',
      forbidClick: true,
      duration: 0
    });

    setTimeout(() => {
      const { items, hasMore } = this._generateMockHotData(this.data.hotCurrentPage, hotPageSize);
      this.setData({
        hotList: this.data.hotList.concat(items),
        hotCurrentPage: this.data.hotCurrentPage + 1,
        hotHasMore: hasMore,
        hotIsLoading: false
      });
      Toast.clear();
    }, 1000);
  },

  // onTabChange 事件处理函数：当标签页切换时触发。
  onTabChange(event) {
    // 更新当前激活的标签页索引。
    this.setData({ activeTab: event.detail.index });
    // 以下是被注释掉的逻辑，如果需要，可以在切换到对应 tab 时加载初始数据。
    // if (event.detail.index === 0 && this.data.recommendList.length === 0 && this.data.recommendHasMore) {
    //   this.loadInitialRecommendData();
    // }
    // if (event.detail.index === 1 && this.data.hotList.length === 0 && this.data.hotHasMore) {
    //   this.loadInitialHotData();
    // }
  },

  // navigateToPage 事件处理函数：导航到其他页面。
  navigateToPage(event) {
    const url = event.currentTarget.dataset.url; // 获取点击元素上绑定的 data-url 值。
    if (url) {
      wx.navigateTo({ url }); // 如果 url 存在，则跳转到指定页面。
    } else {
      Toast('功能正在开发中，敬请期待！'); // 如果 url 不存在，显示功能开发中的提示。
    }
  },

  // viewDetail 事件处理函数：查看详情。
  viewDetail(event) {
    const item = event.currentTarget.dataset.item; // 获取点击元素上绑定的 data-item 值。
    Toast(`查看 ${item.title} 详情`); // 显示查看详情的 Toast 提示。
    // 以下是被注释掉的逻辑，如果需要，可以导航到详情页面。
    // wx.navigateTo({ url: `/pages/detailPage/index?id=${item.id}` });
  },

  // onShow 生命周期回调函数：页面显示/切入前台时触发。
  onShow() {
    // 检查是否存在自定义 tabBar，并设置当前选中的 tab。
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      this.getTabBar().setData({
        selected: 0 // 设置当前选中的 tab 为首页（索引为 0）。
      });
    }
    // 以下是被注释掉的逻辑，如果希望每次显示都刷新数据，可以在这里调用加载初始数据的方法。
    // this.loadInitialRecommendData();
    // this.loadInitialHotData();
  },

  // calculateTabsOffset 方法：计算 van-tabs 组件的吸顶偏移量。
  // 通过查询选择器获取元素位置信息，动态设置 tabsOffsetTop。
  calculateTabsOffset() {
    const query = wx.createSelectorQuery();
    query.select('.top-section').boundingClientRect(rect => {
      if (rect) {
        // top-section 的高度即为 tabs 需要偏移的距离，使其在滚动时吸顶。
        this.setData({
          tabsOffsetTop: rect.height
        });
      }
    }).exec();
  }
});