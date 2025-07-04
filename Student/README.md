# Trae Front Student Mini Program

## 项目依赖

本项目使用了 Vant Weapp 组件库，需要通过 npm 安装并构建。

## 安装步骤

1. 确保你的开发环境中已安装 Node.js

2. 在项目根目录（Student 文件夹）中打开终端，执行以下命令安装依赖：

```bash
npm install
```

3. 安装完成后，在微信开发者工具中，点击菜单栏的「工具」->「构建 npm」

4. 构建完成后，重新编译项目

## 注意事项

- 如果遇到组件路径问题，请确保已正确执行「构建 npm」步骤
- 每次修改 package.json 后，都需要重新执行 npm install 和「构建 npm」
- 确保在页面的 json 文件中正确引用了所需的组件

## 图片资源

项目需要以下图片资源：

### 页面图标（放在/assets/icons/目录）
- curve-icon.png - 艾宾浩斯记忆曲线区域的图标
- report-icon.png - 学情报告入口的图标
- practice-icon.png - 巩固训练区域的图标

### 页面图片（放在/assets/images/目录）
- ebbinghaus-placeholder.png - 艾宾浩斯记忆曲线的占位图
- empty-task.png - 无任务时显示的图片

### TabBar图标（放在/assets/tabs/目录）
每个图标都需要普通状态和选中状态两个版本：
- home.png / home-active.png - 首页图标
- study.png / study-active.png - 自习室图标
- ask.png / ask-active.png - 学习图标
- ai.png / ai-active.png - AI伴学图标
- profile.png / profile-active.png - 我的图标