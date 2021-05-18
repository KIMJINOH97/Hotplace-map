import requests
import config
import json


#url = 'https://dapi.kakao.com/v2/local/search/keyword.json?page=2&size=15&query={}'.format(searching)
KEYWORD_URL = 'https://dapi.kakao.com/v2/local/search/keyword.json'
ADDRESS_URL = 'https://dapi.kakao.com/v2/local/search/address'

headers = {"Authorization": "KakaoAK "+config.key}

# 동의 중심을 기준으로 할 때 필요한 request



def get_code(s):
    if "카페" in s:
        return "CE7"
    if "핫플레이스" in s:
        return "AT4"
    return "FD6"

goo , dong , keyword = "마포구", "상수동", "일식집"
searching = goo + dong + keyword
ret =[]
for j in range(1,4):
    key_params = {'page': j, 'size': 15, 'query': searching, 'category_group_code': get_code(keyword)}

    key_res = requests.get(KEYWORD_URL, params=key_params, headers=headers).json()

    for i in key_res['documents']:
        ret.append({
            'id':i['id'],
            'phone':i['phone'],
            'place_name':i['place_name'],
            'place_url':i['place_url'],
            'road_address_name':i['road_address_name'],
            'x':i['x'],
            'y':i['y']
        })


# ret = list(filter(lambda x:if dong in x))

# {
#     # 'id': '2057792795'
#     # 'phone': '02-332-1660'
#     # 'place_name': '칸다소바 홍대점
#     # place_url': 'http://place.map.kakao.com/2057792795'
#     # 'road_address_name': '서울 마포구 와우산로 51-6',
#     # 'x': '126.922681800638',
#     # 'y': '37.5492908383254'
# },
# {
#     # 'id': '2057792795'
#     # 'phone': '02-332-1660'
#     # 'place_name': '칸다소바 홍대점
#     # place_url': 'http://place.map.kakao.com/2057792795'
#     # 'road_address_name': '서울 마포구 와우산로 51-6',
#     # 'x': '126.922681800638',
#     # 'y': '37.5492908383254'
# }