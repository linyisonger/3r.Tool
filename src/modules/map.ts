import { Maths } from './maths.js'
/**
 * 地图经纬度
 */
export class MapCoordinates {
	/**
     * 经度
     */
	longitude: number
	/**
     * 纬度
     */
	latitude: number

	constructor (longitude: number, latitude: number) {
		this.longitude = longitude
		this.latitude = latitude
	}
}
/**
 * 地图类
 */
export class Map {
	/**
     * 地球半径
     */
	static readonly EARTHRADIUS = 6370996.81

	/**
     * 计算距离 (米)
     * @param now 现在
     * @param target 目标
     */
	static distance (now: MapCoordinates, target: MapCoordinates) {
		const x1 = Maths.degreeToRad(now.longitude)
		const y1 = Maths.degreeToRad(now.latitude)
		const x2 = Maths.degreeToRad(target.longitude)
		const y2 = Maths.degreeToRad(target.latitude)
		return this.EARTHRADIUS * Math.acos((Math.sin(y1) * Math.sin(y2) + Math.cos(y1) * Math.cos(y2) * Math.cos(x2 - x1)))
	}
}
