title: firefly docker 镜像使用指南
-----------------------------

> Docker的安装请参考官方文档 https://docs.docker.com/installation/#installation


## 安装
安装好docker后，执行
```
$ sudo docker pull halfcrazy/pythoncn-firefly:v1
```
获取firefly docker镜像。(目前[firefly镜像](https://registry.hub.docker.com/u/halfcrazy/pythoncn-firefly/)托管在[dockerhub](https://registry.hub.docker.com/u/)上)

然后执行
```
$ sudo docker run -t -i halfcrazy/pythoncn-firefly:v1 /bin/bash
root@d57a1be6ead:/#
```
进入到镜像的交互模式，注意，你的root后面那串hash可能跟我的不一样。这串东西相当于git里面，每次commit后的sha-1 。

然后进入到firefly的项目目录，配置你自己的git信息
```
root@d57a1be6ead:/# git config --global user.name "John Doe"
root@d57a1be6ead:/# git config --global user.email johndoe@example.com
root@d57a1be6ead:/# cd home/firefly
root@d57a1be6ead:/home/firefly# git remote rename origin upstream
root@d57a1be6ead:/home/firefly# git remote add origin http://github.com/xxxx/firefly.git  //这里是填你fork过去的项目地址
```
*注* 当git仓库配置好后，请执行`git pull upstream master`来获取最新代码.


## 运行firefly
```
root@d57a1be6ead:/# mongod & //启动mongo
root@d57a1be6ead:/# redis-server & //启动redis
root@d57a1be6ead:/# cd home/firefly
root@d57a1be6ead:/home/firefly# source venv/bin/activate //如果代码有更新过，最好重新安装一下requirement
root@d57a1be6ead:/home/firefly# python manage.py runserver //此时firefly运行在docker中的5000端口上
```
*注* 如果需要在宿主机中访问docker中运行的firefly需要在运行时进行一次端口映射，具体来说就是在`$ sudo docker run -t -i halfcrazy/pythoncn-firefly:v1 /bin/bash`执行这一步时，加一个参数 `-p 5000:5000`，将docker中的5000端口绑定到本地主机的5000端口。此时在宿主机的浏览器中打开`127.0.0.1:5000`就可以访问到docker中firefly的5000端口。


## 保存修改
在docker镜像中进行开发的话，请记住运行镜像时root后面的那串东西，对docker镜像做出修改后，`exit`，运行`$ sudo docker commit 那串hash`，这样做了之后，运行`$ sudo docker images`就会看到刚才commit创建的新的临时image，下次开发时，直接`$ sudo docker run 新的临时image的那串hash`就会进入到基于上次commit时候的镜像。


## 挂载本地目录到docker
也许你不希望在docker中编辑代码，那么你也可以使用`-v`将本地主机的目录挂载到容器中
```
$ sudo docker run -t -i -v /src/webapp:/opt/webapp halfcrazy/pythoncn-firefly /bin/bash
```
这将会挂载本地目录/src/webapp到容器的/opt/webapp目录。这在做测试时是非常有用的。例如我们可以挂载我们本地的源代码到容器内部，我们可以看到我们改变源代码时的应用时如何工作的。主机上的目录必须是绝对路径，如果目录不存在docker会自动创建它。
在这种方案下，你就可以在本机的指定目录中进行代码的修改，并在docker中运行项目。

附：
[Docker —— 从入门到实践](http://dockerpool.com/static/books/docker_practice/index.html)
