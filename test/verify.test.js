import { PasswordRuleEnum, Verify } from "../index.js";

let description = function () {
  return ["#### Verify 验证模块", "包含一些验证的方法.", "", "以下是相关示例:"];
};

let run = function () {
  // 像是
  // 就是还有可能不是
  // 效率
  // 没有太多的逻辑判断
  console.log("像是社会统一信用代码", Verify.likeUsci("92230900EUFUTJY536"));
  console.log('是否是null或者""', Verify.isNullOrEmpty(""));
  console.log("校验是否是11位手机号码", Verify.isPhoneNumber("13062627854"));
  console.log("校验是否是固定电话", Verify.isTellPhoneNumber("0371-99882211"));
  console.log("是否是邮箱", Verify.isEmail("linyisonger@qq.com"));
  // 这个验证校验码是否正确
  console.log("是否是统一社会信用代码", Verify.isUnifiedSocialCreditIdentifier("92230900EUFUTJY536"));
  console.log("是否是车牌号", Verify.isVehicleNumber("青G04444"));
  console.log("像身份证号", Verify.likeIDCardNumber("37062219890704584X"));
  console.log("是否是身份证号码", Verify.isCitizenIdentificationNumber("37062219890704584X"));
  console.log("密码规则校验", Verify.passwordRules("abc123", PasswordRuleEnum.SmallNumber, 6, 20));
  // 字符串拓展使用
  console.log('是否是null或者""', "".isNullOrEmpty);
  console.log("是否是{}", {}.isNullOrEmpty); // 无提示
  console.log("像是社会统一信用代码", "92230900EUFUTJY536".likeUsci);
  console.log("校验是否是11位手机号码", "13062627854".isPhoneNumber);
  console.log("校验是否是固定电话", "0371-99882211".isTellPhoneNumber);
  console.log("是否是邮箱", "linyisonger@qq.com".isEmail);
  // 这个验证校验码是否正确
  console.log("是否是统一社会信用代码", "55420502676482337D".isUnifiedSocialCreditIdentifier);
  console.log("是否是车牌号", "青G04444".isVehicleNumber);
  console.log("像身份证号", "622924198810193427".likeIDCardNumber);
  console.log("是否是身份证号码", "622924198810193427".isCitizenIdentificationNumber);
  console.log("密码规则校验", "abc123".passwordRules(PasswordRuleEnum.SmallNumber, 6, 20));
  console.log("判断版本是否相等", "1.0.0".versionComparison("1.0.0"));
  console.log("是否是IP地址", Verify.isIPAddress("244.255.123.1"));
  console.log("获取密码难度等级", Verify.passwordDifficulty("abc123.."));
};

