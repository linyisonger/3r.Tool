import { Maths } from './maths.js'

/**
 * 二维向量
 * @Author 林一怂儿
 * @Date 2022/12/13 19:01:56
 */
export class Vector2 {
	/**
	 * x轴坐标
	 */
	x = 0
	/**
	 * y轴坐标
	 */
	y = 0
	constructor(x: number, y: number) {
		this.x = x
		this.y = y
	}

	/**
	 * 加
	 * @param t 目标值
	 * @returns 自身值 + 目标值 = V2(sx+tx,sy+ty);
	 */
	plus(t: Vector2): Vector2 {
		return v2(this.x + t.x, this.y + t.y)
	}

	/**
	 * 减
	 * @param t 目标值
	 * @returns 自身值 - 目标值 = V2(sx-tx,sy-ty);
	 */
	subtract(t: Vector2): Vector2 {
		return v2(this.x - t.x, this.y - t.y)
	}

	/**
	 * 乘
	 * @param t 目标值
	 * @returns 自身值 * 目标值 = V2(sx*tx,sy*ty);
	 */
	multiply(t: Vector2): Vector2 {
		return v2(this.x * t.x, this.y * t.y)
	}

	/**
	 * 除
	 * @param t 目标值
	 * @returns 自身值 / 目标值 = V2(sx/tx,sy/ty);
	 */
	divide(t: Vector2): Vector2 {
		return v2(this.x / t.x, this.y / t.y)
	}

	/**
	 * 叉乘
	 * @param t 目标值
	 * @returns 自身值 · 目标值 = s.x*t.y-s.y*t.x;
	 */
	multiplicationCross(t: Vector2): number {
		return this.x * t.y - this.y * t.x
	}

	/**
	 * 点乘
	 * @param t 目标值
	 * @returns 自身值 · 目标值 = s.x*t.x+s.y*t.y;
	 */
	dotProduct(t: Vector2): number {
		return this.x * t.x + this.y * t.y
	}

	/**
	 * 检测两线段是否交叉
	 * @param p1 点1
	 * @param p2 点2
	 * @param p3 点3
	 * @param p4 点4
	 */
	static checkCross(p1: Vector2, p2: Vector2, p3: Vector2, p4: Vector2) {
		const p3p1 = p1.subtract(p3)
		const p3p2 = p2.subtract(p3)
		const p3p4 = p4.subtract(p3)

		const p1p2 = p2.subtract(p1)
		const p1p3 = p3.subtract(p1)
		const p1p4 = p4.subtract(p1)

		return p3p1.multiplicationCross(p3p4) * p3p2.multiplicationCross(p3p4) <= 0 && p1p2.multiplicationCross(p1p3) * p1p2.multiplicationCross(p1p4) <= 0
	}

	/**
	  * 检测p点是否在点p1,p2,p3组成的三角形内
	  * @param p
	  * @param p1
	  * @param p2
	  * @param p3
	  */
	static checkInTriangle(p: Vector2, p1: Vector2, p2: Vector2, p3: Vector2) {
		const pp1 = p1.subtract(p)
		const pp2 = p2.subtract(p)
		const pp3 = p3.subtract(p)

		const d1 = pp1.multiplicationCross(pp2)
		const d2 = pp2.multiplicationCross(pp3)
		const d3 = pp3.multiplicationCross(pp1)

		return Maths.sameSign(d1, d2) && Maths.sameSign(d2, d3)
	}

	/**
	 * 检测p点是否在点p1,p2,p3,p4组成的矩形内
	 * @param p
	 * @param p1
	 * @param p2
	 * @param p3
	 * @param p4
	 */
	static checkInRectangle(p: Vector2, p1: Vector2, p2: Vector2, p3: Vector2) {
		const p1p2 = p2.subtract(p1)
		const p1p = p.subtract(p1)
		const p2p3 = p3.subtract(p2)
		const p2p = p.subtract(p2)

		const d1 = p1p2.dotProduct(p1p)
		const d2 = p1p2.dotProduct(p1p2)
		const d3 = p2p3.dotProduct(p2p)
		const d4 = p2p3.dotProduct(p2p3)

		return d1 >= 0 && d1 <= d2 && d3 >= 0 && d3 <= d4
	}

	/**
	 * p点绕o点旋转angle°
	 * @param p 当前点
	 * @param o 源点
	 * @param angle 角度
	 */
	static rotateAroundPoint(p: Vector2, o: Vector2, angle: number) {
		const tp = p.subtract(o)
		const cos = +Math.cos(Math.PI / 180 * angle).toFixed(3)
		const sin = +Math.sin(Math.PI / 180 * angle).toFixed(3)
		const x = tp.x * cos + tp.y * sin
		const y = tp.y * cos - tp.x * sin
		return v2(x, y)
	}

	/**
	 * 计算p1到p2两点之间的距离 保留3位小数
	 * @param p1
	 * @param p2
	 */
	static distance(p1: Vector2, p2: Vector2) {
		return +Math.sqrt(Math.pow(p2.y - p1.y, 2) + Math.pow(p2.x - p1.x, 2)).toFixed(3)
	}

	/**
	 * 计算两直线的夹角角度 保留三位小数
	 * @param v1
	 * @param v2
	 */
	static includedAngle(v1: Vector2, v2: Vector2) {
		return +(Math.sign(v1.multiplicationCross(v2)) * Math.acos((v1.x * v2.x + v1.y * v2.y) / (Math.sqrt(Math.pow(v1.x, 2) + Math.pow(v1.y, 2)) * Math.sqrt(Math.pow(v2.x, 2) + Math.pow(v2.y, 2)))) * 180 / Math.PI).toFixed(3)
	}

	/**
	 * 在距离处获取点
	 * @param start 开始点
	 * @param end 结束点
	 * @param distance 距离
	 */
	static getPointAtDist(start: Vector2, end: Vector2, distance: number) {
		// y 轴
		if (start.x === end.x) return v2(start.x, start.y + Math.sign(end.y - start.y) * distance)
		// x 轴
		if (start.y === end.y) return v2(start.x + Math.sign(end.x - start.x) * distance, start.y)
		// 比例
		const rx = end.x - start.x
		const ry = end.y - start.y
		const rd = Vector2.distance(start, end)
		const td = distance
		const tx = td / rd * rx
		const ty = td / rd * ry
		return v2(tx + start.x, ty + start.y)
	}

	/**
	 * 转换字符串
	 * @returns
	 */
	toString() {
		return `Vector2(${this.x},${this.y})`
	}
}

/**
 * 二维向量
 * @param x
 * @param y
 * @returns
 */
export function v2(x: number, y: number) {
	return new Vector2(x, y)
}
