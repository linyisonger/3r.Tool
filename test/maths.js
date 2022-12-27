import { Maths } from "../index.js";

let description = function () {
    return ['#### Maths 数学模块', '包含一些与数学的方法.', '', '以下是相关示例:']
}

let run = function () {

    console.log('获取整数12的所有因数', Maths.getFactors(12));
    // [
    //   { a: 1, b: 12 },
    //   { a: 2, b: 6 },
    //   { a: 3, b: 4 },
    //   { a: 4, b: 3 },
    //   { a: 6, b: 2 }
    // ]
    console.log('获取整数12的所有因数通过接近程度排序', Maths.getFactorsByApproach(12)); // [ { a: 2, b: 5 }, { a: 5, b: 2 }, { a: 1, b: 10 } ]
    // [
    //   { a: 3, b: 4 },
    //   { a: 4, b: 3 },
    //   { a: 2, b: 6 },
    //   { a: 6, b: 2 },
    //   { a: 1, b: 12 }
    // ]
    console.log('数组求和', Maths.sum([1, 2, 3, 4]))
    // 10
    console.log('判断a与b符号是否相同', Maths.sameSign(1, -1))
    // false
    console.log('角度转弧度', Maths.degreeToRad(45));
    // 0.7853981633974483
    console.log('弧度转角度', Maths.radToDegree(0.7853981633974483))
    // 45
}



export {
    run,
    description
}