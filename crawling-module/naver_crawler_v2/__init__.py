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
    print(li)

start_id = int(input("시작할 dong_id 를 입력하세요"))
end_id = int(input("끝날 dong_id 를 입력하세요"))

input_list = list(filter(lambda x: start_id <= x[2] and x[2]<=end_id ,locations))

naver_update_manager = updateManager.NaverUpdateManager(input_list)
naver_update_manager.excute_crawling()
