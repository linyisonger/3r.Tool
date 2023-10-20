// jest.config.js
module.exports = {
    // 收集测试覆盖率
    testEnvironment: 'node',
    collectCoverage: true,
    coverageReporters: ["lcov", "text", "cobertura", "clover"],
    coverageProvider: 'v8',
}