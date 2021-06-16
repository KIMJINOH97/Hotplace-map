import kakaoCrawler

if __name__ == '__main__':
    crawler = kakaoCrawler.KAKAO_CRAWLER()
    dong_list = crawler.input_dong()
    for dong in dong_list:
        crawler.find_star(dong)
    crawler.con.close()