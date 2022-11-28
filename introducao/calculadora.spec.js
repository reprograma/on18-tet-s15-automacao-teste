
const calculadora = require("./calculadora")




describe("Calculadora", () => {
    test("true é igual a true", () => {
        expect(true).toBe(true)
        
    });


    test("deve somar a + b e retornar o resultado", () =>{
    const a = 10
    const b = 3
     const resultado = calculadora.somar(a, b)
     expect(resultado).toBe(13)
    })



    test("deve multiplicar a * b e retornar o resultado", () =>{
        const a = 3
        const b = 5
        const resultado = calculadora.multiplicar(a , b)
        expect(resultado).toBe(15)
    })
});