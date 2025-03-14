Git 是代码版本管理工具，可以实现代码版本记录、回退、多人协作等。

## Git入门准备

1. 首次进入需要先安装Git [https://git-scm.com/](https://git-scm.com/)

安装步骤可以参考[《Git下载安装教程》](https://zhuanlan.zhihu.com/p/443527549)，非常详细。

2. 注册GitHub，提示注册即可。
3. 首次需要填写Name和Email

```bash
git config --global user.name "TING"
git config --global user.email "xxx@xxx.com"
```

4. 配置ssh，可参考[《Git配置SSH Keys步骤》](https://gitee.com/help/articles/4181#article-header0)（配置ssh后提交不用输入密码）

## Git提交流程体验

以上工作准备好后即可开始Git的首次提交流程。

### 初始化项目

新建文件夹或者进入已有项目中，右键选中**Git Bash Here** 打开终端（有很多种方式打开终端）

![](https://cdn.nlark.com/yuque/0/2022/png/2868710/1669201991283-b5ba7365-a218-4740-aac0-76e837d9680a.png)

**执行** `git init`即可初始化仓库

![](https://cdn.nlark.com/yuque/0/2022/png/2868710/1669202606390-3363718d-ca24-431f-ac41-bdf40af46ae8.png)

生成.git文件，注意.git是隐藏文件，需要设置显示隐藏文件才可以看到的。

![](https://cdn.nlark.com/yuque/0/2022/png/2868710/1669202741276-10bb3beb-53e8-4a4d-a2b0-a40ca5450fa4.png)

初始化后项目目录即成为一个**Git仓库**，可以进行一系列操作来管理项目的代码版本。

### 提交流程

需要先加入暂存区才能提交到版本库，相关详情可参考[《Git 工作区、暂存区和版本库》](https://www.runoob.com/git/git-workspace-index-repo.html)

1. 加入暂存区

```bash
# 查看当前状态
git status

# 添加单独文件
git add <filename>

# 添加所有文件
git add .
```

2. 提交到版本库

```bash
git commit -m "提交信息（尽量用英文）"
```

这样就完成了最简单的提交流程； PS：工作中一般在编辑器可视化界面提交。

![](https://cdn.nlark.com/yuque/0/2022/png/2868710/1669778082233-36f2f2e4-97c6-4a41-ade2-f04864b7f6ad.png)

### 提交远程仓库

1. 首次添加远程库

如果远程仓库有内容即需要先克隆仓库

```bash
git clone git@github.com:xxx.git
```

如果远程仓库是空的即需要添加提交链接

```bash
# 创建远程库地址别名 git remote add [别名] [仓库链接]
git remote add origin git@github.com:xxx.git
```

2. 上传版本库到远程仓库

```bash
# 推送代码
git push origin

# 拉取代码
git pull
```

[阮一峰老师的Git命令清单](http://www.ruanyifeng.com/blog/2015/12/git-cheat-sheet.html)

[码云Git大全](https://gitee.com/all-about-git)

## 分支管理

仓库默认只有master分支

commit提交也是默认提交到master分支上

```bash
git branch
# 查看当前仓库分支
```

### 创建新分支

```bash
# 创建分支
git branch [分支名dev]
git branch dev

# 查看分支
git branch -v

# 切换分支开发
git checkout [分支名]
```

### 快速合并分支

第一步：切换到接受修改的分支（被合并，增加新内容）上

第二步：执行merge 命令

```bash
git checkout [被合并分支名（主分支）]
git checkout master

git merge [有新内容分支名dev]
git merge dev

# 前提是master建立分支后（没修改过）才能合并dev

# 查看分支走势图
git log --oneline --graph
```

### 分支提交

注意：多人协同时，每次push之前都需要pull先拉取远程代码，避免覆盖

```bash
# 同步代码
git push [别名] [分支名]：[远程分支名]

# 首次提交分支
git checkout [分支名]
git push -u origin [分支名]

# 再次提交分支
git checkout [分支名]
git push
```

### 拉取远程仓库

```bash
# 克隆仓库代码文件
git clone [远程地址]
```

需要团队的管理者发送邀请链接给成员，成员点击后接受邀请即可push项目

```bash
# 下载远程文件并没有改变工作区文件
git fetch [远程库地址别名] [远程分支名]

# 合并本地文件
git merge [远程库地址别名/远程分支名]

# pull=fetch+merge
git pull [远程库地址别名] [远程分支名]
```

### 解决冲突

如果不是基于GitHub 远程库的最新版所做的修改，不能推送，必须先拉取。拉取下来后如果进入冲突状态，则按照“分支冲突解决”操作解决即可。

1. 首先，可以试图用git push origin branch-name推送自己的修改。
2. 如果推送失败，则因为远程分支比你的本地更新早，需要先用git pull试图合并。
3. 如果合并有冲突，则需要解决冲突，并在本地提交。再用git push origin branch-name推送。

```bash
$ git status
# 查看问题

$ git status -sb
# 更简洁查看冲突文件
```

打开冲突文件， 删除多余，优化代码，再次提交

```bash
$ add 文件名
$ git commit
# commit不用添加文件名
```

### 修改分支位置

```bash
# 强制修改分支【main】到指定【HEAD】，原来分支记录回丢失
git branch -f [main] [HEAD]
```

### 删除分支

```bash
$ git branch
# 查看当前仓库分支

$ git branch -d 分支名
```

## Git常用命令

### 查看历史

```bash
#查看档案commit信息
git log

#查看最近两次内容差异
git log –p -2

#显示固定人员提交
git log --author='开发者name'

#简化主要信息
git log --oneline

#多个分支查看版本线图
git log --graph

#hash值完整
git log --pretty=online

#定制格式
git log --pretty=format

#查看多版本线图
git log --oneline --graph --all

#查看指定数量版本
git log --oneline --graph --[number]
```

每个版本都有一个哈希值索引

```bash
git reflog（显示出head指针的步骤）
```

### 文件删除&重命名&移动

```bash
# 文件删除
git rm [filename]

#文件重命名
git mv [oldname] [newname]

#文件移动
git mv [filename] stuff/pretty.txt
```

### 修改commit信息

```bash
# 修改最近一次commit信息
git commit --amend
```

### rebase变基

`rebase`变基可以实现修改、删除、合并commit信息等等。

PS：HEAD 为要修改的前一个结点。

```bash
git rebase -i [HEAD]
```

输入后就会弹出对应的页面

```bash
# 使用提交
# p, pick <commit> = use commit

# 使用提交，但编辑提交消息
# r, reword <commit> = use commit, but edit the commit message

# 使用提交，但停止修改
# e, edit <commit> = use commit, but stop for amending

# 使用提交，但合并到以前的提交
# s, squash <commit> = use commit, but meld into previous commit

# 使用提交，但合并到以前的提交丢弃此提交的日志消息
# f, fixup <commit> = like "squash", but discard this commit's log message

# 运行命令(其余的行)使用shell
# x, exec <command> = run command (the rest of the line) using shell

# stop here 稍后使用'git rebase—continue'继续rebase
# b, break = stop here (continue rebase later with 'git rebase --continue')

# 删除提交
# d, drop <commit> = remove commit

# label当前HEAD的名称
# l, label <label> = label current HEAD with a name

# reset HEAD to一个标签
# t, reset <label> = reset HEAD to a label

# m, merge [-C <commit> | -c <commit>] <label> [# <oneline>]
# .       create a merge commit using the original merge commit's
# .       message (or the oneline, if no original merge commit was
# .       specified). Use -c <commit> to reword the commit message.

```

选择好后用wq保存

1. `git rebase --abort` 会放弃合并，回到rebase操作之前的状态，之前的提交的不会丢弃
2. `git rebase --skip` 则会将引起冲突的commits丢弃掉（慎用！！）
3. `git rebase --continue` 合并冲突，结合"git add 文件"命令一起用与修复冲突，提示开发者，一步一步地有没有解决冲突。（fix conflicts and then run "git rebase --continue"）

### Tag

```javascript
# 查看tag
git tag

# 新增标签
git tag -a v0.1.0 -m "version v0.1.0" HEAD

# tag 详细信息
git show v0.1.0

# 将本地所有标签一次性推送至远程仓库
git push origin --tags

# 切换 tag
git checkout v0.1.0
git checkout -b [newbranchname] [tagname]

# 删除本地 tag
git tag -d v0.1.0

# 删除远程仓库中的 tag
git push origin :refs/tags/v2.0
git push origin --delete tag
```

### 拷贝提交

cherry-pick可以单独转移提交

```bash
git cherry-pick [HEAD]
```

### ![](https://cdn.nlark.com/yuque/0/2023/png/2868710/1676358830983-b56b5f06-88f8-48a7-8d3d-baaec3849a38.png)

### 回退版本

注意：reset会后来版本丢失

```bash
git reset --hard [局部索引值]
git reset --hard a6ace91
```

使用^符号：只能后退

注：一个^表示后退一步，n 个表示后退n 步

```bash
git reset --hard HEAD^
```

使用~符号：只能后退

注：表示后退n 步

```bash
git reset --hard HEAD~n
```

reset 命令的三个参数对比

1. --soft ：仅仅在本地库移动HEAD 指针
2. --mixed ： 在本地库移动HEAD 指针， 重置暂存区
3. --hard ：在本地库移动HEAD 指针，重置暂存区，重置工作区

### 回到某个版本

保留修改版本基础上，添加回到的版本

```bash
git revert -n [hash]
git revert -n a6ace91
```

### 比较文件差异

```bash
# 将工作区中的文件和暂存区进行比较
git diff [文件名]

# 暂存区和HEAD差异
git diff --cached

# 工作区中的文件和本地库历史记录比较
git diff [本地库中历史版本] [文件名]
```

### 删除文件跟踪

对所有文件都取消跟踪的话，就是

```bash
# 不删除本地文件
git rm -r --cached .

# 删除本地文件
git rm -r --f .
```

对某个文件取消跟踪

```bash
# 删除readme1.txt的跟踪，并保留在本地。
git rm --cached readme1.txt

# 删除readme1.txt的跟踪，并且删除本地文件。
git rm --f readme1.txt
```

然后 `git commit` 即可。但是`git status`查看状态时还是会列出来

### 当误删分支时

![](https://cdn.nlark.com/yuque/0/2021/png/2868710/1634006721105-676ab67b-635e-40f8-b105-2d480093899e.png)

```bash
# 删除后会有一个hash值
git branch -D（强制删除） master

# 根据hash值恢复分支
git branch master  hash值
```

### 临时加塞，缓存项目

[stash](https://www.cnblogs.com/tocy/p/git-stash-reference.html)

### lint-staged导致丢失

```javascript
git stash list

# stash@{0}: lint-staged automatic backup

# 恢复文件
git stash apply --index stash@{0}
```

### 合并中的问题

如何`master`合并`dev`后，`dev`还是原理代码并没有合并`master`，如果`merge master` 又会再次解决冲突。

```bash
git merge dev

git branch -f <dev> <HEAD hash>

git checkout <dev>
```

合并回退，如果合并撤销了一下文件则回退

```bash
git status
git add .
git merge --abort

# 再次合并
git merge dev
```

## 远程操作

### 管理仓库

```bash
# 查看仓库
git remote -v

# 添加仓库
git remote add origin <origin link>

# 删除远程仓库
git remote rm <name>

# 修改仓库名
git remote rename <old name> <new name>
```

### 远程分支管理

```bash
# 查看所有远程分支
git branch -r

# 拉取分支，但需要checkout分支才映射到本地
git fetch origin <远程 dev>:<本地 dev>
git checkout -b <本地 dev> origin/dev

# 立刻创建分支并拉取远程分支
git checkout -b <dev> <origin/dev>

# 远程分支上的内容都拉取到本地当前分支
git pull origin dev
```

## gitignore

有些时候我们不想把某些文件纳入版本控制中，比如数据库文件，临时文件，设计文件等

在主目录下建立`".gitignore`"文件，此文件有如下规则：

1. 忽略文件中的空行或以井号（#）开始的行将会被忽略。
2. 可以使用Linux通配符。例如：星号（\*）代表任意多个字符，问号（？）代表一个字符，方括号（[abc]）代表可选字符范围，大括号（{string1,string2,...}）代表可选的字符串等。
3. 如果名称的最前面有一个感叹号（!），表示例外规则，将不被忽略。
4. 如果名称的最前面是一个路径分隔符（/），表示要忽略的文件在此目录下，而子目录中的文件不忽略。
5. 如果名称的最后面是一个路径分隔符（/），表示要忽略的是此目录下该名称的子目录，而非文件（默认文件或目录都忽略）。

```bash
*.txt
# 忽略所有 .txt结尾的文件,这样的话上传就不会被选中！

!lib.txt
#但lib.txt除外

/temp
#仅忽略项目根目录下的TODO文件,不包括其它目录temp

build/
#忽略build/目录下的所有文件

doc/*.txt
#会忽略 doc/notes.txt 但不包rver/arch.txt
```

## 常用命令行

```bash
$ cd
# 改变目录

$ cd . .
回退到上一个目录，直接cd进入默认目录

$ pwd
# 显示当前所在的目录路径

$ ls
$ ll
# 都是列出当前目录中的所有文件，只不过ll(两个ll)列出的内容更为详细

$ touch
# 新建一个文件 如 touch index.js 就会在当前目录下新建一个index.js文件

$ rm
# 删除一个文件, rm index.js 就会把index.js文件删除
$ rm -r 目录
# 删除目录
$ rm -rf 强制删除

$ mkdir
# 新建一个目录,就是新建一个文件夹
$ makdir -p a/b/c/d
#创建深层目录

$ rm -r
# 删除一个文件夹, rm -r src 删除src目录


```

$ rm -rf

# 切勿在Linux中尝试！删除电脑中全部文件！

```

$ mv
# 移动文件, mv index.html src index.html 是我们要移动的文件, src 是目标文件夹,当然, 这样写,必须保证文件和目标文件夹在同一目录下。

$ reset
# 重新初始化终端/清屏。

$ clear
# 清屏

$ history
# 查看命令历史。

$ help
# 帮助

$ exit
# 退出

# 表示注释

$ echo 内容 > 文件名
# 覆盖内容

$ echo 内容 >> 文件名
# 添加内容

$ cat 文件路径/文件名
$ head 文件路径/文件名
$ tail 文件路径/文件名
$ less 文件路径/文件名
# 查看文件
```

## 提交信息规范

```bash
feat：提交新功能
fix：修复了bug
docs：只修改了文档
style：调整代码格式，未修改代码逻辑（比如修改空格、格式化、缺少分号等）
refactor：代码重构，既没修复bug也没有添加新功能
perf：性能优化，提高性能的代码更改
test：添加或修改代码测试
chore：对构建流程或辅助工具和依赖库（如文档生成等）的更改
```

## 补充npm

```bash
# 查看npm当前镜像源
npm config get registry

# 设置npm镜像源为淘宝镜像
npm config set registry https://registry.npmmirror.com/
```

安装nvm

- [window](https://github.com/coreybutler/nvm-windows)
- [mac](https://github.com/nvm-sh/nvm)

```bash
# 安装16，⽤于⼀般项⽬构建
nvm install 16

# 设置默认node版本
nvm alias default 16

# 临时切换到14版本，仅对当前终端进程⽣效，希望永久切换，请设置默认版本
nvm use 18
```

## 怎么查

本文参考

[阮一峰老师的Git命令清单](http://www.ruanyifeng.com/blog/2015/12/git-cheat-sheet.html)

[码云Git大全](https://gitee.com/all-about-git)
