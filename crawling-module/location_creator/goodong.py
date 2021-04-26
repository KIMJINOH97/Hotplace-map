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





for i in d.keys():
    cur = con.cursor()
    sql = "insert into `GU` (`gu_name`) values(%s)"
    cur.execute(sql,i)

con.commit();
con.close();
file.close()