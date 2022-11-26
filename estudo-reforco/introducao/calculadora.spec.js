const calculadora = require("./calculadora")

describe('Calculadora', () => {
   test("true é igual a true", ()=>{
    expect(true).toBe(true)
   }) 

   test('deve somar a + b e retornar o resultado', () => {
    const a = 10
    const b = 3

    const resultado = calculadora.somar(a, b)

    expect(resultado).toBe(13)
   });

   test("deve multiplicar a * b e retornar o resultado", () => {
    const a = 3
    const b = 2

    const resultado = calculadora.multiplicar( a, b)

    expect(resultado).toBe(6)
   })

});










// expect tem vários métodos
//depois posso fazer com it e should
// toBe(true) é como se fosse um if(true === true)
//toEqual(true) é como se fosse if(true == true)
// not.be(true) é como se fosse if(true != true)
// expect(calculadora.somar(10,3) == 13) - exemplo de má prática
// quando dá uma falha, temos duas hipóteses: o teste está errado ou o código está errado