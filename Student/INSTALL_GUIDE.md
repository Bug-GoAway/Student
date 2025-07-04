# 微信小程序安装指南

## 问题解决方案

当前项目遇到的错误：
```
[ pages/home/index.json 文件内容错误] pages/home/index.json: ["usingComponents"]["van-grid"]: "@vant/weapp/grid/index", component not found
```

这个错误是因为项目使用了 Vant Weapp 组件库，但没有正确安装和构建。请按照以下步骤解决：

## 安装步骤

### 1. 安装 npm 依赖

在项目根目录（Student 文件夹）中打开终端，执行以下命令：

```bash
npm install
```

这将根据 package.json 文件安装所需的依赖，包括 @vant/weapp 组件库。

### 2. 构建 npm 包

在微信开发者工具中，点击菜单栏的「工具」->「构建 npm」，等待构建完成。

### 3. 重新编译项目

点击微信开发者工具中的「编译」按钮，重新编译项目。

## 已完成的修复

我们已经完成了以下修复工作：

1. 创建了 package.json 文件，添加了 @vant/weapp 依赖
2. 修复了 home 页面中的 JSX 风格注释，改为正确的 XML 注释格式
3. 更新了各个页面的 JSON 配置文件，添加了所有使用的 Vant 组件声明：
   - aiStudy 页面：添加了 van-icon、van-tag、van-button 组件
   - home 页面：添加了 van-button、van-cell、van-cell-group 组件
   - studyRoom 页面：添加了 van-button、van-card、van-tag、van-dialog、van-field、van-switch 组件

## 注意事项

- 每次修改 package.json 后，都需要重新执行 npm install 和「构建 npm」
- 确保在页面的 JSON 文件中正确引用了所需的组件
- 如果仍然遇到问题，可以尝试清除项目缓存：在微信开发者工具中，点击「工具」->「清除缓存」->「清除全部缓存」，然后重新编译

## 图片资源

项目需要以下图片资源，请确保它们存在于正确的目录中：

### 页面图标（/assets/icons/目录）
- curve-icon.png - 艾宾浩斯记忆曲线区域的图标
- report-icon.png - 学情报告入口的图标
- practice-icon.png - 巩固训练区域的图标
- default-avatar.png - 默认头像
- teacher-favorite.png - 喜欢的老师收藏夹图标
- material-favorite.png - 资料信息收藏夹图标
- mistakes-collection.png - 错题收藏夹图标
- account-info.png - 账户信息图标
- weakness-notebook.png - 薄弱点笔记本图标
- report.png - 学习报告图标
- arrow-right.png - 右箭头图标
- ask-question-icon.png - 提问图标

### 页面图片（/assets/images/目录）
- ebbinghaus-placeholder.png - 艾宾浩斯记忆曲线的占位图
- empty-task.png - 无任务时显示的图片
- default-avatar.png - 默认头像图片
- empty-message.png - 无消息时显示的图片
- default-room-cover.png - 默认自习室封面图片

### TabBar图标（/assets/tabs/目录）
每个图标都需要普通状态和选中状态两个版本：
- home.png / home-active.png - 首页图标
- study.png / study-active.png - 自习室图标
- ask.png / ask-active.png - 学习图标
- ai.png / ai-active.png - AI伴学图标
- profile.png / profile-active.png - 我的图标