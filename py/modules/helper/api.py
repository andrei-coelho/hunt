from urllib.request import Request, urlopen
import json, sys

machine = sys.argv[1]
slug_client = sys.argv[2]

totalPerfis = 0
totalContas = 0
listaContas = []

'''
    Pega a lista de contas que será usado...
'''
with urlopen(Request("http://127.0.0.1/api_hunt/"+machine+"/contas/get_messengers/"+slug_client+"/", headers={'User-Agent': 'Mozilla/5.0'})) as url:
    listaContas = json.loads(url.read().decode('utf-8-sig'))

'''
    Configura para cada item da lista as suas respectivas mensagens
    que serão enviadas para cada perfil
'''
if isinstance(listaContas, list):

    totalContas += len(listaContas)
    i = 0

    for conta in listaContas:
        listaContas[i]['msgs'] = []
        with urlopen(Request("http://127.0.0.1/api_hunt/"+machine+"/messenger/get_list/"+slug_client+"/"+str(conta['id']), headers={'User-Agent': 'Mozilla/5.0'})) as url2:
            itens = json.loads(url2.read().decode('utf-8-sig'))
            for item in itens:
                listaContas[i]['msgs'].append(item)
                totalPerfis += 1
            i += 1

else: listaContas = False # se houver erro na requisição da lista

def get_list():
    return listaContas

def get_total():
    return {"contas":totalContas, "perfis":totalPerfis}

def update_status(id_perfil):
    with urlopen(Request("http://127.0.0.1/api_hunt/"+machine+"/messenger/save_status/"+slug_client+"/"+str(id_perfil), headers={'User-Agent': 'Mozilla/5.0'})) as url:
        return True