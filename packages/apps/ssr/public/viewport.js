(function() {
  // 10rem = deviceWidth(全屏)
  // 设计稿宽度为750px
  const designWidth = 750;
  // 对于设计稿 750 / 10rem 比率为75
  const remUnit = 75;

  // 最大适配宽度为768px(平板)
  const maxWidth = 1768;

  function setRemUnit() {
    // 获取设备宽度
    let deviceWidth = document.documentElement.clientWidth || window.innerWidth;
    // 限制最大宽度
    if (deviceWidth > maxWidth) {
      deviceWidth = maxWidth;
    }
    // 计算根元素字体大小
    const fontSize = (deviceWidth / designWidth) * remUnit
    // 设置根元素字体大小
    document.documentElement.style.fontSize = fontSize + 'px';
  }

  // 初始化
  setRemUnit();

  // 监听窗口大小变化
  window.addEventListener('resize', setRemUnit);
  // 监听屏幕旋转
  window.addEventListener('orientationchange', setRemUnit);
})();