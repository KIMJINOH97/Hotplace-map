import sys
import os
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '../')))
import config

import pymysql
import naverCrawler as naver

con = pymysql.connect(
    host=config.db_config['host'],
    user=config.db_config['user'],
    password=config.db_config['password'],
    db=config.db_config['db'],
    charset="utf8"
)

def is_duplicate(store,foreign_key_info):
    gu_id , dong_id , category_id ,sub_category_id = \
        foreign_key_info['gu_id'], \
        foreign_key_info['dong_id'], \
        foreign_key_info['category_id'], \
        foreign_key_info['sub_category_id']
    store_phone = store['store_phone']

    store_address = store['store_address']
    store_address_bunji = store_address.split(' ')[3]

    cur = con.cursor()
    sql = "select * from PLACE " \
          "where PLACE.dong_id = {} "\
          "and PLACE.phone_number LIKE '%{}%' " \
          "and PLACE.address LIKE '%{}%' " \
          "and PLACE.naver_star_rate is NOT NULL".format(dong_id,store_phone,store_address_bunji);
    cur.execute(sql)
    res = list(cur.fetchall())

    if len(res) != 0: #clean 한 데이터가 하나도 없다.
        print("중복된 데이터가 존재합니다!!!")
        return True
    else:
        return False


def get_same_phone_store(store,foreign_key_info):
    gu_id , dong_id , category_id ,sub_category_id = \
        foreign_key_info['gu_id'], \
        foreign_key_info['dong_id'], \
        foreign_key_info['category_id'], \
        foreign_key_info['sub_category_id']
    store_phone = store['store_phone']

    cur = con.cursor()
    sql = "select * from PLACE " \
          "where PLACE.phone_number LIKE '%{}%' " \
          "and PLACE.dong_id = {} " \
          "and PLACE.naver_star_rate is NULL".format(store_phone,dong_id)

    cur.execute(sql);
    res = list(cur.fetchall())
    return res;


def insert_store(store, foreign_key_info):
    print('\n**************************************')
    print(store)
    print(foreign_key_info)
    print('**************************************\n')
    gu_id , dong_id , category_id ,sub_category_id =\
        foreign_key_info['gu_id'],\
        foreign_key_info['dong_id'],\
        foreign_key_info['category_id'],\
        foreign_key_info['sub_category_id']

    print("구 동 카테고리 ",gu_id , dong_id , category_id ,sub_category_id)
    store_name = store['store_name']
    store_phone = store['store_phone']
    store_address = store['store_address']
    store_rating = float(store['store_rating'])
    store_review_count = int(store['store_review_count'])
    store_blog_count = int(store['store_blog_count'])
    store_naver_page = store['store_naver_page']
    store_web_site = store['store_web_site']

    cur = con.cursor()
    sql = "insert into `PLACE` (`gu_id`,`dong_id`,`phone_number`,`name`,`address`,`naver_star_rate`,`category_id`,`sub_category_id`,`naver_url`,`naver_blog_review_count`,`naver_buyer_review_count`,`homepage_url` ) " \
          "values(%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s) "


    cur.execute(sql,(gu_id,dong_id,store_phone,store_name,store_address,store_rating,category_id,sub_category_id,store_naver_page,store_blog_count,store_review_count,store_web_site))
    con.commit()

    print("INSERT!!!")
    print("DB에 새로운 record 를 생성합니다!")
    print("새로 갱신되는 record 정보 : ",store)
    pass


def update_store(store, foreign_key_info,target_id):

    print('\n**************************************')
    print(store)
    print(foreign_key_info)
    print(target_id)
    print('**************************************\n')

    gu_id , dong_id , category_id ,sub_category_id = \
        foreign_key_info['gu_id'], \
        foreign_key_info['dong_id'], \
        foreign_key_info['category_id'], \
        foreign_key_info['sub_category_id']
    print("구 동 카테고리 ",gu_id , dong_id , category_id ,sub_category_id)

    store_name = store['store_name']
    store_phone = store['store_phone']
    store_address = store['store_address']
    store_rating = float(store['store_rating'])
    store_review_count = int(store['store_review_count'])
    store_blog_count = int(store['store_blog_count'])
    store_naver_page = store['store_naver_page']
    store_web_site = store['store_web_site']

    cur = con.cursor()
    sql = "update PLACE set phone_number = %s ," \
          " name = %s ," \
          " address = %s ," \
          " naver_star_rate = %s ," \
          " naver_url = %s ," \
          " naver_blog_review_count = %s ," \
          " naver_buyer_review_count = %s ," \
          " homepage_url = %s " \
          " WHERE place_id = %s"

    cur.execute(sql,(store_phone,store_name,store_address,store_rating,store_naver_page,store_blog_count,store_review_count,store_web_site,target_id))
    con.commit()
    print("UPDATE!!!")
    print("DB에 존재했던 record 를 업데이트합니다.!")
    print("업데이트되는 record 정보 : ",store,"\n", "place_id :",target_id)
    pass


