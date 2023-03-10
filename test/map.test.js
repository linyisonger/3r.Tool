import { Map, MapCoordinates } from '../index.js'

let description = function () {
    return ['#### Map 地图模块', '包含一些与地图的方法.', '', '以下是相关示例:']
}

let run = function () {
    console.log(`获取地球的半径:${Map.EARTHRADIUS}米`);
    console.log(`计算郑州市到杭州市的距离约:${Map.distance({ latitude: 34.16, longitude: 112.42 }, { latitude: 30.3, longitude: 120.2 })}米`)
}


try {
    describe('地图模块', function () {
        it('获取地球的半径', function () {
            expect(Map.EARTHRADIUS).toEqual(6370996.81)
        })
        it('计算郑州市到杭州市的距离约', function () {
            expect(Math.floor(Map.distance(new MapCoordinates(112.42, 34.16), { latitude: 30.3, longitude: 120.2 }))).toEqual(847980)
        })

    })
} catch (error) {
    // describe is not defined 无需理会 调用方式不一致 
}

export {
    run,
    description
}