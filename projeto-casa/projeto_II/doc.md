[GET] "/cozinhas/buscar" 
200: retorna todas as cozinhas cadastradas.
500: Internal Server Error

[GET] "/cozinhas/buscar/:id 
parametro: id
200: retornar a cozinha com o id informado
404: not found (nenhuma cozinha encontrada para esse id)

[POST] "/cozinhas/cadastrar" 
201: cadastra uma nova cozinha
400: Bad Request (campo obrigatório)
409: conflito (informação já existe no banco)

[DELETE] "/cozinhas/deletar/:id"
parametro: id
200: deletar uma cozinha por id específico
401: Unauthorized

[PATCH] "/cozinhas/atualizar/:id" 
parametro: id
200: alterar informação específica por id específico 
404: not found
400: Bad request