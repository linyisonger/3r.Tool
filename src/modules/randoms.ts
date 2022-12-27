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


export class Randoms {
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
}