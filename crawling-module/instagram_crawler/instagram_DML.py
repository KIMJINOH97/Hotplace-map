import os, sys, pymysql
sys.path.append(os.path.dirname(os.path.abspath(os.path.dirname(__file__))))
import config

from instagramCrawler import INSTAGRAM_CRAWLER

# 'select a.gu_id,a.gu_name,b.dong_id,b.dong_name from GU a INNER JOIN DONG b ON a.gu_id = b.gu_id;'
def update_instagram(dong):
    con = pymysql.connect(
        host=config.db_config['host'],
        user=config.db_config['user'],
        password=config.db_config['password'],
        db=config.db_config['db'],
        charset="utf8"
    )

    cur = con.cursor()

    sql = "select * from PLACE P where P.dong_id = {};".format(dong)
    cur.execute(sql)
    place_list = cur.fetchall()

    place_name_list = []
    for place in place_list:
        place_name_list.append(place[4])

    crawler = INSTAGRAM_CRAWLER()
    place_dic = crawler.find(place_name_list)
    print(place_dic)
    for place in place_dic:
        hashtag_cnt, instagram_url = place_dic[place]
        sql = 'select * from PLACE P where P.name = %s and P.dong_id = %s;'
        cur.execute(sql, (place, dong))

        # 해시태그, URL 업데이트
        update_place_id = cur.fetchall()[0][0]
        update_sql = "update PLACE SET instagram_hashtag = %s, instagram_url = %s " \
              "where place_id = %s;"
        cur.execute(update_sql, (hashtag_cnt, instagram_url, update_place_id))

if __name__ == '__main__':
    dong = input("동 ID를 입력하세요: ")
    update_instagram(dong)