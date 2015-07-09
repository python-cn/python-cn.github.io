title: firefly用到的库/框架
-------------------------

这篇主题就是介绍firefly用到的库/框架. 以及使用它们的原因.

### python的

#### Flask

[flask](https://github.com/mitsuhiko/flask)是社区的web框架. 我觉得django是一个很好地框架, 适合于企业级的应用, 对于社区实在太重. 其他框架需要实现的功能太多,
就没必要造轮子了(也不一定比flask已有的好). flask越来越被接受(虽然有随波逐流的人), 我来说下我的理解:

1. [pocoo](http://www.pocoo.org/)团队是一个伟大的团队, 它的作品还包括Jinja2, Pygments, Sphinx, Werkzeug.
这实力和社区可让你让你放心使用flask.
2. flask的三方插件系统生态非常好, 每个插件代码都不多. 就算看源码也不会太浪费时间
3. flask自带了很多有用的函数, cached_property. 它对于web开发需要做的都覆盖到了
4. flask源码值得一读, 它的设计其实可以被借用到自己的业务里面 - 但是flask有明显的风格

#### MongoDB

firefly的数据库. 选择Mongodb就是因为社区在早期可能功能特性有较大的更改, 用SQL对表结构要求太高. 而且mongodb的性能很好.

#### mongoengine

在使用ORM这个问题上一直有很大的争议. 我以前试验过, 使用ORM会减低3-5%的性能. 但是能让代码好看简单很多.
出现问题也很容易定位. 给想学想用它的人作为一个范例吧.

#### Jinja2

早期firefly使用了plim, 但是由于要使用react,以及plim被大家接受程度, 我们还是换回了jinja2.

有兴趣可以看具体讨论: [Issue92](https://github.com/python-cn/firefly/issues/92),开发详情请关注[trello](https://trello.com/b/JM2OEXPA/firefly)

#### pygments

[pygments](https://bitbucket.org/birkenfeld/pygments-main)也是[pocoo](http://www.pocoo.org/)团队的作品, 提供各种语言的语法高亮, 他是基本所有python开源项目做语法高亮的底层库. 它有非常好的文档
很容易自定义词法分析和格式. 他的源码也值得一读

它是firefly里用来配合mistune根据markdown内容渲染成带语法的html.

#### mistune

[mistune](https://github.com/lepture/mistune)是[lepture](https://github.com/lepture)写的markdown解析工具. 支持国货

### 前端的

#### react

[react](https://github.com/facebook/react)可能是目前最火的前端框架. firefly组件都由react来支持. 具体讨论可见: [Issue92](https://github.com/python-cn/firefly/issues/92).
目前进行中, 欢迎有兴趣得人一起来做.

#### grunt
[grunt](https://github.com/gruntjs/grunt)是一个javascript的任务处理器(用了才知道).
firefly用来做代码更改自动执行sass, 重载页面, 代码压缩等

#### RequireJS

[RequireJS](http://requirejs.org)是一个用于模块/文件加载的库, 主要是大型项目中管理代码加载的库, 具体的可以看[阮一峰的介绍](http://www.ruanyifeng.com/blog/2012/11/require_js.html)

firefly用他来管理js.

#### CodeMirror

[CodeMirror](https://github.com/codemirror/CodeMirror)让你可以在浏览器里面编辑代码, 支持语法高亮.
它也是ipython notebook用的库(因为对ipython notebook源码比较熟, 选择了它)

#### highlightjs

[highlightjs](https://highlightjs.org)是我个人博客也用到的前端语法高亮的库.
它主要用于firefly实时预览markdown编辑的文章.


### 以下是一些我推荐的可选的开发工具

#### IPython

[IPython](https://github.com/ipython/ipython)是一个增强的python交互解释器. 它的特点我之前说过:

```
ipython notebook - 一个可以跑的在线可编辑可运行的笔记. 可以测试程序, 执行代码, 当做说明文档, 能帮助不擅长web开发的同学做出很多页面的效果, 支持markdown语法等
自动补全 - 当我import xx的时候 我可以像用zsh一样使用Tab自动补全对应的模块/方法的名字
magic - 它提供很很多magic的函数命令, 比如你可以直接执行ls, pwd等. 还能使用其他shell命令, 调用编辑器等
它能通过?或者??帮我查看代码的注释, 接口参数等等.
它提供很多的配置选择, 可以使用内置/外部插件达到一些其他的功能, 比如autoreload - 你不需要退出ipython就能获得你已经import之后的代码修改后的效果.
它在分布计算, 数据分析上又很好的支持, ipython非常大的使用群体是科学家和算法工程师
```

#### flake8

[flake8](https://github.com/PyCQA/flake8)它是pyflakes+pep8, 对python做代码检查. firefly强制要求需要通过flake8检查

#### autopep8

如果你很懒, 或者发现pep8的错误看不懂, 不知道怎么修改. [autopep8](https://github.com/hhatto/autopep8)能自动帮你设置成符合pep8标准的代码.

但是请注意, autopep8的代码基于pep8. 但是只是pep8检查的一个子集. 不能检查所有的问题. 比如E501

####pre-commit

[pre-commit](https://github.com/pre-commit/pre-commit)是Yelp开源的一个小工具. 他是git的一个hook.
就是在你push或者commit的时候自动对你本次提交做一些检查. 我认为类似flake8的错误可以本地避免,
没必要去跑CI时候才发现问题.
