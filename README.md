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


