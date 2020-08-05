
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
    driver.find_element_by_xpath('//a[contains(text(), "Mensagem")]').click()
    time.sleep(2)
    keyboard.type(profile['msg'])
    keyboard.press(Key.enter)
    time.sleep(1)
    keyboard.release(Key.enter)
    time.sleep(1)
    driver.quit()
