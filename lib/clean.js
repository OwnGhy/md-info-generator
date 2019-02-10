// 删除生成json文件
const fs = require('fs');
const path = require('path');
const ora = require('ora');

const rootPath = process.cwd();

const clean = ({ filename }) => {
    const spinner = ora('removing').start();
    fs.unlinkSync(path.resolve(rootPath, filename || 'blog.json'));
    spinner.succeed('file removed.');
};

module.exports = (config) => {
    try{
        clean(config)
    }catch(e){
        console.log(e)
    }
};
