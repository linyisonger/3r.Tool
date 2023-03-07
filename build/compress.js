/**
* 压缩modules模块中的代码
* @Author 林一怂儿
* @Date 2023/02/17 18:41:30
*/
import path, { dirname } from 'path'
import { readdirSync, writeFileSync, readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { minify } from 'uglify-js'

/**
* 写入文件异步
*/
async function compress() {
    // 获取改文件所在文件夹
    const __dirname = dirname(fileURLToPath(import.meta.url))

    let currSrc = __dirname.replace('build', 'lib')
    let currDir = readdirSync(currSrc)

    for (const file of currDir) {
        // 如果不是js文件的话跳过压缩
        if (!file.endsWith('.js')) continue;
        let _path = path.join(currSrc, file)
        let _mini = minify(readFileSync(path.join(currSrc, file), 'utf-8'), { compress: true, module: true })
        writeFileSync(_path, _mini.code)
    }
}

compress()