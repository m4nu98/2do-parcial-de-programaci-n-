// Función para guardar autos
function GuardarAutos() {
    let marca = document.forms["autos"]["txtMarca"].value;
    let modelo = document.forms["autos"]["txtModelo"].value;
    let ano = document.forms["autos"]["txtAno"].value;
    let motor = document.forms["autos"]["txtMotor"].value;
    let color = document.forms["autos"]["txtColor"].value;
        
    let doc = { marca: marca, modelo: modelo, ano: ano, motor: motor, color: color };
    let docJSON = JSON.stringify(doc);
  
    fetch('http://localhost:3000/envio_v', {
        method: "post",
        headers: {
            "Content-Type": "application/json"
        },
        body: docJSON
    })
    .then(response => {
        if (response.ok) {
            console.log('Auto guardado exitosamente');
            ObtenerAutos(); // Llamar a ObtenerAutos para actualizar la lista
        } else {
            console.error('Error al guardar el auto');
        }
    })
    .catch(error => {
        console.error('Error al guardar el auto:', error);
    });
  
    // Limpiar los campos del formulario
    document.forms["autos"].reset();
  }
  


  
  // Función para obtener y mostrar autos
  function ObtenerAutos() {
    fetch('http://localhost:3000/asd')
      .then(response => response.json())
      .then(data => {
        console.log(data); // Verifica la respuesta del servidor
  
        let autosList = document.getElementById("autosList");
        autosList.innerHTML = ""; // Limpiar la lista antes de agregar los nuevos datos
  
        data.forEach(auto => {
          let newAuto = document.createElement("div");
          newAuto.innerHTML = `
            <p><strong>Marca:</strong> ${auto.marca}</p>
            <p><strong>Modelo:</strong> ${auto.modelo}</p>
            <p><strong>Año:</strong> ${auto.ano}</p>
            <p><strong>Motor:</strong> ${auto.info.motor}</p>
            <p><strong>Color:</strong> ${auto.info.color}</p>
            <hr>
          `;
          autosList.appendChild(newAuto);
        });
      })
      .catch(error => {
        console.error('Error al obtener los autos:', error);
      });
  }
  
  window.onload = ObtenerAutos;
  