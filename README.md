## 说明

在很多静态网站场景，使用markdown去写博客，并使用markdown注释记录博客的相关信息，本工具的目的在于提取出markdown注释中记录的信息，供给系统使用。

生成的文件示例（json文件）：
```json
{
    "blog": [{
        "tags": "React",
        "title": "React父子组件渲染关系整理",
        "date": "2018-10-09",
        "id": "1519f1aeb313281f9a3da44c3166028a" // 这里是使用md5生成的唯一id
    }]
}
```

## 安装

执行npm安装
```
$ npm i md-info-generator --save-dev
```
[![NPM version](https://img.shields.io/npm/v/md-info-generator.svg?style=flat)](https://www.npmjs.com/package/md-info-generator)

## 配置
项目目录下添加`gen.config.js`配置文件：
- `mdPath | string`: 必填，markdown文件的路径
- `filename | string`: 选填，最后生成的json文件名， 默认为blog.json

配置文件示例：
```javascript
// gen.config.js
module.exports = {
    mdPath: '/static/blogs',
    filename: 'blog.json'
};
```

## 使用

生成mock文件
```
$ md-info --gen
```

移除mock文件
```
$ md-info --clean
```

可结合`npm start`，配置需要项目启动时就生成相关信息：

```javascript
//package.json，xxx是其他命令
"scripts": {
    "start": "md-info --gen && xxx",
}
```
