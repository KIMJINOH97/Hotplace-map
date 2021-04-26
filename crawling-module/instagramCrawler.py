import config
from selenium import webdriver
from time import sleep
from selenium.webdriver.common.keys import Keys
from bs4 import BeautifulSoup as bs

# 더미 데이터
FOOD_STORE_1 = ['bts', '괴르츠', '카미야', '앵춘', '어반 플레이트','bts', '괴르츠', '카미야', '앵춘', '어반 플레이트','bts',
              '괴르츠', '카미야', '앵춘', '어반 플레이트','bts', '괴르츠', '카미야', '앵춘', '어반 플레이트','bts', '괴르츠',
              '카미야', '앵춘', '어반 플레이트', 'bts', '괴르츠', '카미야', '앵춘', '어반 플레이트','bts', '괴르츠', '카미야',
              '앵춘', '어반 플레이트','bts','괴르츠', '카미야', '앵춘', '어반 플레이트','bts', '괴르츠', '카미야', '앵춘',
              '어반 플레이트','bts', '괴르츠','카미야', '앵춘', '어반 플레이트']

FOOD_STORE_2 = ['bts', '괴르츠', '카미야', '앵춘', '어반 플레이트']


# 가게 게시글 정보, 인스타그램 URL  { 가게: [ 해시태그개수, URL] , ... }
class instagram_crawling():
    def __init__(self):
        self.dic = {}

    def find_info(self, food_list):
        dic = self.dic
        LOGIN_URL = 'https://www.instagram.com/accounts/login/'
        TAG_URL = 'https://www.instagram.com/explore/tags/'

        chrome_driver = config.DRIVER_PATH

        driver = webdriver.Chrome(chrome_driver)
        driver.implicitly_wait(5)

        driver.get(LOGIN_URL)
        driver.maximize_window()

        element_id = driver.find_element_by_name("username")
        element_id.send_keys(config.INSTAGRAM_USERID)
        element_password = driver.find_element_by_name("password")
        element_password.send_keys(config.INSTAGRAM_PASSWORD)

        driver.find_element_by_css_selector('#loginForm > div > div:nth-child(3) > button') \
            .send_keys(Keys.RETURN)

        sleep(2)

        for i, food in enumerate(food_list):
            food_tag = ''.join(food.split())
            # 인스타그램 태그 검색 URL = (인스타그램 태그 URL + 이름)로 가능
            url = TAG_URL+food_tag
            driver.get(url)
            try:
                print(i, food)
                post_cnt = driver.find_element_by_css_selector('#react-root > section > main > header > div.WSpok >'
                                            ' div > div.Igw0E.IwRSH.eGOV_._4EzTm.a39_R > span > span').text
                post_cnt = int(''.join(post_cnt.split(',')))
                print(post_cnt, url)
                if food_tag not in dic:
                    dic[food_tag] = [post_cnt, url]
            except:
                continue

        return dic


if __name__ == '__main__':
    instagram_crawler = instagram_crawling()
    print(instagram_crawler.find_info(FOOD_STORE_2))