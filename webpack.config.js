const path = require('path')
const UglifyPlugin = require('uglifyjs-webpack-plugin')
//将 HTML 引用路径和我们的构建结果关联起来。为我们创建一个 HTML 文件，其中会引用构建出来的 JS 文件
const HtmlWebpackPlugin = require('html-webpack-plugin')
// 分离出css文件作为单独的文件
const ExtractTextPlugin = require('extract-text-webpack-plugin')

module.exports = {
    entry: {
        index: ['./src/index.js', './src/index-p.js'],
        index2: './src/index2.js'
    },

    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name][hash].js'
    },

    module: {
        rules: [
            {
                test: /\.jsx?/,
                include: [
                    path.resolve(__dirname, 'src') // src 目录下的才需要经过 babel-loader 处理
                ],
                use: 'babel-loader',
            },
            {
                test: /\.css/,
                include: [
                    path.resolve(__dirname, 'src')
                ],
                // css-loader 负责解析 CSS 代码，主要是为了处理 CSS 中的依赖，
                // 例如 @import 和 url() 等引用外部文件的声明。
                // style-loader 会将 css-loader 解析的结果转变成 JS 代码，
                // 运行时动态插入 style 标签来让 CSS 代码生效。
                // use: ['style-loader', 'css-loader']

                // 使用ExtractTextPlugin插件需要干涉模块转换的内容，所以需要使用它对应的 loader
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: ['css-loader'],
                }),
            },
            {
                test: /\.less$/,
                include: [
                    path.resolve(__dirname, 'src')
                ],
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: ['css-loader' , 'less-loader'],  // less-loader , 还需要安装less来读less文件
                }),
            },
            {
                test: /\.(png|jpg|gif)$/,  //图片对应的 jpg/png/gif 等文件格式需要file-loader处理
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name].[ext]', //[path]
                            outputPath: 'img',
                        },
                    },
                ],
            },
        ],
    },

    // 代码模块路径解析的配置
    resolve: {
        //对于直接声明依赖名的模块（如 react ），
        // webpack 会类似 Node.js 一样进行路径搜索，
        // 搜索 node_modules 目录，这个目录就是使用 resolve.modules,
        //默认：resolve: { modules: ['node_modules'],},
        //这样配置在某种程度上可以简化模块的查找，提升构建速度。
        modules: [
            "node_modules",
            path.resolve(__dirname, 'src')
        ],
        alias: {
            // 模糊匹配，意味着只要模块路径中携带了 utils 就可以被替换掉
            utils: path.resolve(__dirname, 'src/utils'), // 这里使用 path.resolve 和 __dirname 来获取绝对路径,
            // 精确匹配
            // utils$: path.resolve(__dirname, 'src/utils') // 只会匹配 import 'utils'
        },
    // 这里的顺序代表匹配后缀的优先级，例如对于 index.js 和 index.jsx，会优先选择 index.js
        extensions: [".wasm", ".mjs", ".js", ".json", ".jsx"],
    },

    plugins: [
        new UglifyPlugin(),
        // 使用 uglifyjs-webpack-plugin 来压缩 JS 代码
        // 如果你留意了我们一开始直接使用 webpack 构建的结果，你会发现默认已经使用了 JS 代码压缩的插件
        // 这其实也是我们命令中的 --mode production 的效果，后续的小节会介绍 webpack 的 mode 参数
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: 'src/index.html'
        }),
        new ExtractTextPlugin('index.css'),
    ],
}