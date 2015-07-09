title: 开发流程&代码规范
-------------------------

假如你想参与firefly的开发, 请详细阅读此文.

**WARNING** 我们最近在做嵌入react的工作，其他工作暂停迭代(防止新的代码造冲突).
具体讨论可见: [Issue92](https://github.com/python-cn/firefly/issues/92),开发详情请关注[trello](https://trello.com/b/JM2OEXPA/firefly)

### 说在前面的话

「再牛掰的人写的程序也会有bug. 」

大到[torvalds](https://github.com/torvalds/linux), [gvanrossum](https://github.com/gvanrossum), 小到github上千star的项目,上千star的开发者, 都会写有bug的代码;
请大胆找出社区代码的错误, 给予很严厉的代码review(明显要强于公司的), 否则就没有意义. 大家知道, 一份工作其实60%是了解业务, 剩下的才是组织编码来实现,
我希望本流程能给大家产生深远的意义, 产生非常良好的代码习惯.

我在学python之初就刻意的让自己的代码符合PEP8, 养成了习惯. 现在基本不需要借助工具就能产生符合PEP8要求的代码, 大家可以参考.

如果你认为我们对于某第三方的开源项目的用法有异议, 你可以在阅读过原始代码的前提下指出, 我们希望firefly也来越好, 成为类似内容的典范.

### 开发流程

我们使用github做代码托管, code-review, 提交Issue等.

原则:

1. 任何人都可以fork项目. 提交pull requests.
2. 任何人都可以做code-review, 提交评价意见. 共同学习和进步
3. 如无特殊原因, pr(pull requests)都会在3天得到回复.

流程:

##### fork

从firelfly项目fork一份副本到本人项目地址下.
比如用户test fork了一个项目. 应该在https://github.com/test/firefly

实际的URL应该是: https://github.com/python-cn/firefly#fork-destination-box

##### clone

clone代码到本地:

```bash
git clone https://github.com/xxx/firefly ### xxx表示你在github的用户名
cd firefly
```

##### rebase

**这点很重要**

所有人都不要用merge!! 会乱. 只有在github上合并别人提交的分支使用merge.个人开发都使用rebase. 具体如下

```
$git remote add upstream https://github.com/python-cn/firefly # 加一个源, 就是原始地址, 以后的rebase都要和它同步
$git pull --rebase upstream master # 这条非常重要, 每次创建新的分支, 或者在最终push之前都要执行一次. 保证你的分支和远程的库的master分支保持一致
```

##### 创建分支

不要求git-flow之类的用法. 个人随意. 最好不要用master分支

```
$git checkout -b travis-pep # 创建一个叫做travis-pep的分支
```

##### 开始写代码

可以增加新功能/特性, 可以fix typo, 可以改bug.  要cool!

可能有多次commit.

```
$git commit -am ''  # 使用-a要谨慎, 你要对git很熟悉知道你在做什么, 否则还是不要加-a.使用 `git add`
```

##### 提交代码

```
$git push origin travis-pep # 提交你的代码到你自己的仓库(origin)
```

##### 你觉得没有问题后，可以给项目提个pr

但是为了保证项目质量, 要满足以下几条. 请好好看这篇文章[如何写就完美 Pull Request](http://segmentfault.com/a/1190000002575050). 简单的说:

提交pr的时候, 如果是修改其他的人的代码, 甚至可以直接@到对方, 也可以直接@社区内的任何成员.

1. commit massage里面要对你做的事情有描述, 多个commit的原因是**出现问题我能对你的单个commit revert**
2. commit massage不能有无聊的信息, 比如 `test`, `1`, `qwert` 这些. 请仔细写
3. pr的描述请说的详细些, 比如介绍你本次修改要解决的问题, 最好有bug的前因后果等等. 方便别人review. 也方便一段时候后排错(你设想下, 假如是你维护一个pr写的很烂,commit很乱不知所云的人会怎么样)
4. 一个pr请只关于解决一个问题. 不要一个pr带几百行甚至更多的代码(包含三方库代码的不计入其中), review会很痛苦
5. 请不要把commit变多, 提交前可以rebase修改下提交的记录.

PS: 假如你的代码没有过travis是不可能会被合并的. 你能在创建好的pr页面, 最后一个commit的右边看到这个小标示. 如果绿色, 恭喜你. 如果红色, 请赶快看看为什么, 谨防被人吐槽啦

##### code-review

code review其实是一个学习和提高的过程. 你可以通过review代码了解这个项目的发展. 对我经常review一些知名开源项目的pr. 但是不做评论. 只是学习.

你可以学到更奇葩/更有效率/更漂亮的用法. 当然忍不住就要吐槽你觉得烂得用法. 但是请注意用词. 尊重别人是社区的底线了.

我觉得可以从以下几个方面做评论:

1. 代码不符合flake8标准
2. 可以更漂亮的用法, 这个漂亮不是用函数式编程来炫技, 而是被大家都能看懂, 认可的用法. 比如这个功能标准库已经实现了, 可以使用python自带的一些属性让它更直观
3. 代码性能有问题
4. 不符合代码规范(下面会说)
5. 逻辑可以抽象
6. 代码结构/设计模式
...

PS: 大家注意不要强加你认为正确地方式给别人, 有些东西属于很主观的, 没有对错的点, 能接受就好了

这个期间提交pr的人比较惨. 尤其是团队初期, 没有了解大家的胃口的时候, 做好足够的心理素质. 这不是在故意针对.
这些东西在你以后会产生非常好的影响, 给你养成非常好的代码习惯. 这比看书看别人的东西来的容易, 写的容易哦

**pr的标题**

pr还有2种特殊的用法:

1. [NM] - not merge 表示现阶段不要把这个PRmerge进来
2. [WIP] - work in process. 表示在进行中, 或者发现了什么bug在修改. 也不要merge. 可以先代码review.

如果标题包含以上2种用法, 大家可以定期ping原作者. 看要不要修改状态或者关闭掉

##### 合并/拒绝代码

我们没有暂缓搁置这个方式. 要不然会merge到master，要不然给出理由拒绝.

1. 我会尽量快得做出回应.
2. 我自己的PR我会放一天以上的时间, 希望大家也来吐槽我
3. 提交的代码, 最后不是本人来merge. 包括我的. 我希望不会存在只有一个人熟悉某一块的代码.

假如你的代码被合并了, 恭喜你成为社区贡献者的一员. 在未来说不定会有些特权或者优先提要或者参与活动会发通知之类的事情.
假如你的代码被拒绝了. 请不要气馁. 我在给其他知名项目和python标准库贡献代码的时候其实被吐槽多次, 也被拒绝/搁置了很多, 说起来一把辛酸一把泪.
我现在还经常给总是喜欢拒绝我的某些项目处理issue. 其实这属于一种程序员的特性, 但是你做的我们都会看到,我们也会记得.


### 关于使用第三方库

* 这个第三方库被star的不能太少, 除非有成员读过它的代码
* 这个项目近期都还在维护, 我们需要它一直成长
* 这个项目不能依赖的太多和项目无关的另外的三方库
* 这个项目有一些功能是能被我们利用的, 而不是1,2个地方而已. 我们要统一整个项目对这样内容的处理
* 这个项目是某领域最早出现, 我们又不可或缺的(自己实现会造很多轮子)

但是我个人还是希望尽量不增加额外的库.

假如满足的不超过一半, 肯定是不会被通过, 因为你可能会让大家都得适用这个模块

### 关于文档和注释

* 首先肯定要符合PEP8的要求
* 不要写中文的注释, doc. 既然是开源的就要听取全世界的吐槽的鲜花
* 过去有一些commit message是中文, 以后请大家不要写中文的commit信息
* 当某段代码有很多计算或者写的逻辑很复杂, 请在这段代码简要介绍下用途,
让其他开发者不需要了解这段代码就知道它的输入和输出(就算是维护这段代码也能有个大概的了解意图)

**TODO/FIXME**

注释中可以添加TODO/FIXME这样的标签, 把坑留到下一步或者别人来解决. 给未来的执行者有一个比较好的说明.

### python3支持

目前除了一些激进的组织,大部分还是使用python2. [PEP404](https://www.python.org/dev/peps/pep-0404/)说不会有官方的2.8. 2.7.914年底也已经release了.
作为开源项目肯定要做python3的支持.

1. 写代码的时候尽量支持python2+python3
2. 希望更多愿意尝试python3的同学参与进来

写兼容python3的代码可以参看 [python3兼容的代码](/#/post/porting3.md)

### 代码规范

「无规矩不成方圆！」

我坚信一个健康成长的社区,需要一帮有自己品位, 态度的维护者和开发者. 为了保证社区代码的质量, 我希望每个开发者都能遵守以下一些准则

#### 代码规范

要先读读 https://github.com/mdo/code-guide

#### CSS

项目使用scss, 不能直接修改css. 这样的代码修改是不会被merge的

#### javascript

请参照 [https://github.com/airbnb/javascript](https://github.com/airbnb/javascript)

#### python

1. 符合pep8标准
2. http://python.net/~goodger/projects/pycon/2007/idiomatic/handout.html

更多资源请关注: http://python-cn.github.io/guide/#/post/material.md
