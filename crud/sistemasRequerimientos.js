import {crearRequerimiento}  from '../db/firebase.js'
import { 
    serverTimestamp
    }
from "https://www.gstatic.com/firebasejs/10.1.0/firebase-firestore.js"

import Swal from 'https://cdn.jsdelivr.net/npm/sweetalert2@11'

const btnAbrirModal = document.getElementById('btnAbrirModal');
const btnCerrarModal = document.getElementById('closeModal');
const modal = document.getElementById('modal');
const btnAgregarTarea = document.getElementById("btnAgregarTarea");



btnAbrirModal.addEventListener('click', () =>  modal.style.display = 'block');
btnCerrarModal.addEventListener('click', () =>  modal.style.display = 'none');



btnAgregarTarea.addEventListener("click",async()=>{

    const requerimiento = document.getElementById('inpRequerimiento')
    const metodologia = document.getElementById('inpMetodologia')
    const observacion = document.getElementById('inpObservacion')
    
    if(requerimiento.value == '' || metodologia.value == '' || observacion.value == ''){
        return;
    }

    const requerimientoSis = {
         requerimiento: requerimiento.value,
         metodologia: metodologia.value,
         observacion: observacion.value,
         fecha: serverTimestamp(),
         estado: false
    }

    try {
        await crearRequerimiento(requerimientoSis,'sistemasRequerimientos')
        Swal.fire(
            'Requerimiento Registrado',
            'Aceptar',
            'success'
          )
        requerimiento.value = ""
        metodologia.value = ""
        observacion.value = ""
    } catch (error) {
        console.log(error);
    }
      
})


