import os
import sys
import config
import pymysql
from kakaoapi import KAKAO_API
import naverCrawler as naver
con = pymysql.connect(
    host=config.db_config['host'],
    user=config.db_config['user'],
    password=config.db_config['password'],
    db=config.db_config['db'],
    charset="utf8"
)


def is_duplicate(store,foreign_key_info):
    [gu_id , dong_id , category_id ,dong_name] = foreign_key_info
    store_phone = store['store_phone']
    print(gu_id , dong_id , category_id ,dong_name)

    cur = con.cursor()
    sql = "select * from PLACE " \
          "where PLACE.dong_id = {} "\
          "and PLACE.phone_number LIKE '%{}%' " \
          "and PLACE.naver_star_rate is NULL".format(dong_id,store_phone);
    cur.execute(sql)
    res = list(cur.fetchall())

    if len(res) == 0: #clean 한 데이터가 하나도 없다.
        return True
    else:
        return False


def get_same_phone_store(store,foreign_key_info):
    [gu_id , dong_id , category_id ,dong_name] = foreign_key_info
    store_phone = store['store_phone']

    cur = con.cursor()
    sql = "select * from PLACE " \
          "where PLACE.phone_number LIKE '%{}%' " \
          "and dong_id = {}".format(store_phone,dong_id)

    cur.execute(sql);
    res = list(cur.fetchall())
    return res;


def insert_store(store):
    print("DB에 새로운 record 를 생성합니다!")
    print("새로 갱신되는 record 정보 : ",store)
    pass


def update_store(store, foreign_key_info,target_id):
    print("DB에 존재했던 record 를 업데이트합니다.!")
    print("새로 갱신되는 record 정보 : ",store," place_id :",target_id)
    pass


def get_same_address_store(same_phone_store, store):
    store_address = store['store_address']
    store_address_bunji = store_address.split(' ')[3]
    return list(filter(lambda x: store_address_bunji in x, same_phone_store))


def get_same_name_store(same_phone_store, store):
    store_name = store['store_name']
    store_first_name = store_name.split(' ')[0]
    return list(filter(lambda x: store_first_name in x, same_phone_store))



def fetch_store(store,foreign_key_info):
    same_phone_store = get_same_phone_store(store,foreign_key_info)
    same_phone_store_count = len(same_phone_store)

    if same_phone_store_count == 0:
        insert_store(store)

    if is_duplicate(store,foreign_key_info):
        return

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





cur = con.cursor()
sql = 'select a.gu_id,a.gu_name,b.dong_id,b.dong_name from GU a INNER JOIN DONG b ON a.gu_id = b.gu_id;'
cur.execute(sql);
locations_code={}
locations = cur.fetchall()

for location in locations:
    gu_id , gu_name  , dong_id , dong_name = location
    locations_code[dong_id] = {
        'gu_id':gu_id,
        'gu_name':gu_name,
        'dong_id':dong_id,
        'dong_name':dong_name
    }




# 딕셔너리로 저장하는방법


#구 와 동 , 카테고리를 가져와서 네이버크롤링을 돌린다.
#클롤링을 한후 가져와서 모든 결과행마다
foreign_keys={
    'gu_id' : 14,
    'dong_id' : 345,
    'category_id' : 2,
    'sub_category_id':6
}
goo="마포구"
dong="상수동"
keyword='카페'

crawler = naver.Crawler(goo,dong,keyword)
ul = crawler.get_info()

for li in ul:
    phone_number = li['store_phone']

    fetch_store(li,foreign_keys) #li 는 현재 넣을려고 하는 dictionary 를 나타냅니다.
    #
    # cur = con.cursor()
    #
    # sql = "select * from PLACE where PLACE.phone_number LIKE '%{}%'".format(phone_number)
    # cur.execute(sql)
    # res = cur.fetchall()
    #
    # for i in res:
    #     print(i)
    #     fetch_store(i) #i는 tupl


#전화번호가 같은지 조회한다.

#전화번호가 같은경우가 존재한다면

#전화번호가 같은경우가 하나만 존재한다면
# 바로 update

#전화번호가 같은 경우가 둘이상 존재한다면
#
# update data where 전화번호 = same
#




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


con.commit()
con.close()