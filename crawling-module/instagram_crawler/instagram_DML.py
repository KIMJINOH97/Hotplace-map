import os, sys, pymysql
sys.path.append(os.path.dirname(os.path.abspath(os.path.dirname(__file__))))
from config import db_config

from instagramConstant import INSTAGRAM_TAG_URL, HASH_TAG, URL, NAME
from instagramCrawler import INSTAGRAM_CRAWLER

# 'select a.gu_id,a.gu_name,b.dong_id,b.dong_name from GU a INNER JOIN DONG b ON a.gu_id = b.gu_id;'


class InstaUpdateManager():
    def __init__(self):
        self.con = pymysql.connect(
            host=db_config['host'],
            user=db_config['user'],
            password=db_config['password'],
            db=db_config['db'],
            charset="utf8"
        )
        self.cursor = self.con.cursor()
        self.instagramCrawler = INSTAGRAM_CRAWLER()

    def input_dong(self):
        cur = self.cursor
        sql = "select D.dong_id, D.dong_name, G.gu_name from GU G, DONG D where G.gu_id = D.gu_id;"
        cur.execute(sql)
        gu_list = cur.fetchall()
        for i, gu in enumerate(gu_list):
            if i % 2 == 0: print()
            print(gu, end=" ")
        START_ID = int(input("\n시작할 동 ID를 입력하세요: "))
        END_ID = int(input("\n끝날 동 ID를 입력하세요: "))

        return [i for i in range(START_ID, END_ID + 1)]

    def update_hashtag(self, placeInfo, dong):
        curor = self.cursor
        placeName, hashtag, url = placeInfo[NAME], placeInfo[HASH_TAG], placeInfo[URL]
        selectPlaceQuery = 'select * from PLACE P where P.name = %s and P.dong_id = %s;'
        curor.execute(selectPlaceQuery, (placeName, dong))

        # 해시태그, URL 업데이트
        result = curor.fetchall()
        placeId = result[0][0]
        hashtagUpdateQuery = "update PLACE SET instagram_hashtag = %s, instagram_url = %s " \
                     "where place_id = %s;"
        curor.execute(hashtagUpdateQuery, (hashtag, url, placeId))

    def update_instagram(self):
        con = self.con
        cur = self.cursor
        allOfDongId = self.input_dong()
        instagramCrawler = self.instagramCrawler
        instagramCrawler.login()

        for index, dong in enumerate(allOfDongId):
            selectAllPlaceByDongQuery = "select * from PLACE P where P.dong_id = {};".format(dong)
            cur.execute(selectAllPlaceByDongQuery)

            allOfPlace = cur.fetchall()

            # 4번째 컬럼이 음식점의 이름
            allOfPlaceName = [place[4] for place in allOfPlace]

            print("=" * 30 + "ID : {}동 시작".format(dong) + "=" * 30 + "\n")

            for i, place in enumerate(allOfPlaceName):
                print("*" * 20 + "ID : {}동 {}번째 {} update 시작".format(dong, i, place) + "*" * 20 + "\n")
                placeInfo = instagramCrawler.crawlFood(place)
                self.update_hashtag(placeInfo, dong)
                # 만약 넣을 때는 그냥 주석 풀어주면 됨.
                con.commit()
                print(placeInfo)
                print("\n" + "*" * 20 + "ID : {}동 {}번째 {} update 끝".format(dong, i, place) + "*" * 20 + "\n")

            print("=" * 30 + "ID : {}동 끝".format(dong) + "=" * 30 + "\n")

        return None


if __name__ == '__main__':
    manager = InstaUpdateManager()
    manager.update_instagram()
