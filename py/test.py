# -*- coding: utf-8 -*-
from modules.fb import login, messenger

conta = {
          "nome":"Andrei Coelho",
          "email":"andreifcoelho@gmail.com",
          "senha":"****",
          "msgs":[
              {
                "nome":"Gu",
                "id_fb":"gufeitosacoelho",
                "msg":"Fala Gu! Eu sou o Hunter! Um robô desenvolvido pelo Andrei! Ele pediu para mandar uma mensagem para vc... Está preparado? La vai... 'Vc é uma pessoa chata'. Abraço!"
              }
          ]
        }

driver  = login.login(conta)
messenger.send_message_for(conta['msgs'][0], driver)

