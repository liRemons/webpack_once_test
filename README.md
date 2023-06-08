# webpack_once_test
一次性需求：webpack


### 文件目录

##### 脚本
- scripts/dev.js 开发环境
- scripts/build.js 生产环境

##### loader
config/rules.js


##### 自定义 laoder
scripts/loader

##### webpack 配置
webpack.config.js

### 项目运行

#### 安装依赖
```bash
# yarn
yarn
# or
# npm
npm install
```
#### 打包
```bash
npm run build
```
#### 运行

```bash
npm run dev
```

- 编译结束后会打开浏览器，端口为 8081
- `localhost:8081/xxxx.html`


### 基本配置
#### 安装所需依赖

##### loader 的执行顺序为从左至右，从下至上
```bash
# 处理 css
# 所需依赖

# 抹平浏览器差异，加入浏览器标识等
postcss-loader
# 编译 css
css-loader
# 将 css 提取单独的文件
style-loader

# 如果支持 less，需
less-loader

# 对于生产环境，还需要进行压缩
MiniCssExtractPlugin.loader

# 将css提取到单独的文件中，为每个包含css的js文件创建一个css文件
mini-css-extract-plugin
# 优化和压缩 CSS
css-minimizer-webpack-plugin

```

```bash
# 处理 js
# 所需依赖
babel-loader
@babel/preset-env
@babel/core

# .babelrc
@babel/plugin-transform-runtime
@babel/plugin-proposal-decorators

# react 支持
@babel/preset-react

# 开启多线程
thread-loader

# plugins

# react 热更新
@pmmmwh/react-refresh-webpack-plugin
# 抽离并压缩 js
terser-webpack-plugin
```

```bash
# 处理其他文件
url-loader
file-loader
...
```

##### 自定义 loader
```bash
# 需 webpack 引入，参见 webpack.config.js resolveLoader
resolveLoader
```

##### 配置出口文件
```bash
# output

# 文件名可通过变量动态自动生成
# [name][contenthash:10].js
filename

# 设置出口 chunk name,主要用于异步加载，即不包含在入口文件内的
chunkFilename
```

##### 配置入口文件
```bash
entry: string
```

##### code splitting
```bash
# 默认情况下，webpack 5.x 已经做了一部分的 tree shaking

# 也可通过下列配置进行公共代码的抽离
optimization.splitChunks 

```

##### 模板文件
```bash
html-webpack-plugin
```

```js
const HtmlWebpackPlugin = require('html-webpack-plugin');

new HtmlWebpackPlugin({
    template: path.resolve(__dirname, 'src/index.html'),
    filename: 'xxxx.html', // 设置模板名称
}),
```

##### 环境区分

`mode` 设置

##### devServer
- `host`: 设置为本地 `localhost`
- `port`: 设置端口
- `hot`: HMR( react 搭配 loader 和 plugin)
- `open`: 自动打开浏览器

