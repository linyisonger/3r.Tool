import { v2, Vector2 } from '../index.js'


let description = function () {
    return ['#### Vertor2 二维向量', '包含一些与平面坐标系的方法.', '', '以下是相关示例:']
}


let run = function () {
    console.log('向量相加', v2(1, 1).plus(v2(2, 2)));
    // Vertor2 { x: 3, y: 3 }
    console.log('向量相减', v2(1, 1).subtract(v2(2, 2)));
    // Vertor2 { x: -1, y: -1 }
    console.log('向量相乘', v2(2, 3).multiply(v2(2, 2)));
    // Vertor2 { x: 4, y: 6 }
    console.log('向量相除', v2(2, 3).divide(v2(2, 2)));
    // Vertor2 { x: 1, y: 1.5 }
    console.log('叉乘', v2(2, 3).multiplicationCross(v2(2, 2)));
    // -2
    console.log('点乘', v2(2, 3).dotProduct(v2(2, 2)));
    // 10
    console.log('检测两线段是否交叉', Vector2.checkCross(v2(0, 1), v2(10, 1), v2(1, 0), v2(1, 10)))
    // true
    console.log('检测p点是否在点p1,p2,p3组成的三角形内', Vector2.checkInTriangle(v2(0, 1), v2(0, 0), v2(2, 0), v2(0, 2)));
    // true
    console.log('检测p点是否在点p1,p2,p3,p4组成的矩形内', Vector2.checkInRectangle(v2(0, 1), v2(0, 0), v2(1, 0), v2(1, 1), v2(0, 1)));
    // true
    console.log('p点绕o点旋转angle°', Vector2.rotateAroundPoint(v2(1, 0), v2(0, 0), 90));
    // Vector2 { x: 0, y: -1 }
    console.log('计算p1到p2两点之间的距离 保留3位小数', Vector2.distance(v2(0, 0), v2(1, 0)));
    // 1 
    console.log('计算两直线的夹角角度', Vector2.includedAngle(v2(1, 0), v2(1, 1)))
    // 45
}

try {
    describe('Vertor2 二维向量模块', function () {
        it('向量相加', function () {
            expect(v2(1, 1).plus(v2(2, 2))).toEqual(new Vector2(3, 3))
        })
        it('向量相减', function () {
            expect(v2(1, 1).subtract(v2(2, 2))).toEqual(new Vector2(-1, -1))
        })
        it('向量相乘', function () {
            expect(v2(2, 3).multiply(v2(2, 2))).toEqual(new Vector2(4, 6))
        })
        it('向量相除', function () {
            expect(v2(2, 3).divide(v2(2, 2))).toEqual(new Vector2(1, 1.5))
        })
        it('叉乘', function () {
            expect(v2(2, 3).multiplicationCross(v2(2, 2))).toEqual(-2)
        })
        it('点乘', function () {
            expect(v2(2, 3).dotProduct(v2(2, 2))).toEqual(10)
        })
        it('检测两线段是否交叉', function () {
            expect(Vector2.checkCross(v2(0, 1), v2(10, 1), v2(1, 0), v2(1, 10))).toEqual(true)
        })
        it('检测p点是否在点p1,p2,p3组成的三角形内', function () {
            expect(Vector2.checkInTriangle(v2(0, 1), v2(0, 0), v2(2, 0), v2(0, 2))).toEqual(true)
        })
        it('检测p点是否在点p1,p2,p3,p4组成的矩形内', function () {
            expect(Vector2.checkInRectangle(v2(0, 1), v2(0, 0), v2(1, 0), v2(1, 1), v2(0, 1))).toEqual(true)
        })
        it('p点绕o点旋转angle°', function () {
            expect(Vector2.rotateAroundPoint(v2(1, 0), v2(0, 0), 90)).toEqual(v2(0, -1))
        })
        it('计算p1到p2两点之间的距离 保留3位小数', function () {
            expect(Vector2.distance(v2(0, 0), v2(1, 0))).toEqual(1)
        })
        it('计算两直线的夹角角度', function () {
            expect(Vector2.includedAngle(v2(1, 0), v2(1, 1))).toEqual(45)
        })
        it('转换字符串', function () {
            expect(v2(1, 1).toString()).toEqual("Vector2(1,1)")
        })
    })
} catch (error) {
    // describe is not defined 无需理会 调用方式不一致 
}

export {
    run,
    description
}