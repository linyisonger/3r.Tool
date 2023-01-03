import { cloneDeep } from "../index.js";

let description = function () {
    return ['#### Common 常用模块', '包含一些常用的方法.', '', '以下是相关示例:']
}

let run = function () {

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
        // blob: new Blob(),
        // file: new File(),
        // imageData: new ImageData(100, 100),
        arrayBuffer: new Int8Array([12, 23, 33]).buffer,
        int8Array: new Int8Array([12, 23, 33]),
        int16Array: new Int16Array([22, 33, 13]),
        int32Array: new Int32Array([22, 22, 13]),
    }
    a.color.add('222')
    let b = cloneDeep(a)
    b.x = 2
    b.color.delete('222')
    console.log('深克隆', a, b);
}



export {
    run,
    description
}