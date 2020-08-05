from datetime import datetime

types = {
    "danger"  : '\x1b[31m',
    "warning" : '\x1b[33m',
    "info"    : '\x1b[36m'
}

def get_time_now():
    return datetime.now().strftime("%d/%m/%Y %H:%M:%S")

def out(type, message):
    print(f'{types[type]}{message}{types[type]}')

def save(type, message):
    # vai salvar os logs dos processos do dia
    return None

def start(total):
    message = f'''
    *                   Robo Iniciado na data {get_time_now()}                   *
    *                                                                               *
    *                      _______________________________________                  *
    *                    /_________                                \\                *
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
    *                     \\______________________________/ /                        *
    *                     \\_______________________________/                         *
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
    *                                                                               *\n
    Enviando mensagens para {total['perfis']} perfis em {(str(total['contas']) + " contas" if total['contas'] > 1 else str(total['contas']) + " conta")}
    '''
    out("info", message)