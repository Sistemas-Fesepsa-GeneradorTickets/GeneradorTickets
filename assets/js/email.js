const nombre = document.getElementById("txtNombre");
const cbxAreas = document.getElementById("cbxAreas");
const requerimiento = document.getElementById("txtRequerimiento");

let area;

cbxAreas.addEventListener("change", () => {
  area = cbxAreas.options[cbxAreas.selectedIndex].text;
});

async function enviarCorreo() {
  let data = {
    service_id: 'service_ljej8bv',
    template_id: 'template_9wdrx7i',
    user_id: 'xhHxhobRhl7b_9F7X',
    template_params: {
      'nombre': nombre.value,
      'area': area,
      'mensaje': requerimiento.value
    }
  };

  try {
    await fetch('https://api.emailjs.com/api/v1.0/email/send', {
      method: 'POST', // Cambiado de 'type' a 'method'
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json'
      }
    });
  } catch (error) {
    console.log(error);
  }
}

export {
  enviarCorreo
};
