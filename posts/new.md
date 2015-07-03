title: firefly新手引导
-------------------------

假如你想参与firefly的开发, 请详细阅读此文.

**安装MongoDB**

linux用户: http://docs.mongodb.org/manual/administration/install-on-linux/

OSX用户: http://docs.mongodb.org/manual/tutorial/install-mongodb-on-os-x/

当登陆mongo的cli的时候有这样的提示就说明成功了

```
mongo
MongoDB shell version: 2.6.8
connecting to: test
>
```

**安装redis**

请参照 http://redis.io/topics/quickstart 或者其他文档.

#### 配置环境

目前还没有做python3的支持, 所以需要有Python2. 个人建议使用python2.7,
因为他有更多标准库, 支持更多的语法(比如字典解析).

开发之前需要一些依赖:

```python
$sudo easy_install setuptools  # 它里面有pip, 假如系统已经包含pip, 忽略这步
$pip install --user virtualenv # 安装virtualenv

PS: virtualenv是一个虚拟环境, 主要解决多python环境下依赖不相互影响的问题.
PS: 你需要Python Development Headers来作为依赖安装py-bcrypt包，如果你使用的是Mac OS或者Windows，你应该已经有了这个依赖。否则如果是Debian系的发行版需要安装python-dev包，如果是RedHat系的发行版需要安装python-devel包。
```

#### 初始化firefly的开发环境

```python
$git clone https://github.com/python-cn/firefly # 克隆代码到本地
$cd firefly
$cp firefly/local_settings.py.example firefly/local_settings.py # local_settings.py是本地配置, 包含数据
库, oauth2等不适合放入版本库敏感数据,以及对一些配置项的自定义
$virtualenv venv  # 在当前目录下生成一个venv目录, 这个目录就是你的虚拟环境
$source venv/bin/activate # 激活环境, 如果你想从这个环境中离开, 可以执行`deactivate`
$pip install -r py2-requirements.txt # 假如你是用python2还需要安装这个依赖
$pip install -r dev-requirements.txt # 安装开发依赖
$pre-commit install -t pre-push # 假如你希望对flake8做本地检查可以安装这个git-hook. 以后每次你的push都会跑一遍对当前提交代码中的检查
```

PS: pre-commit请放心使用, 代码是我写的.

#### 前端开发

开发角度, 假如你希望能够自己向全栈方向, 或者是前端工程师或者喜欢想尝试做一些前端的开发. 建议配置本开发环境(这属于增强功能不强制)

使用角度. 假如你想跑起来看看效果, 也需要执行下面的配置(项目代码中没有样式文件, 需要执行grunt生成 - 执行一次就好了)

这个环境帮你做的:

1. 发现目录下文件改变自动重载页面
2. 自动根据scss文件生成css(目前是开发阶段, 没有压缩)

环境配置

1. 首先需要安装node(我们会使用npm), 可以到官网 https://nodejs.org/ 下载安装
2. 其次需要安装ruby(我们会使用gem), 可以到官网 https://www.ruby-lang.org/ 下载安装
3. 配置firefly的开发环境


        $ cd firefly/static
        $ gem sources --remove https://rubygems.org/
        $ gem sources -a https://ruby.taobao.org/
        $ gem sources -l
        *** CURRENT SOURCES ***

        https://ruby.taobao.org
        $ sudo gem install sass -V
        $ npm install
        $ node_modules/grunt-cli/bin/grunt # 如果你不喜欢占用一个终端, 可以使用tmux或者screen

#### 填充测试数据

待补充...

#### 启动firefly

```python
$python manage.py runserver -p PORT # 跑在本机的PORT端口下
## 调试model可以使用
$python manage.py shell
```
