from bs4 import BeautifulSoup as bs
from selenium import webdriver
import time

url = 'http://naver.com'
chrome_driver = '/Users/kimjinoh/Desktop/chromedriver'

driver = webdriver.Chrome(chrome_driver)

driver.get(url)