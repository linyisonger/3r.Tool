import { cloneDeep, v2, executionTime, throttle, antiShake, group, contrast, recursive } from "../index.js";
let description = function () {
  return ["#### Common 常用模块", "包含一些常用的方法.", "", "以下是相关示例:"];
};
let tree = [
  {
    label: "一级 1",
    children: [
      {
        label: "二级 1-1",
        children: [
          {
            label: "三级 1-1-1",
          },
        ],
      },
    ],
  },
  {
    label: "一级 2",
    children: [
      {
        label: "二级 2-1",
        children: [
          {
            label: "三级 2-1-1",
          },
        ],
      },
      {
        label: "二级 2-2",
        children: [
          {
            label: "三级 2-2-1",
          },
        ],
      },
    ],
  },
  {
    label: "一级 3",
    children: [
      {
        label: "二级 3-1",
        children: [
          {
            label: "三级 3-1-1",
          },
        ],
      },
      {
        label: "二级 3-2",
        children: [
          {
            label: "三级 3-2-1",
          },
        ],
      },
    ],
  },
];
let run = function () {
  console.log("深克隆", cloneDeep({}));
  console.log("执行时间", executionTime());
  console.log("防抖", antiShake(() => {}, 1000)());
  console.log("节流", throttle(() => {}, 1000)());
  console.log("打组",group([1, 2, 3, 4, 5], (item, index) => item % 3));
  console.log("一一对比",contrast([1, 2, 3], (curr, next) => curr + next == 3));
  console.log("递归调用", recursive(tree, console.log));
};
try {
  jest.useFakeTimers();
  describe("常用方法", function () {
    let p1 = v2(1, 2);
    let p2 = cloneDeep(p1);
    it("引用类型", function () {
      expect(p1 == p2).toEqual(false);
    });
    it("值类型", function () {
      expect(p1.x == p2.x).toEqual(true);
    });
    let a = {
      x: 1,
      y: "2",
      z: 33333333333333333333333333333,
      h: function () {
        return this.y;
      },
      isPoint: true,
      count: NaN,
      length: undefined,
      child: [
        {
          x: 2,
        },
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
    };
    a["a"] = a;
    let b = cloneDeep(a);
    it("复杂类型", function () {
      expect(a == b).toEqual(false);
    });
    it("执行时间", function () {
      executionTime(() => {
        for (let i = 0; i < 1000; i++) {
          i = i + 2 - 1;
        }
      });
    });
    it("防抖", function () {
      let a = 1;
      let t = antiShake(() => {
        a++;
      }, 1000);
      t();
      t();
      expect(a == 2).toEqual(true);
    });
    it("节流", function () {
      let a = 1;
      let t = throttle(() => {
        a++;
      }, 1000);
      t();
      t();
      const fn = jest.fn();
      jest.advanceTimersByTime(3000);
      expect(fn).toHaveBeenCalledTimes(0);
    });
    it("打组", function () {
      expect(group([1, 2, 3, 4, 5], (item, index) => item % 3)).toEqual([[3], [1, 4], [2, 5]]);
    });
    it("一一对比", function () {
      expect(contrast([1, 2, 3], (curr, next) => curr + next == 3)).toEqual(true);
      expect(contrast([1, 2, 3], (curr, next) => curr + next == 9)).toEqual(false);
    });
    it("递归调用", function () {
      expect(recursive(tree, (item) => item, { children: "children" }).length === 13).toEqual(true);
      expect(recursive(tree, (item) => item).length === 13).toEqual(true);
      expect(recursive(tree).length === 13).toEqual(true);
    });
  });
} catch (error) {
  console.log(error);
  // describe is not defined 无需理会 调用方式不一致
}

export { run, description };
