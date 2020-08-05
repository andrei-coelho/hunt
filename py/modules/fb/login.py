from modules.cookie import cookie
from selenium import webdriver
import os, time

FB_PAGE = "https://www.facebook.com/"

'''''''''''
    Login módulo
    Este módulo sempre retornará um driver configurado
    com cookies setados para uso dos demais módulos em 
    determinadas páginas do FB
'''''''''''

def login(conta):

    chrome = webdriver.Chrome()

    try:
        # se um arquivo de cookie exisir carregue-o
        # e seta os cookies no driver
        os.path.isfile(cookie.get_file(conta['email']))
        cookie.load_cookies(chrome, conta['email'], FB_PAGE)
        chrome.get(FB_PAGE)
        return chrome
    except FileNotFoundError :
        # se não existir entra na página e gere o cookie
        return enter_in_page(chrome, conta)


def enter_in_page(chrome, conta):    
    # faz o login
    chrome.get(FB_PAGE)
    cookie.save_cookies(chrome, conta['email'])
    chrome.find_element_by_xpath("//input[@id='email']").send_keys(conta['email'])
    chrome.find_element_by_xpath("//input[@id='pass']").send_keys(conta['senha'])
    chrome.find_element_by_id("loginbutton").click()
    time.sleep(2)
    cookie.save_cookies(chrome, conta['email'])
    chrome.quit()
    return login(conta)