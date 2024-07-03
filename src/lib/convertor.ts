// 加解密
class Base64 {
	// private property
	static keyStr = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/='
	// public method for encoding
	/**
	 * 加密
	 */
	static encode(input: string) {
		let output = ''
		let chr1, chr2, chr3, enc1, enc2, enc3, enc4
		let i = 0
		input = this._utf8_encode(input)
		while (i < input.length) {
			chr1 = input.charCodeAt(i++)
			chr2 = input.charCodeAt(i++)
			chr3 = input.charCodeAt(i++)
			enc1 = chr1 >> 2
			enc2 = ((chr1 & 3) << 4) | (chr2 >> 4)
			enc3 = ((chr2 & 15) << 2) | (chr3 >> 6)
			enc4 = chr3 & 63
			if (isNaN(chr2)) {
				enc3 = enc4 = 64
			} else if (isNaN(chr3)) {
				enc4 = 64
			}
			output = output +
				this.keyStr.charAt(enc1) + this.keyStr.charAt(enc2) +
				this.keyStr.charAt(enc3) + this.keyStr.charAt(enc4)
		}
		return output
	}

	// public method for decoding
	/**
	 * 解密
	 */
	static decode(input: string) {
		let output = ''
		let chr1, chr2, chr3
		let enc1, enc2, enc3, enc4
		let i = 0
		input = input.replace(/[^A-Za-z0-9\+\/\=]/g, '')
		while (i < input.length) {
			enc1 = this.keyStr.indexOf(input.charAt(i++))
			enc2 = this.keyStr.indexOf(input.charAt(i++))
			enc3 = this.keyStr.indexOf(input.charAt(i++))
			enc4 = this.keyStr.indexOf(input.charAt(i++))
			chr1 = (enc1 << 2) | (enc2 >> 4)
			chr2 = ((enc2 & 15) << 4) | (enc3 >> 2)
			chr3 = ((enc3 & 3) << 6) | enc4
			output = output + String.fromCharCode(chr1)
			if (enc3 !== 64) {
				output = output + String.fromCharCode(chr2)
			}
			if (enc4 !== 64) {
				output = output + String.fromCharCode(chr3)
			}
		}
		output = this._utf8_decode(output)
		return output
	}

	// private method for UTF-8 encoding
	static _utf8_encode(string: string) {
		string = string.replace(/\r\n/g, '\n')
		let utftext = ''
		for (let n = 0; n < string.length; n++) {
			const c = string.charCodeAt(n)
			if (c < 128) {
				utftext += String.fromCharCode(c)
			} else if ((c > 127) && (c < 2048)) {
				utftext += String.fromCharCode((c >> 6) | 192)
				utftext += String.fromCharCode((c & 63) | 128)
			} else {
				utftext += String.fromCharCode((c >> 12) | 224)
				utftext += String.fromCharCode(((c >> 6) & 63) | 128)
				utftext += String.fromCharCode((c & 63) | 128)
			}
		}
		return utftext
	}

	// private method for UTF-8 decoding
	static _utf8_decode(utftext: string) {
		let str = ''
		let i = 0
		let c = 0
		let c1 = 0
		let c2 = 0
		while (i < utftext.length) {
			c = utftext.charCodeAt(i)
			if (c < 128) {
				str += String.fromCharCode(c)
				i++
			} else if ((c > 191) && (c < 224)) {
				c2 = utftext.charCodeAt(i + 1)
				str += String.fromCharCode(((c & 31) << 6) | (c2 & 63))
				i += 2
			} else {
				c2 = utftext.charCodeAt(i + 1)
				c1 = utftext.charCodeAt(i + 2)
				str += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c1 & 63))
				i += 3
			}
		}
		return str
	}
}
/**
 * 转换拓展类
 */
export class Convertor {
	/**
	 * 字节单位
	 */
	private static byteUnits = ['B', 'KB', 'MB', 'GB', 'TB', 'PB']
	/**
	 * 字节转换
	 */
	private static byteDifferenceValue = new Array(this.byteUnits.length - 1).fill('').map((_, i) => Math.pow(1024, i + 1))
	/**
	 * 16进制转10进制
	 * @param hex 16进制
	 * @returns
	 */
	private static hexadecimalToRadix(hex: string) {
		return +`0x${hex}`
	}

