import { GetRandomStrEnum, Randoms } from "../index.js";

let description = function () {
    return ['#### Randoms 随机模块', '包含一些随机的方法.', '', '以下是相关示例:']
}

let run = function () {
    console.log('获取随机数(整数) [0~10)之间的数', Randoms.getRandomInt(0, 10))
    console.log('打乱数组', Randoms.getDisorganizeArray([{ a: 1 }, { b: 1 }, { c: 1 }]));
    console.log('随机一个长度为10的只有大小写的字母字符串', Randoms.getRandomStr(10, GetRandomStrEnum.LargeSmall))
    console.log('全局唯一标识符(uuid)', Randoms.uuid());
}



export {
    run,
    description
}