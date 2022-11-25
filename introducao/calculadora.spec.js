const calculadora = require("./calculadora")

describe("Calculadora", () => {
    test("true é igual a true", () => {
        expect (true).toBe(true)           
    });


    test("Deve somar a + b e retornar o resultado", () =>{
        const a = 0
        const b = 0

        const resultado = calculadora.somar(a, b)

        expect(resultado).toBe(13)

        //expect(calculadora.somar(10, 3) == 13) má prática
    })
    test("deve multiplicar a * b e retorna o resultado", () => {
        const a = 2
        const b = 2

        const resultado = calculadora.multiplicar(a, b)

        expect(resultado).toBe(4)
    })
    
}); 