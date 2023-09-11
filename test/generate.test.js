import { Generate, v2 } from "../index.js";

let description = function () {
    return ['#### Generate 生成模块', '包含一些生成的方法.', '', '以下是相关示例:']
}

let run = function () {
    console.log('范围数字', Generate.rangeNumber(1, 7)); //  [ 1, 2, 3, 4, 5, 6 ]
    console.log('直线路径', Generate.straightLinePath(v2(0, 0), v2(0, 2), v2(2, 2))); // [{ x: 0, y: 0 },{ x: 0, y: 1 },{ x: 0, y: 2 },{ x: 1, y: 2 },{ x: 2, y: 2 }]
}
try {
    describe('生成模块', function () {
        it('范围数字', function () {
            expect(Generate.rangeNumber(1, 7)).toEqual([1, 2, 3, 4, 5, 6])
            expect(Generate.rangeNumber(7, 1)).toEqual([7, 6, 5, 4, 3, 2])
        })
        it('直线路径', function () {
            expect(Generate.straightLinePath(v2(0, 0), v2(0, 2), v2(2, 2))).toEqual([{ x: 0, y: 0 }, { x: 0, y: 1 }, { x: 0, y: 2 }, { x: 1, y: 2 }, { x: 2, y: 2 }])
        })
    })
} catch (error) {
    // describe is not defined 无需理会 调用方式不一致 
}



export {
    run,
    description
}