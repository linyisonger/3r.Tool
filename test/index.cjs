let fs = require('fs')
let currSrc = __dirname
let currDir = fs.readdirSync(currSrc)

console.log('TEST START ...');

for (const file of currDir) {
    // 获取文件名称
    let fileName = currSrc + '/' + file;
    // 判断文件名称是否是自身 自身跳过
    if (file.endsWith('index.cjs')) continue;
    console.log('TEST RUN FileName: ', file);
    try {
        console.log(require(fileName).run.toString())
        require(fileName).run()
    } catch (error) {
        console.log('TEST ERROR')
        console.log('TEST FileName: ', file);
        console.log('TEST Time: ', new Date());
    }
}

console.log('TEST DONE ...');