def get_same_address_store(same_phone_store, store):
    store_address = store['store_address']
    store_address_bunji = store_address.split(' ')[3]
    return list(filter(lambda x: store_address_bunji in x, same_phone_store))


def get_same_name_store(same_phone_store, store):
    store_name = store['store_name']
    store_first_name = store_name.split(' ')[0]
    return list(filter(lambda x: store_first_name in x, same_phone_store))


def get_same_address_and_name_store(store, foreign_key_info):
    gu_id , dong_id , category_id ,sub_category_id = \
        foreign_key_info['gu_id'], \
        foreign_key_info['dong_id'], \
        foreign_key_info['category_id'], \
        foreign_key_info['sub_category_id']
    store_name = store['store_name'].split(' ')[0]
    store_address = store['store_address'].split(' ')[3]
    cur = con.cursor()
    sql = "select * from PLACE " \
          "where PLACE.address LIKE '%{}%' " \
          "and PLACE.name LIKE '%{}%' " \
          "and PLACE.dong_id = {} " \
          "and PLACE.naver_star_rate is NULL".format(store_address,store_name,dong_id)

    cur.execute(sql);
    res = list(cur.fetchall())
    return res



class NaverUpdateManager():
    def __init__(self,location_list):
        self.location_list = location_list


    def fetch_store(self,store,foreign_key_info):
        same_phone_store = get_same_phone_store(store,foreign_key_info)
        same_phone_store_count = len(same_phone_store)

        if is_duplicate(store,foreign_key_info):
            return

        if same_phone_store_count == 0:
            same_address_and_name_store = get_same_address_and_name_store(store,foreign_key_info)
            if len(same_address_and_name_store) == 1:
                place_target_id = same_address_and_name_store[0][0]
                update_store(store , foreign_key_info,place_target_id)
            else:
                insert_store(store,foreign_key_info)


        if same_phone_store_count == 1:
            place_target_id = same_phone_store[0][0]
            update_store(store,foreign_key_info,place_target_id)
        else:
            same_address_store = get_same_address_store(same_phone_store,store)#8번째가 주소
            same_name_store = get_same_name_store(same_phone_store,store)

            same_address_store_ids = set(map(lambda x: x[0], same_name_store))
            same_name_store_ids = set(map(lambda x: x[0], same_name_store))
            same_address_and_name_ids = same_address_store_ids.intersection(same_name_store_ids)

            if len(same_address_and_name_ids) == 1:
                place_target_id = list(same_address_and_name_ids)[0]
                update_store(store,foreign_key_info,place_target_id)

            elif len(same_name_store_ids) == 1:
                place_target_id = list(same_name_store_ids)[0]
                update_store(store,foreign_key_info,place_target_id)

            elif len(same_address_store_ids) == 1:
                place_target_id = list(same_address_store_ids)[0]
                update_store(store,foreign_key_info,place_target_id)



        # print(same_phone_store)
        # print("table 에 같은전화번호의 정보가 :",len(same_phone_store),"개  존재합니다")
        # if else 존나 조지기

    def excute_crawling(self):



        cur = con.cursor()
        sql = 'select CATEGORY.category_id , CATEGORY.name , SUB_CATEGORY.sub_category_id ,SUB_CATEGORY.name from CATEGORY inner join SUB_CATEGORY  on CATEGORY.category_id = SUB_CATEGORY.category_id;'
        cur.execute(sql)

        categories = list(cur.fetchall())[5:6]


        for location in self.location_list:
            gu_id , gu_name  , dong_id , dong_name = location

            for category in categories:
                category_id ,category_name , sub_category_id , sub_category_name = category

                foreign_keys={
                    'gu_id' : int(gu_id),
                    'dong_id' : int(dong_id),
                    'category_id' : int(category_id),
                    'sub_category_id':int(sub_category_id)
                }

                crawler = naver.Crawler(gu_name,dong_name,sub_category_name)
                ul = crawler.get_info()

                for li in ul:

                    print("\n검색된 결과")
                    self.fetch_store(li, foreign_keys) #li 는 현재 넣을려고 하는 dictionary 를 나타냅니다.
                    print("")

        con.close()


# 예시로 출력 되는 데이터
# {
#     "store_name": "괴르츠",
#     "store_rating": "4.14",
#     "store_review_count": "162",
#     "store_blog_count": "490",
#     "store_naver_page": "https://map.naver.com/v5/entry/place/11726132",
#     "store_naver_id": "11726132",
#     "store_address": "서울 마포구 상수동 304-1 JNC빌딩 7층",
#     "store_phone": "02-336-1745",
#     "store_web_site": "https://app.catchtable.co.kr/ct/shop/gortz"
# }
