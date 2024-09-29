🏃‍包含一些常用方法例如对象深克隆、递归调用、一一对比/数组交集、并集、差集/二维向量点乘、叉乘/股票KDJ、MACD、RSI、BOLL/验证为空、车牌号、邮箱、身份证、统一社会信用代码、手机号、版本对比/转换日期、星座、身份证解析、字节/随机颜色、手机号、身份证号码、统一社会信用代码...持续更新整合

![action](https://img.shields.io/github/actions/workflow/status/linyisonger/3r.Tool/cd.yml)![npm](https://img.shields.io/npm/dw/@3r/tool)[![Coverage Status](https://coveralls.io/repos/github/linyisonger/3r.Tool/badge.svg?branch=master)](https://coveralls.io/github/linyisonger/3r.Tool?branch=master)![release](https://img.shields.io/librariesio/release/npm/@3r/tool)![npm](https://img.shields.io/npm/v/@3r/tool)![sourcerank](https://img.shields.io/librariesio/sourcerank/npm/@3r/tool)![NPM](https://img.shields.io/npm/l/@3r/tool)[![Code Climate](https://codeclimate.com/github/linyisonger/3r.Tool/badges/gpa.svg)](https://codeclimate.com/github/linyisonger/3r.Tool)[![Test Coverage](https://codeclimate.com/github/linyisonger/3r.Tool/badges/coverage.svg)](https://codeclimate.com/github/linyisonger/3r.Tool/coverage)[![codecov](https://codecov.io/gh/linyisonger/3r.Tool/graph/badge.svg?token=0VLDX7ON0N)](https://codecov.io/gh/linyisonger/3r.Tool)[![docs](https://img.shields.io/badge/docs-info-blue)](https://linyisonger.github.io/3r.Tool/)

#### 如何使用工具包 ?

👇Vue 小栗子 🐿

1.在工程下执行命令`npm i @3r/tool`安装依赖包

2.引用对应的工具类`import { Maths } from "@3r/tool";`

3.使用工具类的方法`this.sum = Maths.sum([1, 2, 3]);`

```vue
<template>
  <div>
    {{ sum }}
  </div>
</template>

<script>
import { Maths } from "@3r/tool";
export default {
  data() {
    return {
      sum: 0,
    };
  },
  async created() {
    this.sum = Maths.sum([1, 2, 3]);
  },
};
</script>
```

👇HTML 小栗子 🐿

1.定义一个`<script type="module"></script>`标签

2.引用对应的工具类`import { Maths } from "https://gcore.jsdelivr.net/npm/@3r/tool@0.0.14/index.js"`注意版本

3.使用工具类的方法`let sum = Maths.sum([1, 2, 3])`

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>

  <body>
    <script type="module">
      import { Maths } from "https://gcore.jsdelivr.net/npm/@3r/tool@0.0.14/index.js";
      let sum = Maths.sum([1, 2, 3]);
      console.log(sum);
    </script>
  </body>
</html>
```
#### Animation 动画模块
包含一些动画的方法.

以下是相关示例:
```js
// TODO 可以参考相关示例 34.抽奖页面
// https://linyisonger.github.io/H5.Examples/

```

#### Common 常用模块
包含一些常用的方法.

以下是相关示例:
```js
console.log("深克隆", cloneDeep({}));
console.log("执行时间", executionTime());
console.log("防抖", antiShake(() => {}, 1000)());
console.log("节流", throttle(() => {}, 1000)());
console.log("打组",group([1, 2, 3, 4, 5], (item, index) => item % 3));
console.log("一一对比",contrast([1, 2, 3], (curr, next) => curr + next == 3));
console.log("递归调用", recursive(tree, console.log));

```

#### Convertor 转换模块
包含一些转换的方法.

以下是相关示例:
```js
console.log("社会统一信用代码转换组织机构代码", Convertor.usciToOibc("91411100766237140X"));
console.log("日期转换", Convertor.timeFormat(new Date(), "yyyy年MM月dd日 hh:mm:ss"));
console.log("千分位处理", Convertor.thousands(10009992.12));
console.log("文本转base64", Convertor.textToBase64("1234"));
console.log("base64转文本", Convertor.base64ToText("MTIzNA=="));
console.log("json对象转换base64", Convertor.jsonToBase64({ a: 1 }));
console.log("base64转换json对象", Convertor.base64ToJson("eyJhIjoxfQ=="));
console.log("颜色转换", Convertor.hexToRgb("f2a"));
console.log("颜色转换", Convertor.rgbToHex("rgb(235,239,241)"));
console.log("xml输出文本", Convertor.xmlToText("<div>总金额 <span>100,000.00</span></div>"));
console.log("数字转大写人民币", Convertor.numToAmountInWords(102030.0));
console.log("数字转中文", Convertor.numToChinese(102030));
console.log("url query 转对象", Convertor.urlQueryToObject("http://example.com/user?id=1&age=2"));
console.log("url object 转 query", Convertor.urlObjectToQuery({ id: 1, age: 3 }));
console.log("蛇形命名法 -> 大驼峰命名法", Convertor.snakeCaseToUpperCamelcase("lower_case_with_underscores"));
console.log("蛇形命名法 -> 小驼峰命名法", Convertor.snakeCaseToLowerCamelcase("lower_case_with_underscores"));
console.log("驼峰命名法 -> 蛇形命名法", Convertor.camelcaseToSnakeCase("LowerCaseWithUnderscores"));
console.log("通过日期获取星座", Convertor.getConstellationByDate("09/14"));
console.log("身份证号解析", "230504199607116664".citizenIdentificationNumberParse);
console.log("字节转换", Convertor.byteFormat(1099511627776, 2));
console.log("四值法拆分", Convertor.fourValueSplit(1));
console.log("敏感信息加符号", Convertor.sensitivePlusSymbol("230504199607116664", "6,14"));

```

####  Fakery 假数据模块
包含一些生成数据的方法.

以下是相关示例:
```js
console.log("身份证号码", Fakery.citizenIdentificationNumber());
console.log("社会统一信用代码", Fakery.usci());
console.log("手机号码", Fakery.phoneNumber());
console.log("姓名", Fakery.fullName());
console.log("银行卡号码 [工商银行卡号]", Fakery.bankCardNumber());

```

#### Generate 生成模块
包含一些生成的方法.

以下是相关示例:
```js
console.log("范围数字", Generate.rangeNumber(1, 7)); //  [ 1, 2, 3, 4, 5, 6 ]
console.log("直线路径", Generate.straightLinePath(v2(0, 0), v2(0, 2), v2(2, 2))); // [{ x: 0, y: 0 },{ x: 0, y: 1 },{ x: 0, y: 2 },{ x: 1, y: 2 },{ x: 2, y: 2 }]

```

#### Map 地图模块
包含一些与地图的方法.

以下是相关示例:
```js
console.log(`获取地球的半径:${Map.EARTHRADIUS}米`);
console.log(`计算郑州市到杭州市的距离约:${Map.distance({ latitude: 34.16, longitude: 112.42 }, { latitude: 30.3, longitude: 120.2 })}米`);

```

#### Market 证券市场
包含一些股票的算法.

以下是相关示例:
```js
// 恒生电子的日k值 ———— https://stock.9fzt.com/ 九方智投 文章篇幅有限通过github访问测试文件
console.log("恒生电子KDJ值", Market.kdj(hundsunDayK.map(format9fzt)).pop());
console.log("恒生电子MACD值", Market.macd(hundsunDayK.map(format9fzt)).pop());
console.log("恒生电子RSI值", Market.rsi(hundsunDayK.map(format9fzt)).pop());
console.log("恒生电子BOLL值", Market.boll(hundsunDayK.map(format9fzt)).pop());

```

#### Maths 数学模块
包含一些与数学的方法.

以下是相关示例:
```js
console.log("获取整数12的所有因数", Maths.getFactors(12));
console.log("获取整数12的所有因数通过接近程度排序", Maths.getFactorsByApproach(12));
console.log("数组求和", Maths.sum([1, 2, 3, 4]));
console.log("判断a与b符号是否相同", Maths.sameSign(1, -1));
console.log("角度转弧度", Maths.degreeToRad(45));
console.log("弧度转角度", Maths.radToDegree(0.7853981633974483));
console.log("交集 A∩B", Maths.intersection([{ x: 1 }, { y: 2 }, { a: 2, z: 3 }, false, true, 1, 3, 5, { a: 2, c: [1, 2] }], [true, 5, 5, { z: 3, a: 2 }]));
console.log("对象是否相等", Maths.equal({ a: 2, z: 3 }, { z: 3, a: 2 }));
console.log("删除重复项", Maths.removeRepeat([{ x: 1, y: 2 }, 2, 3, { y: 2, x: 1 }, 1, 4, 5, 6, 2, 3, 4, 4, 45, 4, 31]));
console.log("补集", Maths.complementarySet([{ x: 1 }, { y: 2 }, { a: 2, z: 3 }, false, true, 1, 3, 5, { a: 2, c: [1, 2] }], [true, 5, 5, { z: 3, a: 2 }, 8, { z: 3, a: 3 }]));
console.log("并集", Maths.union([1, 23, 4, 556, 14, 124], [123, 452, 231, 1, 14]));
console.log("数组 通过下标改变位置 从3的位置移到1的位置", Maths.interchange([1, 2, 3, 4], 3, 1));
console.log("阶乘 10!", Maths.iterationFactorial(10));
console.log("勾股定理", Maths.pythagorasTheorem(3, 4));
console.log("在可及的范围内", Maths.inRange(4, 1, 5));

```

#### Picture 图像模块
包含一些与图像的方法.

以下是相关示例:
```js
console.log("scaleToFill 缩放模式，不保持纵横比缩放图片，使图片的宽高完全拉伸至填满 image 元素	", scaleToFill(...p1));
console.log("aspectFill 缩放模式，保持纵横比缩放图片，只保证图片的短边能完全显示出来。也就是说，图片通常只在水平或垂直方向是完整的，另一个方向将会发生截取。", aspectFill(...p3));
console.log("aspectFit 缩放模式，保持纵横比缩放图片，使图片的长边能完全显示出来。也就是说，可以完整地将图片显示出来。", aspectFit(...p5));

```

#### Randoms 随机模块
包含一些随机的方法.

以下是相关示例:
```js
console.log("获取随机数(整数) [0~10)之间的数", Randoms.int(0, 10));
console.log("打乱数组", Randoms.getDisorganizeArray([{ a: 1 }, { b: 1 }, { c: 1 }]));
console.log("随机一个长度为10的只有大小写的字母字符串", Randoms.str(10, GetRandomStrEnum.LargeSmall));
console.log("全局唯一标识符(uuid)", Randoms.uuid());
// 数据格式 [{name:string,weight:number}] weight 支持自定义在第二个参数中
console.log("按权重获取随机索引", Randoms.getRandomIndexByWeight(prizes));
console.log("随机获取颜色", Randoms.getRandomColor());
console.log("随机获取身份证号码", Randoms.getRandomCitizenIdentificationNumber());

```

#### Verify 验证模块
包含一些验证的方法.

以下是相关示例:
```js
// 像是
// 就是还有可能不是
// 效率
// 没有太多的逻辑判断
console.log("像是社会统一信用代码", Verify.likeUsci("92230900EUFUTJY536"));
console.log('是否是null或者""', Verify.isNullOrEmpty(""));
console.log("校验是否是11位手机号码", Verify.isPhoneNumber("13062627854"));
console.log("校验是否是固定电话", Verify.isTellPhoneNumber("0371-99882211"));
console.log("是否是邮箱", Verify.isEmail("linyisonger@qq.com"));
// 这个验证校验码是否正确
console.log("是否是统一社会信用代码", Verify.isUnifiedSocialCreditIdentifier("92230900EUFUTJY536"));
console.log("是否是车牌号", Verify.isVehicleNumber("青G04444"));
console.log("像身份证号", Verify.likeIDCardNumber("37062219890704584X"));
console.log("是否是身份证号码", Verify.isCitizenIdentificationNumber("37062219890704584X"));
console.log("密码规则校验", Verify.passwordRules("abc123", PasswordRuleEnum.SmallNumber, 6, 20));
// 字符串拓展使用
console.log('是否是null或者""', "".isNullOrEmpty);
console.log("是否是{}", {}.isNullOrEmpty); // 无提示
console.log("像是社会统一信用代码", "92230900EUFUTJY536".likeUsci);
console.log("校验是否是11位手机号码", "13062627854".isPhoneNumber);
console.log("校验是否是固定电话", "0371-99882211".isTellPhoneNumber);
console.log("是否是邮箱", "linyisonger@qq.com".isEmail);
// 这个验证校验码是否正确
console.log("是否是统一社会信用代码", "92230900EUFUTJY536".isUnifiedSocialCreditIdentifier);
console.log("是否是车牌号", "青G04444".isVehicleNumber);
console.log("像身份证号", "622924198810193427".likeIDCardNumber);
console.log("是否是身份证号码", "622924198810193427".isCitizenIdentificationNumber);
console.log("密码规则校验", "abc123".passwordRules(PasswordRuleEnum.SmallNumber, 6, 20));
console.log("判断版本是否相等", "1.0.0".versionComparison("1.0.0"));
console.log("是否是IP地址", Verify.isIPAddress("244.255.123.1"));

```

#### Vertor2 二维向量
包含一些与平面坐标系的方法.

以下是相关示例:
```js
console.log("向量相加", v2(1, 1).plus(v2(2, 2)));
console.log("向量相减", v2(1, 1).subtract(v2(2, 2)));
console.log("向量相乘", v2(2, 3).multiply(v2(2, 2)));
console.log("向量相除", v2(2, 3).divide(v2(2, 2)));
console.log("叉乘", v2(2, 3).multiplicationCross(v2(2, 2)));
console.log("点乘", v2(2, 3).dotProduct(v2(2, 2)));
console.log("检测两线段是否交叉", Vector2.checkCross(v2(0, 1), v2(10, 1), v2(1, 0), v2(1, 10)));
console.log("检测p点是否在点p1,p2,p3组成的三角形内", Vector2.checkInTriangle(v2(0, 1), v2(0, 0), v2(2, 0), v2(0, 2)));
console.log("检测p点是否在点p1,p2,p3,p4组成的矩形内", Vector2.checkInRectangle(v2(0, 1), v2(0, 0), v2(1, 0), v2(1, 1), v2(0, 1)));
console.log("p点绕o点旋转angle°", Vector2.rotateAroundPoint(v2(1, 0), v2(0, 0), 90));
console.log("计算p1到p2两点之间的距离 保留3位小数", Vector2.distance(v2(0, 0), v2(1, 0)));
console.log("计算两直线的夹角角度", Vector2.includedAngle(v2(1, 0), v2(1, 1)));
console.log("在距离处获取点", Vector2.getPointAtDist(v2(0, 0), v2(-1, 0), 0.5));

```

#### 🍻互助互利

如果代码上有什么问题、有什么好的想法欢迎将它提出来👇

https://github.com/linyisonger/3r.Tool/issues/new

感谢我的朋友们给提供需求建议🙇‍



