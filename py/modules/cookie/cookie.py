
'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
    Cookie Module
    module for cookie management in webdriver
    Create by Artur Spirin
    https://github.com/ArturSpirin/YouTube-WebDriver-Tutorials/blob/master/Cookies.py

'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''

import pickle
import pprint
import os

PATH = os.getcwd() 


def get_file(filename):
    return PATH+'\\cookies\\'+filename+'.txt'


def save_cookies(driver, filename):
    pickle.dump(driver.get_cookies(), open(get_file(filename), "wb"))


def load_cookies(driver, filename, url=None):
    cookies = pickle.load(open(get_file(filename), "rb"))
    driver.delete_all_cookies()
    # have to be on a page before you can add any cookies, any page - does not matter which
    driver.get("https://google.com" if url is None else url)
    for cookie in cookies:
        if isinstance(cookie.get('expiry'), float):#Checks if the instance expiry a float 
            cookie['expiry'] = int(cookie['expiry'])# it converts expiry cookie to a int 
        driver.add_cookie(cookie)


def delete_cookies(driver, domains=None):

    if domains is not None:
        cookies = driver.get_cookies()
        original_len = len(cookies)
        for cookie in cookies:
            if str(cookie["domain"]) in domains:
                cookies.remove(cookie)
        if len(cookies) < original_len:  # if cookies changed, we will update them
            # deleting everything and adding the modified cookie object
            driver.delete_all_cookies()
            for cookie in cookies:
                driver.add_cookie(cookie)
    else:
        driver.delete_all_cookies()