import { Map } from '../index.js'

let description = function () {
    return ['#### Map 地图模块', '包含一些与地图的方法.', '', '以下是相关示例:']
}

let run = function () {
    // 引用
    // import { Map } from '../index.js'
    console.log(`获取地球的半径:${Map.EARTHRADIUS}米`);
    console.log(`计算郑州市到杭州市的距离约:${Map.distance({ latitude: 34.16, longitude: 112.42 }, { latitude: 30.3, longitude: 120.2 })}米`)
}

export {
    run,
    description
}