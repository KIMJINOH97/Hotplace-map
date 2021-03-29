import pymysql
import config
con = pymysql.connect(
    host=config.db_config['host'],
    user=config.db_config['user'],
    password=config.db_config['password'],
    db=config.db_config['db'],
    charset="utf8"
)

cur = con.cursor()

sql = "select * from student";

cur.execute(sql);
for i in cur:
    print(i)
con.commit();
con.close();
#test