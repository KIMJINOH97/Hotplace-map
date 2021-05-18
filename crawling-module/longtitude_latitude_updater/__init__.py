import sys
import os
import requests
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '../')))

import config

import pymysql

con = pymysql.connect(
    host=config.db_config['host'],
    user=config.db_config['user'],
    password=config.db_config['password'],
    db=config.db_config['db'],
    charset="utf8"
)
KEYWORD_URL = 'https://dapi.kakao.com/v2/local/search/keyword.json'
ADDRESS_URL = 'https://dapi.kakao.com/v2/local/search/address'
headers = {"Authorization": "KakaoAK "+config.key}


cur = con.cursor(pymysql.cursors.DictCursor)

sql = 'select * from PLACE where longitude_x is NULL ;'

cur.execute(sql)
res = list(cur.fetchall())


def update_record(target_id, x, y):
    cur = con.cursor()
    sql = 'update PLACE set longitude_x=%s, latitude_y=%s where place_id = %s'
    cur.execute(sql,(x,y,target_id))
    con.commit()

for record in res:

    target_id = record['place_id']
    target_addr = record['address']

    target_addr = ' '.join(target_addr.split(' ')[:4])

    key_params = {'query': target_addr}
    key_res = requests.get(KEYWORD_URL, params=key_params, headers=headers).json()


    places = key_res['documents']

    if len(places) > 0:
        x,y = places[0]['x'],places[0]['y']
        print(target_addr)
        print(target_id , target_addr , x,y)
        update_record(target_id,x,y);
        print("")





