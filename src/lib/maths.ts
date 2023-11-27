/** 因数 */
interface IFactor {
	/** 数字a */
	a: number
	/** 数字b */
	b: number
}

/** 交换枚举 */
export enum InterchangeFlag {
	/** 进操作位置更新 */
	Move,
	/** 俩下标值更新 */
	Change
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
		const factors: IFactor[] = []
		// 循环得到因数
		for (let i = 1; i <= x / 2; i++) {
			if (x % i === 0) factors.push({ a: i, b: x / i })
		}
		return factors
	}

	/**
	 * 获取整数的所有因数通过接近程度排序
	 * @param x 未知正整数
	 * @returns 所有因数
	 */
	static getFactorsByApproach(x: number): IFactor[] {
		// 根据接近度排序
		return Maths.getFactors(x).sort((a, b) => {
			return Math.abs(a.a - a.b) - Math.abs(b.a - b.b)
		})
	}

	/**
	 * 求和
	 * @param array 数组
	 */
	static sum(array: number[]): number {
		let sum = 0
		for (const item of array) sum += item
		return sum
	}

	/**
	 * 判断a与b符号是否相同
	 * @param a
	 * @param b
	 * @returns
	 */
	static sameSign(a: number, b: number): boolean {
		return (a ^ b) >= 0
	}

	/**
	 * 角度转弧度
	 * @param degree 角度
	 */
	static degreeToRad(degree: number) {
		return Math.PI * degree / 180
	}

	/**
	 * 弧度转角度
	 * @param rad 弧度
	 */
	static radToDegree(rad: number) {
		return rad * 180 / Math.PI
	}

	/**
	 * 对象是否相等
	 * @param a
	 * @param b
	 */
	static equal<T>(a: T, b: T): boolean {
		if (typeof a !== typeof b) return false
		if (typeof a === 'object') {
			for (const key in a) {
				if (!this.equal(a[key], b[key])) { return false }
			}
			return true
		}
		if (a !== b) return false
		return true
	}

	/**
	 * 交集
	 * @param a
	 * @param b
	 */
	static intersection<T>(a: T[], b: T[]): T[] {
		return this.removeRepeat(a).filter((item) => b.find(t => this.equal(t, item)))
	}

	/**
	 * 删除重复项
	 * @param origin
	 */
	static removeRepeat<T>(origin: T[]): T[] {
		return origin.filter((item, index) => origin.findIndex((target) => this.equal(target, item)) === index)
	}

	/**
	 * 补集
	 * @param a
	 * @param b
	 */
	static complementarySet<T>(a: T[], b: T[]): T[] {
		const result: T[] = []
		for (let i = 0; i < b.length; i++) if (!a.find(item => this.equal(b[i], item))) result.push(b[i])
		return result
	}

	/**
	 * 并集
	 * @param a
	 * @param b
	 * @returns
	 */
	static union<T>(a: T[], b: T[]): T[] {
		return this.removeRepeat(a.concat(b))
	}

	/**
	 * 数组 通过下标交互位置
	 * @param array
	 * @param currentIndex
	 * @param targetIndex
	 */
	static interchange<T>(array: T[], currentIndex: number, targetIndex: number, flag = InterchangeFlag.Move) {
		if (flag === InterchangeFlag.Move) { array.splice(targetIndex, 0, ...array.splice(currentIndex, 1)) }
		if (flag === InterchangeFlag.Change) {
			const tmp = array[currentIndex]
			array[currentIndex] = array[targetIndex]
			array[targetIndex] = tmp
		}
		return array
	}

	/**
	 * 阶乘
	 * https://www.delftstack.com/zh/howto/javascript/javascript-factorial/
	 * @param num 数
	 * @returns
	 */
	static iterationFactorial(num: number) {
		let counter = 1
		for (let i = 2; i <= num; i++) { counter = counter * i }
		return counter
	}

	/**
	 * 勾股定理
	 * a²+b²=c²
	 */
	static pythagorasTheorem(a: number, b: number) {
		return Math.sqrt(a * a + b * b)
	}

	/**
	 * 在可及的范围内
	 * @param val 值
	 * @param min 最小
	 * @param max 最大
	 * @returns 范围内值
	 */
	static inRange(val: number, min: number, max: number) {
		if (min > val) return min
		if (max < val) return max
		return val
	}
}

[
	{ name: 'inRange', prototype: Number.prototype, type: 'method' }
].forEach(item => {
	Object.defineProperty(item.prototype, item.name, {
		get: function () {
			const that = this as any
			return function () {
				return (Maths as any)[item.name].apply(that, [that].concat(Object.values(arguments)))
			}
		}
	})
})

declare global {
	interface Number {
		/**
		 * 在可及的范围内
		 * @param min 最小
		 * @param max 最大
		 * @returns 范围内值
		 */
		inRange(min: number, max: number): number;
	}

}
