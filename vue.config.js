module.exports = {
    devServer: {
        // open: false,
        // 设置主机地址
        // host: 'localhost',
        // 设置默认端口
        // publicPath: './',
        // port: ,
        https: false,
        hotOnly: false,
        proxy: {
            '/test': {
                target: 'http://localhost:9090/', // 你要请求的后端接口ip+port
                // target: 'http://60.205.248.213:5000',
                changeOrigin: true, // 允许跨域，在本地会创建一个虚拟服务端，然后发送请求的数据，并同时接收请求的数据，这样服务端和服务端进行数据的交互就不会有跨域问题
                ws: true, // 开启webSocket
                pathRewrite: {
                    '^/test': '', // 替换成target中的地址
                }
            }
        }
    }
}