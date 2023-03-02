const arrayType = [
	Int8Array,
	Uint8Array,
	Uint8ClampedArray,
	Int16Array,
	Uint16Array,
	Int32Array,
	Uint32Array,
	Float32Array,
	Float64Array
]

/**
 * 深克隆
 * @param obj
 */
export function cloneDeep<T>(obj: T) {
	for (let i = 0; i < arrayType.length; i++) {
		const type = arrayType[i]
		if (obj instanceof type) return type.from(obj) as T
	}
	if (obj instanceof ArrayBuffer) return new Int8Array(obj).buffer as T
	if (obj instanceof Set) return new Set(obj.values()) as T
	if (obj instanceof RegExp) return new RegExp(obj) as T
	if (obj instanceof Date) return new Date(+obj) as T

	if (typeof obj === 'object') {
		const res = (Array.isArray(obj) ? [] : {}) as T
		// 获取类型
		const proOf = Reflect.getPrototypeOf(obj as object)
		// 设置类型
		Reflect.setPrototypeOf(res as object, proOf)

		for (const key in obj) {
			res[key] = cloneDeep(obj[key])
		}
		return res
	}

	return obj
}
