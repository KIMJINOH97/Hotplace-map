import pymysql
import config

import naverCrawler as naver
import json
# con = pymysql.connect(
#     host=config.db_config['host'],
#     user=config.db_config['user'],
#     password=config.db_config['password'],
#     db=config.db_config['db'],
#     charset="utf8"
# )

# cur = con.cursor()
#
# sql = "select * from student";
#
# cur.execute(sql);
# for i in cur:
#     print(i)
# con.commit();
# con.close();

goo="마포구"
dong="상수동"
keyword=['카페','한식집','일식집','중식집','양식집','술집']

## 모든리스트를 가져오기

for key in keyword:
    crawler = naver.Crawler(goo, dong, key)
    ul = crawler.get_info()


    for li in ul:
        print(json.dumps(li,ensure_ascii=False, indent=4))
