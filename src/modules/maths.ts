/** 因数 */
interface IFactor {
    /** 数字a */
    a: number
    /** 数字b */
    b: number
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
    LargeSmallNumber = 7
}


/**
 * 数学拓展类
 */
export class Maths {
    /**
     * 获取整数的所有因数
     * @param x 未知正整数
     * @returns  所有因数
     */
    static getFactors(x: number): IFactor[] {
        // 所有因数对应组
        let factors = [];
        // 循环得到因数
        for (let i = 1; i <= x / 2; i++) {
            if (x % i == 0) factors.push({ a: i, b: x / i })
        }
        return factors;
    }
    /**
     * 获取整数的所有因数通过接近程度排序
     * @param x 未知正整数
     * @returns 所有因数
     */
    static getFactorsByApproach(x: number): IFactor[] {
        // 根据接近度排序
        return Maths.getFactors(x).sort((a, b) => {
            return Math.abs(a.a - a.b) - Math.abs(b.a - b.b);
        })
    }
    /**
     * 获取随机数(整数)
     * @param min 最小值
     * @param max 最大值
     * @returns 随机数 [min,max)
     */
    static getRandomInt(min: number, max: number): number {
        return Math.floor(Math.random() * max) - min;
    }
    /**
     * 打乱数组
     * @param array 数组
     * @returns 打乱后的数组 
     */
    static getDisorganizeArray<T>(array: T[]): T[] {
        let tempArray = [...array];
        for (let i = 0; i < array.length; i++) {
            let j = this.getRandomInt(0, array.length);
            let temp = tempArray[i];
            tempArray[i] = tempArray[j];
            tempArray[j] = temp;
        }
        return tempArray;
    }
    /**
     * 求和
     * @param array 数组
     */
    static sum(array: number[]): number {
        let sum = 0;
        for (let item of array) sum += item;
        return sum;
    }
    /**
     * 获取随机字符串
     * @param len 长度
     * @param str 字符串或者枚举
     * @param ignore 忽略
     */
    static getRandomStr(len: number, str: GetRandomStrEnum | string = GetRandomStrEnum.LargeSmallNumber, ignore = '') {
        let tmpStr = "";
        let resStr = "";
        if (typeof (str) == "string") tmpStr = str;
        else {
            if ((str & GetRandomStrEnum.Large) != 0) tmpStr += "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
            if ((str & GetRandomStrEnum.Small) != 0) tmpStr += "abcdefghijklmnopqrstuvwxyz"
            if ((str & GetRandomStrEnum.Number) != 0) tmpStr += "0123456789"
        }
        // 剔除忽略字符串
        tmpStr.replace(ignore, "");
        for (let i = 0; i < len; i++)  resStr += tmpStr[this.getRandomInt(0, tmpStr.length)]
        return resStr;
    }
    /**
     * 全局唯一标识符
     */
    static uuid() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }
    /**
     * 判断a与b符号是否相同
     * @param a 
     * @param b 
     * @returns 
     */
    static sameSign(a: number, b: number): boolean {
        return (a ^ b) >= 0;
    }

    /**
     * 角度转弧度
     * @param degree 角度 
     */
    static degreeToRad(degree: number) {
        return Math.PI * degree / 180;
    }
    /**
     * 弧度转角度
     * @param rad 弧度
     */
    static radToDegree(rad: number) {
        return rad * 180 / Math.PI
    }
}