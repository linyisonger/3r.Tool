
/**
 * 用于联动各个测试文件使用
 * @Author 林一怂儿
 * @Date 2022/12/15 22:44:33
 */

import { readdirSync } from 'fs';
import path, { dirname } from 'path'
import { fileURLToPath, pathToFileURL } from 'url'

async function test() {
    const __dirname = dirname(fileURLToPath(import.meta.url))
    let currSrc = __dirname
    let currDir = readdirSync(currSrc)

    console.log('TEST START ...');

    for (const file of currDir) {
        // 获取文件名称
        let fileName = pathToFileURL(path.join(currSrc, file), 'file:');
        // 判断文件名称是否是自身 自身跳过
        if (file.endsWith('index.js')) continue;
        // 执行测试文件
        console.log('TEST RUN FileName: ', file);
        // try {
        await (await import(fileName)).run()
        // } catch (error) {
        // console.log('TEST ERROR', error)
        // console.log('TEST FileName: ', file);
        // console.log('TEST Time: ', new Date());
        // }
    }
    console.log('TEST DONE ...');
}

test();