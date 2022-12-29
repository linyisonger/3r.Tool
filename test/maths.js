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
    console.log('交集 A∩B', Maths.intersection([{ x: 1 }, { y: 2 }, { a: 2, z: 3 }, false, true, 1, 3, 5, { a: 2, c: [1, 2] }], [true, 5, 5, { z: 3, a: 2 }]));
    // [ { a: 2, z: 3 }, true, 5, 5 ]
    console.log('对象是否相等', Maths.equal({ a: 2, z: 3 }, { z: 3, a: 2 }));
    // true
    console.log('删除重复项', Maths.removeRepeat([{ x: 1, y: 2 }, 2, 3, { y: 2, x: 1 }, 1, 4, 5, 6, 2, 3, 4, 4, 45, 4, 31]));
    // [ { x: 1, y: 2 }, 2, 3, 1, 4, 5, 6, 45, 31 ]
    console.log('补集', Maths.complementarySet([{ x: 1 }, { y: 2 }, { a: 2, z: 3 }, false, true, 1, 3, 5, { a: 2, c: [1, 2] }], [true, 5, 5, { z: 3, a: 2 }, 8, { z: 3, a: 3 }]))
    // [ 8, { z: 3, a: 3 } ] 
    console.log('并集', Maths.union([1, 23, 4, 556, 14, 124], [123, 452, 231, 1, 14]));
    // [ 23, 4, 556, 124, 123, 452, 231 ]
    console.log('数组 通过下标改变位置 从3的位置移到1的位置', Maths.interchange([1, 2, 3, 4], 3, 1));
    // [ 1, 4, 2, 3 ]
}



export {
    run,
    description
}