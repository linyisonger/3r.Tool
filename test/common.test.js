import { cloneDeep, v2, executionTime, throttle } from "../index.js";
let description = function () {
    return ['#### Common 常用模块', '包含一些常用的方法.', '', '以下是相关示例:']
}

let run = function () {
    console.log('深克隆', cloneDeep({ /** 需要克隆的对象 */ }));
    console.log('执行时间', executionTime(() => { /** 要做的事情 */ }));
    console.log('防抖/节流', throttle(() => { /** 要做的事情 */ }, 1000)());
}
try {
    describe('常用方法', function () {
        let p1 = v2(1, 2)
        let p2 = cloneDeep(p1);
        it('引用类型', function () {
            expect(p1 == p2).toEqual(false)
        })
        it('值类型', function () {
            expect(p1.x == p2.x).toEqual(true)
        })
        let a = {
            x: 1, y: '2', z: 33333333333333333333333333333, h: function () {
                return this.y
            },
            isPoint: true,
            count: NaN,
            length: undefined,
            child: [
                {
                    x: 2,
                }
            ],
            time: new Date(),
            test: /\d/g,
            color: new Set(),
            arrayBuffer: new ArrayBuffer(10),
            int8Array: new Int8Array([12, 23, 33]),
            uint8Array: new Uint8Array([12, 23, 33]),
            uint8ClampedArray: new Uint8ClampedArray([12, 23, 33]),
            int16Array: new Int16Array([22, 33, 13]),
            uint16Array: new Uint16Array([22, 33, 13]),
            int32Array: new Int32Array([22, 22, 13]),
            uint32Array: new Uint32Array([22, 22, 13]),
            float32Array: new Float32Array([1.1, 2.3]),
            float64Array: new Float64Array([1.1, 2.3]),
            n: null,
        }
        a['a'] = a
        let b = cloneDeep(a);
        it('复杂类型', function () {
            expect(a == b).toEqual(false)
        })
        it('执行时间', function () {
            executionTime(() => {
                for (let i = 0; i < 1000; i++) {
                    i = i + 2 - 1;
                }
            })
        })
        it('防抖', function () {
            let a = 1;
            let t = throttle(() => { a++ }, 1000)
            t();
            t();
            expect(a == 2).toEqual(true)
        })
    })
} catch (error) {
    console.log(error);
    // describe is not defined 无需理会 调用方式不一致 
}

export {
    run,
    description
}