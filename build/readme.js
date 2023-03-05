/**
 * 用于构建README.md文档的js定制化文件
 * 从而减少二次复制
 * @Author 林一怂儿
 * @Date 2022/12/15 09:06:52
 */
import path, { dirname } from 'path'
import { readdirSync, writeFileSync, readFileSync } from 'fs';
import { fileURLToPath, pathToFileURL } from 'url';

/**
 * 写入文件异步
*/
async function write() {
    // 包记录
    const packageJson = JSON.parse(readFileSync('package.json', 'utf-8'))
    // 获取改文件所在文件夹
    const __dirname = dirname(fileURLToPath(import.meta.url))
    // 书写模板
    let template = readFileSync(path.join(__dirname, 'template.md'), 'utf-8')
    let help = readFileSync(path.join(__dirname, 'help.md'), 'utf-8')
    let currSrc = __dirname.replace('build', 'test')
    let currDir = readdirSync(currSrc)

    template = packageJson.description + "\n" + template
    for (const file of currDir) {
        // 获取文件名称
        let fileName = pathToFileURL(path.join(currSrc, file), 'file:')
        // 判断文件名称是否是自身 自身跳过
        if (file.endsWith('index.js')) continue;
        // 测试脚本 
        let script = (await import(fileName))
        // 脚本行
        let scriptLines = script.run.toString().split('\n')
        // 添加描述
        script.description?.()?.forEach((line) => {
            template += `${line}\n`
        })
        // 添加脚本
        template += ['```js', '\n'].join('')
        scriptLines.slice(1, scriptLines.length - 1).forEach((line) => {
            template += `${line.substring(4)}\n`
        })
        template += ['\n', '```', '\n', '\n'].join('')
    }

    template += help
    writeFileSync('README.md', template)
}

write();






