from instagram_DML import InstaUpdateManager

if __name__ == '__main__':
    insta_manager = InstaUpdateManager()
    dong_list = insta_manager.input_dong()
    crawler = insta_manager.crawler
    crawler.login()
    for dong in dong_list:
        insta_manager.update_instagram(dong)
    crawler.logout()
    insta_manager.con.close()