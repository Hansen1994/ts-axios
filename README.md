## 搭建nomorapo生成环境玩axios

- `pnpm init -y`

- 在根目录建立 `pnpm-workspace.yaml`，然后写上，表示全部的内容放在packages下面

```javascript
packages:
  - 'packages/*'
  
```

- 安装依赖文件（这是我当前的版本号，你也可以用新的）

```javascript
+ @rollup/plugin-commonjs 22.0.1
+ @rollup/plugin-json 4.1.0
+ @rollup/plugin-node-resolve 13.3.0
+ execa 4.1.0 (6.1.0 is available)
+ rollup 2.77.2
+ rollup-plugin-typescript2 0.32.1
+ typescript 4.7.4
```

- `pnpm tsc --init` 生成 ts配置文件，具体看注释和相关官网

  ```javascript
  {
    "compilerOptions": {
      "outDir": "dist", // 输出的目录
      "sourceMap": true, // 采用sourcemap
      "target": "es2016", // 目标语法
      "module": "esnext", // 模块格式
      "moduleResolution": "node", // 模块解析方式
      "strict": false, // 严格模式
      "resolveJsonModule": true, // 解析json模块
      "esModuleInterop": true, // 允许通过es6语法引入commonjs模块
      "jsx": "preserve", // jsx 不转义
      "lib": ["esnext", "dom"], // 支持的类库 esnext及dom
      "baseUrl": ".", // 以当前路径为基准进行查找
      "paths": {
        "@axios/*":["packages/*/src"] // 引入@vue 都去packages 下查找
      }
    }
  }
  ```

- 通过下面命令将 @axios/shared@workspace放入@axios/reactivity，作为相互引用

  `pnpm i @axios/shared@workspace --filter @axios/reactivity`

- 紧接着在新建script目录，然后在package.json上写上,表示只要reactivity，而且过滤的全局的，并添加source-map， 这里主要和后面的rollup做关联的，也就是 dev.js -> rollup打包 -> rollup.config.js

  ```javascript
  "scripts": {
      "dev": "node scripts/dev.js reactivity -f global -s"
    },
  ```

  