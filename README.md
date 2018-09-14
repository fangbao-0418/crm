# 简介
平台项目脚手架，主要由react+redux+stylus+webpack+typescript构成

# 环境
```
推荐node8.10.0
```

# 安装
```
npm config set registry https://registry.npm.taobao.org (必须)
yarn install
```

# 启动
```
yarn dev
```

# 测试
```
yarn test:watch(监测模式)
yarn test
```

# 打包
yarn build

# 参考文档
* react 官方文档 [https://reactjs.org/](https://reactjs.org/)
* 使用antd为了减少项目大小，使用 babel-plugin-import [babel-plugin-import](https://www.npmjs.com/package/babel-plugin-import)
* stylus参考网址 [http://stylus-lang.com/](http://stylus-lang.com/)
* antdesign参考网址 [https://ant.design/index-cn](https://ant.design/index-cn)
* redux中文文档 [http://www.redux.org.cn/](http://www.redux.org.cn/)
* react-router参考网址 [https://reacttraining.com/react-router/web/guides/philosophy](https://reacttraining.com/react-router/web/guides/philosophy)
* redux-actions [https://redux-actions.js.org/](https://redux-actions.js.org/)
* webpack中文文档地址 [https://doc.webpack-china.org](https://doc.webpack-china.org/)
* tslint文档 [https://palantir.github.io/tslint/](https://palantir.github.io/tslint/)
* eslint文档 [http://eslint.cn/](http://eslint.cn/)
* jasmine文档 [https://jasmine.github.io/](https://jasmine.github.io/)
* enzyme文档 [http://airbnb.io/enzyme/](http://airbnb.io/enzyme/)
* sinon文档 [http://sinonjs.org/](http://sinonjs.org/)
* mockjs文档 [http://mockjs.com/](http://mockjs.com/)

# issue
* [typescript]  <font color="red">Cannot find name 'PropertyKey'</font>
```
在es2015中才有propertyKey数据类型 在tsconfig.json配置文件compilerOptions添加lib
"lib": [
  "es2015",
  "dom"
]
```
