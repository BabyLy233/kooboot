# koobot 机器人
> A simple bot for kook channel to share message with QQ group 😎 (。-ω-)zzz

## 项目依赖
- koa 2.13.4
- koa-bodyparser 4.3.0
- koa-router 12.0.0
- axios 0.27.2
- winston 3.8.1
- typescript 4.8.2
- dotenv 16.0.2

## Windows 快速启动
1. 复制一份 `.env-sample` 重命名为 `.env` 作为应用配置文件
2. 参照注释修改 `.env` 中的内容
3. pnpm install 安装依赖 ( npm / yarn )
4. tsc 编译源码
5. node ./dist/index.js 启动应用
6. 配合 go-cqhttp 即可开始使用

## RoadMap
- [x] 文字消息
- [x] 图片消息
- [x] 进出频道提示
- [ ] QQ群消息同步至 KooK
- [ ] 查询某玩家状态
