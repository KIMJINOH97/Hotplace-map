import requests
import config
import json
searching = '상수동 맛집'
url = 'https://dapi.kakao.com/v2/local/search/keyword.json?page=2&size=15&query={}'.format(searching)
headers = {
    "Authorization": "KakaoAK "+config.key
}
places = requests.get(url, headers = headers).json()['documents']

for i in places:
    print("");
    for j in i:
        print(j , i[j])
    print("");