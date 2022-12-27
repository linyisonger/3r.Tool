import { PasswordRuleEnum, Verify } from "../index.js";

let description = function () {
    return ['#### Verify 验证模块', '包含一些验证的方法.', '', '以下是相关示例:']
}

let run = function () {
    // 像是 
    // 就是还有可能不是  
    // 效率
    // 没有太多的逻辑判断
    console.log('像是社会统一信用代码', Verify.likeUsci('92230900EUFUTJY536'));
    console.log('是否是null或者""', Verify.isNullOrEmpty(''));
    console.log('校验是否是11位手机号码', Verify.isPhoneNumber('13062627854'));
    console.log('校验是否是固定电话', Verify.isTellPhoneNumber('0371-99882211'))
    console.log('是否是邮箱', Verify.isEmail('linyisonger@qq.com'))
    // 这个验证校验码是否正确
    console.log('是否是统一社会信用代码', Verify.isUnifiedSocialCreditIdentifier('92230900EUFUTJY536'))
    console.log('是否是车牌号', Verify.isVehicleNumber('青G04444'))
    console.log('像身份证号', Verify.likeIDCardNumber('622924198810193427'));
    console.log('是否是身份证号码', Verify.isCitizenIdentificationNumber('622924198810193427'));
    console.log('密码规则校验', Verify.passwordRules('abc123', PasswordRuleEnum.SmallNumber, 6, 20));
}



export {
    run,
    description
}