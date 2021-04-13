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

food = ['상수동 카페']

for f in food:
    driver.get(url)

    # 검색어 입력
    driver.find_element_by_css_selector(
        '#container > shrinkable-layout > div > app-base > search-input-box > div > div > div > input').send_keys(f) #검색어 입력하는 부분

    driver.find_element_by_css_selector('#container > shrinkable-layout > div > app-base > search-input-box > div > div > div > input').send_keys(Keys.RETURN) # 입력한 검색어 Enter키 누름
    req = driver.page_source


    driver.find_element_by_css_selector('#searchIframe') #driver  iframe 위치 찾기


    iframes = driver.find_elements_by_tag_name('iframe')

    driver.switch_to.frame(iframes[4]) # 5번째 iframe 을 사용해야함



    sleep(4)




    # print(iframes)
    html = driver.page_source

    soup = bs(html, 'html.parser')
    # print(soup)nd 반환 형 class임.
    store_li = soup.find('div', id = '_pcmap_list_scroll_container').select_one('div > ul')
    for li in store_li:
        print(li.getText())

    driver.implicitly_wait(3);
    for j in range(0,6):
        for i in range(1,51):
            try:
                #실제로 왼쪽의 리스트(가게 하나하나)를 누르는 부분

                driver.execute_script(' document.querySelector(\'#_pcmap_list_scroll_container > ul > li:nth-child('+str(i)+')\').scrollIntoView(true);')
                driver.find_element_by_css_selector('#_pcmap_list_scroll_container > ul > li:nth-child('+str(i)+') ._28E5D').click() #
                #_1uXIN 는 각 리스트의 가게이름을 의미함

                driver.implicitly_wait(2)
                sleep(0.5)
                driver.switch_to.default_content() #바깥 프레임으로 탈출

                # e = driver.find_element_by_css_selector('#entryIframe')  #오른쪽 설명피드창 Frame 가져오기
                new_iframes =  driver.find_elements_by_tag_name('iframe')

                # print("e:",e);
                # print("new_iframes : ",new_iframes)   #for debugging

                # try:?


                driver.switch_to.frame(new_iframes[5]) #프레임
                # driver.implicitly_wait(3)

                try:
                    driver.find_element_by_css_selector("._1S2_U").click() #_1S2_U 는 지번 이라고 누르는 버튼 태그 클래스이름
                except:
                    print("지번 버튼없음")

                isRealPhoneNum = True
                try:
                    driver.find_element_by_css_selector(".vUqKY").click() #vUqKY 는 전화번호나오게끔 하는 버튼 태그 이름
                    #예외처리
                    isRealPhoneNum = False
                except:
                    isRealPhoneNum = True


                html2 = driver.page_source
                sp = bs(html2, 'html.parser')
                # print(sp)
                # print(sp)
                # phoneNum = ""
                # if isRealPhoneNum:
                #     phoneNum = sp.find('span',class_='_3ZA0S')
                # else:
                #     phoneNum = sp.find_all('span',class_='_3ZA0S')[1]

                phoneNum = sp.find('span',class_='_3ZA0S') if isRealPhoneNum else sp.find_all('span',class_='_3ZA0S')[1]


                st = sp.find('span',class_="_3XamX")
                rating = sp.find('span',class_='_1A8_M')
                address = sp.find('span',class_='_2yqUQ')


                phonNumString = ''
                try:
                    phonNumString = phoneNum.getText()
                except:
                    phonNumString = "전번없음"
                # print(phonNumString)
                # print("$$$$$$$$$$$$$$$$$$")
                try:
                    print(st.getText() ,"/" ,rating.getText(),"/" ,address.getText() , "/",phonNumString) #이부분 예외처리가 필요함
                except:
                    print("errer")
                #이 두개 print 는 삭제하면 안됨

                #네이버 서버에서 자꾸 호출할경우 500 에러가 뜨는것을 포착함


                name = sp.find_all('div',class_="place_detail_wrapper")

                # print("-----------------------new store--------------------")
                # for i in name:
                #     print(i.getText())   #for debugging

                driver.switch_to.default_content()#바깥 프레임으로 나오기
                driver.switch_to.frame(iframes[4]) #다른 가게 클릭하기 위해서 다시 왼쪽프레임으로 이동하기
                # print(driver.page_source)
            except Exception as err:
                print(err)

        driver.find_elements_by_css_selector('#app-root > div a._2bgjK')[1].click(); #_2bgjK 는 하단의 < 1,2,3,4,5 > 의 양쪽 <> 태그이름을 의미함 오른쪽거는 둘중 [1] 에 해당됨

    # print(driver) #for debugging