try {
  describe("验证模块", function () {
    it("像是社会统一信用代码", function () {
      expect(Verify.likeUsci("55420502676482337D")).toEqual(true);
      expect(Verify.likeUsci("92230900EUFUTJY536")).toEqual(true);
      expect("92230900EUFUTJY536".likeUsci).toEqual(true);
    });
    it('是否是null或者""', function () {
      expect(Verify.isNullOrEmpty("")).toEqual(true);
      expect(Verify.isNullOrEmpty(null)).toEqual(true);
      expect(Verify.isNullOrEmpty(undefined)).toEqual(true);
      expect(Verify.isNullOrEmpty({})).toEqual(true);
      expect({}.isNullOrEmpty).toEqual(true);
    });
    it("校验是否是11位手机号码", function () {
      expect(Verify.isPhoneNumber("13062627854")).toEqual(true);
      expect("13062627854".isPhoneNumber).toEqual(true);
    });
    it("校验是否是固定电话", function () {
      expect(Verify.isTellPhoneNumber("0371-99882211")).toEqual(true);
      expect("0371-99882211".isTellPhoneNumber).toEqual(true);
    });
    it("是否是邮箱", function () {
      expect(Verify.isEmail("linyisonger@qq.com")).toEqual(true);
      expect("linyisonger@qq.com".isEmail).toEqual(true);
    });
    it("是否是统一社会信用代码", function () {
      expect(Verify.isUnifiedSocialCreditIdentifier("55420502676482337D")).toEqual(true);
      expect(Verify.isUnifiedSocialCreditIdentifier("92230900EUFUTJY536")).toEqual(true);
      expect(Verify.isUnifiedSocialCreditIdentifier("92230900EUFUTJY36")).toEqual(false);
      expect(Verify.isUnifiedSocialCreditIdentifier("9X30900EUFUTJY36")).toEqual(false);
      expect(Verify.isUnifiedSocialCreditIdentifier("92230900EUFUTJY531")).toEqual(false);
      expect(Verify.isUnifiedSocialCreditIdentifier("929230900EUFUTJY53")).toEqual(false);
      expect(Verify.isUnifiedSocialCreditIdentifier("159230900EUFUTJY53")).toEqual(false);
      expect(Verify.isUnifiedSocialCreditIdentifier("92230X00EUFUTJY536")).toEqual(false);
      expect(Verify.isUnifiedSocialCreditIdentifier("92230900EUFUTJY5Q6")).toEqual(false);
      expect(Verify.isUnifiedSocialCreditIdentifier("92230900EUFUTJY5X6")).toEqual(false);
      expect(Verify.isUnifiedSocialCreditIdentifier("92230900EUFUTOY536")).toEqual(false);

      expect(Verify.isUnifiedSocialCreditIdentifier("915421000FJ6N75NXB")).toEqual(true);
      expect(Verify.isUnifiedSocialCreditIdentifier("92431000RP2YF63L1H")).toEqual(true);
      expect(Verify.isUnifiedSocialCreditIdentifier("92140300D4A0HN5F88")).toEqual(true);
      expect(Verify.isUnifiedSocialCreditIdentifier("91422600G3KHQ5W09L")).toEqual(true);
      expect(Verify.isUnifiedSocialCreditIdentifier("916501009894LY0F51")).toEqual(true);
      expect(Verify.isUnifiedSocialCreditIdentifier("92412100WWUCGLLT04")).toEqual(true);
      expect(Verify.isUnifiedSocialCreditIdentifier("91211200KL0LRM9N40")).toEqual(true);
      expect(Verify.isUnifiedSocialCreditIdentifier("91330600TC9XYWDY5G")).toEqual(true);
      expect(Verify.isUnifiedSocialCreditIdentifier("12100000764116134Y")).toEqual(true);
      expect("91330600TC9XYWDY5G".isUnifiedSocialCreditIdentifier).toEqual(true);
    });
    it("是否是车牌号", function () {
      expect(Verify.isVehicleNumber("青G04444")).toEqual(true);
      expect(Verify.isVehicleNumber("青AG04444")).toEqual(true);
      expect(Verify.isVehicleNumber("青AG04444X")).toEqual(false);
      expect("青AG04444X".isVehicleNumber).toEqual(false);
    });
    it("像身份证号", function () {
      expect(Verify.likeIDCardNumber("622924198810193427")).toEqual(true);
      expect("622924198810193427".likeIDCardNumber).toEqual(true);
    });
    it("是否是身份证号码", function () {
      expect(Verify.isCitizenIdentificationNumber("622924198810193427")).toEqual(true);
      expect(Verify.isCitizenIdentificationNumber("62292419881019342X")).toEqual(false);
      expect(Verify.isCitizenIdentificationNumber("62X92419881019342X")).toEqual(false);
      expect(Verify.isCitizenIdentificationNumber("62292430001019342X")).toEqual(false);
      expect(Verify.isCitizenIdentificationNumber("622419881019342X")).toEqual(false);
      expect("622419881019342X".isCitizenIdentificationNumber).toEqual(false);
    });
    it("密码规则校验", function () {
      expect(Verify.passwordRules("abc123", PasswordRuleEnum.SmallNumber, 6, 20)).toEqual(true);
      expect(Verify.passwordRules("abc123", PasswordRuleEnum.Small, 6, 20)).toEqual(true);
      expect(Verify.passwordRules("abc123", PasswordRuleEnum.Number, 6, 20)).toEqual(true);
      expect(Verify.passwordRules("abc23", PasswordRuleEnum.Number, 6, 20)).toEqual(false);
      expect(Verify.passwordRules("abc23aaaaaaaaaaaaaaaaaa", PasswordRuleEnum.Number, 6, 20)).toEqual(false);
      expect(Verify.passwordRules("abc123", PasswordRuleEnum.Large, 6, 20)).toEqual(false);
      expect(Verify.passwordRules("abc123", PasswordRuleEnum.LargeNumber, 6, 20)).toEqual(false);
      expect(Verify.passwordRules("abc123", PasswordRuleEnum.LargeSmallNumber, 6, 20)).toEqual(false);
      expect(Verify.passwordRules("abc123", PasswordRuleEnum.LargeSmall, 6, 20)).toEqual(false);
      expect(Verify.passwordRules("abc123")).toEqual(false);
      expect("abc123".passwordRules(PasswordRuleEnum.SmallNumber, 6, 20)).toEqual(true);
      expect("abc123".passwordRules()).toEqual(false);
    });
    it("版本对比", function () {
      expect("1.1.1".versionComparison("1.1.1")).toEqual(0);
      expect("1.1.1".versionComparison("1.1.2")).toEqual(-1);
      expect("1.2.1".versionComparison("1.1.2")).toEqual(1);
      expect("1.2.1.1".versionComparison("1.1.2.1")).toEqual(1);
    });
    it("是否是IP地址", function () {
      expect("244.255.123.1".isIPAddress).toEqual(true);
      expect("244.256.123.1".isIPAddress).toEqual(false);
    });
    it("获取密码难度等级", function () {
      expect(Verify.passwordDifficulty("abc123..")).toEqual(3);
      expect(Verify.passwordDifficulty("abc123..", 3)).toEqual(true);
      expect(Verify.passwordDifficulty("abc123", 3)).toEqual(false);
      expect(Verify.passwordDifficulty("abcA123..")).toEqual(4);
    });
  });
} catch (error) {
  // describe is not defined 无需理会 调用方式不一致
}

export { run, description };
