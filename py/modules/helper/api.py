import urllib.request, json 

totalPerfis = 0
totalContas = 0

'''
    Pega a lista de contas que será usado...
'''
with urllib.request.urlopen("http://127.0.0.1/api_test/index.php?type=accounts") as url:
    listaContas = json.loads(url.read().decode())

'''
    Configura para cada item da lista as suas respectivas mensagens
    que serão enviadas paraa cada perfil
'''
if isinstance(listaContas, list):
    totalContas = len(listaContas)
    i = 0
    for conta in listaContas:
        with urllib.request.urlopen("http://127.0.0.1/api_test/index.php?type=profiles&account="+conta['email']) as url2:
            itens = json.loads(url2.read().decode())
            for item in itens:
                listaContas[i]['msgs'].append(item)
                totalPerfis += 1
            i += 1
else: listaContas = False # se houver erro na requisição da lista

def get_list():
    return listaContas

def get_total():
    return {"contas":totalContas, "perfis":totalPerfis}