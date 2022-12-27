// 加解密
class Base64 {
    // private property
    static keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
    // public method for encoding
    /**
     * 加密
     */
    static encode(input: string) {
        let output = "";
        let chr1, chr2, chr3, enc1, enc2, enc3, enc4;
        let i = 0;
        input = this._utf8_encode(input);
        while (i < input.length) {
            chr1 = input.charCodeAt(i++);
            chr2 = input.charCodeAt(i++);
            chr3 = input.charCodeAt(i++);
            enc1 = chr1 >> 2;
            enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
            enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
            enc4 = chr3 & 63;
            if (isNaN(chr2)) {
                enc3 = enc4 = 64;
            } else if (isNaN(chr3)) {
                enc4 = 64;
            }
            output = output +
                this.keyStr.charAt(enc1) + this.keyStr.charAt(enc2) +
                this.keyStr.charAt(enc3) + this.keyStr.charAt(enc4);
        }
        return output;
    }
    // public method for decoding
    /**
     * 解密
     */
    static decode(input: string) {
        let output = "";
        let chr1, chr2, chr3;
        let enc1, enc2, enc3, enc4;
        let i = 0;
        input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");
        while (i < input.length) {
            enc1 = this.keyStr.indexOf(input.charAt(i++));
            enc2 = this.keyStr.indexOf(input.charAt(i++));
            enc3 = this.keyStr.indexOf(input.charAt(i++));
            enc4 = this.keyStr.indexOf(input.charAt(i++));
            chr1 = (enc1 << 2) | (enc2 >> 4);
            chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
            chr3 = ((enc3 & 3) << 6) | enc4;
            output = output + String.fromCharCode(chr1);
            if (enc3 != 64) {
                output = output + String.fromCharCode(chr2);
            }
            if (enc4 != 64) {
                output = output + String.fromCharCode(chr3);
            }
        }
        output = this._utf8_decode(output);
        return output;
    }

    // private method for UTF-8 encoding
    static _utf8_encode(string: string) {
        string = string.replace(/\r\n/g, "\n");
        let utftext = "";
        for (let n = 0; n < string.length; n++) {
            let c = string.charCodeAt(n);
            if (c < 128) {
                utftext += String.fromCharCode(c);
            } else if ((c > 127) && (c < 2048)) {
                utftext += String.fromCharCode((c >> 6) | 192);
                utftext += String.fromCharCode((c & 63) | 128);
            } else {
                utftext += String.fromCharCode((c >> 12) | 224);
                utftext += String.fromCharCode(((c >> 6) & 63) | 128);
                utftext += String.fromCharCode((c & 63) | 128);
            }

        }
        return utftext;
    }

    // private method for UTF-8 decoding
    static _utf8_decode(utftext: string) {
        let str = "";
        let i = 0;
        let c = 0;
        let c1 = 0;
        let c2 = 0;
        while (i < utftext.length) {
            c = utftext.charCodeAt(i);
            if (c < 128) {
                str += String.fromCharCode(c);
                i++;
            } else if ((c > 191) && (c < 224)) {
                c2 = utftext.charCodeAt(i + 1);
                str += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
                i += 2;
            } else {
                c2 = utftext.charCodeAt(i + 1);
                c1 = utftext.charCodeAt(i + 2);
                str += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c1 & 63));
                i += 3;
            }
        }
        return str;
    }
}
/**
 * 转换拓展类
 */
export class Convertor {
    /**
     * 社会统一信用代码转换组织机构代码
     * @param usci 社会统一信用代码
     * @returns 组织机构代码
     */
    static usciToOibc(usci: string): string {
        if (usci.length != 18) return "" // 长度不正确
        return usci.substring(8, 16) + '-' + usci.substring(16, 17);
    }

