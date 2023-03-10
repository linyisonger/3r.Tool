export enum PasswordRuleEnum {
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
/**
 * 验证拓展类
 */
export class Verify {
	/**
	 * 像是社会统一信用代码
	 * @param usci 社会统一信用代码
	 * @returns
	 */
	static likeUsci(usci: string): boolean {
		return /[0-9A-HJ-NPQRTUWXY]{2}\d{6}[0-9A-HJ-NPQRTUWXY]{10}/.test(usci)
	}

	/**
	 * 是否是null或者""或者\{\}
	 * @param obj 字符串|对象
	 * @returns
	 */
	static isNullOrEmpty(obj: string | object): boolean {
		if (typeof obj === 'object') return obj === null || Object.keys(obj).length === 0
		return obj === '' || obj === undefined
	}

	/**
	 * 校验是否是11位手机号码
	 * @param phoneNumber 手机号码
	 * @returns
	 */
	static isPhoneNumber(phoneNumber: string): boolean {
		return /^1[3456789]\d{9}$/.test(phoneNumber)
	}

	/**
	 * 校验是否是固定电话
	 * @param tellPhoneNumber 固定电话
	 * @returns
	 */
	static isTellPhoneNumber(tellPhoneNumber: string): boolean {
		return /^\d{3}-\d{7,8}|\d{4}-\d{7,8}$/.test(tellPhoneNumber)
	}

	/**
	 * 是否是邮箱
	 * @param email 邮箱
	 * @returns
	 */
	static isEmail(email: string): boolean {
		return /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(email)
	}

	/**
	 * 是否是统一社会信用代码
	 * @param usci 统一社会信用代码
	 * @returns
	 */
	static isUnifiedSocialCreditIdentifier(usci: string): boolean {
		if (usci.length !== 18) return false // 长度不正确
		/** 省份区划 前两位 */
		const provinceCodes = ['11', '12', '13', '14', '15', '21', '22', '23', '31', '32', '33', '34', '35', '36', '37', '41', '42', '43', '44', '45', '46', '50', '51', '52', '53', '54', '61', '62', '63', '64', '65', '71', '81', '82', '91']
		/** 前两位 */
		const top2 = usci.substring(0, 2)
		/** 省份区域代码 第三位和第四位 */
		const proCode = usci.substring(2, 4)
		/** 行政区域代码 第三位和第八位 */
		const regionCode = usci.substring(2, 8)
		/** 组织机构代码 */
		const organizingInstitutionBarCode = usci.substring(8, 16) + '-' + usci.substring(16, 17)

		/** 组织机构校验不合格 */
		if (!/^((1?[1|2|3|9])|(5?[1|2|3|9])|(9?[1|2|3|9])|[2|3|4|6|7|8|A-G|Y][1])$/.test(top2)) return false
		/** 省份区域代码校验不合格 */
		if (!(provinceCodes.indexOf(proCode) > 0)) return false
		/** 行政区域代码校验不合格 */
		if (!/^([0-9])*$/.test(regionCode)) return false
		/** 行政区域代码校验不合格 */
		if (!/^([0-9A-Z]{8}\-[\d{1}|X])$/.test(organizingInstitutionBarCode)) return false

		/**
		 * 组织机构代码验证
		 */

		/** 组织机构代码前部分 */
		const oibcBefore = organizingInstitutionBarCode.split('-')[0]
		/** 组织机构代码后部分 */
		const oibcAfter = organizingInstitutionBarCode.split('-')[1]
		/** 因数 */
		const factor = [3, 7, 9, 10, 5, 8, 4, 2]
		/** 校验码 */
		let c9: string | number = 0
		for (let i = 0; i < factor.length; i++) {
			// 把字符串中的字符一个一个的解码
			let tmp = oibcBefore.charCodeAt(i)
			if (tmp >= 48 && tmp <= 57) {
				tmp -= 48
			}
			if (tmp >= 65 && tmp <= 90) {
				tmp -= 55
			}
			// 乘权重后加总
			c9 += factor[i] * tmp
		}
		c9 = 11 - (c9 % 11)
		c9 = c9 === 11 ? '0' : c9 === 10 ? 'X' : (c9 + '')

		// 组织机构代码验证
		if (c9 !== oibcAfter) return false

		/**
		 * 校验社会统一信用代码
		 */

		/** 加权因子 */
		const weightFactor = [1, 3, 9, 27, 19, 26, 16, 17, 20, 29, 25, 13, 8, 24, 10, 30, 28]
		/** 基数 */
		const cardinalNumber = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'J', 'K', 'L', 'M', 'N', 'P', 'Q', 'R', 'T', 'U', 'W', 'X', 'Y']
		/** 校验社会统一信用代码前部分 */
		const usciBefore = usci.substring(0, 17)
		/** 校验社会统一信用代码后部分 */
		const usciAfter = usci.substring(17)
		/** 校验码 */
		let c18: string | number = 0

		for (let i = 0; i < usciBefore.length; i++) {
			const tmp = usciBefore[i]
			const idx = cardinalNumber.indexOf(tmp)
			/** 字母不存在再基数中 */
			// if (idx === -1) return false
			c18 += idx * weightFactor[i]
		}

		c18 = 31 - (c18 % 31)
		c18 = c18 === 31 ? 0 : c18

		c18 = cardinalNumber[c18]
		// 校验社会统一信用代码
		if (usciAfter !== c18) return false
		return true
	}

	/**
	 * 是否是车牌号
	 * https://www.cnblogs.com/mmzuo-798/p/14929545.html
	 * @param vehicleNumber 车牌号
	 * @returns
	 */
	static isVehicleNumber(vehicleNumber: string) {
		if (vehicleNumber.length === 7) return /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}[A-HJ-NP-Z0-9]{4}[A-HJ-NP-Z0-9挂学警港澳]{1}$/.test(vehicleNumber)
		if (vehicleNumber.length === 8) return /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}(([0-9]{5}[DABCEFGHJK]$)|([DABCEFGHJK][A-HJ-NP-Z0-9][0-9]{4}$))/.test(vehicleNumber) // 2021年新能源车牌不止有DF
		return false
	}

	/**
	 * 像身份证号
	 * @param num 身份证号
	 * @returns
	 */
	static likeIDCardNumber(num: string): boolean {
		return /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/.test(num)
	}

	/**
	 * 是否是身份证号码
	 * @param num 身份证号码
	 */
	static isCitizenIdentificationNumber(num: string): boolean {
		if (num.length !== 18) return false
		if (!this.likeIDCardNumber(num)) return false
		// 验证码
		const vc = [1, 0, 10, 9, 8, 7, 6, 5, 4, 3, 2]
		// 前部分
		const frontNum = num.substring(0, 17)
		let sum = 0
		for (let i = 0; i < frontNum.length; i++) {
			const c = Number(frontNum[i])
			sum += (c * Math.pow(2, 17 - i)) % 11
		}
		sum %= 11
		if (Number(num[17]) !== vc[sum]) return false
		return true
	}

	/**
	 * 密码规则校验
	 * @param password 密码
	 * @param rule 规则
	 * @param minLength 最小长度
	 * @param maxLength 最大长度
	 * @returns
	 */
	static passwordRules(password: string, rule = PasswordRuleEnum.LargeSmallNumber, minLength = 6, maxLength = 20) {
		let res = true
		if ((rule & PasswordRuleEnum.Large) !== 0) { res = res && /(?=.*[A-Z])/.test(password) }
		if ((rule & PasswordRuleEnum.Small) !== 0) { res = res && /(?=.*[a-z])/.test(password) }
		if ((rule & PasswordRuleEnum.Number) !== 0) { res = res && /(?=.*[0-9])/.test(password) }
		return res && password.length >= minLength && password.length <= maxLength
	}

	/**
	 * 版本对比 仅支持 x.x.x ...这种类型
	 * @param current 当前版本
	 * @param target 目标版本
	 * @returns -1 小于 0 等于 1 大于
	 */
	static versionComparison(current: string, target: string) {
		const c = current.split('.').map(_ => +_)
		const t = target.split('.').map(_ => +_)
		for (let i = 0; i < c.length; i++) {
			if (c[i] > t[i]) return 1
			if (c[i] < t[i]) return -1
		}
		return 0
	}
}

