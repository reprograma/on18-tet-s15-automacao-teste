## Pasta de reforço dos estudos.

## RESUMO:

* quando eu crio um arquivo .spec serve para a nossa ferramenta de teste (jest) entender que este arquivo é um arquivo de teste
* .spec em si significa que é um teste unitário
* se fosse calculadora.test.js significa teste de integração
* Posso fazer teste unitário em .test, mas é uma questão de boa prática e isso pode variar

* No código: o describe diz o grupo que está sendo testado; muitos describes dentro do outro indicam que o código está ruim.

* it é a descrição do que está sendo testado naquele momento

* testar comportamento é diferente de testar resultado. 

it("should som a + b and return the result", ()=>{})

* teste também é uma forma de impedir que as pessoas mudem coisas que não podem ou não poderiam ser mudadas

## 

* COMANDOS E ALTERAÇÕES:
- npm i -D supertest (ajuda a configurar ambiente de teste)
- npm i -D jest (framework)


* No package.json:
* isso é colocado depois de devDependencies
"jest": {
    "setupFiles": [
      "<rootDir>/src/test/jest.setup.js"
//o caminho de onde o teste está rodadando
    ]
  }
 


* No script, depois de dev:
"test": "jest --forceExit"
// para a gente não precisar ficar quebrando depois de um erro. 
},
 "test": "jest --forceExit --coverage


 
* Coverage
cobertura de teste
para quem quiser fazer testes no bando de dados é necessário ter as duas configurações de: jest.setup e no package.json a parte do jest.

* .env.test
onde eu guardo a porta e uri de test
