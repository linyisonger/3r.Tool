import { Convertor } from '../lib/convertor.js'
import { Randoms } from '../lib/randoms.js'
import { Maths } from './maths.js';
import Region from '../assets/region.js'
import Name from '../assets/name.js'
export enum GenderEnum {
    /** 男 */
    Male = 1 << 0,
    /** 女 */
    Female = 1 << 1,
    /** 男女 */
    All = GenderEnum.Male | GenderEnum.Female
}

interface IRegionCode {
    id: string;
    name: string;
    postal_code: string;
    subordinates: IRegionCode[];
}

interface ICitizenIdentificationNumberParam {
    /** 区域代码 [区域代码 6 位] */
    regionCodes?: string[];
    /** 最大年纪 [默认30岁] */
    maxAge?: number;
    /** 最小年纪 [默认18岁] */
    minAge?: number;
    /** 性别 [男女] */
    gender?: GenderEnum
}

interface INameParam {
    /** 性别 [男女] */
    gender?: GenderEnum
}


interface IUSCIParam {
    /** 机构类别代码  [机构类别代码 2位] */
    organizationCodes?: string[];
    /** 区域代码 [区域代码 6 位] */
    regionCodes?: string[];
}

interface IBankCardNumberParam {
    /** BIN 6 位 [621210] */
    bin?: string
    /** 长度 [18] */
    length?: number
}


/**
 * 获取随机区域代码 1-3  1 省  2 市  3 区
 **/
function getRegionCodeByLevel(region: IRegionCode[], level: number) {
    if (level-- === 1) return region
    region = region.flatMap((r) => r.subordinates)
    return getRegionCodeByLevel(region, level)
}

/**
 * 获取组织机构校验码
 * @param oibcBefore 组织机构代码前半段
 */
function getOIBCCheckCode(oibcBefore: string) {
    /** 因数 */
    let factor = [3, 7, 9, 10, 5, 8, 4, 2]
    /** 校验码 */
    let c9 = 0;
    for (let i = 0; i < factor.length; i++) {
        //把字符串中的字符一个一个的解码
        let tmp = oibcBefore[i].charCodeAt(0);
        if (tmp >= 48 && tmp <= 57) tmp -= 48;
        else if (tmp >= 65 && tmp <= 90) tmp -= 55;
        //乘权重后加总
        c9 += factor[i] * tmp;
    }
    c9 = 11 - (c9 % 11);
    return c9 == 11 ? "0" : c9 == 10 ? "X" : (c9 + "");
}

/**
 * 社会统一信用代码校验码
 * @param usciBefore 社会统一信用代码前半段
 */
function getUSCICheckCode(usciBefore: string) {
    const codeCharacterSet = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "A", "B", "C", "D", "E", "F", "G", "H", "J", "K", "L", "M", "N", "P", "Q", "R", "T", "U", "W", "X", "Y"]
    let sum = Maths.sum(usciBefore.split('').map((c, i) => codeCharacterSet.findIndex(v => c == v) * Math.pow(3, i) % 31)) % 31;
    let cv = sum == 0 ? 0 : 31 - sum;
    return codeCharacterSet[cv];
}

/**
 * 获取校验码
 * @param frontCode 
 */
function getCitizenIdentificationNumberCheckCode(frontCode: string) {
    let vc = ['1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2']
    let sum = 0
    for (let i = 0; i < frontCode.length; i++) {
        const c = Number(frontCode[i])
        sum += (c * Math.pow(2, 17 - i)) % 11
    }
    sum %= 11
    return vc[sum]
}
/**
 * 获取银行卡校验码 
 */
function getBankCardNumberCheckCode(cardNumber: string) {
    let sum = 0;
    for (let i = 0; i < cardNumber.length; i++) {
        let n = +cardNumber[i];
        sum += (cardNumber.length - 1 - i) % 2 == 0 ? (n * 2) / 10 + (n * 2) % 10 : n;
    }
    return sum % 10 == 0 ? "0" : 10 - sum % 10 + "";
}
/**
 * 假数据
 */
