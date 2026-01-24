### 🚀v1.6.1 范围内日期生成器方法
➕: 范围内日期生成器(近7天、15天、30天)

### 🚀v1.6.0 增加常见半角转换、密码难度方法
➕: 常见半角、全角互转(#37)
➕: 验证类增加 passwordDifficulty 密码难度方法(#38)

### 🚀v1.5.3 修复55开头社会统一信用代码的验证问题
🔧: 修复55开头社会统一信用代码的验证问题

### 🚀v1.5.2 剔除3-4位的社会统一信用代码的验证
🔧: 剔除3-4位的社会统一信用代码的验证

### 🚀v1.5.1 修复银行卡号吗随机后计算小数问题
🔧: 修复银行卡号吗随机后计算小数问题

### 🚀v1.5.0 增加假数据模块
➕: Fakery 假数据模块
➕: Maths 方法名简化

### 🚀v1.4.6 修复颜色转换rgbToHex
➕: rgbToHex 正则问题

### 🚀v1.4.5 敏感信息加符号
➕: sensitivePlusSymbol 敏感信息加符号

### 🚀v1.4.4 修复身份证号码X结尾报错
🔧: 修复身份证号码X结尾报错

### 🚀v1.4.3 在可及的范围内
➕: inRange 在可及的范围内

### 🚀v1.4.2 四值法拆分
➕: fourValueSplit 四值法拆分

### 🚀v1.4.1 递归调用增加父节点参数
➕: recursive 递归调用增加父节点参数

### 🚀v1.4.0 递归调用/勾股定理
➕: Maths.pythagorasTheorem 勾股定理
➕: recursive 递归调用


### 🚀v1.3.3 对CommonJS的支持 ❌
🔧: 对CommonJS的支持

### 🚀v1.3.2 二维向量 在距离处获取点
➕: Vector2.getPointAtDist 通过距离开始点、结束点、距离 获取距离的坐标点

### 🚀v1.3.1 一一对比方法
➕: contrast 数组交叉对比


### 🚀v1.3.0 增加范围数字/直线路径/打组方法/IP地址验证
➕: Generate.rangeNumber 范围数字
➕: Generate.straightLinePath 直线路径
➕: group 打组方法
➕: isIPAddress IP地址验证

### 🚀v1.2.9 修复获取随机数(整数)最小值控制
🔧: 修复获取随机数(整数)最小值控制

### 🚀v1.2.7 防抖/节流拆分/随机获取颜色
➕: getRandomColor 随机获取颜色
➕: antiShake 防抖 阻断调用 常用于提交
➕: throttle 节流 延迟调用 常用于编辑输入
🙏: 愿无问题

### 🚀v1.2.6 防抖节流
➕: throttle 增加防抖节流方法
🆙: cloneDeep/交集/并集/去重/补集等方法
🙏: 愿无问题


### 🚀v1.2.5 图像模块
➕: scaleToFill 不保持纵横比缩放图片，使图片的宽高完全拉伸至填满
➕: aspectFill 保持纵横比缩放图片，只保证图片的短边能完全显示出来
➕: aspectFit 保持纵横比缩放图片，使图片的长边能完全显示出来
🤔: 为以后开发操作图片相关组件埋一个基础


### 🚀v1.2.4 版本校验/字节转换
➕: 版本校验
👀: '1.2.1'.versionComparison('1.1.2')
➕: 字节转换
👀: Convertor.byteFormat(830, 2)
🔧: 修复cloneDeep null字段报错


### 🚀v1.2.0 拓展方法

➕: 拓展方法如下
👀: '12/24'.getConstellationByDate
👀: 'LowerCaseWithUnderscores'.camelcaseToSnakeCase
🙋‍: ... 目前convertor和verify绝大部分增加了
➕: 身份证号码信息
👀: '420503198804097532'.citizenIdentificationNumberParse
```js
{
    "age": 35,
    "birthday": "1988/04/09",
    "constellation": "白羊座",
    "gender": "男",
    "reginCode": "420503",
}
```

### 🚀v1.1.6 日期转换星座

➕: 执行时间输出
👀: console.log(executionTime(()=>{ ... })) // 执行1ms
➕: 通过日期获取星座
👀: Convertor.getConstellationByDate('12/24') // 摩羯座

### 🚀v1.1.4 命名相关转换

➕: 蛇形命名法 -> 大驼峰命名法
👀: lower_case_with_underscores -> LowerCaseWithUnderscores 
➕: 蛇形命名法 -> 小驼峰命名法
👀: lower_case_with_underscores -> lowerCaseWithUnderscores 
➕: 驼峰命名法 -> 蛇形命名法
👀: LowerCaseWithUnderscores -> lower_case_with_underscores
➖: v2(x,y).log()
❓: 强迫症犯了...

