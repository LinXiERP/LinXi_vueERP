const webpack = require("webpack");
module.exports = {
    lintOnSave: false,
    devServer: {
        open: true, //自动打开浏览器
        port: 56569 //配置端口号
    },
    configureWebpack: {
        plugins: [
            new webpack.ProvidePlugin({
                $: "jquery",
                jQuery: "jquery",
                "window.jQuery": "jquery",
                Popper: ["popper.js", "default"]
            })
        ]
    }
};