export class Fakery {
    /**
     * 身份证号码
     */
    static citizenIdentificationNumber(
        param: ICitizenIdentificationNumberParam
    ) {
        const now = new Date()
        const maxAge = param?.maxAge ?? 30  // 最大年龄
        const minAge = param?.minAge ?? 18  // 最小年龄
        const gender = param?.gender ?? GenderEnum.All // 性别
        const regionCodes = param?.regionCodes ?? getRegionCodeByLevel(Region as IRegionCode[], 3).map((r) => r.id)  // 区域
        const startDate = +new Date(now.getFullYear() - maxAge, 0, 1)   // 开始时间
        const endDate = +new Date(now.getFullYear() - minAge, 11, 1)    // 结束时间
        const regionCode = regionCodes[Randoms.int(0, regionCodes.length)]  // 区域代码
        const birthDate = new Date(Randoms.int(startDate, endDate)) // 出生日期
        const birthCode = Convertor.timeFormat(birthDate, 'yyyyMMdd')   // 出生日期代码
        const isMale = (gender & GenderEnum.Male) !== 0; // 男生
        const isFemale = (gender & GenderEnum.Female) !== 0;  // 女生
        let sequenceCode = Randoms.int(1, 500); // 顺序码
        if (isMale && sequenceCode % 2 !== 1) sequenceCode++;
        else if (isFemale && sequenceCode % 2 !== 0) sequenceCode++;
        const frontCode = regionCode + birthCode + sequenceCode.toString().padStart(3, '0')
        return frontCode + getCitizenIdentificationNumberCheckCode(frontCode)
    }
    /**
     * 社会统一信用代码
     */
    static usci(param: IUSCIParam) {
        // 机构代码
        const organizationCodes = param?.organizationCodes ?? ["91", "92"]
        // 区域
        const regionCodes = param?.regionCodes ?? getRegionCodeByLevel(Region as IRegionCode[], 3).map((r) => r.id)  // 地址
        // 字符集
        const codeCharacterSet = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "A", "B", "C", "D", "E", "F", "G", "H", "J", "K", "L", "M", "N", "P", "Q", "R", "T", "U", "W", "X", "Y"]
        let code = "";
        // XX 000000  000000000 0   登记管理部门代码  机构类别代码
        code += organizationCodes[Randoms.int(0, organizationCodes.length)];
        // 00 XXXXXX 000000000 0   登记管理机关行政区划码
        code += regionCodes[Randoms.int(0, regionCodes.length)];
        // 00 000000 XXXXXXXX0 0  主体标识码(组织机构代码)  
        for (let i = 0; i < 8; i++)
            code += codeCharacterSet[Randoms.int(0, codeCharacterSet.length)];
        // 00 000000 00000000X 0   组织机构代码校验码
        code += getOIBCCheckCode(code.substring(8));
        // 00 000000 0000000000 X 校验码 
        code += getUSCICheckCode(code);
        return code
    }
    /**
     * 手机号码
     */
    static phoneNumber() {
        const networkIdentificationNumber = [130, 131, 132, 133, 134, 135, 136, 137, 138, 139, 180, 181, 182, 183, 184, 185, 186, 187, 188, 189, 150, 151, 152, 153, 155, 156, 157, 158, 159, 173, 175, 176, 177, 178, 145, 147, 166, 198, 199]
        let pn = networkIdentificationNumber[Randoms.int(0, networkIdentificationNumber.length)] + ''
        for (let i = 3; i < 11; i++) pn += Randoms.int(0, 10);
        return pn
    }
    /**
     * 姓名
     */
    static fullName(param: INameParam) {
        const { familyName, femaleName, maleName } = Name
        const gender = param?.gender ?? GenderEnum.All // 性别 
        let isMale = (gender & GenderEnum.Male) !== 0; // 男生
        let isFemale = (gender & GenderEnum.Female) !== 0;  // 女生
        let fullName = familyName[Randoms.int(0, familyName.length)]
        if (isMale && isFemale) {
            isMale = Randoms.int(1, 3) === GenderEnum.Male;
            isFemale = !isMale;
        }
        if (isMale) return fullName + maleName[Randoms.int(0, maleName.length)]
        return fullName + femaleName[Randoms.int(0, femaleName.length)]
    }

    /**
     * 银行卡号码
     */
    static bankCardNumber(param: IBankCardNumberParam) {
        let bin = param?.bin ?? "621210"
        let length = param?.length ?? 18
        let result = bin;
        for (let i = 0; i < length - bin.length - 1; i++) result += Randoms.int(0, 10);
        return result + getBankCardNumberCheckCode(result);
    }
}
