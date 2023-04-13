# create-tingcli

我写了一个快速搭建脚手架的脚手架

快速开始

```bash
pnpm create tingcli
```

选择 cli 回车

```bash
❯ cli
  monorepo
```

创建项目名，不填则为当前目录

```bash
? 项目类型 cli
? 项目名称
```

也可以通过命令行快速创建

```bash
pnpm create tingcli -t cli -n project-name
```

这样就可以快速创建你的脚手架啦，修改 package.json 就可以快速发包啦

```bash
pnpm i
pnpm build
npm publish
```
