import * as echarts from './echarts-for-weixin/ec-canvas/echarts';

Page({
  data: {
    currentTab: 'overall',
    chartTitle: '各科能力总评',
    shareButtonText: '分享报告',
    ec: {
      lazyLoad: true
    },
    subjects: {
      overall: {
        title: "各科能力总评",
        labels: ["语文", "数学", "英语", "物理", "化学", "生物"],
        data: [85, 92, 78, 88, 75, 80]
      },
      chinese: {
        title: "语文能力分析",
        labels: ["阅读理解", "文言文", "作文", "诗词鉴赏", "基础知识"],
        data: [82, 85, 78, 80, 90]
      },
      math: {
        title: "数学能力分析",
        labels: ["代数", "几何", "函数", "概率统计", "数列"],
        data: [95, 88, 92, 85, 90]
      },
      english: {
        title: "英语能力分析",
        labels: ["阅读", "写作", "听力", "语法", "词汇"],
        data: [75, 80, 85, 78, 82]
      },
      physics: {
        title: "物理能力分析",
        labels: ["力学", "电学", "光学", "热学", "近代物理"],
        data: [90, 85, 88, 80, 75]
      },
      chemistry: {
        title: "化学能力分析",
        labels: ["无机化学", "有机化学", "化学计算", "实验操作", "反应原理"],
        data: [80, 75, 85, 78, 82]
      },
      biology: {
        title: "生物能力分析",
        labels: ["分子生物", "细胞学", "遗传学", "生态学", "人体生理"],
        data: [85, 80, 90, 75, 82]
      }
    }
  },

  onLoad() {
    
    // 初始化图表
    setTimeout(() => {
      this.initChart('overall');
    }, 500); // 延迟 500 毫秒（0.5 秒）
  },

  switchTab(e) {
    const tab = e.currentTarget.dataset.tab;
    this.setData({
      currentTab: tab,
      chartTitle: this.data.subjects[tab].title
    });
    this.initChart(tab);
  },

  initChart(subject) {
    const data = this.data.subjects[subject];
    
    // 使用微信小程序图表组件初始化雷达图
    this.ecComponent = this.selectComponent('#mychart-dom-radar');
    this.ecComponent.init((canvas, width, height, dpr) => {
      const chart = echarts.init(canvas, null, {
        width: width,
        height: height,
        devicePixelRatio: dpr
      });
      
      const option = {
        radar: {
          indicator: data.labels.map(item => ({ name: item, max: 100 })),
          radius: '65%',
          splitNumber: 4,
          axisName: {
            color: '#666',
            fontSize: 12
          },
          splitArea: {
            areaStyle: {
              color: ['rgba(200, 200, 200, 0.1)']
            }
          },
          axisLine: {
            lineStyle: {
              color: 'rgba(200, 200, 200, 0.3)'
            }
          },
          splitLine: {
            lineStyle: {
              color: 'rgba(200, 200, 200, 0.3)'
            }
          }
        },
        series: [{
          type: 'radar',
          data: [{
            value: data.data,
            name: '能力值',
            areaStyle: {
              color: 'rgba(30, 136, 229, 0.2)'
            },
            lineStyle: {
              color: 'rgba(30, 136, 229, 1)',
              width: 2
            },
            symbolSize: 6
          }]
        }]
      };
      
      chart.setOption(option);
      return chart;
    });
  },

  shareReport() {
    this.setData({
      shareButtonText: '生成中...'
    });
    
    setTimeout(() => {
      this.setData({
        shareButtonText: '分享报告'
      });
      wx.showToast({
        title: '报告已生成',
        icon: 'success'
      });
      // 实际项目中这里调用微信分享API
    }, 1000);
  }
});