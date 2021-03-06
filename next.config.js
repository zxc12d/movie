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
                destination:'https://m3u8.apibdzy.com/api.php/:slug*'
            },
            {
                source: '/api2/:slug*',
                destination:'http://localhost:8000/:slug*'
            }
        ]
    },
    async redirects() {
        return [
            {
                source: '/api1/:slug*',
                destination:'https://m3u8.apibdzy.com/api.php/:slug*',
                permanent: true,
            },
            {
                source: '/api2/:slug*',
                destination:'http://localhost:8000/:slug*',
                permanent: true,
            }
        ]
    },
    poweredByHeader: false,
    serverRuntimeConfig: {
        // Will only be available on the server side
       baseUrl:'https://api.apibdzy.com/api.php/'
    },
    // publicRuntimeConfig: {
    //     // Will be available on both server and client
    // },

    images:{
        domains:['img.hjimg.com','img.52swat.cn']
    },
});
