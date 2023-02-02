import { Convertor } from "../index.js";

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
    // 总金额 102030.00
    console.log('数字转大写人民币', Convertor.numToAmountInWords(102030.00));
    // 数字 102030.00
    console.log('数字转中文', Convertor.numToChinese(102030));
    // url query 转对象
    console.log('url query 转对象', Convertor.urlQueryToObject('http://example.com/user?id=1&age=2'));
    // url object 转 query 对象
    console.log('url object 转 query', Convertor.urlObjectToQuery({ id: 1, age: 3 }));

}



export {
    run,
    description
}