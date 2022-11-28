const calculadora = {
  somar(a, b) { return a+b },
<<<<<<< HEAD
  multiplicar(a, b) { return a* b},
=======
  multiplicar(a, b) {
     return a * b
    },
>>>>>>> a47f9d3ef6195d0c679fbd81dce9a72cf2a81277
  subtrair(a,b) { return a-b },
  dividir(a,b) {
    if (a === 0) throw new Error()
    if (b === 0) throw new Error()
    return a/b
  }
}
module.exports = calculadora