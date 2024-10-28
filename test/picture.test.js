import { aspectFill, aspectFit, scaleToFill } from "../index.js";

let description = function () {
  return ["#### Picture 图像模块", "包含一些与图像的方法.", "", "以下是相关示例:"];
};
let p1 = [100, 200, 100, 100];
let p2 = [400, 200, 100, 100];
let p3 = [400, 100, 100, 100];
let p4 = [50, 50, 100, 150];
let p5 = [100, 50, 150, 50];
let p6 = [600, 400, 400, 200];
let p7 = [400, 600, 200, 400];

let run = function () {
  console.log("scaleToFill 缩放模式，不保持纵横比缩放图片，使图片的宽高完全拉伸至填满 image 元素	", scaleToFill(...p1));
  console.log("aspectFill 缩放模式，保持纵横比缩放图片，只保证图片的短边能完全显示出来。也就是说，图片通常只在水平或垂直方向是完整的，另一个方向将会发生截取。", aspectFill(...p3));
  console.log("aspectFit 缩放模式，保持纵横比缩放图片，使图片的长边能完全显示出来。也就是说，可以完整地将图片显示出来。", aspectFit(...p5));
};

try {
  describe("图像模块", function () {
    it("scaleToFill", function () {
      expect(scaleToFill(...p1)).toEqual({ offsetX: 0, offsetY: 0, width: 100, height: 100 });
    });
    it("aspectFill", function () {
      let x1 = aspectFill(...p6);
      x1.offsetY = ~~x1.offsetY;
      x1.height = ~~x1.height;
      let x2 = aspectFill(...p7);
      x2.offsetX = ~~x2.offsetX;
      x2.width = ~~x2.width;
      expect(aspectFill(...p1)).toEqual({ offsetX: 0, offsetY: -50, width: 100, height: 200 });
      expect(aspectFill(...p2)).toEqual({ offsetX: -50, offsetY: 0, width: 200, height: 100 });
      expect(aspectFill(...p3)).toEqual({ offsetX: -150, offsetY: 0, width: 400, height: 100 });
      expect(x1).toEqual({ offsetX: 0, offsetY: -33, width: 400, height: 266 });
      expect(x2).toEqual({ offsetY: 0, offsetX: -33, height: 400, width: 266 });
    });
    it("aspectFit", function () {
      expect(aspectFit(...p1)).toEqual({ offsetX: 25, offsetY: 0, width: 50, height: 100 });
      expect(aspectFit(...p2)).toEqual({ offsetX: 0, offsetY: 25, width: 100, height: 50 });
      expect(aspectFit(...p3)).toEqual({ offsetX: 0, offsetY: 37.5, width: 100, height: 25 });
      expect(aspectFit(...p4)).toEqual({ offsetX: 0, offsetY: 25, width: 100, height: 100 });
      expect(aspectFit(...p5)).toEqual({ offsetX: 25, offsetY: 0, width: 100, height: 50 });
    });
  });
} catch (error) {
  // describe is not defined 无需理会 调用方式不一致
}

export { run, description };
