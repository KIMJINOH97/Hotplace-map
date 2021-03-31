from bs4 import BeautifulSoup as bs
from selenium import webdriver
from selenium.webdriver.common.keys import Keys
import time
import config

url = 'https://map.naver.com/'
chrome_driver = config.DRIVER_PATH

driver = webdriver.Chrome(chrome_driver)
driver.implicitly_wait(5)

food = ['상수역 카페', '상수역 음식점']

for f in food:
    driver.get(url)

    # 검색어 입력
    driver.find_element_by_css_selector(
        '#container > shrinkable-layout > div > app-base > search-input-box > div > div > div > input').send_keys(f)
    # driver.find_element_by_css_selector('#container > shrinkable-layout > div > app-base > search-input-box > div > div > button').click()

    # 입력한 검색어 Enter키 누름
    driver.find_element_by_css_selector(
        '#container > shrinkable-layout > div > app-base > search-input-box > div > div > div > input').send_keys(
        Keys.RETURN)
    req = driver.page_source
    #soup = bs(req, 'html.parser')
    #print(soup.find_all('li'))

    # Iframe 찾기
    # 시발 이거 왜 없으면 안되냐?
    print("찾고자 하는 iframe", driver.find_element_by_css_selector('#searchIframe'))

    iframes = driver.find_elements_by_tag_name('iframe')

    driver.switch_to.frame(iframes[4])

    html = driver.page_source
    soup = bs(html, 'html.parser')

    # soup.find_all , find 반환 형 class임.
    store_li = soup.find('div', id = '_pcmap_list_scroll_container').select_one('div > ul')
    for li in store_li:
        print(li.getText())

