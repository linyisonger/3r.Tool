/**
 * 用于构建README.md文档的js定制化文件
 * 从而减少二次复制
 * @Author 林一怂儿
 * @Date 2022/12/15 09:06:52
 */
let fs = require('fs')


let template =
    `### 🛠
🎨内置了一些常用的前端方法.


`

let currSrc = __dirname.replace('build', 'test')
let currDir = fs.readdirSync(currSrc)

for (const file of currDir) {
    // 获取文件名称
    let fileName = currSrc + '/' + file;
    // 判断文件名称是否是自身 自身跳过
    if (file.endsWith('index.cjs')) continue;
    // 测试脚本
    let script = require(fileName)
    // 脚本行
    let scriptLines = script.run.toString().split('\n')
    // 添加描述
    script.description?.()?.forEach((line) => {
        template += `${line}\n`
    })

    template += '```js'
    template += '\n'
    scriptLines.slice(1, scriptLines.length - 1).forEach((line) => {
        template += `${line.substring(4)}`
    })
    template += '\n'
    template += '```'
    template += '\n'
    template += '\n'
}





fs.writeFileSync('README.md', template)


