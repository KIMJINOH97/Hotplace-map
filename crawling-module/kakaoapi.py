import requests
import config
import json


#url = 'https://dapi.kakao.com/v2/local/search/keyword.json?page=2&size=15&query={}'.format(searching)
KEYWORD_URL = 'https://dapi.kakao.com/v2/local/search/keyword.json'
ADDRESS_URL = 'https://dapi.kakao.com/v2/local/search/address'

searching = '상수동 맛집'
headers = {"Authorization": "KakaoAK "+config.key}

# 동의 중심을 기준으로 할 때 필요한 request
add_params = {'query': '마포구 상수동'}
add_res = requests.get(ADDRESS_URL, params=add_params, headers=headers).json()
add_doc = add_res['documents']
address_info = add_doc[0]['address']
dong_x, dong_y = address_info['x'], address_info['y']

print(dong_x, dong_y)

# 00동 기준 반경 1키로 검색
key_params = {'page': 1, 'size': 15, 'query': searching, 'category_group_code': 'CE7',
              'x': dong_x, 'y': dong_y, 'radius': 1000}
key_res = requests.get(KEYWORD_URL, params=key_params, headers=headers).json()

place_list, meta = key_res['documents'], key_res['meta']
total_count = meta['total_count']
page_cnt = total_count//15

# 검색 정보
print(meta)

all_place = []
for i in range(1, page_cnt):
    if i > 45: break

    key_params['page'] = i
    key_res = requests.get(KEYWORD_URL, params=key_params, headers=headers).json()
    place_list = key_res['documents']
    for place_dic in place_list:
        place_name = place_dic['place_name']
        all_place.append(place_name)

for i,place in enumerate(all_place):
    if i % 10 == 0: print("")
    print(place, end=" ")

""" 
CE7 : 카페
FD6 : 음식점
#########documents#############
address_name 서울 마포구 상수동 312-8
category_group_code FD6
category_group_name 음식점
category_name 음식점 > 양식
distance 
id 24060955
phone 02-3142-1516
place_name 바비레드 홍대점
place_url http://place.map.kakao.com/24060955
road_address_name 서울 마포구 독막로15길 25
x 126.921917323662
y 37.5488001921376
"""


# for place_dic in place_list:
#     print("")
#     for key in place_dic:
#         print(key, place_dic[key])
#     print("")