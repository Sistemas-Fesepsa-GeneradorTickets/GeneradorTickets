import {
    crearRequerimiento,
    crearReferencia,
    subirArchivo,
    obtenerEnlaceDescarga,
  } from "../db/firebase.js";
  
  const formRequerimiento = document.getElementById("formRequerimiento");
  const cbxAreas = document.getElementById("cbxAreas");
  const inputArchivo = document.getElementById("txtArchivo");
  
  let areaRequerimiento;
  const actualFech = new Date();
  const fechaHora = `${actualFech.getDate()}/${actualFech.getMonth() + 1}/${actualFech.getFullYear()} ${actualFech.getHours()}:${actualFech.getMinutes()}:${actualFech.getSeconds()}`;
  
  let archivo;
  
  inputArchivo.addEventListener("change", (e) => {
    archivo = e.target.files[0];
  });
  
  cbxAreas.addEventListener("change", () => {
    areaRequerimiento = cbxAreas.options[cbxAreas.selectedIndex].text;
  });
  
  formRequerimiento.addEventListener("submit", async (e) => {
    e.preventDefault();
  
    const requerimiento = formRequerimiento["txtRequerimiento"].value;
    const nombre = formRequerimiento["txtNombre"].value;
  
    try {
      formRequerimiento["btnEnviar"].style.opacity = "0.2";
      formRequerimiento["btnEnviar"].disabled = true;
  
      const objetoRequerimiento = {
        areaRequerimiento,
        requerimiento,
        nombre,
        fecha: fechaHora,
        estado: false,
        enlace: null,
      };
  
      if (archivo) {
        const blob = new Blob([archivo], { type: archivo.type });
        const referencia = await crearReferencia(archivo.name);
        await subirArchivo(blob, referencia);
        const enlaceArchivo = await obtenerEnlaceDescarga(referencia);
  
        objetoRequerimiento.enlace = enlaceArchivo;
      }
  
      await crearRequerimiento(objetoRequerimiento);
  
      alert("Requerimiento Registrado Exitosamente");
      formRequerimiento["btnEnviar"].disabled = false;
      formRequerimiento["btnEnviar"].style.opacity = "1";
      cbxAreas.selectedIndex = 0;
      formRequerimiento["txtRequerimiento"].value = "";
      formRequerimiento["txtNombre"].value = "";
      inputArchivo.value = "";
    } catch (error) {
      console.log(error);
    }
  });
  