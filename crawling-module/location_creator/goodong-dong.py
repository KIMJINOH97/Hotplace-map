import pymysql
from .. import config

file = open('goodong-sample.txt', 'r', encoding='UTF8')



x = file.read();

x = x.split('\n')



d = {}
for i in x:
    [goo,dong] = i.split('\t')[:2]
    if goo in d:
        d[goo].append(dong)
    else:
        d[goo]=[dong]


for i in d:
    d[i] = list(set(d[i]))


con = pymysql.connect(
    host=config.db_config['host'],
    user=config.db_config['user'],
    password=config.db_config['password'],
    db=config.db_config['db'],
    charset="utf8"
)


for i in d.keys():
    print(i)

cur = con.cursor()
sql = "select * from `GU`"
cur.execute(sql)

ids = list(cur)
cur2 = con.cursor()
for tup in ids:
    id , goo_name = tup
    print(tup)

    for dong in d[goo_name]:
        sql2 = "insert into `DONG` (dong_name,gu_id) values(%s,%s)"
        # print(sql2);
        # print(dong,id)
        cur2.execute(sql2,(dong,id))


con.commit();
    # sql = "insert into `GU` (`gu_name`) values(%s)"
    # cur.execute(sql,i)


con.close();
file.close()