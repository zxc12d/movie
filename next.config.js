// next.config.js
const withAntdLess = require('next-plugin-antd-less');

module.exports = withAntdLess({
    // optional
    modifyVars: {'@primary-color': '#04f'},
    // optional
    lessVarsFilePath: './src/styles/variables.less',
    // optional
    lessVarsFilePathAppendToEndOfContent: false,
    // optional https://github.com/webpack-contrib/css-loader#object
    cssLoaderOptions: {},

    // Other Config Here...

    webpack(config) {
        return config;
    },

    async rewrites() {
        return [
            {
                source: '/api1/:slug*',
                destination:'https://api.apibdzy.com/api.php/:slug*'
            }
        ]
    },

    images:{
        domains:['img.hjimg.com','img.52swat.cn']
    },
});
