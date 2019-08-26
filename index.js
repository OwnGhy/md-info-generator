const path = require('path');
const script = process.argv.find(i => i.startsWith('--'));

const configPath = 'gen.config.js';

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
            case '--new':
                let filename = process.argv.slice(-1)[0].startsWith('--') ? undefined : process.argv.slice(-1)[0];
                require('./lib/new')(config, filename);
                break;
            default:
                console.log(`未找到${script}相关命令`)
                break;
        }
    }catch(e){
        console.log(e)
    }
}catch (e) {
    console.log(`请提供配置文件'${configPath}'`);
}