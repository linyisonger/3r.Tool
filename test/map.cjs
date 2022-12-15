
let description = function () {
    return ['#### Map 地图模块', '包含一些与地图的方法.', '以下是相关示例:']
}

let run = function () {
    var { Map } = require('../index')
    console.log('获取地球的半径:{0}米', Map.EARTHRADIUS);

    console.log('');
}

module.exports = {
    run,
    description
}