import { cloneDeep } from '../lib/common.js'

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
	 * @param A
	 * @param B
	 */
	static equal<T>(A: T, B: T): boolean {
		if (typeof A !== typeof B) return false
		if (typeof A === 'object') {
			for (const key in A) {
				if (!this.equal(A[key], B[key])) { return false }
			}
			return true
		}
		if (A !== B) return false
		return true
	}

	/**
	 * 交集
	 * @param A
	 * @param B
	 */
	static intersection<T>(A: T[], B: T[]): T[] {
		const result: T[] = []
		for (let i = 0; i < A.length; i++) {
			for (let j = 0; j < B.length; j++) {
				if (this.equal(A[i], B[j])) result.push(A[i])
			}
		}
		return result
	}

	/**
	 * 删除重复项 (改变原数组)
	 * @param A
	 */
	static removeRepeat<T>(A: T[]): T[] {
		for (let i = 0; i < A.length - 1; i++) {
			for (let j = i + 1; j < A.length; j++) {
				if (this.equal(A[i], A[j])) {
					A.splice(j, 1)
					j--
				}
			}
		}
		return A
	}

	/**
	 * 补集
	 * @param A
	 * @param B
	 */
	static complementarySet<T>(A: T[], B: T[]): T[] {
		const result: T[] = []
		for (let i = 0; i < B.length; i++) {
			if (!A.find(_ => this.equal(B[i], _))) result.push(B[i])
		}
		return result
	}

	/**
	 * 并集
	 * @param A
	 * @param B
	 * @returns
	 */
	static union<T>(A: T[], B: T[]): T[] {
		const result: T[] = cloneDeep(A).concat(B)
		for (let i = 0; i < result.length - 1; i++) {
			for (let j = i + 1; j < result.length; j++) {
				if (this.equal(result[i], result[j])) {
					result.splice(i, 1)
					i--
				}
			}
		}
		return result
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
}
