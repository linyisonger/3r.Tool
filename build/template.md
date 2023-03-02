🏃‍ 包含一些常用方法例如对象深克隆/数组交集、并集、差集/二维向量点乘、叉乘/股票 KDJ、MACD、RSI、BOLL/校验身份证、统一社会信用代码、手机号...持续更新整合

![action](https://img.shields.io/github/actions/workflow/status/linyisonger/3r.Tool/cd.yml)![npm](https://img.shields.io/npm/dw/@3r/tool)[![Coverage Status](https://coveralls.io/repos/github/linyisonger/3r.Tool/badge.svg?branch=master)](https://coveralls.io/github/linyisonger/3r.Tool?branch=master)![release](https://img.shields.io/librariesio/release/npm/@3r/tool)![npm](https://img.shields.io/npm/v/@3r/tool)![sourcerank](https://img.shields.io/librariesio/sourcerank/npm/@3r/tool)![NPM](https://img.shields.io/npm/l/@3r/tool)[![Code Climate](https://codeclimate.com/github/linyisonger/3r.Tool/badges/gpa.svg)](https://codeclimate.com/github/linyisonger/3r.Tool)[![Test Coverage](https://codeclimate.com/github/linyisonger/3r.Tool/badges/coverage.svg)](https://codeclimate.com/github/linyisonger/3r.Tool/coverage)

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
