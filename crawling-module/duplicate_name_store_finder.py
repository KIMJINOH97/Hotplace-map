import os, sys
import config
import pymysql
from time import sleep
a = 0
def get_dong_id_list(dong_id):
    cur = con.cursor(pymysql.cursors.DictCursor)
    sql = "SELECT * FROM PLACE p WHERE p.dong_id = %s;"

    cur.execute(sql,(dong_id))

    res = list(cur.fetchall())
    global a
    diction = {}
    for i in res:
        store_name = i['name']
        place_id = i['place_id']
        if store_name in diction:
            diction[store_name].append(place_id)
        else:
            diction[store_name] = [place_id]
    duplicate_list=[]

    for i in diction:
        if len(diction[i])>1:
            print()
            for j in list(filter(lambda  x:x['place_id'] in diction[i],res)):
                a+=1
                print(j)

    # for i in list(filter(lambda x:x['place_id'] in duplicate_list,res)):
    #     print(i)

    pass

con = pymysql.connect(
    host=config.db_config['host'],
    user=config.db_config['user'],
    password=config.db_config['password'],
    db=config.db_config['db'],
    charset="utf8"
)

class DuplicateRemover():
    def __init__(self):
        pass


    def execute(self,dong_id):
        matched_store_list = get_dong_id_list(dong_id)

if __name__ == '__main__':
    instagram_crawler = DuplicateRemover()
    for j in range(1,468):
        instagram_crawler.execute(j)
    print("a",a)