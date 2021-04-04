from bs4 import BeautifulSoup as bs
from selenium import webdriver
from time import sleep
from selenium.webdriver.common.keys import Keys
import time
import config

url = 'https://map.naver.com/'
chrome_driver = config.DRIVER_PATH

driver = webdriver.Chrome(chrome_driver)
driver.implicitly_wait(5)

food = ['상수역 카페']

for f in food:
    driver.get(url)

    # 검색어 입력
    driver.find_element_by_css_selector(
        '#container > shrinkable-layout > div > app-base > search-input-box > div > div > div > input').send_keys(f) #검색어 입력하는 부분
    # driver.find_element_by_css_selector('#container > shrinkable-layout > div > app-base > search-input-box > div > div > button').click()


    driver.find_element_by_css_selector(
        '#container > shrinkable-layout > div > app-base > search-input-box > div > div > div > input').send_keys(
        Keys.RETURN) # 입력한 검색어 Enter키 누름
    req = driver.page_source
    #soup = bs(req, 'html.parser')
    #print(soup.find_all('li'))

    # Iframe 찾기
    # 시발 이거 왜 없으면 안되냐?

    print("처음 위치:",driver);

    driver.find_element_by_css_selector('#searchIframe') #driver  iframe 위치 찾기
    print("찾고자 하는 iframe")

    iframes = driver.find_elements_by_tag_name('iframe')

    print("첫번째")
    for i in iframes:
        print(i)
    # print(iframes)
    print(driver);
    driver.switch_to.frame(iframes[4]) # 5번째 iframe 을 사용해야함
    # print(driver);

    # print(iframes)
    html = driver.page_source

    soup = bs(html, 'html.parser')
    # print(soup)nd 반환 형 class임.
    store_li = soup.find('div', id = '_pcmap_list_scroll_container').select_one('div > ul')
    for li in store_li:
        print(li.getText())

    for i in range(1,10):
        #실제로 왼쪽의 리스트(가게 하나하나)를 누르는 부분
        driver.find_element_by_css_selector('#_pcmap_list_scroll_container > ul > li:nth-child('+str(i)+') > div').click();
        driver.implicitly_wait(3)
        #기다리기
        sleep(0.5)
        driver.switch_to.default_content() #바깥 프레임으로 탈출

        e = driver.find_element_by_css_selector('#entryIframe')  #오른쪽 설명피드창 Frame 가져오기
        new_iframes =  driver.find_elements_by_tag_name('iframe')

        # print("e:",e);
        # print("new_iframes : ",new_iframes)   #for debugging

        driver.switch_to.frame(new_iframes[5]) #프레임
        driver.implicitly_wait(3)

        html2 = driver.page_source
        sp = bs(html2, 'html.parser')
        # print(sp)
        st = sp.find('span',class_="_3XamX")
        rating = sp.find('span',class_='_1A8_M')
        address = sp.find('span',class_='_2yqUQ')

        print("$$$$$$$$$$$$$$$$$$")
        print(st.getText() ,"/" ,rating.getText(),"/" ,address.getText()) #이부분 예외처리가 필요함
        #네이버 서버에서 자꾸 호출할경우 500 에러가 뜨는것을 포착함


        name = sp.find_all('div',class_="place_detail_wrapper")

        # print("-----------------------new store--------------------")
        # for i in name:
        #     print(i.getText())   #for debugging

        driver.switch_to.default_content()#바깥 프레임으로 나오기
        driver.switch_to.frame(iframes[4]) #다른 가게 클릭하기 위해서 다시 왼쪽프레임으로 이동하기
        # print(driver.page_source)

    # print(driver) #for debugging
