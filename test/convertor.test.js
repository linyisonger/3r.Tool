import { Convertor, executionTime } from "../index.js";

let description = function () {
    return ['#### Convertor 转换模块', '包含一些转换的方法.', '', '以下是相关示例:']
}

let run = function () {
    console.log('社会统一信用代码转换组织机构代码', Convertor.usciToOibc('91411100766237140X'));
    // 76623714-0
    console.log('日期转换', Convertor.timeFormat(new Date(), 'yyyy年MM月dd日 hh:mm:ss'));
    // 例: 2022年12月27日 11:12:35
    console.log('千分位处理', Convertor.thousands(10009992.12));
    // 10,009,992.12
    console.log('文本转base64', Convertor.textToBase64('1234'));
    // MTIzNA==
    console.log('base64转文本', Convertor.base64ToText('MTIzNA=='));
    // 1234
    console.log('json对象转换base64', Convertor.jsonToBase64({ a: 1 }));
    // eyJhIjoxfQ==
    console.log('base64转换json对象', Convertor.base64ToJson('eyJhIjoxfQ=='));
    // { a: 1 }
    console.log('颜色转换', Convertor.hexToRgb('f2a'));
    // rgb(255,34,170)
    console.log('颜色转换', Convertor.rgbToHex('rgb(255,34,170)'));
    // #ff22aa
    console.log('xml输出文本', Convertor.xmlToText('<div>总金额 <span>100,000.00</span></div>'));
    // 总金额 100,000.00
    console.log('数字转大写人民币', Convertor.numToAmountInWords(102030.00));
    // 壹拾万贰仟零叁拾圆整
    console.log('数字转中文', Convertor.numToChinese(102030));
    // 十万二千三十
    console.log('url query 转对象', Convertor.urlQueryToObject('http://example.com/user?id=1&age=2'));
    // { "age": "2", "id": "1" 
    console.log('url object 转 query', Convertor.urlObjectToQuery({ id: 1, age: 3 }));
    // '?id=1&age=3'
    console.log('蛇形命名法 -> 大驼峰命名法', Convertor.snakeCaseToUpperCamelcase('lower_case_with_underscores'));
    // LowerCaseWithUnderscores
    console.log('蛇形命名法 -> 小驼峰命名法', Convertor.snakeCaseToLowerCamelcase('lower_case_with_underscores'));
    // lowerCaseWithUnderscores
    console.log('驼峰命名法 -> 蛇形命名法', Convertor.camelcaseToSnakeCase('LowerCaseWithUnderscores'));
    // lower_case_with_underscores
    console.log('通过日期获取星座', Convertor.getConstellationByDate('09/14'));
    console.log('通过日期获取星座', Convertor.getConstellationByDate(new Date(1997, 2, 14)));

    console.log('通过日期获取星座', Convertor.getConstellationByDate(new Date(1997, 2, 14)));

    console.log('身份证号解析', '230504199607116664'.citizenIdentificationNumberParse);

    console.log('字节转换',Convertor.byteFormat(1099511627776,2));

}
try {
    describe('转换模块', function () {
        it('社会统一信用代码转换组织机构代码', function () {
            expect(Convertor.usciToOibc('91411100766237140X')).toEqual('76623714-0')
            expect('91411100766237140X'.usciToOibc).toEqual('76623714-0')
            expect(Convertor.usciToOibc('91411100766237140')).toEqual('')
        })
        it('日期转换', function () {
            expect(Convertor.timeFormat(new Date(), 'yyyy年MM月dd日 hh:mm:ss').startsWith(new Date().getFullYear().toString())).toEqual(true)
            expect(Convertor.timeFormat(new Date(), 'yy年M月d日 h:m:s') == '').toEqual(false)
            expect(Convertor.timeFormat(new Date(), 'qq S') == '').toEqual(false)
            expect(Convertor.timeFormat(new Date()) == '').toEqual(false)
            expect(new Date().timeFormat() == '').toEqual(false)
            expect(new Date().timeFormat('yy年M月d日 h:m:s') == '').toEqual(false)
        })
        it('千分位处理', function () {
            let num = 10009992.12
            expect(Convertor.thousands(10009992.12)).toEqual('10,009,992.12')
            expect(Convertor.thousands(1)).toEqual('1')
            expect('10009992.12'.thousands).toEqual('10,009,992.12')
            expect(num.thousands).toEqual('10,009,992.12')
        })
        it('文本转base64', function () {
            expect(Convertor.textToBase64('1234')).toEqual('MTIzNA==')
            expect(Convertor.textToBase64('À')).toEqual('w4A=')
            expect(Convertor.textToBase64('ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890你好呀+-*/&@!$#')).toEqual('QUJDREVGR0hJSktMTU5PUFFSU1RVVldYWVphYmNkZWZnaGlqa2xtbm9wcXJzdHV2d3h5ejEyMzQ1Njc4OTDkvaDlpb3lkYArLSovJkAhJCM=')
            expect(Convertor.textToBase64('︻︼︽︾〒↑↓☉⊙●〇◎¤★☆■▓「」『』◆◇▲△▼▽◣◥◢◣◤ ◥№↑↓→←↘↙Ψ※㊣∑⌒∩【】〖〗＠ξζω□∮〓※》∏卐√ ╳々♀♂∞①ㄨ≡╬╭╮╰╯╱╲ ▂ ▂ ▃ ▄ ▅ ▆ ▇ █ ▂▃▅▆█')).toEqual('77i777i877i977i+44CS4oaR4oaT4piJ4oqZ4peP44CH4peOwqTimIXimIbilqDilpPjgIzjgI3jgI7jgI/il4bil4filrLilrPilrzilr3il6Pil6Xil6Lil6Pil6Qg4pel4oSW4oaR4oaT4oaS4oaQ4oaY4oaZzqjigLvjiqPiiJHijJLiiKnjgJDjgJHjgJbjgJfvvKDOvs62z4nilqHiiK7jgJPigLvjgIviiI/ljZDiiJog4pWz44CF4pmA4pmC4oie4pGg44So4omh4pWs4pWt4pWu4pWw4pWv4pWx4pWyIOKWgiDiloIg4paDIOKWhCDiloUg4paGIOKWhyDilogg4paC4paD4paF4paG4paI')
        })
        it('base64转文本', function () {
            expect(Convertor.base64ToText('MTIzNA==')).toEqual('1234')
            expect(Convertor.base64ToText('w4A=')).toEqual('À')

            expect(Convertor.base64ToText('QUJDREVGR0hJSktMTU5PUFFSU1RVVldYWVphYmNkZWZnaGlqa2xtbm9wcXJzdHV2d3h5ejEyMzQ1Njc4OTDkvaDlpb3lkYArLSovJkAhJCM=')).toEqual('ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890你好呀+-*/&@!$#')
        })
        it('json对象转换base64', function () {
            expect(Convertor.jsonToBase64({ a: 1 })).toEqual('eyJhIjoxfQ==')
        })
        it('base64转换json对象', function () {
            expect(Convertor.base64ToJson('eyJhIjoxfQ==').a == 1).toEqual(true)
        })
        it('颜色转换', function () {
            expect(Convertor.hexToRgb('f2a')).toEqual('rgb(255,34,170)')
            expect(Convertor.hexToRgb('#f2a')).toEqual('rgb(255,34,170)')
            expect(Convertor.hexToRgb('#ff22aa')).toEqual('rgb(255,34,170)')
            expect(Convertor.hexToRgb('ff22aa')).toEqual('rgb(255,34,170)')
            expect('ff22aa'.hexToRgb).toEqual('rgb(255,34,170)')
            expect(() => Convertor.hexToRgb('')).toThrow();
        })
        it('颜色转换', function () {
            expect(Convertor.rgbToHex('rgb(255,34,170)')).toEqual('#ff22aa')
            expect(Convertor.rgbToHex('rgb(1,34,170)')).toEqual('#0122aa')
            expect('rgb(255,34,170)'.rgbToHex).toEqual('#ff22aa')
            expect(() => Convertor.rgbToHex('')).toThrow();
        })
        it('xml输出文本', function () {
            expect(Convertor.xmlToText('<div>总金额 <span>100,000.00</span></div>')).toEqual('总金额 100,000.00')
            expect('<div>总金额 <span>100,000.00</span></div>'.xmlToText).toEqual('总金额 100,000.00')
        })
        it('数字转大写人民币', function () {
            expect(Convertor.numToAmountInWords(102030.00)).toEqual('壹拾万贰仟零叁拾圆整')
            expect('102030'.numToAmountInWords).toEqual('壹拾万贰仟零叁拾圆整')
            expect(Convertor.numToAmountInWords(-102030.00)).toEqual('欠壹拾万贰仟零叁拾圆整')
            expect(Convertor.numToAmountInWords(undefined)).toEqual('')
        })
        it('数字转中文', function () {
            expect(Convertor.numToChinese(102030)).toEqual('十万二千三十')
            expect('102030'.numToChinese).toEqual('十万二千三十')
            expect(Convertor.numToChinese(undefined)).toEqual('')
        })
        it('url query 转对象', function () {
            expect(Convertor.urlQueryToObject('http://example.com/user?id=1&age=2')).toEqual({ "age": "2", "id": "1" })
            expect('http://example.com/user?id=1&age=2'.urlQueryToObject).toEqual({ "age": "2", "id": "1" })
            expect(Convertor.urlQueryToObject('')).toEqual({})
        })
        it('url object 转 query', function () {
            expect(Convertor.urlObjectToQuery({ id: 1, age: 3 })).toEqual('?id=1&age=3')
        })
        it('蛇形命名法 -> 大驼峰命名法', function () {
            expect(Convertor.snakeCaseToUpperCamelcase('lower_case_with_underscores')).toEqual('LowerCaseWithUnderscores')
            expect('lower_case_with_underscores'.snakeCaseToUpperCamelcase).toEqual('LowerCaseWithUnderscores')
        })
        it('蛇形命名法 -> 小驼峰命名法', function () {
            expect(Convertor.snakeCaseToLowerCamelcase('lower_case_with_underscores')).toEqual('lowerCaseWithUnderscores')
            expect('lower_case_with_underscores'.snakeCaseToLowerCamelcase).toEqual('lowerCaseWithUnderscores')
        })
        it('驼峰命名法 -> 蛇形命名法', function () {
            expect(Convertor.camelcaseToSnakeCase('LowerCaseWithUnderscores')).toEqual('lower_case_with_underscores')
            expect('LowerCaseWithUnderscores'.camelcaseToSnakeCase).toEqual('lower_case_with_underscores')
        })
        it('通过日期获取星座', function () {
            expect(Convertor.getConstellationByDate('01/01')).toEqual('摩羯座')
            expect(Convertor.getConstellationByDate('02/02')).toEqual('水瓶座')
            expect(Convertor.getConstellationByDate('03/01')).toEqual('双鱼座')
            expect(Convertor.getConstellationByDate('04/01')).toEqual('白羊座')
            expect(Convertor.getConstellationByDate('05/01')).toEqual('金牛座')
            expect(Convertor.getConstellationByDate('06/01')).toEqual('双子座')
            expect(Convertor.getConstellationByDate('07/01')).toEqual('巨蟹座')
            expect(Convertor.getConstellationByDate('08/01')).toEqual('狮子座')
            expect(Convertor.getConstellationByDate('09/01')).toEqual('处女座')
            expect(Convertor.getConstellationByDate('10/01')).toEqual('天秤座')
            expect(Convertor.getConstellationByDate('11/01')).toEqual('天蝎座')
            expect(Convertor.getConstellationByDate('12/01')).toEqual('射手座')
            expect(Convertor.getConstellationByDate('12/24')).toEqual('摩羯座')
            expect('12/24'.getConstellationByDate).toEqual('摩羯座')
            expect(Convertor.getConstellationByDate(new Date(2000, 11, 24))).toEqual('摩羯座')
            expect(new Date(2000, 11, 24).getConstellationByDate).toEqual('摩羯座')
            expect(Convertor.getConstellationByDate(1224)).toEqual('摩羯座')
        })
        it('身份证号解析', function () {
            expect(Convertor.citizenIdentificationNumberParse('230504199607116664')).toEqual({
                reginCode: '230504',
                birthday: '1996/07/11',
                gender: '女',
                constellation: '巨蟹座',
                age: 27
            })
            expect('230504199607116664'.citizenIdentificationNumberParse).toEqual({
                reginCode: '230504',
                birthday: '1996/07/11',
                gender: '女',
                constellation: '巨蟹座',
                age: 27
            })
            expect('420503198804097532'.citizenIdentificationNumberParse).toEqual({
                "age": 35,
                "birthday": "1988/04/09",
                "constellation": "白羊座",
                "gender": "男",
                "reginCode": "420503",
            })
        })
        it('字节转换', function () {
            let byte = 12345
            expect(Convertor.byteFormat(830, 2)).toEqual('830B')
            expect(Convertor.byteFormat(1024, 2)).toEqual('1.00KB')
            expect(Convertor.byteFormat(1024)).toEqual('1.00KB')
            expect(Convertor.byteFormat(1048576, 2)).toEqual('1.00MB')
            expect(Convertor.byteFormat(1073741824, 2)).toEqual('1.00GB')
            expect(Convertor.byteFormat(1099511627776, 2)).toEqual('1.00TB')
            expect(Convertor.byteFormat(1125899906842624, 2)).toEqual('1.00PB')
            expect(byte.byteFormat(2)).toEqual('12.06KB')
            expect(Convertor.byteFormat('1024', 2)).toEqual('1.00KB')
        })

    })
} catch (error) {
    // describe is not defined 无需理会 调用方式不一致 
}

export {
    run,
    description
}