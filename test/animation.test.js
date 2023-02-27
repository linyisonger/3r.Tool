import { Animation } from "../index.js";
let description = function () {
    return ['#### Animation 动画模块', '包含一些动画的方法.', '', '以下是相关示例:']
}
// 等待时间
let waitTime = function (time) {
    return {
        then: function (resolve) {
            setTimeout(resolve, time)
        }
    }
}
let run = async function () {
    let offset = 1 / 120 // 执行次数
    let interval = 250; // 延迟
    let minInterval = 50; // 最小延迟
    // 影响我打包速度😅
    // 这里不测试了 
    for (let i = 0; i <= 1; i += offset) {
        // 延迟时间 
        // await waitTime(Math.max(Animation.easeIn(i) * interval, minInterval))
        // await waitTime(Math.max(Animation.easeInOut(i) * interval))
        // await waitTime(Math.max(Animation.ease(i) * interval))
        // await waitTime(Math.max(Animation.easeOut(i) * interval))
        // TODO 可以参考相关示例 34.抽奖页面
        // https://linyisonger.github.io/H5.Examples/
    }
}
try {
    describe('动画模块', function () {
        it('easeIn', function () {
            expect(Animation.easeIn(0.5) < .5).toEqual(true)
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