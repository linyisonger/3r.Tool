import { Vector2 } from '../lib/vertor2.js'
import { Convertor } from '../lib/convertor.js'
/**
 * 生成
 */
export class Generate {
	/** 一天的毫秒时 */
	static readonly DAY_MILLISECOND = 24 * 60 * 60 * 1000


	/** 生成范围数字 例如 1 - 7) [1,2,3,4,5,6] or [7,6,5,4,3,2]
	 * @param start
	 * @param end
	 * @param step
	 */
	static rangeNumber(start: number, end: number, step = 1) {
		const nums = []
		if (end > start) {
			for (let i = start; i < end; i += step) {
				nums.push(i)
			}
		} else {
			for (let i = start; i > end; i -= step) {
				nums.push(i)
			}
		}
		return nums
	}
	/** 通过一些坐标点生成直线路径 [start,...,end]
	 */
	static straightLinePath(...points: Array<Vector2>) {
		let path: Vector2[] = []
		for (let i = 1; i < points.length; i++) {
			const start = points[i - 1]
			const end = points[i]
			if (start.x === end.x) {
				path = path.concat(Generate.rangeNumber(start.y, end.y).map(n => Object({ x: start.x, y: n })))
			}
			if (start.y === end.y) {
				path = path.concat(Generate.rangeNumber(start.x, end.x).map(n => Object({ x: n, y: start.y })))
			}
		}
		path.push(points[points.length - 1])
		return path
	}

	/** 范围日期  [2025-10-01, 2025-10-02 ...]
	 */
	static rangeDate(start: Date, end: Date, fmt: string = 'yyyy-MM-dd') {
		let rangeDateList = []
		for (let i = start.getTime(); i <= end.getTime(); i += Generate.DAY_MILLISECOND) {
			rangeDateList.push(Convertor.timeFormat(new Date(i), fmt))
		}
		return rangeDateList
	}

	/** 过去一周的日期
	 */
	static rangeDateByPastWeek(fmt: string = 'yyyy-MM-dd') {
		let startTime = new Date().getTime() - Generate.DAY_MILLISECOND * 6
		return this.rangeDate(new Date(startTime), new Date(), fmt)
	}

	/** 过去半个月的日期
	 */
	static rangeDateByPastHalfMonth(fmt: string = 'yyyy-MM-dd') {
		let startTime = new Date().getTime() - Generate.DAY_MILLISECOND * 14
		return this.rangeDate(new Date(startTime), new Date(), fmt)
	}

	/** 过去一个月的日期
	 */
	static rangeDateByPastMonth(fmt: string = 'yyyy-MM-dd') {
		let startTime = new Date().getTime() - Generate.DAY_MILLISECOND * 29
		return this.rangeDate(new Date(startTime), new Date(), fmt)
	}
}
