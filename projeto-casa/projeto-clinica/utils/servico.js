function verificarItensObrigatorios(body) {

    if (!body.nome) {
        return `O campo nome é obrigatório.`
    }
    if (!body.telefone) {
        return `O campo telefone é obrigatório.`
    }
    if (!body.endereco) {
        return `O campo endereço é obrigatório.`
    }
    return false
}

function validarPlanoDeSaude(body) {

    if (body.plano_saude) {
        if (!body.plano_saude_numero) {
            return `O campo plano_saude_numero é obrigatório.`
        }
    }
    if (typeof body.plano_saude_numero !== "number") {
        return `O campo plano_saude_numero deve ser um número. Preencha o número da sua carteira do plano.`
    }
    return false
}

module.exports = {
    verificarItensObrigatorios,
    validarPlanoDeSaude
}