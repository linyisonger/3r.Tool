import { Animation } from "../index.js";
let description = function () {
    return ['#### Animation 动画模块', '包含一些动画的方法.', '', '以下是相关示例:']
}
let run = async function () {
    // TODO 可以参考相关示例 34.抽奖页面
    // https://linyisonger.github.io/H5.Examples/
}
try {
    describe('动画模块', function () {
        it('easeIn', function () {
            expect(Animation.easeIn(0.5) < .5).toEqual(true)
            expect(Animation.easeIn(100000) < .5).toEqual(true)
        })
        it('easeOut', function () {
            expect(Animation.easeOut(0.5) > .5).toEqual(true)
        })
        it('ease', function () {
            expect(Animation.ease(0.5) > .5).toEqual(true)
        })
        it('easeInOut', function () {
            expect(Animation.easeInOut(0.5)).toEqual(.5)
        })
    })
} catch (error) {
    // describe is not defined 无需理会 调用方式不一致
}

export {
    run,
    description
}