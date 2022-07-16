//Dado los siguientes json:​
// JSON
let values = {
  1: {
    carrier: "CCH",
    service: "DEX",
  },
  2: {
    carrier: "CCH",
    service: "express",
  },
  3: {
    carrier: "CCH",
    service: "priority",
  },
  15: {
    carrier: "CHP",
    service: "nextday",
  },
  16: {
    carrier: "CHP",
    service: "sameday",
  },
  17: {
    carrier: "CHP",
    service: "express",
  },
};
// JSON
let json = {
  data: {
    BUIN: [
      {
        limit: 1,
        over_carrier_service_id: 17,
        under_carrier_service_id: 17,
      },
      {
        limit: 2,
        over_carrier_service_id: 15,
        under_carrier_service_id: 15,
      },
    ],
    LAJA: [
      {
        limit: 2,
        over_carrier_service_id: 1,
        under_carrier_service_id: 1,
      },
      {
        limit: 5,
        over_carrier_service_id: 2,
        under_carrier_service_id: 2,
      },
      {
        limit: 1,
        over_carrier_service_id: 17,
        under_carrier_service_id: 17,
      },
    ],

    LEBU: [
      {
        limit: 2,
        over_carrier_service_id: 1,
        under_carrier_service_id: 1,
      },
      {
        limit: 6,
        over_carrier_service_id: 3,
        under_carrier_service_id: 3,
      },
      {
        limit: 5,
        over_carrier_service_id: 2,
        under_carrier_service_id: 2,
      },
      {
        limit: 4,
        over_carrier_service_id: 16,
        under_carrier_service_id: 16,
      },
    ],

    LOTA: [
      {
        limit: 2,
        over_carrier_service_id: 15,
        under_carrier_service_id: 15,
      },
      {
        limit: 4,
        over_carrier_service_id: 16,
        under_carrier_service_id: 16,
      },
      {
        limit: 1,
        over_carrier_service_id: 17,
        under_carrier_service_id: 17,
      },
    ],
  },
};

//Se debe generar un script que con estas entradas genere el siguiente resultado:
//Los servicios para cada localidad con mayor limite:

// -------- Resultado esperado ---------

//     let result = {
//         BUIN: {
//             limit: 2,
//             over: {
//                 carrier: "CHP",
//                 service: "nextday",
//             },
//             under: {
//                 carrier: "CHP",
//                 service: "nextday",
//             }
//         },
//         LAJA: {
//             limit: 5,
//             over: {
//                 carrier: "CCH",
//                 service: "express",
//             },
//             under: {
//                  carrier: "CCH",
//                 service: "express",
//             }
//         },
//         LEBU: {
//             limit: 6,
//             over: {
//                 carrier: "CCH",
//                 service: "priority",
//             },
//             under: {
//                  carrier: "CCH",
//                 service: "priority",
//             }
//         },
//         LOTA: {
//             limit: 4,
//             over: {
//                 carrier: "CHP",
//                 service: "sameday",
//             },
//             under: {
//                 carrier: "CHP",
//                 service: "sameday",
//             }
//         }
//    }

const valorCiudad = Object.keys(json.data);
const result = {};
let mayorCantidadServicios = 0;
let ciudadMasServicios;
let cobertura = [];
for (const ciudad of valorCiudad) {
  const key = ciudad;
  const services = json.data[ciudad];
  const limites = services.map((s) => s.limit);
  const limiteMax = Math.max(...limites);
  const service = services.find((s) => s.limit === limiteMax);
  const overKey = service.over_carrier_service_id;
  const underKey = service.under_carrier_service_id;
  const over = values[overKey];
  const under = values[underKey];
  result[key] = {
    limit: service.limit,
    over: over,
    under: under,
  };

  //Encontrar ciudad con mas cantidad de servicios

  if (services.length >= mayorCantidadServicios) {
    mayorCantidadServicios = services.length;
    ciudadMasServicios = key;
  }
  // Encontrar todas las coberturas de los servicios

  cobertura = cobertura.concat(services.map((s) => s.over_carrier_service_id));
}
// Resultado Final
//Los servicios para cada localidad con mayor limite:

const obtenerMayorServicio = () =>
{console.log(`Los servicios para cada localidad con mayor limite:`);
console.log(result);}


//La localidad con mayor cantidad de servicios disponibles
const mayorCantidadDisponibles = () =>{
  console.log(
    `La localidad ${ciudadMasServicios} es la que mayor cantidad de servicios tiene`
  );
  
}

//Encontrar el servicio con mas cobertura
let coberturaTotal = {};
for (const elemento of cobertura) {
  coberturaTotal[elemento] = coberturaTotal[elemento] + 1 || 1;
}
const keyServicio = Object.keys(coberturaTotal);
const mayorNumeroServicio = keyServicio.reduce((keyAnterior, keyActual) => {
  if (coberturaTotal[keyAnterior] > coberturaTotal[keyActual]) {
    return keyAnterior;
  } else {
    return keyActual;
  }
});
//Servicio con mayor cobertura
const mayorCobertura = () =>{
  console.log(
    `El servicio con mayor cobertura es:\n ${mayorNumeroServicio}\n carrier: ${values[mayorNumeroServicio].carrier}\n service: ${values[mayorNumeroServicio].service}`
  );
}