	/**
	 * 社会统一信用代码转换组织机构代码
	 * @param usci 社会统一信用代码
	 * @returns 组织机构代码
	 */
	static usciToOibc(usci: string): string {
		if (usci.length !== 18) return '' // 长度不正确
		return usci.substring(8, 16) + '-' + usci.substring(16, 17)
	}

	/**
	 * 时间格式化
	 * @param date 日期
	 * @param fmt 格式化方案
	 * @returns
	 */
	static timeFormat(date: Date, fmt = 'yyyy-MM-dd hh:mm:ss'): string {
		const o: any = {
			'M+': date.getMonth() + 1, // 月份
			'd+': date.getDate(), // 日
			'h+': date.getHours(), // 小时
			'm+': date.getMinutes(), // 分
			's+': date.getSeconds(), // 秒
			'q+': Math.floor((date.getMonth() + 3) / 3), // 季度
			S: date.getMilliseconds() // 毫秒
		}
		let r = /(y+)/.exec(fmt)
		if (r) fmt = fmt.replace(r[0], (date.getFullYear() + '').substring(4 - r[0].length))
		for (const k in o) {
			r = new RegExp('(' + k + ')').exec(fmt)
			if (r) fmt = fmt.replace(r[0], (r[0].length === 1) ? (o[k]) : (('00' + o[k]).substring(('' + o[k]).length)))
		}
		return fmt
	}

	/**
	 * 千分位处理
	 * @param num 数值
	 * @returns
	 */
	static thousands(num: number | string): string {
		const str = num + ''
		// 分割小数
		const spa = str.split('.')
		// 整数部分结果
		let res = spa[0].replace(/\d{1,3}(?=(\d{3})+$)/g, (s) => s + ',')
		// 补上小数
		if (spa.length > 1) res += '.' + spa[1]
		return res
	}

	/**
	 * 文本转base64
	 * @param text 文本
	 * @returns
	 */
	static textToBase64(text: string): string {
		return Base64.encode(text)
	}

	/**
	 * base64转文本
	 * @param base64
	 * @returns
	 */
	static base64ToText(base64: string): string {
		return Base64.decode(base64)
	}

	/**
	 * json对象转换base64
	 * @param json
	 * @returns
	 */
	static jsonToBase64<T>(json: T): string {
		return this.textToBase64(JSON.stringify(json))
	}

	/**
	 * base64转换json对象
	 * @param base64
	 * @returns
	 */
	static base64ToJson<T>(base64: string): T {
		return JSON.parse(this.base64ToText(base64))
	}

