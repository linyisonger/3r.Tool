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

try {
    describe('验证模块', function () {
        it('像是社会统一信用代码', function () {
            expect(Verify.likeUsci('92230900EUFUTJY536')).toEqual(true)
        })
        it('是否是null或者""', function () {
            expect(Verify.isNullOrEmpty('')).toEqual(true)
            expect(Verify.isNullOrEmpty(null)).toEqual(true)
            expect(Verify.isNullOrEmpty(undefined)).toEqual(true)
        })
        it('校验是否是11位手机号码', function () {
            expect(Verify.isPhoneNumber('13062627854')).toEqual(true)
        })
        it('校验是否是固定电话', function () {
            expect(Verify.isTellPhoneNumber('0371-99882211')).toEqual(true)
        })
        it('是否是邮箱', function () {
            expect(Verify.isEmail('linyisonger@qq.com')).toEqual(true)
        })
        it('是否是统一社会信用代码', function () {
            expect(Verify.isUnifiedSocialCreditIdentifier('92230900EUFUTJY536')).toEqual(true)
            expect(Verify.isUnifiedSocialCreditIdentifier('92230900EUFUTJY36')).toEqual(false)
            expect(Verify.isUnifiedSocialCreditIdentifier('9X30900EUFUTJY36')).toEqual(false)
            expect(Verify.isUnifiedSocialCreditIdentifier('92230900EUFUTJY531')).toEqual(false)
            expect(Verify.isUnifiedSocialCreditIdentifier('929230900EUFUTJY53')).toEqual(false)
        })
        it('是否是车牌号', function () {
            expect(Verify.isVehicleNumber('青G04444')).toEqual(true)
            expect(Verify.isVehicleNumber('青AG04444')).toEqual(true)
            expect(Verify.isVehicleNumber('青AG04444X')).toEqual(false)
        })
        it('像身份证号', function () {
            expect(Verify.likeIDCardNumber('622924198810193427')).toEqual(true)
        })
        it('是否是身份证号码', function () {
            expect(Verify.isCitizenIdentificationNumber('622924198810193427')).toEqual(true)
            expect(Verify.isCitizenIdentificationNumber('62292419881019342X')).toEqual(false)
            expect(Verify.isCitizenIdentificationNumber('62X92419881019342X')).toEqual(false)
            expect(Verify.isCitizenIdentificationNumber('62292430001019342X')).toEqual(false)
            expect(Verify.isCitizenIdentificationNumber('622419881019342X')).toEqual(false)
        })
        it('密码规则校验', function () {
            expect(Verify.passwordRules('abc123', PasswordRuleEnum.SmallNumber, 6, 20)).toEqual(true)
            expect(Verify.passwordRules('abc123', PasswordRuleEnum.Small, 6, 20)).toEqual(true)
            expect(Verify.passwordRules('abc123', PasswordRuleEnum.Number, 6, 20)).toEqual(true)
            expect(Verify.passwordRules('abc23', PasswordRuleEnum.Number, 6, 20)).toEqual(false)
            expect(Verify.passwordRules('abc23aaaaaaaaaaaaaaaaaa', PasswordRuleEnum.Number, 6, 20)).toEqual(false)
            expect(Verify.passwordRules('abc123', PasswordRuleEnum.Large, 6, 20)).toEqual(false)
            expect(Verify.passwordRules('abc123', PasswordRuleEnum.LargeNumber, 6, 20)).toEqual(false)
            expect(Verify.passwordRules('abc123', PasswordRuleEnum.LargeSmallNumber, 6, 20)).toEqual(false)
            expect(Verify.passwordRules('abc123', PasswordRuleEnum.LargeSmall, 6, 20)).toEqual(false)
        })
    })
} catch (error) {
    // describe is not defined 无需理会 调用方式不一致 
}

export {
    run,
    description
}