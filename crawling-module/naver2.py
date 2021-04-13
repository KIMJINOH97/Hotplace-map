from bs4 import BeautifulSoup as bs
from selenium import webdriver
from time import sleep
from selenium.webdriver.common.keys import Keys
import re
import time
import config

url = 'https://map.naver.com/'
chrome_driver = config.DRIVER_PATH

driver = webdriver.Chrome(chrome_driver)
driver.implicitly_wait(5)

food = ['상수동 카페']
dong="상수동";
patten = re.compile("restaurant/\d+/review")

def get_naver_url(id):
    return 'https://map.naver.com/v5/entry/place/'+id

for f in food:
    driver.get(url)

    # 검색어 입력
    driver.find_element_by_css_selector('#container > shrinkable-layout > div > app-base > search-input-box > div > div > div > input').send_keys(f) #검색어 입력하는 부분
    driver.find_element_by_css_selector('#container > shrinkable-layout > div > app-base > search-input-box > div > div > div > input').send_keys(Keys.RETURN) # 입력한 검색어 Enter키 누름
    # req = driver.page_source


    driver.find_element_by_css_selector('#searchIframe') #driver  iframe 위치 찾기


    iframes = driver.find_elements_by_tag_name('iframe')

    driver.switch_to.frame(iframes[4]) # 5번째 iframe 을 사용해야함



    sleep(4)
    driver.implicitly_wait(3);

    isEndPoint = False #상수동 이 안나왔을 경우.

    for j in range(0,6):

        if isEndPoint:
            break

        for i in range(1,51):
            if isEndPoint:
                break
            try:
                #실제로 왼쪽의 리스트(가게 하나하나)를 누르는 부분

                driver.execute_script(' document.querySelector(\'#_pcmap_list_scroll_container > ul > li:nth-child('+str(i)+')\').scrollIntoView(true);') #i번째 리스트의 가게를 상단으로 스크롤하기
                driver.find_element_by_css_selector('#_pcmap_list_scroll_container > ul > li:nth-child('+str(i)+') ._28E5D').click() ##_28E5D 는 각 리스트의 가게이름을 의미함  #카페검색시

            except:
                try:
                    driver.find_element_by_css_selector('#_pcmap_list_scroll_container > ul > li:nth-child('+str(i)+') ._1uXIN').click() ##__1uXIN 는 카페가 아닐경우 각리스트의 가게이름의 클래스이름
                except:
                    continue

                    ##추후에 반복문을 통하여 중첩 예외처리를 리팩토링할것!!


            try:
                # driver.implicitly_wait(2)
                sleep(0.5)
                driver.switch_to.default_content() #바깥 프레임으로 탈출
                iframes =  driver.find_elements_by_tag_name('iframe')

                driver.switch_to.frame(iframes[5]) #프레임
                driver.implicitly_wait(2)

                try:
                    driver.find_element_by_css_selector("._1S2_U").click() #_1S2_U 는 지번 이라고 누르는 버튼 태그 클래스이름
                except:
                    print("지번 버튼없음")

                isRealPhoneNum = True
                try:
                    driver.find_element_by_css_selector(".vUqKY").click() #vUqKY 는 전화번호나오게끔 하는 버튼 태그 이름
                    isRealPhoneNum = False
                except:
                    isRealPhoneNum = True


                html = driver.page_source
                sp = bs(html, 'html.parser')


                store_naver_id = str(sp.select_one('._1kUrA > span:nth-child(2) > a')['href'])  # /restaurant/11726132/review/visitor 이걸 추출  ._1kUrA 는 별점 , 블로그리뷰가 나와있는 div태그
                store_naver_id = re.findall('\d+',store_naver_id)[0]


                store_phone = sp.find('span',class_='_3ZA0S') if isRealPhoneNum else sp.find_all('span',class_='_3ZA0S')[1] #전화번호 나와있는 span 태그
                store_web_site =""
                try:
                    store_web_site=sp.find('li',class_="_2iN9b").find('div').find('a')['href']  #웹사이트 나와있는 span 태그 (없을 수도 있음)
                except:
                    store_web_site=""


                store_name = sp.find('span', class_="_3XamX")  #가게이름이 가장크게 나오는 span 태그
                store_rating = sp.find('span', class_='_1A8_M') #"별모양4/5" 처럼 나오는 조그만 span 태그
                store_address = sp.find('span', class_='_2yqUQ') #주소가 있는 span 태그


                store_name = store_name.getText()
                store_rating = store_rating.getText()
                store_rating = re.findall('\d.?\d*/',store_rating)[0][:-1]
                store_naver_page = get_naver_url(store_naver_id)
                store_address = store_address.getText()
                store_phone = store_phone.getText()

                if store_address.find(dong) == -1:
                    print(dong + " 데이터가 더이상 나오지 않습니다.")
                    isEndPoint = True
                    raise Exception

                store_info={}
                store_info['store_name']=store_name
                store_info['store_rating']=store_rating
                store_info['store_naver_page']=store_naver_page
                store_info['store_naver_id']=store_naver_id
                store_info['store_address']=store_address
                store_info['store_phone']=store_phone
                store_info['store_web_site']=store_web_site


                print(store_info)


            except Exception as err:
                print("별점이나 전화번호 주소가 없는 상황")

            finally:
                driver.switch_to.default_content()#바깥 프레임으로 나오기
                driver.switch_to.frame(iframes[4]) #다른 가게 클릭하기 위해서 다시 왼쪽프레임으로 이동하기


        driver.find_elements_by_css_selector('#app-root > div a._2bgjK')[1].click(); #_2bgjK 는 하단의 < 1,2,3,4,5 > 의 양쪽 <> 태그이름을 의미함 오른쪽거는 둘중 [1] 에 해당됨

    # print(driver) #for debugging
