title: 写python3兼容的代码
-------------------------

假如你想参与firefly的开发, 我们原则上要求写能支持py2且支持py3的代码.

### 资料

从开发角度了解python3的意义: http://ncoghlan-devs-python-notes.readthedocs.org/en/latest/python3/questions_and_answers.html

书: http://python3porting.com/

链接: https://docs.python.org/3.3/howto/pyporting.html

### python-modernize

如果你对python3不熟悉 可以使用[python-modernize](https://github.com/mitsuhiko/python-modernize)跑一下代码, 它会演示建议你需要修改的地方:

```python
python-modernize --no-six -w firefly/app.py
```

### firefly目前的做法

我们既没有使用six, 也没有使用future, 而是维护了firefly/six.py

原因是 我们遇到的坑还少, six/future需要开发者熟悉它的解决方案. 我们只需要添加有限的几种问题即可(自己添加会更熟悉和趁手)

PS:不排除未来我们也会使用six/future作为我们的方案.

### firefly兼容要求

1. 不要显式的使用u''. 因为在python3.3之前这是语法错误.
2. 有print的时候, `from __future__ import print_function`是必须的
3. 每个新的py文件都要求 加上 `from __future__ import absolute_import`. 因为python3不支持隐式的相对import. 详见[PR#74](https://github.com/python-cn/firefly/pull/74)
5. open文件请使用` io.open()`
5. 类都要继承object(新式类)
6. 模块和方法改变的列表以及一些其他的要注意的点可以看这里: http://docs.pythonsprints.com/python3_porting/py-porting.html

### python -3

可以使用-3启动web. Python会warn一些信息告诉你那些东西可能在py3已经被废弃或者有更新的用法

```python
python -3 manage.py runserver
```

### 链接

1. http://techspot.zzzeek.org/2011/01/24/zzzeek-s-guide-to-python-3-porting/
2. http://dabeaz.blogspot.com/2011/01/porting-py65-and-my-superboard-to.html
3. http://lucumr.pocoo.org/2010/2/11/porting-to-python-3-a-guide/
4. http://lucumr.pocoo.org/2011/1/22/forwards-compatible-python/
