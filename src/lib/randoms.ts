import { Maths } from "../lib/maths.js";
import { Convertor } from "../lib/convertor.js";
import Region from "../assets/region.js";

interface IRegionCode {
  id: string;
  name: string;
  postal_code: string;
  subordinates?: IRegionCode[];
}

// 获取随机区域代码 1-3  1 省  2 市  3 区
function getRegionCodeByLevel(region: IRegionCode[], level: number) {
  if (level == 1) return region;
  region = region.flatMap((r) => r.subordinates ?? []);
  level--;
  return getRegionCodeByLevel(region, level);
}

export enum GetRandomStrEnum {
  /** 大写字母 */
  Large = 1,
  /** 小写字母 */
  Small = 2,
  /** 大小写字母 */
  LargeSmall = 3,
  /** 数字 */
  Number = 4,
  /** 大写字母 数字 */
  LargeNumber = 5,
  /** 小写字母 数字 */
  SmallNumber = 6,
  /** 大小写字母 数字 */
  LargeSmallNumber = 7,
}

export interface IGetRandomCitizenIdentificationNumber {
  // 区域代码 [区域代码 6 位]
  regionCodes?: string[];
  // 最大年纪 [默认30岁]
  maxAge?: number;
  // 最小年纪 [默认18岁]
  minAge?: number;
}

export class Randoms {
  /**
   * 获取随机数(整数)
   * @param min 最小值
   * @param max 最大值
   * @returns 随机数 [min,max)
   */
  static getRandomInt(min: number, max: number): number {
    return ~~(Math.random() * (max - min)) + min;
  }

  /**
   * 打乱数组
   * @param array 数组
   * @returns 打乱后的数组
   */
  static getDisorganizeArray<T>(array: T[]): T[] {
    const tempArray = [...array];
    for (let i = 0; i < array.length; i++) {
      const j = this.getRandomInt(0, array.length);
      const temp = tempArray[i];
      tempArray[i] = tempArray[j];
      tempArray[j] = temp;
    }
    return tempArray;
  }

  /**
   * 获取随机字符串
   * @param len 长度
   * @param str 字符串或者枚举
   * @param ignore 忽略
   */
  static getRandomStr(
    len: number,
    str: GetRandomStrEnum | string = GetRandomStrEnum.LargeSmallNumber,
    ignore = ""
  ) {
    let tmpStr = "";
    let resStr = "";
    if (typeof str === "string") tmpStr = str;
    else {
      if ((str & GetRandomStrEnum.Large) !== 0)
        tmpStr += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
      if ((str & GetRandomStrEnum.Small) !== 0)
        tmpStr += "abcdefghijklmnopqrstuvwxyz";
      if ((str & GetRandomStrEnum.Number) !== 0) tmpStr += "0123456789";
    }
    // 剔除忽略字符串
    tmpStr.replace(ignore, "");
    for (let i = 0; i < len; i++)
      resStr += tmpStr[this.getRandomInt(0, tmpStr.length)];
    return resStr;
  }

  /**
   * 全局唯一标识符
   */
  static uuid() {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
      /[xy]/g,
      function (c) {
        const r = (Math.random() * 16) | 0;
        const v = c === "x" ? r : (r & 0x3) | 0x8;
        return v.toString(16);
      }
    );
  }

  /**
   * 随机获取数组下表 通过权重随机
   * @param arr
   * @param weightKeyt
   */
  static getRandomIndexByWeight(arr: [], weightKey = "weight") {
    /** 总权重 */
    const total = Maths.sum(arr.map((item) => +item[weightKey]));
    /** 随机数 */
    const randomNum = Randoms.getRandomInt(0, total);
    let tmp = 0;
    for (let i = 0; i < arr.length; i++) {
      tmp += +arr[i][weightKey];
      if (tmp > randomNum) return i;
    }
  }

  /**
   * 随机获取颜色
   */
  static getRandomColor() {
    return `rgb(${new Array(3)
      .fill("")
      .map(() => this.getRandomInt(0, 256))
      .join(",")})`;
  }

  /**
   * 随机获取身份证号码
   */
  static getRandomCitizenIdentificationNumber(
    param: IGetRandomCitizenIdentificationNumber
  ) {
    // 区域代码
    let regionCodes =
      param?.regionCodes ?? getRegionCodeByLevel(Region, 3).map((r) => r.id);
    // 出生年纪范围
    let now = new Date();
    let maxAge = param?.maxAge ?? 30;
    let minAge = param?.minAge ?? 18;
    let startDate = +new Date(now.getFullYear() - maxAge, 0, 1);
    let endDate = +new Date(now.getFullYear() - minAge, 11, 1);
    let regionCode = regionCodes[Randoms.getRandomInt(0, regionCodes.length)];
    let birthDate = Convertor.timeFormat(
      new Date(Randoms.getRandomInt(startDate, endDate)),
      "yyyyMMdd"
    );
    console.log(regionCode, birthDate);

    //
  }
}
