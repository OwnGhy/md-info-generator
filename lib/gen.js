const { promisify } = require('./../utils/tools');
const fs = require('fs');
const path = require('path');
const md5 = require('blueimp-md5');
const Handlebars = require('handlebars');
const beautify = require('js-beautify').js;

const readDir = promisify(fs.readdir);
const fileStat = promisify(fs.stat);

Handlebars.registerHelper("handleObj" , function(obj){
    return new Handlebars.SafeString(JSON.stringify(obj));
});

const getStatement = function (text, key) {
    let reg = new RegExp('<!--' + key + ': ([^\\n\\r]+)-->');
    return text.match(reg)[1];
};

const getMore = function (text) {
    let reg = /<!--\s*more\s*-->/;

    return text.match(reg) ? text.slice(0, text.match(reg).index) : text;
};

const getAllStatement = function (text) {
    let reg = /<!--([A-Za-z_]+): ([^\n\r]+)-->/g;

    let allStat = {};

    text.replace(reg, ($0, $1, $2) => {
        allStat[$1] = $2;
        return '';
    });
    return allStat;
};

const transferFilesToData = async (dirUrl, tags = [], formatBlogs = [], config) => {
    let files = await readDir(dirUrl);

    for(let file of files) {
        let filePath = path.join(dirUrl,file);

        let stat = await fileStat(filePath);

        if (stat && stat.isDirectory()) {
            await transferFilesToData(filePath, tags.concat(file), formatBlogs, config);
        } else {
            if (filePath.endsWith('.md')) {
                const fileContent = await fs.readFileSync(filePath, {
                    encoding: 'utf-8'
                }, function (err, data) {
                    if (err) {
                        console.error(err);
                        return;
                    }
                    return data;
                });

                formatBlogs.push({
                    tags: tags,
                    id: md5(getStatement(fileContent, 'title')),
                    path: filePath.slice(filePath.indexOf(config.mdPath)),
                    outline: getMore(fileContent).replace(/\n/g,"\\n").replace(/\r/g,"\\r"),
                    ...getAllStatement(fileContent)
                });
            }
        }
    }

    return formatBlogs;
};

const renderFile = (data, filename) => {
    const source = fs.readFileSync(path.resolve(__dirname, './../template/data.hbs'), 'utf-8');

    const template = Handlebars.compile(source);
    fs.writeFileSync(
        path.resolve(process.cwd(), filename),
        beautify(template({data: data}), { indent_size: 4, space_in_empty_paren: true })
    );
};

const gen = async (config) => {
    const res = await transferFilesToData(`${process.cwd()}${config.mdPath}`, [], [], config);

    let filename;

    if (config.filename) {
        filename = config.filename.endsWith('.json') ? config.filename : `${config.filename}.json`
    } else {
        filename = 'blog.json';
    }

    renderFile(res, filename)
};

module.exports = async (config) => {
    try{
        await gen(config)
    }catch(e){
        console.log(e);
    }
};