const ignorePrototype = ['passwordRules', 'versionComparison'];
[
	...Reflect.ownKeys(Verify).filter(_ => typeof (Verify as any)[_] === 'function' && !ignorePrototype.includes(_ as string)).map(n => Object({
		name: n,
		prototype: String.prototype,
		type: 'property'
	})),
	{ name: 'passwordRules', prototype: String.prototype, type: 'method' },
	{ name: 'isNullOrEmpty', prototype: Object.prototype, type: 'property' },
	{ name: 'versionComparison', prototype: String.prototype, type: 'method' }
].forEach(item => {
	Object.defineProperty(item.prototype, item.name, {
		get: function () {
			const that = this as any
			if (item.type === 'method') {
				return function () {
					return (Verify as any)[item.name].apply(that, [that, ...arguments])
				}
			}
			return (Verify as any)[item.name](that)
		}
	})
})

declare global {
	interface String {
		/**
		 * 像是社会统一信用代码
		 */
		likeUsci: boolean;
		/**
		 * 是否是null或者""或者{}
		 **/
		isNullOrEmpty: boolean;
		/**
		 * 校验是否是11位手机号码
		 */
		isPhoneNumber: boolean;
		/**
		 * 校验是否是固定电话
		 */
		isTellPhoneNumber: boolean;
		/**
		 * 是否是邮箱
		 * @param email 邮箱
		 * @returns
		 */
		isEmail: boolean;
		/**
		 * 是否是统一社会信用代码
		 */
		isUnifiedSocialCreditIdentifier: boolean;
		/**
		 * 是否是车牌号
		 */
		isVehicleNumber: boolean;
		/**
		 * 像身份证号
		 */
		likeIDCardNumber: boolean;
		/**
		 * 是否是身份证号码
		 */
		isCitizenIdentificationNumber: boolean;
		/**
		 * 密码规则校验
		 * @param rule 规则
		 * @param minLength 最小长度
		 * @param maxLength 最大长度
		 * @returns
		 */
		passwordRules: (rule?: PasswordRuleEnum, minLength?: number, maxLength?: number) => boolean
		/**
		 * 版本对比 仅支持 x.x.x ...这种类型
		 * @param target 目标版本
		 * @returns -1 小于 0 等于 1 大于
		 */
		versionComparison(target: string): 0 | 1 | -1;
	}
	interface Object {
		/**
		 * 是否是null或者""或者{}
		 **/
		isNullOrEmpty: boolean;
	}
}
