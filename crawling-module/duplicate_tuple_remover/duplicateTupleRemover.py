import os, sys
sys.path.append(os.path.dirname(os.path.abspath(os.path.dirname(__file__))))
import config
import pymysql
from time import sleep

con = pymysql.connect(
    host=config.db_config['host'],
    user=config.db_config['user'],
    password=config.db_config['password'],
    db=config.db_config['db'],
    charset="utf8"
)

def update_kakao_url(target_id, kakao_url):

    cur = con.cursor()
    sql = "update PLACE SET PLACE.kakao_url=%s WHERE PLACE.place_id = %s"
    cur.execute(sql,(target_id,kakao_url))
    con.commit();
    print("update sql 실행!")
    print(sql , target_id,kakao_url)
    print("")


def delete_record_by_id(place_id):
    cur = con.cursor()
    sql = "DELETE FROM PLACE WHERE PLACE.place_id = %s"
    cur.execute(sql,(place_id))
    con.commit()

    print("sql 실행!!!")
    print(sql,place_id)
    print("")


def merge(record_1 , record_2):
    if (record_1['naver_star_rate'] !=None) ^ (record_2['naver_star_rate'] !=None):
        if record_1['naver_star_rate'] == None:
            record_1,record_2 = record_2,record_1
            # record_기준으로 record2 의 kakao_url 만 뺴서 업데이트 시킨후
        update_kakao_url(record_1['place_id'],record_2['kakao_url'])
        delete_record_by_id(record_2['place_id'])
        # record_2 삭제


def get_dong_id_list(dong_id):
    cur = con.cursor(pymysql.cursors.DictCursor)
    sql = "SELECT * FROM PLACE p WHERE p.dong_id = %s;"

    cur.execute(sql,(dong_id))

    res = list(cur.fetchall())

    diction = {}
    for i in res:
        store_name = i['name']
        if store_name in diction:
            diction[store_name]+=1
        else:
            diction[store_name] = 1
    duplicate_list=[]

    for i in diction:
        if diction[i] == 2:
            print()
            ret = list(filter(lambda x:x['name'] == i,res))
            print(ret)
            merge(ret[0],ret[1])

    pass



class DuplicateRemover():
    def __init__(self):
        pass


    def execute(self,dong_id):
        matched_store_list = get_dong_id_list(dong_id)

if __name__ == '__main__':
    instagram_crawler = DuplicateRemover()
    for j in range(1,468):
        instagram_crawler.execute(j)