    /**
     * 时间格式化
     * @param date 日期
     * @param fmt 格式化方案
     * @returns 
     */
    static timeFormat(date: Date, fmt: string = "yyyy-MM-dd hh:mm:ss"): string {
        let o: any = {
            "M+": date.getMonth() + 1,                   //月份
            "d+": date.getDate(),                        //日
            "h+": date.getHours(),                       //小时
            "m+": date.getMinutes(),                     //分
            "s+": date.getSeconds(),                     //秒
            "q+": Math.floor((date.getMonth() + 3) / 3), //季度
            "S": date.getMilliseconds()                  //毫秒 
        };
        let r = /(y+)/.exec(fmt);
        if (r) fmt = fmt.replace(r[0], (date.getFullYear() + "").substring(4 - r[0].length));
        for (let k in o) {
            r = new RegExp("(" + k + ")").exec(fmt)
            if (r) fmt = fmt.replace(r[0], (r[0].length == 1) ? (o[k]) : (("00" + o[k]).substring(("" + o[k]).length)));
        }
        return fmt;
    }
    /**
     * 千分位处理
     * @param num 数值
     * @returns
     */
    static thousands(num: number | string): string {
        let str = num + '';
        // 分割小数
        let spa = str.split('.')
        // 整数部分结果
        let res = spa.shift()?.replace(/\d{1,3}(?=(\d{3})+$)/g, (s) => s + ',')
        // 补上小数
        if (spa.length) res += '.' + spa.shift()
        return res ?? '';
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
        // 16进制代码
        let hexCode = "0123456789ABCDEF";
        if (/^#[0-9a-fA-F]{6}$/.test(hexColor)) {
            let tmpHex = hexColor.substring(1).toUpperCase();
            let r = hexCode.indexOf(tmpHex[0]) * 16 + hexCode.indexOf(tmpHex[1])
            let g = hexCode.indexOf(tmpHex[2]) * 16 + hexCode.indexOf(tmpHex[3])
            let b = hexCode.indexOf(tmpHex[4]) * 16 + hexCode.indexOf(tmpHex[5])
            return `rgb(${r},${g},${b})`
        }
        else if (/^#[0-9a-fA-F]{3}$/.test(hexColor)) {
            let tmpHex = hexColor.substring(1).toUpperCase();
            let r = hexCode.indexOf(tmpHex[0]) * 16 + hexCode.indexOf(tmpHex[0])
            let g = hexCode.indexOf(tmpHex[1]) * 16 + hexCode.indexOf(tmpHex[1])
            let b = hexCode.indexOf(tmpHex[2]) * 16 + hexCode.indexOf(tmpHex[2])
            return `rgb(${r},${g},${b})`
        }
        else if (/^[0-9a-fA-F]{6}$/.test(hexColor)) {
            let tmpHex = hexColor.substring(0).toUpperCase();
            let r = hexCode.indexOf(tmpHex[0]) * 16 + hexCode.indexOf(tmpHex[1])
            let g = hexCode.indexOf(tmpHex[2]) * 16 + hexCode.indexOf(tmpHex[3])
            let b = hexCode.indexOf(tmpHex[4]) * 16 + hexCode.indexOf(tmpHex[5])
            return `rgb(${r},${g},${b})`
        }
        else if (/^[0-9a-fA-F]{3}$/.test(hexColor)) {
            let tmpHex = hexColor.substring(0).toUpperCase();
            let r = hexCode.indexOf(tmpHex[0]) * 16 + hexCode.indexOf(tmpHex[0])
            let g = hexCode.indexOf(tmpHex[1]) * 16 + hexCode.indexOf(tmpHex[1])
            let b = hexCode.indexOf(tmpHex[2]) * 16 + hexCode.indexOf(tmpHex[2])
            return `rgb(${r},${g},${b})`
        }
        else throw new TypeError("input data type error.")
    }


    /**
     * 颜色转换
     * rgb(255,255,255) => #ffffff
     * @param rgbColor rgb颜色 
     * @returns 16进制颜色
     */
    static rgbToHex(rgbColor: string): string {
        let reg = /rgb\((\d{0,2}|1\d{0,2}|2[0-5]{2}),(\d{0,2}|1\d{0,2}|2[0-5]{2}),(\d{0,2}|1\d{0,2}|2[0-5]{2})\)/
        // 剔除空格
        rgbColor = rgbColor.replace(/ /g, '');
        // 测试是否符合规范
        if (reg.test(rgbColor)) {
            let [, r, g, b] = rgbColor.match(reg) as Array<string>;
            let rgb = [+r, +g, +b]
            let hex = rgb.map(a => a.toString(16)).map(a => a[1] ? a : `0${a}`)
            return `#${hex.join('')}`
        }
        else throw new TypeError("input data type error.")
    }

}   
