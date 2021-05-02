import os, sys, pymysql
sys.path.append(os.path.dirname(os.path.abspath(os.path.dirname(__file__))))
import config

from instagramCrawler import INSTAGRAM_CRAWLER

# 'select a.gu_id,a.gu_name,b.dong_id,b.dong_name from GU a INNER JOIN DONG b ON a.gu_id = b.gu_id;'

class InstaUpdateManager():
    def __init__(self):
        self.con = pymysql.connect(
            host=config.db_config['host'],
            user=config.db_config['user'],
            password=config.db_config['password'],
            db=config.db_config['db'],
            charset="utf8"
        )

    def input_dong(self):
        con = self.con
        cur = con.cursor()
        sql = "select G.gu_id, G.gu_name from GU G;"
        cur.execute(sql)
        gu_list = cur.fetchall()
        for i, gu in enumerate(gu_list):
            if i % 5 == 0: print()
            print(gu, end=" ")
        GU_ID = input("\n구 ID를 입력하세요: ")

        sql = "select D.dong_id, D.dong_name from GU G, DONG D where G.gu_id = D.gu_id and G.gu_id = %s;"
        cur.execute(sql, GU_ID)
        dong_list = cur.fetchall()
        for i, d in enumerate(dong_list):
            if i % 5 == 0: print()
            print(d, end=" ")

        dong_id = input("\n동 ID를 입력하세요: ")
        return dong_id

    def update_instagram(self, dong):
        con = self.con
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

        # 만약 넣을 때는 그냥 주석 풀어주면 됨.
        # con.commit()
        # con.close()

if __name__ == '__main__':
    manager = InstaUpdateManager()
    dong = manager.input_dong()
    manager.update_instagram(dong)
