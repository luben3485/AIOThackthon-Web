import json
import time
import requests
import datetime

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


send_sensor_data_to_platform(1)
