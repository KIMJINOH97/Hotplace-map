import sys
import os
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '../')))
import config

import pymysql
import naverUpdateManager as updateManager

con = pymysql.connect(
    host=config.db_config['host'],
    user=config.db_config['user'],
    password=config.db_config['password'],
    db=config.db_config['db'],
    charset="utf8"
)

cur = con.cursor()
sql = 'select a.gu_id,a.gu_name,b.dong_id,b.dong_name from GU a INNER JOIN DONG b ON a.gu_id = b.gu_id;'
cur.execute(sql)
locations = cur.fetchall()

for li in locations:
    print("dong_id : ",li[2]," / dong_name : ",li[3])

print("\n[dong_id 를 기준으로 어디부터 어디까지 순회를 할지 입력하세요\n"
      "입력범위 start_dong_id 와 end_dong_id 둘다 닫힌범위입니다.]\n")

start_id = int(input("start_dong_id 를 입력하세요 ex)345 :"))
end_id = int(input("end_dong_id 를 입력하세요 ex)345 :"))

input_list = list(filter(lambda x: start_id <= x[2] and x[2]<=end_id ,locations))

naver_update_manager = updateManager.NaverUpdateManager(input_list)
naver_update_manager.excute_crawling()
