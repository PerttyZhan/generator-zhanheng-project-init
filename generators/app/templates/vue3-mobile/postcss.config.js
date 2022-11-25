module.exports = {
  plugins: {
    autoprefixer: {
      overrideBrowserslist: [
        "Android 4.1",
        "iOS 7.1",
        "Chrome > 31",
        "ff > 31",
        "ie >= 8",
        "last 10 versions", // 所有主流浏览器最近10版本用
      ],
      grid: true,
    },
    "postcss-pxtorem": {
      rootValue: 16, //换算基数，1rem相当于10px,值为37.5时,1rem为20px,淘宝的flex默认为1rem为10px
      unitPrecision: 5, //允许REM单位增长到的十进制数字。
      propList: ["*"],
      selectorBlackList: ['page'], //黑名单
      exclude: /(node_module)/
    },
  },
};
