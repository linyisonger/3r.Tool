export interface IMarketData {
    /** 时间 */
    time: number
    /** 最高价 */
    high: number
    /** 开盘价 */
    open: number
    /** 最低价 */
    low: number
    /** 收盘价 */
    close: number
    /** 成交量 */
    volume: number
    /** 成交金额 */
    amount: number
}

export interface IKDJOptions {
    /** N是周期数 */
    N: number
    /** K的x日移动平均值 */
    M1: number
    /** D的x日移动平均值 */
    M2: number
}

export interface IMACDOptions {
    /** 快速（一般选12日）移动平均值 */
    SHORT: number
    /** 慢速（一般选26日）移动平均值 */
    LONG: number
    /** MACD的反转信号界定为“差离值”的9日移动平均值（9日DIF） */
    MID: number
}
export interface IRSIOptions {
    N1: number
    N2: number
    N3: number
}
export interface IBOLLOptions {
    N: number
    P: number
}

export interface IKDJResult {
    /** 时间 */
    time: number
    k: number
    d: number
    j: number
}
export interface IMACDResult {
    /** 时间 */
    time: number
    macd: number
    diff: number
    dea: number
}

export interface IRSIResult {
    /** 时间 */
    time: number
    [x: string]: number
}

export interface IBOLLResult {
    /** 时间 */
    time: number
    mid: number
    upper: number
    lower: number
}

/** 股票一些算法整合 */
export class Market {
	/** KDJ 预设值 */
	private static KDJ_OPTIONS: IKDJOptions = {
		N: 9,
		M1: 3,
		M2: 3
	}

	/** MACD 预设值 */
	private static MACD_OPTIONS: IMACDOptions = {
		SHORT: 12,
		LONG: 26,
		MID: 9
	}

	/** RSI 预设值 */
	private static RSI_OPTIONS: IRSIOptions = {
		N1: 6,
		N2: 12,
		N3: 24
	}

	/** BOLL 预设值 */
	private static BOLL_OPTIONS: IBOLLOptions = {
		N: 20,
		P: 2
	}

	/**
     * 计算指数移动平均值（EMA）
     * EMA（12）= 前一日EMA（12）×11/13 + 今日收盘价 ×2/13
     * @param lastEma 前一日EMA（12）
     * @param closePrice 今日收盘价
     * @param units 单位 12
     * @returns
     */
	private static ema (lastEma: number, closePrice: number, units: number) {
		return (lastEma * (units - 1) + closePrice * 2) / (units + 1)
	}

	/**
     * 计算DIF的9日EMA
     * 根据离差值计算其9日的EMA，即离差平均值，是所求的MACD值。为了不与指标原名相混淆，此值又名DEA或DEM。
     * 今日DEA（MACD）=前一日DEA×8/10+今日DIF×2/10。
     * @param lastDea 前一日DEA
     * @param curDiff 今日DIF
     * @returns
     */
	private static dea (lastDea: number, curDiff: number, units: number) {
		return (lastDea * (units - 1) + curDiff * 2) / (units + 1)
	}

	/**
     * 简单移动平均线（SMA）又称“算术移动平均线”，是在投资股票时用于分析股票价格走势的一项指标。它是一个简单地将某一证券在某一时间段的收盘价之和进行算术平均的方法，并随着时间的推移将这些平均值连成一条线便可得出 SMA。
     * SMA(X,N,M)，表示求指标 X 的 N 日移动平均，M 为权重。
     * 算法：若 Y=SMA(X,N,M) 则 Y=(M*X+(N-M)*Y’)/N，其中 Y’表示上一周期 Y 值，N 必须大于 M。
     * @param x
     * @param n
     * @param m
     * @param y
     * @returns
     */
	private static sma (x: number, n: number, m: number, y: number) {
		return (m * x + (n - m) * y) / n
	}

	/**
     * KDJ的计算比较复杂，首先要选择周期（n日、n周等），再计算当天的未成熟随机值（即RSV值），然后再计算K值、D值、J值等。
     * @param data
     * 日k 以日为单位的数据
     * 周k 以周为单位的数据
     * 月k 以月为单位的数据
     * ...
     * @param options
     * kdj参数
     */
	static kdj (data: IMarketData[], options: IKDJOptions = this.KDJ_OPTIONS) {
		const { N, M1, M2 } = options
		// C为当天的收盘价
		let C
		// Ln为之前n日内的最低价
		let Ln
		// Hn为之前n日内的最高价
		let Hn

		let rsv
		let k = 50
		let d = 50
		let j

		const items: IKDJResult[] = []

		for (let x = 0; x < data.length; x++) {
			C = data[x].close
			Ln = Infinity
			Hn = -Infinity
			for (let y = x < N ? 0 : (x - N + 1); y <= x; y++) {
				Ln = Ln > data[y].low ? data[y].low : Ln
				Hn = Hn < data[y].high ? data[y].high : Hn
			}
			rsv = (C - Ln) / (Hn - Ln) * 100

			if (!rsv) rsv = 0

			if (x < N) {
				k = (rsv + k * x) / (x + 1)
				d = (k + d * x) / (x + 1)
			} else {
				k = (rsv + (M1 - 1) * k) / M1
				d = (k + (M2 - 1) * d) / M2
			}

			j = 3 * d - 2 * k

			items.push({
				time: data[x].time,
				k,
				d,
				j
			})
		}
		return items
	}

