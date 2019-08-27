from flask import Flask,request,Response, make_response
from flask import jsonify,abort,redirect,render_template
import os
import json
import requests
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
def /lightbulb():
    power =request.cookies.get('power')
    send_sensor_data_to_platform(power)
    print(power)

    result = {'Result':'OK'}
    return jsonify(result)


@app.route('/get_cookie')  
def get_cookie():  
    name=request.cookies.get('id')  
    return name

def send_sensor_data_to_platform(power):
    url = "https://iot.cht.com.tw/iot/v1"
    device_path = "/device/18351487392/rawdata"
    headers = {'CK':'PKBJ3AAWY7IRBMUKAH', 'device_id':'18351487392'}
    iot_format_datas = []
    data = {'id':'input',
    'value':[power]}
    iot_format_datas.append(data)
    r = requests.post(url + device_path, json=iot_format_datas, headers=headers)
    print(r.text)



if __name__ == '__main__':
    app.run(host='0.0.0.0',port=8080,debug=False) 
