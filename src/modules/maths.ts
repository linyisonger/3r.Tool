/** 因数 */
interface IFactor {
    /** 数字a */
    a: number
    /** 数字b */
    b: number
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
     * 求和
     * @param array 数组
     */
    static sum(array: number[]): number {
        let sum = 0;
        for (let item of array) sum += item;
        return sum;
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