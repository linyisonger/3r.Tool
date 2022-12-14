/**
 * 二维向量
 * @Author 林一怂儿
 * @Date 2022/12/13 19:01:56
 */
export class Vertor2 {
    /**
     * x轴坐标
     */
    x: number = 0;
    /**
     * y轴坐标
     */
    y: number = 0;
    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }
    /**
     * 加 
     * @param t 目标值
     * @returns 自身值 + 目标值 = V2(sx+tx,sy+ty);
     */
    plus(t: Vertor2): Vertor2 {
        return v2(this.x + t.x, this.y + t.y)
    }
    /**
     * 减 
     * @param t 目标值
     * @returns 自身值 - 目标值 = V2(sx-tx,sy-ty);
     */
    subtract(t: Vertor2): Vertor2 {
        return v2(this.x - t.x, this.y - t.y)
    }
    /**
     * 乘 
     * @param t 目标值
     * @returns 自身值 * 目标值 = V2(sx*tx,sy*ty);
     */
    multiply(t: Vertor2): Vertor2 {
        return v2(this.x * t.x, this.y * t.y)
    }
    /**
     * 除
     * @param t 目标值
     * @returns 自身值 / 目标值 = V2(sx/tx,sy/ty);
     */
    divide(t: Vertor2): Vertor2 {
        return v2(this.x / t.x, this.y / t.y)
    }
    /**
     * 叉乘
     * @param t 目标值
     * @returns 自身值 · 目标值 = s.x*t.y-s.y*t.x;
     */
    multiplicationCross(t: Vertor2): number {
        return this.x * t.y - this.y * t.x;
    }
    /**
     * 点乘
     * @param t 目标值
     * @returns 自身值 · 目标值 = s.x*t.x+s.y*t.y;
     */
    dotProduct(t: Vertor2): number {
        return this.x * t.x + this.y * t.y;
    }
    /**
     * 转换字符串
     * @returns 
     */
    toString() {
        return `Vertor2(${this.x},${this.y})`
    }
    /**
     * 打印一下
     */
    log() {
        console.log(String(this))
    }
}

/**
 * 二维向量
 * @param x 
 * @param y 
 * @returns 
 */
export function v2(x: number, y: number) {
    return new Vertor2(x, y)
}

