import os
import sys
import config
import pymysql
from kakaoapi import KAKAO_API
con = pymysql.connect(
    host=config.db_config['host'],
    user=config.db_config['user'],
    password=config.db_config['password'],
    db=config.db_config['db'],
    charset="utf8"
)


#  여기서 sql 불러오기
#  [gu_name ,gu_id ,dong_name , dong_id ]  ,  [ category_id ,sub_category_name ,  sub_category_id] needed
#
#

cur = con.cursor()
sql = 'select a.gu_id,a.gu_name,b.dong_id,b.dong_name from GU a INNER JOIN DONG b ON a.gu_id = b.gu_id;'
cur.execute(sql);

locations_code={}

for location in cur:
    gu_id , gu_name  , dong_id , dong_name = location
    locations_code[dong_id] = {
        'gu_id':gu_id,
        'gu_name':gu_name,
        'dong_id':dong_id,
        'dong_name':dong_name
    }

for location in locations_code:
    print('입력코드 : ',location,'  값 :',locations_code[location])



    selected_location = location
    # print(selected_location)
    gu_id , gu_name  , dong_id , dong_name = \
        int(locations_code[selected_location]['gu_id']) , \
        locations_code[selected_location]['gu_name']  , \
        int(locations_code[selected_location]['dong_id']) , \
        locations_code[selected_location]['dong_name']

    sql = 'select a.category_id,a.name,b.sub_category_id,b.name from CATEGORY a INNER JOIN SUB_CATEGORY b ON a.category_id = b.category_id;'
    cur.execute(sql);

    categories = {}
    for category in cur:
        # print(category)
        categories[category[2]]={
            'category_id':category[0],
            'sub_category_id':category[2],
            'name':category[3]
        }

    for category in categories:
        print('옵션코드 : ',category , " 옵션 :",categories[category])

        selected_category = category

    # print(categories[selected_category])

        category_id  = int(categories[selected_category]['category_id'])
        sub_category_id = int(categories[selected_category]['sub_category_id'])
        keyword = categories[selected_category]['name']


        kakao_api = KAKAO_API()
        result = kakao_api.find(gu_name,dong_name,keyword)

        # print(result)
        #kakao api 불러

        for res in result:
            # print(res)
            id, phone_number , place_name , place_url , address_name , x , y =  \
                res['id'],\
                res['phone'],\
                res['place_name'],\
                res['place_url'],\
                res['address_name'],\
                res['x'],\
                res['y']


            print(gu_id , dong_id,phone_number,place_name,x,y,address_name,id,place_url,category_id,sub_category_id)

            sql = "insert into `PLACE` (`gu_id`,`dong_id`,`phone_number`,`name`,`longitude_x`,`latitude_y`,`address`,`kakao_id`,`kakao_url`,`category_id`,`sub_category_id` ) " \
                  "values(%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s) "

            cur.execute(sql,(gu_id , dong_id,phone_number,place_name,x,y,address_name,id,place_url,category_id,sub_category_id))

    con.commit()

con.close()



# 오기
# print(locations_code)

# ret = kakao_api.불러오기(gu_name , dong_name , sub_catogory_name)

# for  i in ret :
#     sql 로 insert      gu_id , dong_id , category_id , sub_category_id 필요