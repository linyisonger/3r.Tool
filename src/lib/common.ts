/**
 * 深克隆
 * @param obj
 */
export function cloneDeep<T>(obj: T, cache = new WeakMap()): T {
	if (obj === null || typeof obj !== 'object') return obj
	if (obj instanceof Date) return new Date(obj) as T
	if (obj instanceof RegExp) return new RegExp(obj) as T

	if (cache.has(obj)) return cache.get(obj) // 如果出现循环引用，则返回缓存对象，防止递归进入死循环
	const res = (Array.isArray(obj) ? [] : {}) as T
	const proOf = Reflect.getPrototypeOf(obj)
	cache.set(obj, true)
	Reflect.setPrototypeOf(res as object, proOf)
	for (const key in obj) {
		// if (Object.prototype.hasOwnProperty.call(obj, key)) {
		(res as T)[key] = cloneDeep(obj[key], cache)
		// }
	}
	return res as T
}

/**
 * 执行时间
 * @param fn 方法
 */
export function executionTime(fn: () => void) {
	const n = +new Date()
	fn()
	return `方法名: ${fn.toString},执行时间: ${((+new Date() - n))}ms.`
}

/**
 * 防抖/节流
 * @param fn 方法
 * @param delay 延迟
 */
export function throttle(fn: () => void, delay: number) {
	let last = 0 // 上次触发的时间
	return function (this: any, ...args: []) {
		const now = Date.now()
		if (now - last > delay) {
			last = now
			fn.apply(this, args)
		}
	}
}
