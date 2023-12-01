## node 安装说明

### 1. 下载node11.15.0版本mis
```sh
    node -v
    npm -v
```
### 2. 修改路径存储库
```sh
# d盘手动新建路径，npm设置路径
npm config set prefix "D:\dev\node\node_global"
npm config set cache "D:\dev\node\node_cache"
```

### 3. 设置环境变量

#### 3.1 系统变量 - new - %NODE_DEV_PATH%=D:\dev\node\node_global\node_modules

#### 3.2 用户变量中Path把`C:\Users\wanghc\AppData\Roaming\npm`修改成`D:\dev\node\node_global`

#### 3.3 系统变量 -> Path - > 增加 %NODE_DEV_PATH%

### 4. 安装gulp

```shell
npm install gulp -g 
'gulp命令与cmd会安装到D:\dev\node\node_global
'gulp-js库会安装到D:\dev\node\node_global\node_modules
```

### 5.运行

```shell
npm config set registry https://registry.npm.taobao.org
'npm config get registry
npm install
gulp min-js
```

