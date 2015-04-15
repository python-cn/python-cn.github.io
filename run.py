from flask import *
import flask


app = Flask(__name__)

@app.route('/guide/post/<name>')
@app.route('/guide')
def post_name(name=""):
    return send_file('index.html')

@app.route('/test')
def post_test(name=""):
    return send_file('test.html')

@app.route('/<id>')
def route_id(id):
    return flask.request.path

@app.route('/bower_components/<path:filename>')
def bower_components(filename):
    return send_from_directory('./bower_components/', filename)

@app.route('/guide/posts/<path:filename>')
def posts(filename):
    return send_from_directory('./posts/', filename,cache_timeout=0)

@app.route('/template/<path:filename>')
def template(filename):
    return send_from_directory('./template/', filename)

app.run(debug=True,host="0.0.0.0")