	/**
	 * 颜色转换
	 * #fff or #ffffff => rgb(255,255,255)
	 *  fff or  ffffff => rgb(255,255,255)
	 * @param hexColor 16进制颜色
	 * @returns rgb颜色
	 */
	static hexToRgb(hexColor: string): string {
		let tmpHex = ''
		const length = hexColor.length
		if (/^#[0-9a-fA-F]{6}$/.test(hexColor) || /^#[0-9a-fA-F]{3}$/.test(hexColor)) tmpHex = hexColor.substring(1, length)
		if (/^[0-9a-fA-F]{6}$/.test(hexColor) || /^[0-9a-fA-F]{3}$/.test(hexColor)) tmpHex = hexColor.substring(0, length)
		if (!tmpHex) throw new TypeError('input data type error.')
		const r = this.hexadecimalToRadix(length > 4 ? tmpHex.substring(0, 2) : (tmpHex[0] + tmpHex[0]))
		const g = this.hexadecimalToRadix(length > 4 ? tmpHex.substring(2, 4) : (tmpHex[1] + tmpHex[1]))
		const b = this.hexadecimalToRadix(length > 4 ? tmpHex.substring(4, 6) : (tmpHex[2] + tmpHex[2]))
		return `rgb(${r},${g},${b})`
	}

	/**
	 * 颜色转换
	 * rgb(255,255,255) => #ffffff
	 * @param rgbColor rgb颜色
	 * @returns 16进制颜色
	 */
	static rgbToHex(rgbColor: string | string[]): string {
		let rgb: string[] = Array.isArray(rgbColor) ? rgbColor : []
		if (typeof rgbColor === 'string') {
			// 剔除空格
			rgbColor = rgbColor.replace(/ /g, '');
			// 剔除rgb
			rgbColor = rgbColor.replace(/[rgb\(\)]/g, '');

			rgb = rgbColor.split(',')
		}
		// 测试是否符合规范
		if (rgb.length === 3 && !rgb.some(val => +val < 0 || +val > 255)) {
			const hex = rgb.map(a => (+a).toString(16)).map(a => a[1] ? a : `0${a}`)
			return `#${hex.join('')}`
		} else throw new TypeError('input data type error.')
	}

	/**
	 * xml 输出 文本
	 * <p>123</p> => 123
	 * @param xml
	 */
	static xmlToText(xml: string): string {
		return xml.replace(/<[^>]+>/g, '')
	}

	/**
	 * 数字转大写金额
	 * 引用 https://www.cnblogs.com/wangfuyou/p/7426472.html
	 * @param num
	 * @returns
	 */
	static numToAmountInWords(num: number): string {
		const fraction = ['角', '分']
		const digit = ['零', '壹', '贰', '叁', '肆', '伍', '陆', '柒', '捌', '玖']
		const unit = [['圆', '万', '亿'], ['', '拾', '佰', '仟']]
		const IsNum = Number(num)
		if (isNaN(IsNum)) return ''
		const head = num < 0 ? '欠' : ''
		num = Math.abs(num)
		let s = ''
		for (let i = 0; i < fraction.length; i++) {
			s += (digit[Math.floor(num * 100 / 10 * Math.pow(10, i)) % 10] + fraction[i]).replace(/零./, '')
		}
		s = s || '整'
		num = Math.floor(num)
		for (let i = 0; i < unit[0].length && num > 0; i++) {
			let p = ''
			for (let j = 0; j < unit[1].length && num > 0; j++) {
				p = digit[num % 10] + unit[1][j] + p
				num = Math.floor(num / 10)
			}
			s = p.replace(/(零.)*零$/, '').replace(/^$/, '零') + unit[0][i] + s
		}
		return head + s.replace(/(零.)*零元/, '元').replace(/(零.)+/g, '零').replace(/^整$/, '零元整')
	}

	/**
	 * 数字转中文
	 * @param num 整数
	 */
	static numToChinese(num: number): string {
		const digit = ['', '一', '二', '三', '四', '五', '六', '七', '八', '九']
		const unit = [['', '万', '亿'], ['', '十', '百', '千']]
		const IsNum = Number(num)
		if (isNaN(IsNum)) return ''
		num = Math.abs(num)
		let s = ''
		num = Math.floor(num)
		for (let i = 0; i < unit[0].length && num > 0; i++) {
			let p = ''
			for (let j = 0; j < unit[1].length && num > 0; j++) {
				const c = digit[num % 10] + unit[1][j]
				p = num % 10 ? c + p : p
				num = Math.floor(num / 10)
			}
			p = p.replace('一十', '十')
			s = p + unit[0][i] + s
		}
		return s
	}

	/**
	 * url query 方式转成 object 形式
	 * @author 桃子
	 * @param url 地址
	 */
	static urlQueryToObject(url: string) {
		const obj: any = {}
		const urls = url.split('?')[1]
		if (!urls) return {}
		const arr = urls.split('&')
		for (let i = 0; i < arr.length; i++) {
			const brr = arr[i].split('=')
			obj[brr[0]] = brr[1]
		}
		return obj
	}

	/**
	 * url object 方式转成 query 形式
	 * @param obj 对象
	 * @returns
	 */
	static urlObjectToQuery(obj: any) {
		let query = ''
		for (const key in obj) {
			query += query ? '&' : '?'
			query += `${key}=${obj[key]}`
		}
		return query
	}

	/**
	 * 蛇形命名法 -> 大驼峰命名法
	 * @param keyName 键值名
	 */
	static snakeCaseToUpperCamelcase(keyName: string) {
		return keyName.split('_').reduce((t, c) => t + c[0].toLocaleUpperCase() + c.substring(1), '')
	}

	/**
	 * 蛇形命名法 -> 小驼峰命名法
	 * @param keyName 键值名
	 */
	static snakeCaseToLowerCamelcase(keyName: string) {
		keyName = this.snakeCaseToUpperCamelcase(keyName)
		return keyName[0].toLocaleLowerCase() + keyName.substring(1)
	}

	/**
	 * 小驼峰命名法 -> 蛇形命名法
	 * @param keyName 键值名
	 */
	static camelcaseToSnakeCase(keyName: string) {
		let result = keyName[0].toLocaleLowerCase()
		for (let i = 1; i < keyName.length; i++) {
			const char = keyName[i]
			if (char.match(/[A-Z]/)) result += '_' + char.toLocaleLowerCase()
			else result += char
		}
		return result
	}

	/**
	 * 通过日期获取星座
	 * @param date '09/14' or '03-14' or 314
	 */
	static getConstellationByDate(date: string | Date | number) {
		let month = 0
		let day = 0
		if (date instanceof Date) {
			month = date.getMonth() + 1
			day = date.getDate()
		}
		if (typeof date === 'string') {
			month = +date.substring(0, 2)
			day = +date.substring(3, 5)
		}
		let dateNum = month * 100 + day
		if (typeof date === 'number') {
			dateNum = date
		}
		// 星座数组
		const constellationArray = ['摩羯座', '水瓶座', '双鱼座', '白羊座', '金牛座', '双子座', '巨蟹座', '狮子座', '处女座', '天秤座', '天蝎座', '射手座']
		// 结束日期数组
		const endDateNumArray = [119, 218, 320, 419, 520, 621, 722, 822, 922, 1023, 1122, 1221]
		// 循环判断减少return
		for (let i = 0; i < endDateNumArray.length; i++) {
			const endDateNum = endDateNumArray[i]
			if (dateNum <= endDateNum) return constellationArray[i]
		}
		return constellationArray[0]
	}
	/**
	 * 身份证号码信息解析
	 * @param code 身份证号码
	 */
	static citizenIdentificationNumberParse(code: string) {
		const reginCode = code.substring(0, 6)
		const birthday = new Date(+code.substring(6, 10), +code.substring(10, 12) - 1, +code.substring(12, 14))
		const gender = +code[16] % 2 === 0 ? '女' : '男'
		const constellation = Convertor.getConstellationByDate(code.substring(10, 14))
		return {
			reginCode,
			birthday: birthday.timeFormat('yyyy/MM/dd'),
			gender,
			constellation,
			age: new Date().getFullYear() - birthday.getFullYear()
		}
	}
	/**
	 * 文件大小 -> 对应大小K，M，G，T
	 * @param byte 传入字节，单位byte
	 * @param fractionDigits 保留几位小数，默认两位
	 * @param units 单位名称 默认值 ['B', 'KB', 'MB', 'GB', 'TB', 'PB'] 自定义传入时只能比起需 <= 默认值长度
	   */
	static byteFormat(byte: number | string, fractionDigits = 2, units = Convertor.byteUnits) {
		if (typeof byte === 'string') byte = +byte
		for (let i = 0; i < units.length - 1; i++) {
			if (byte < Convertor.byteDifferenceValue[i]) return (byte / (Convertor.byteDifferenceValue[i - 1] ?? 1)).toFixed(i ? fractionDigits : i) + units[i]
		}
		return (byte / Convertor.byteDifferenceValue[Convertor.byteDifferenceValue.length - 1]).toFixed(fractionDigits) + units[units.length - 1]
	}

	/**
	 * 四值法拆分
	 * 1 => [1,1,1,1]
	 * [1] => [1,1,1,1]
	 * [1,2] => [1,2,1,2]
	 * [1,2,3]=> [1,2,3,2]
	 * [1,2,3,4] => [1,2,3,4]
	 * @param val 输入值
	 */
	static fourValueSplit(val: number | number[]): number[] {
		if (Array.isArray(val)) {
			if (val.length === 4) return val
			if (val.length === 3) return val.concat([val[1]])
			if (val.length === 2) return val.concat([val[0], val[1]])
			if (val.length === 1) return [val[0], val[0], val[0], val[0]]
			throw Error('array length error .')
		} else return [val, val, val, val]
	}

	/**
	 * 敏感信息加符号
	 * @param str
	 * @param range
	 * @param symbol
	 */
	static sensitivePlusSymbol(str: string, range: [] | [[]] | string, symbol = '*') {
		const res = str.split('')
		let rangeList = []
		if (Array.isArray(range)) {
			range = range.toString()
		}
		rangeList = range.split(',').map(item => +item)
		// 非法参数
		if (rangeList.length % 2 === 1 || rangeList.length === 0) return str

		for (let i = 0; i < str.length; i++) {
			for (let j = 0; j < rangeList.length; j += 2) {
				const min = rangeList[j]
				const max = rangeList[j + 1]
				if (min <= i && i < max) {
					res[i] = symbol
				}
			}
		}
		return res.join('')
	}
}

[
	{ name: 'usciToOibc', prototype: String.prototype, type: 'property' },
	{ name: 'timeFormat', prototype: Date.prototype, type: 'method' },
	{ name: 'byteFormat', prototype: Number.prototype, type: 'method' },
	{ name: 'thousands', prototype: String.prototype, type: 'property' },
	{ name: 'thousands', prototype: Number.prototype, type: 'property' },
	{ name: 'hexToRgb', prototype: String.prototype, type: 'property' },
	{ name: 'rgbToHex', prototype: String.prototype, type: 'property' },
	{ name: 'xmlToText', prototype: String.prototype, type: 'property' },
	{ name: 'numToAmountInWords', prototype: String.prototype, type: 'property' },
	{ name: 'numToChinese', prototype: String.prototype, type: 'property' },
	{ name: 'urlQueryToObject', prototype: String.prototype, type: 'property' },
	{ name: 'snakeCaseToUpperCamelcase', prototype: String.prototype, type: 'property' },
	{ name: 'snakeCaseToLowerCamelcase', prototype: String.prototype, type: 'property' },
	{ name: 'camelcaseToSnakeCase', prototype: String.prototype, type: 'property' },
	{ name: 'getConstellationByDate', prototype: String.prototype, type: 'property' },
	{ name: 'getConstellationByDate', prototype: Date.prototype, type: 'property' },
	{ name: 'citizenIdentificationNumberParse', prototype: String.prototype, type: 'property' }
].forEach(item => {
	Object.defineProperty(item.prototype, item.name, {
		get: function () {
			const that = this as any
			if (item.type === 'method') {
				return function () {
					return (Convertor as any)[item.name].apply(that, [that].concat(Object.values(arguments)))
				}
			}
			return (Convertor as any)[item.name](that)
		}
	})
})

declare global {
	interface String {
		/**
		 * 社会统一信用代码转换组织机构代码
		 */
		usciToOibc: string;
		/**
		 * 千分位处理
		 */
		thousands: string;
		/**
		 * 颜色转换
		 * #fff or #ffffff => rgb(255,255,255)
		 *  fff or  ffffff => rgb(255,255,255)
		 */
		hexToRgb: string;
		/**
		 * 颜色转换
		 * rgb(255,255,255) => #ffffff
		 */
		rgbToHex: string;
		/**
		 * xml 输出 文本
		 * <p>123</p> => 123
		 */
		xmlToText: string;
		/**
		 * 数字转大写金额
		 * 引用 https://www.cnblogs.com/wangfuyou/p/7426472.html
		 */
		numToAmountInWords: string;
		/**
		 * 数字转中文
		 */
		numToChinese: string;
		/**
		 * url query 方式转成 object 形式
		 * @author 桃子
		 */
		urlQueryToObject: any;
		/**
		 * 蛇形命名法 -> 大驼峰命名法
		 */
		snakeCaseToUpperCamelcase: string;
		/**
		 * 蛇形命名法 -> 小驼峰命名法
		 */
		snakeCaseToLowerCamelcase: string;
		/**
		 * 小驼峰命名法 -> 蛇形命名法
		 */
		camelcaseToSnakeCase: string;
		/**
		 * 通过日期获取星座
		 */
		getConstellationByDate: string;
		/**
		 * 身份证号码信息解析
		 * @param code 身份证号码
		 */
		citizenIdentificationNumberParse: {
			reginCode: string;
			birthday: string;
			gender: string;
			constellation: string;
			age: number;
		};

	}
	interface Number {
		/**
		 * 千分位处理
		 */
		thousands: string;

		/**
		 * 文件大小 -> 对应大小kb，m，g，t
		 * @param byte 传入字节，单位byte
		 * @param fractionDigits 保留几位小数，默认两位
		 * @param units 单位名称 默认值 ['B', 'KB', 'MB', 'GB', 'TB', 'PB'] 自定义传入时只能比起需 <= 默认值长度
		 */
		byteFormat(fractionDigits?: number, units?: string[]): string;
	}

	interface Date {
		/**
		 * 时间格式化
		 * @param fmt 格式化方案
		 */
		timeFormat(fmt?: string): string;
		/**
		 * 通过日期获取星座
		 */
		getConstellationByDate: string;
	}
}