	/**
     * MACD在应用上应先行计算出快速（一般选12日）移动平均值与慢速（一般选26日）移动平均值。以这两个数值作为测量两者（快速与慢速线）间的“差离值”依据。所谓“差离值”（DIF），即12日EMA数值减去26日EMA数值。因此，在持续的涨势中，12日EMA在26日EMA之上。其间的正差离值（+DIF）会愈来愈大。反之在跌势中，差离值可能变负（-DIF），此时是绝对值愈来愈大。至于行情开始回转，正或负差离值要缩小到一定的程度，才真正是行情反转的信号。MACD的反转信号界定为“差离值”的9日移动平均值（9日DIF）。
     * @param data
     * @param options
     * macd参数
     */
	static macd (data: IMarketData[], options: IMACDOptions = this.MACD_OPTIONS) {
		const { SHORT, LONG, MID } = options
		// 存储之前的值
		const emaShort: number[] = []
		const emaLong: number[] = []
		const deas: number[] = []
		let diff = 0
		let dea = 0
		let macd = 0
		const items: IMACDResult[] = []
		for (let i = 0; i < data.length; i++) {
			const c = data[i].close
			if (i === 0) {
				emaShort.push(c)
				emaLong.push(c)
			} else {
				emaShort.push(this.ema(emaShort[i - 1], c, SHORT))
				emaLong.push(this.ema(emaLong[i - 1], c, LONG))
				diff = emaShort[i] - emaLong[i]
				dea = this.dea(deas[i - 1], diff, MID)
				macd = (diff - dea) * 2
			}
			deas.push(dea)
			items.push({
				time: data[i].time,
				macd,
				diff,
				dea
			})
		}
		return items
	}

	/**
     * 计算rsi指标,分别返回以6日,12日,24日为参考基期的RSI值
     * @param data
     * @param options
     * rsi参数
     */
	static rsi (data: IMarketData[], options: IRSIOptions = this.RSI_OPTIONS) {
		const { N1, N2, N3 } = options
		let lc
		let r
		let r1 = 0
		let r2 = 0
		let s
		let s1 = 0
		let s2 = 0
		let i
		let i1 = 0
		let i2 = 0
		const items: IRSIResult[] = []

		for (let j = 0; j < data.length; j++) {
			const close = data[j].close
			if (j === 0) {
				lc = close
				r1 = s1 = i1 = 0
				r2 = s2 = i2 = 0
			} else {
				lc = data[j - 1].close
				r1 = this.sma(Math.max(close - lc, 0), N1, 1, r1)
				r2 = this.sma(Math.abs(close - lc), N1, 1, r2)
				s1 = this.sma(Math.max(close - lc, 0), N2, 1, s1)
				s2 = this.sma(Math.abs(close - lc), N2, 1, s2)
				i1 = this.sma(Math.max(close - lc, 0), N3, 1, i1)
				i2 = this.sma(Math.abs(close - lc), N3, 1, i2)
			}

			r = r1 / r2 * 100 || 0
			s = s1 / s2 * 100 || 0
			i = i1 / i2 * 100 || 0

			items.push({
				time: data[j].time,
				['rsi' + N1]: r,
				['rsi' + N2]: s,
				['rsi' + N3]: i
			})
		}
		return items
	}

	/**
     * 在所有的指标计算中，BOLL指标的计算方法是最复杂的之一，其中引进了统计学中的标准差概念，涉及到中轨线（MB）、上轨线（UP）和下轨线（DN）的计算。另外，和其他指标的计算一样，由于选用的计算周期的不同，BOLL指标也包括日BOLL指标、周BOLL指标、月BOLL指标年BOLL指标以及分钟BOLL指标等各种类型。经常被用于股市研判的是日BOLL指标和周BOLL指标。虽然它们的计算时的取值有所不同，但基本的计算方法一样。
     * @param data
     * @param options
     * boll参数
     */
	static boll (data: IMarketData[], options: IBOLLOptions = this.BOLL_OPTIONS) {
		const { N, P } = options
		let mid
		let upper
		let lower
		const items: IBOLLResult[] = []
		let val
		let std
		let total = 0
		for (let i = 0; i < data.length; i++) {
			const close = data[i].close
			total += close
			if (i >= (N - 1)) {
				mid = total / N
				std = 0
				for (let j = i - (N - 1); j <= i; j++) {
					val = data[j].close - mid
					std += (val * val)
				}
				std = Math.sqrt(std / N)
				upper = mid + P * std
				lower = mid - P * std
				total -= data[i - (N - 1)].close
			} else {
				mid = upper = lower = 0
			}

			items.push({
				time: data[i].time,
				mid,
				upper,
				lower
			})
		}
		return items
	}
}
