import { Convertor, Fakery, GenderEnum, Verify } from "../index.js";

let description = function () {
  return ["####  Fakery 假数据模块", "包含一些生成数据的方法.", "", "以下是相关示例:"];
};

let run = function () {
  console.log("身份证号码", Fakery.citizenIdentificationNumber());
  console.log("社会统一信用代码", Fakery.usci());
  console.log("手机号码", Fakery.phoneNumber());
  console.log("姓名", Fakery.fullName());
  console.log("银行卡号码 [工商银行卡号]", Fakery.bankCardNumber());
};

try {
  describe("假数据模块", function () {
    it("身份证号码", function () {
      expect(Verify.isCitizenIdentificationNumber(Fakery.citizenIdentificationNumber())).toEqual(true);
      expect(
        Verify.isCitizenIdentificationNumber(
          Fakery.citizenIdentificationNumber({
            regionCodes: ["410728"],
          })
        )
      ).toEqual(true);
      expect(
        Verify.isCitizenIdentificationNumber(
          Fakery.citizenIdentificationNumber({
            regionCodes: ["410728"],
            maxAge: 20,
            minAge: 15,
          })
        )
      ).toEqual(true);
      expect(
        Convertor.citizenIdentificationNumberParse(
          Fakery.citizenIdentificationNumber({
            regionCodes: ["410728"],
            maxAge: 20,
            minAge: 15,
            gender: GenderEnum.Female,
          })
        ).gender
      ).toEqual("女");
      expect(
        Convertor.citizenIdentificationNumberParse(
          Fakery.citizenIdentificationNumber({
            regionCodes: ["410728"],
            maxAge: 20,
            minAge: 15,
            gender: GenderEnum.Male,
          })
        ).gender
      ).toEqual("男");
    });
    it("社会统一信用代码", function () {
      expect(Verify.isUnifiedSocialCreditIdentifier(Fakery.usci())).toEqual(true);
      expect(Verify.isUnifiedSocialCreditIdentifier(Fakery.usci())).toEqual(true);
      expect(Verify.isUnifiedSocialCreditIdentifier(Fakery.usci())).toEqual(true);
      expect(
        Verify.isUnifiedSocialCreditIdentifier(
          Fakery.usci({
            regionCodes: ["410728"],
          })
        )
      ).toEqual(true);
      expect(
        Verify.isUnifiedSocialCreditIdentifier(
          Fakery.usci({
            organizationCodes: ["91"],
          })
        )
      ).toEqual(true);
    });
    it("手机号码", function () {
      expect(Verify.isPhoneNumber(Fakery.phoneNumber())).toEqual(true);
    });
    it("姓名", function () {
      expect(!!Fakery.fullName()).toEqual(true);
      expect(!!Fakery.fullName({ gender: GenderEnum.Female })).toEqual(true);
      expect(!!Fakery.fullName({ gender: GenderEnum.Male })).toEqual(true);
      expect(!!Fakery.fullName()).toEqual(true);
      expect(!!Fakery.fullName()).toEqual(true);
      expect(!!Fakery.fullName()).toEqual(true);
      expect(!!Fakery.fullName()).toEqual(true);
      expect(!!Fakery.fullName()).toEqual(true);
      expect(!!Fakery.fullName()).toEqual(true);
      expect(!!Fakery.fullName()).toEqual(true);
    });
    it("银行卡号码", function () {
      expect(!!Fakery.bankCardNumber()).toEqual(true);
      expect(!!Fakery.bankCardNumber()).toEqual(true);
      expect(!!Fakery.bankCardNumber()).toEqual(true);
      expect(!!Fakery.bankCardNumber()).toEqual(true);
      expect(!!Fakery.bankCardNumber()).toEqual(true);
      expect(!!Fakery.bankCardNumber()).toEqual(true);
      expect(!!Fakery.bankCardNumber()).toEqual(true);
      expect(!!Fakery.bankCardNumber()).toEqual(true);
      expect(!!Fakery.bankCardNumber()).toEqual(true);
      expect(!!Fakery.bankCardNumber()).toEqual(true);
      expect(
        !!Fakery.bankCardNumber({
          bin: "621230",
          length: 15,
        })
      ).toEqual(true);
    });
  });
} catch (error) {
  // describe is not defined 无需理会 调用方式不一致
  // console.log(error);
}

export { run, description };
