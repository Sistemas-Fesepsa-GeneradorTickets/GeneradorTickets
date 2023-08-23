import {crearRequerimiento,leerRequerimientos,cambiarEstadoRequerimiento}  from '../db/firebase.js'
import { 
    serverTimestamp
    }
from "https://www.gstatic.com/firebasejs/10.1.0/firebase-firestore.js"

import Swal from 'https://cdn.jsdelivr.net/npm/sweetalert2@11.7.27/+esm'
//import Swal from 'sweetalert2'

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
            ' ',
            'success'
          )
        requerimiento.value = ""
        metodologia.value = ""
        observacion.value = ""
    } catch (error) {
        console.log(error);
    }
      
})

/*
<th>Requerimiento</th>
<th>Metodología</th>
<th >Observación</th>
<th>Fecha Registro</th>
<th>Hora</th>
<th>Estado</th>
<th>Accion</th>
*/


async function obtenerRequerimientosBDPendientes(){

    const tbodyRequerimientos = document.getElementById("cajaRequerimientosSistemas")
   
    await  leerRequerimientos('sistemasRequerimientos',(requerimientos)=>{
           limpiarHTML(tbodyRequerimientos);
           requerimientos.docs.map(requerimientoDB=>{
                
                const {requerimiento,metodologia,observacion,fecha,estado} = requerimientoDB.data();
                if(estado==false){
                    
                    // Crear un objeto Date con la marca de tiempo
                    const date = new Date(fecha.toDate());

                    // Obtener los componentes de la fecha (día, mes y año)
                    const dia = date.getDate().toString().padStart(2, '0'); // Asegura que siempre tenga dos dígitos
                    const mes = (date.getMonth() + 1).toString().padStart(2, '0'); // Los meses son base 0, por eso sumamos 1
                    const anio = date.getFullYear();

                    // Obtener los componentes de la hora (hora, minuto y segundo)
                    const hora = date.getHours().toString().padStart(2, '0');
                    const minutos = date.getMinutes().toString().padStart(2, '0');
                    const segundos = date.getSeconds().toString().padStart(2, '0');


                    // Formatear la fecha en el formato "dd/mm/yyyy"
                    const fechaFormateada = `${dia}/${mes}/${anio}`;


                    // Formatear la hora en el formato "hh:mm:ss"
                    const horaFormateada = `${hora}:${minutos}:${segundos}`;

                    const filaReq = document.createElement("tr");

                    const tdRequerimiento = document.createElement("td")
                    const tdMetodologia = document.createElement("td")
                    const tdObservacion = document.createElement("td")
                    const tdFecha = document.createElement("td")
                    const tdHora = document.createElement("td")
                    const tdEstado = document.createElement("td")

                    const tdbtn = document.createElement("td")
                    const btnReq = document.createElement("button")
                    btnReq.classList.add("action-button","action-pendiente")

                    tdRequerimiento.textContent = requerimiento
                    tdMetodologia.textContent = metodologia
                    tdObservacion.textContent = observacion
                    tdFecha.textContent = fechaFormateada
                    tdHora.textContent = horaFormateada

                    if(estado){
                        tdEstado.textContent = "Resuelto"
                      }else{
                        tdEstado.textContent = "Pendiente"
                      }
                   
                      btnReq.textContent = "Cambiar Estado"
                      tdbtn.appendChild(btnReq)

                      btnReq.onclick = async function(){ 
                        await cambiarEstadoRequerimiento('sistemasRequerimientos',requerimientoDB.id,{
                         estado:true,
                         resuelto: serverTimestamp()
                       })
                     }
                    
                     filaReq.appendChild(tdRequerimiento)
                     filaReq.appendChild(tdMetodologia)
                     filaReq.appendChild(tdObservacion)
                     filaReq.appendChild(tdFecha)
                     filaReq.appendChild(tdHora)
                     filaReq.appendChild(tdEstado)
                     filaReq.appendChild(tdbtn)

                     tbodyRequerimientos.appendChild(filaReq)

                }
                                
    
           })
      })
 }
 
 
 obtenerRequerimientosBDPendientes()
 

function limpiarHTML(elemento){
    while(elemento.firstChild){
        elemento.removeChild(elemento.firstChild)
    }
}