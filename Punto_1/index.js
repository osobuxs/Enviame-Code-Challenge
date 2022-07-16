// Ejercicio 1 (2pts)
// Crear un script (javascript/nodejs) que reciba un rango entre A y B y a partir de este rango se muestren en pantalla los números primos.

// En matemáticas, un número primo es un número natural mayor que 1 que tiene únicamente dos divisores positivos distintos: él mismo y el 1.

// Ej: Para el rango entre 1 y 10, los números primos serán 2,3,5 y 7.

// El entregable puede ser un script que se pueda ejecutar por terminal o una web simple sin diseño.
const obtenerPrimos = (numA, numB) => {
  const esPrimo = (numero) => {
    for (let i = 2, s = Math.sqrt(numero); i <= s; i++)
      if (numero % i === 0) return false;
    return numero > 1;
  };

  if (numA == numB) {
    if (esPrimo(numA)) {
      console.log("el numero " + numA + " es primo");
    } else {
      console.log("el numero " + numA + " no es primo");
    }
  } else {
    if (numB > numA) {
      for (var i = numA; i <= numB; i++) {
        if (esPrimo(i)) {
          console.log("El número " + i + " es primo");
        }
      }
    }
    if (numA > numB) {
      for (var i = numB; i <= numA; i++) {
        if (esPrimo(i)) {
          console.log("El número " + i + " es primo");
        }
      }
    }
  }
};
