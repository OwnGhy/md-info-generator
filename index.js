const path = require('path');
const script = process.argv.slice(-1)[0];

const configPath = 'gen.config.js'

try {
    const config = require(path.resolve(process.cwd(), configPath));

    if (!config.mdPath) {
        console.log('请设置markdown文件路径');
        return;
    }

    try{
        switch (script) {
            case '--gen':
                require('./lib/gen')(config);
                break;
            case '--clean':
                require('./lib/clean')(config);
                break;
            default:
                break;
        }
    }catch(e){
        console.log(e)
    }
}catch (e) {
    console.log(`请提供k配置文件'${configPath}'`);
}