'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
*********************************************************************************
*                                                                               *
*                                                                               *
*                      _______________________________________                  *
*                    /_________                                \                *
*                    |_________/       ____      ____          /|               *
*                     ____    /       /   /     /   /         / /               *
*                   /____/|  /       /   /     /   /         / /                *
*                   |____|/ /       /   /     /   /         / /                 *
*                    __    /       /___/     /___/         / /                  *
*                  /__/|  /      _________________        / /                   *
*                  |__|/ /      /_/_/_/_/_/_/_/_/        / /                    *
*                       /      /_/_/_/_/_/_/_/_/        / /                     *
*                      /      ------------------       / /                      *
*                     /                               / /                       *
*                     \______________________________/ /                        *
*                     \_______________________________/                         *
*                                                                               *
*                                                                               *
*        ____     ____     ____      ____     _____________     ____________    *
*       /   /|   /   /|   /   /|    /   /|   /    ____     /|  /___    ____/|   *
*      /   /_/__/   / /  /   / /   /   / /  /   /  ___/   / /  |__/   / ____/   *
*     /    ____    / /  /   / /   /   / /  /   / /   /   / /     /   / /        *
*    /   / ___/   / /  /   /_/___/   / /  /   / /   /   / /     /   / /         *
*   /___/ /  /___/ /  /_____________/ /  /___/ /   /___/ /     /___/ /          *
*   |____/   |____/   |______________/   |____/    |____/      |____/           *
*                                                                               *
*                                                                               *
*********************************************************************************
*                                                                               *
*                      ****  AUTHOR: Andrei Coelho  ***                         *
*                                                                               *
*********************************************************************************
*                                 MESSENGER                                     *
*********************************************************************************
'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''

# python C:\\python-projects\\hunt_messenger\\hunt.py

from modules.fb import login, messenger 
from modules.helper import api, log

import sys, time

lista         = api.get_list()
contas        = []
timer         = 6 # 600 segundos = 10 minutos para cada conta

def get_next_account(keyAccount, count = 0):

    totalContas   = len(contas)

    if(totalContas == 0 or count == totalContas):
        return False

    if(keyAccount == totalContas):
        keyAccount  = 0

    if(contas[keyAccount]['keyPerfil'] == len(contas[keyAccount]['perfis'])):
        keyAccount += 1
        count     += 1
        return get_next_account(keyAccount, count)

    return [contas[keyAccount], keyAccount]



if lista:

    if len(sys.argv) < 2:
        log.start(api.get_total()) # avisa que iniciou o processo com sucesso

    for conta in lista:
        contas.append({"conta":conta, "keyPerfil":0, "perfis":conta['msgs']})

    keyConta = 0
    timer    = int(timer / len(contas))

    while True:

        account = get_next_account(keyConta)
        
        if account:
            
            conta    = account[0]
            keyConta = account[1] + 1

            driver   = login.login(conta['conta'])
            messenger.send_message_for(conta['perfis'][conta['keyPerfil']], driver)
            conta['keyPerfil'] += 1 
            time.sleep(timer)

        else:break

