# CelebrateSpring
PhaserH5游戏，横版适配

#### 横版H5游戏模式的介绍
- phaser以及其底层渲染引擎pixi其实提供了很多强大的特性来支持横屏布局。
- 基本就是根据OrientationChange的监听来旋转world对象，并根据画布尺寸和镜头坐标重新对其定位。
- phaser的一些实例游戏的尺寸是固定的，使用exact_fit缩放模式来做横屏，这样的优点是横竖屏切换稳定，不存在尺寸变化。但是这种模式并非完整的全屏模式，在不同分辨率下会出现留白
- 当前项目使用的是获取浏览器可见区域尺寸来设置游戏宽高，并使用show_all缩放模式。这样可以实现在微信等浏览器横竖屏切换时实现全屏效果，但是横竖屏切换后的游戏尺寸设定可能出现偏差，原因是在orientationChange的callback中获取游戏尺寸时，屏幕并没有完成变化，此时获取的宽高是不准确的，在这里提供的思路是进行延时获取，并做一个提示mask来过渡，实现完整的横屏切换功能
---
### 预览
[点这里](http://kuni.applinzi.com/CelebrateSpring/)
