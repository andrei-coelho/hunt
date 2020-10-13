from selenium.common.exceptions import NoSuchElementException
from pynput.keyboard import Key, Controller
import re, time

FB_PAGE = "https://www.facebook.com/"
keyboard = Controller()

def get_url(id_fb):
    #verifica se o ID é uma string ou um numero
    # se for um numero a url gerada será FB_PAGEFB_PAGE + profile.php?id={id}
    id_fb = id_fb.strip()
    if re.search("^[\d]+$", id_fb):
        return f"{FB_PAGE}profile.php?id={id_fb}"
    else:
        return f"{FB_PAGE}{id_fb}"

def send_message_for(profile, driver):
   # envia a mensagem
    driver.get(get_url(profile['id_fb']))
    time.sleep(3)
    try:
        driver.find_element_by_xpath('//img[contains(@src,"https://static.xx.fbcdn.net/rsrc.php/v3/yg/r/111xWLHJ_6m.png")]').click()
        time.sleep(2)
        keyboard.type(profile['mensagem'])
        keyboard.press(Key.enter)
        time.sleep(1)
        keyboard.release(Key.enter)
        time.sleep(2)
        driver.quit()
        return True
    except NoSuchElementException:
        driver.quit()
        return False
