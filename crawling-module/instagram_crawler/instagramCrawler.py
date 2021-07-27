import os, sys
sys.path.append(os.path.dirname(os.path.abspath(os.path.dirname(__file__))))
from config import DRIVER_PATH, INSTAGRAM_USERID, INSTAGRAM_PASSWORD

from instagramConstant import INSTAGRAM_TAG_URL, INSTAGRAM_LOGIN_URL, NAME, HASH_TAG, URL
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
class INSTAGRAM_CRAWLER():
    def __init__(self):
        self.driver = 0

    def login(self):
        chrome_driver = DRIVER_PATH

        options = webdriver.ChromeOptions()
        # options = addHeadLess(options)
        driver = webdriver.Chrome(chrome_driver, options=options)

        driver.implicitly_wait(5)

        driver.get(INSTAGRAM_LOGIN_URL)

        element_id = driver.find_element_by_name("username")
        element_id.send_keys(INSTAGRAM_USERID)
        element_password = driver.find_element_by_name("password")
        element_password.send_keys(INSTAGRAM_PASSWORD)

        driver.find_element_by_css_selector('#loginForm > div > div:nth-child(3) > button') \
            .send_keys(Keys.RETURN)
        self.driver = driver
        sleep(3)

    def logout(self):
        driver = self.driver
        driver.close()


    def crawlFood(self, foodName):
        driver = self.driver
        foodTag = removeFranchise(foodName)
        foodInfo = {NAME: foodName}

        # 인스타그램 태그 검색 URL = (인스타그램 태그 URL + 이름)로 가능
        url = INSTAGRAM_TAG_URL + foodTag
        driver.get(url)
        sleep(0.3)

        try:
            hashtag = driver.find_element_by_css_selector('#react-root > section > main > header > div.WSpok >'
                                        ' div > div.Igw0E.IwRSH.eGOV_._4EzTm.a39_R > span > span').text
            hashtag = int(''.join(hashtag.split(',')))
            # print(foodName, "해쉬태그 개수:", hashtag, "url:", url)
            foodInfo[HASH_TAG], foodInfo[URL] = hashtag, url

        except:
            # 없거나 불발인 경우
            if HASH_TAG not in foodInfo:
                foodInfo[HASH_TAG], foodInfo[URL] = -1, ''

        return foodInfo


def addHeadLess(options):
    options.headless = True
    options.add_argument("--headless")
    options.add_argument("--disable-gpu")
    options.add_argument(
        "user-agent=Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.88 Safari/537.36")

    return options


def removeFranchise(foodName):
    splitFoodName = foodName.split()
    if validateFranchise(splitFoodName):
        splitFoodName.pop()
    return ''.join(splitFoodName)


def validateFranchise(splitFoodName):
    lastLetterOfFoodName = splitFoodName[-1][-1]
    return len(splitFoodName) >= 2 and lastLetterOfFoodName == '점'


if __name__ == '__main__':
    instagram_crawler = INSTAGRAM_CRAWLER()
    print(instagram_crawler.find(FOOD_STORE_2))



    #     driver.find_element_by_css_selector('#react-root > section > nav > div._8MQSO.Cx7Bp > div > div > div.ctQZg > div > div:nth-child(5) > span > img')\
    #         .send_keys(Keys.RETURN)
    #
    #     driver.find_element_by_css_selector('#f279fd515d2023c > div > div > div')\
    #         .send_keys(Keys.RETURN)