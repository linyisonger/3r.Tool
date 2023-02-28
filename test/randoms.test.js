import { GetRandomStrEnum, Randoms } from "../index.js";

let description = function () {
    return ['#### Randoms 随机模块', '包含一些随机的方法.', '', '以下是相关示例:']
}

let prizes = [
    {
        name: '苹果13',
        weight: 1
    },
    {
        name: '兰博基尼5元优惠券',
        weight: 10000
    },
    {
        name: '香港一日游满5000-5券',
        weight: 20000
    },
    {
        name: '王者荣耀绝美皮肤一套',
        weight: 200
    },
    {
        name: '鼠标垫',
        weight: 200
    },
    {
        name: '再来一次',
        weight: 10000,
    },
    {
        name: '吹风机',
        weight: 20
    },
    {
        name: '扫地机器人',
        weight: 10
    },
]

let run = function () {
    console.log('获取随机数(整数) [0~10)之间的数', Randoms.getRandomInt(0, 10))
    console.log('打乱数组', Randoms.getDisorganizeArray([{ a: 1 }, { b: 1 }, { c: 1 }]));
    console.log('随机一个长度为10的只有大小写的字母字符串', Randoms.getRandomStr(10, GetRandomStrEnum.LargeSmall))
    console.log('全局唯一标识符(uuid)', Randoms.uuid());
    // 数据格式 [{name:string,weight:number}] weight 支持自定义在第二个参数中
    console.log('按权重获取随机索引', Randoms.getRandomIndexByWeight(prizes));
}

try {
    describe('随机模块', function () {
        it('获取随机数(整数) [0~10)之间的数', function () {
            expect(Randoms.getRandomInt(0, 10) < 10).toEqual(true)
        })
        it('打乱数组', function () {
            expect(Randoms.getDisorganizeArray([{ a: 1 }, { b: 1 }, { c: 1 }]).length == 3).toEqual(true)
        })
        it('随机一个长度为10的只有大小写的字母字符串', function () {
            expect(Randoms.getRandomStr(10, GetRandomStrEnum.LargeSmall).length == 10).toEqual(true)
            expect(Randoms.getRandomStr(10, GetRandomStrEnum.Number).length == 10).toEqual(true)
            expect(Randoms.getRandomStr(10, "LargeSmall").length == 10).toEqual(true)
            expect(Randoms.getRandomStr(10).length == 10).toEqual(true)
        })
        it('全局唯一标识符(uuid)', function () {
            expect(Randoms.uuid().length).toEqual('e5d823f1-c4dd-4205-91c6-7cc1fe61cb0c'.length)
        })
        it('按权重获取随机索引', function () {
            expect(Randoms.getRandomIndexByWeight(prizes) < prizes.length).toEqual(true)

        })
    })
} catch (error) {
    // describe is not defined 无需理会 调用方式不一致 
}

export {
    run,
    description
}