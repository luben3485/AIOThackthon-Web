from flask import Flask,request,Response, make_response
from flask import jsonify,abort,redirect,render_template
import os
app = Flask(__name__,static_url_path='',root_path=os.getcwd())

@app.route('/')
def index():
    return app.send_static_file('index.html')


@app.route('/set_cookie')
def set_cookie():
    #res = Response('add cookies')
    #res.set_cookie('Name','Hyman')  
    response = make_response(redirect('/'))
    response.set_cookie('id', "123")
    return response		

@app.route('/lightbulb')
def lightbulb():
    power =request.cookies.get('power')


    result = {'Result':'OK'}
    return jsonify(result)


@app.route('/get_cookie')  
def get_cookie():  
    name=request.cookies.get('id')  
    return name

if __name__ == '__main__':
    app.run(host='0.0.0.0',port=8080,debug=False) 
