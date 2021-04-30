import requests
import config

KEYWORD_URL = 'https://dapi.kakao.com/v2/local/search/keyword.json'
ADDRESS_URL = 'https://dapi.kakao.com/v2/local/search/address'
headers = {"Authorization": "KakaoAK "+config.key}

"""
#동의 중심을 기준으로 할 때 필요한 request
add_params = {'query': '마포구 상수동'}
add_res = requests.get(ADDRESS_URL, params=add_params, headers=headers).json()
add_doc = add_res['documents']
address_info = add_doc[0]['address']
dong_x, dong_y = address_info['x'], address_info['y']
#'x': dong_x, 'y': dong_y, 'radius': 300
key_res = requests.get(KEYWORD_URL, params=key_params, headers=headers).json()
"""


def get_code(word):
    if "카페" == word: return "CE7"
    elif "핫플레이스" == word: return "AT4"
    else: return "FD6"


class KAKAO_API:
    def __init__(self):
        self.all_place = []

    def find(self, gu, dong, keyword):
        searching = gu + dong + keyword
        key_params = {'size': 15, 'query': searching, 'category_group_code': get_code(keyword)}

        all_place = self.all_place
        i = 1
        is_last = False
        while True:
            if is_last: break
            key_params['page'] = i
            i += 1
            key_res = requests.get(KEYWORD_URL, params=key_params, headers=headers).json()
            place_list, meta = key_res['documents'], key_res['meta']
            print(meta['is_end'])
            if meta['is_end']: is_last = True

            for place_dic in place_list:
                place_name = place_dic['place_name']
                id = place_dic['id']
                phone = place_dic['phone']
                place_url = place_dic['place_url']
                road_address_name, address_name = place_dic['road_address_name'], place_dic['address_name']
                x, y = place_dic['x'], place_dic['y']

                # 쿼리 날린 동과 일치하면 넣음
                if dong in address_name.split():
                    all_place.append({'id': id, 'phone': phone, 'place_name': place_name, 'place_url': place_url,
                                  'address_name': address_name, 'road_address_name': road_address_name, 'x': x, 'y': y})
        return self.all_place


if __name__ == '__main__':
    pl = KAKAO_API()
    all_place = pl.find("마포구", "상수동", "카페")
    for place in all_place:
        print(place)

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