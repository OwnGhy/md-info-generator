const fs = require('fs');
const { getDate } = require('./../utils/tools');

const genContent = (filename) =>
`[TOC]
<!--title: ${filename}-->
<!--date: ${getDate()}-->
<!--cate: 1-->`;

const genDefault = (config, filename = 'default.md') => {
    let content = genContent(filename.split('.md')[0]);

    fs.writeFile(`${process.cwd()}${config.newPath || config.mdPath || '.'}/${filename.endsWith('.md') ? filename : `${filename}.md`}`, content, function (err) {
        if (err) {
            console.log(err);
            return false;
        }

        console.log('markdown 文件创建成功');
    });
};

module.exports = async (config, filename) => {
    try {
        await genDefault(config, filename);
    } catch (e) {
        console.log(e);
    }
};