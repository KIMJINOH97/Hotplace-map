import os, sys, pymysql, requests
sys.path.append(os.path.dirname(os.path.abspath(os.path.dirname(__file__))))
import config
from selenium import webdriver
from time import sleep
from selenium.webdriver.common.keys import Keys
from bs4 import BeautifulSoup as bs


class KAKAO_CRAWLER():
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
        sql = "select D.dong_id, D.dong_name, G.gu_name from GU G, DONG D where G.gu_id = D.gu_id;"
        cur.execute(sql)
        gu_list = cur.fetchall()
        for i, gu in enumerate(gu_list):
            if i % 2 == 0: print()
            print(gu, end=" ")
        START_ID = int(input("\n시작할 동 ID를 입력하세요: "))
        END_ID = int(input("\n끝날 동 ID를 입력하세요: "))

        return [i for i in range(START_ID, END_ID + 1)]

    def crawler_kakao_map(self, url_list):
        chrome_driver = config.DRIVER_PATH

        driver = webdriver.Chrome(chrome_driver)
        driver.implicitly_wait(5)
        star_list = []
        for url in url_list:
            driver.get(url)
            # 만약 검색이 되지 않는 가게는 -1 대입 나중에 지워주면 됨.
            try:
                star = driver.find_element_by_css_selector('#mArticle > div.cont_essential > div:nth-child(1) > div.place_details > div > div > a:nth-child(3) > span.color_b').text
            except:
                star_list.append(-1)
                continue
            star_list.append(star)
            sleep(0.1)
        driver.close()
        return star_list
        # html = requests.get(url).text
        # soup = bs(html, 'html.parser')
        # print(soup)
        # star = soup.select('#mArticle > div.cont_essential > div:nth-child(1) > div.place_details > div > div > a:nth-child(3) > span.color_b')
        # print(star)


    def find_star(self, dong):
        con = self.con
        cur = con.cursor()
        sql = "select P.place_id, P.kakao_url, P.name from PLACE P where P.dong_id = %s and P.kakao_url is not NULL;"
        cur.execute(sql, dong)
        place_info = cur.fetchall()
        url_list = [p[1] for p in place_info]
        kakao_star = self.crawler_kakao_map(url_list)

        print("*" * 10 + "ID : {}".format(dong) + "번 update 시작" + "*" * 10)
        print("update 된 음식점들 출력")
        for star, place in zip(kakao_star, place_info):
            print("가게 이름: " + place[2] + "별점: " + str(star))
            update_sql = "update PLACE SET kakao_star_rate = %s where place_id = %s;"
            cur.execute(update_sql, (star, place[0]))
        con.commit()
        print("*" * 10 + "ID : {}".format(dong) + "번 update 끝임" + "*" * 10)

if __name__ == '__main__':
    kakao = KAKAO_CRAWLER()
    kakao.find_star(2)