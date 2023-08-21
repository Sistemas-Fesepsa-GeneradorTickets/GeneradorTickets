import { 
  leerRequerimientos,
  cambiarEstadoRequerimiento
} from "../db/firebase.js"

import { 
  serverTimestamp
  }
from "https://www.gstatic.com/firebasejs/10.1.0/firebase-firestore.js"

import 'https://cdn.sheetjs.com/xlsx-0.20.0/package/dist/xlsx.full.min.js'


obtenerRequerimientosBDPendientes()




const tckResueltos = document.getElementById("tckResueltos");
tckResueltos.onclick = function(){
  obtenerRequerimientosBDResueltos()
}

const tckPendientes = document.getElementById("tckPendientes");
tckPendientes.onclick = function(){
     obtenerRequerimientosBDPendientes()
}

const btnGenerarExcel = document.getElementById("generarExcel");
btnGenerarExcel.onclick = function(){

  let tabla = document.getElementById("dataExcel")
  let tablaClonada = tabla.cloneNode(true)
  let rows = tablaClonada.getElementsByTagName('tr');

      for (let i = 0; i < rows.length; i++) {
        // rows[i].lastElementChild.remove();
        for (let j = 0; j < 2; j++) { // Eliminar las dos últimas celdas
          rows[i].lastElementChild.remove();
        }
      }



  let wb = XLSX.utils.table_to_book(tablaClonada);
  XLSX.writeFile(wb, "Requerimientos.xlsx");
}



async function obtenerRequerimientosBDPendientes(){

   const tbodyRequerimientos = document.getElementById("cajaRequerimientos")
  
   await  leerRequerimientos((requerimientos)=>{
          limpiarHTML(tbodyRequerimientos);
          requerimientos.docs.map(requerimientoDB=>{
               
               const {nombre,areaRequerimiento,fecha,requerimiento,estado,enlace} = requerimientoDB.data();
               if(estado==false){
                let arrayFecha = fecha.split(" ");
               
                const filaReq = document.createElement("tr");
 
                const tdArea = document.createElement("td")
                const tdFecha = document.createElement("td")
                const tdHora = document.createElement("td")
                const tdNombre = document.createElement("td")
                const tdReq = document.createElement("td")
                const tdEstado = document.createElement("td")
                const tdbtn = document.createElement("td")
                const btnReq = document.createElement("button")
                btnReq.classList.add("action-button","action-pendiente")
                const tdDescarga = document.createElement("td")
                const enlaceDescarga = document.createElement("a")
                enlaceDescarga.href = enlace
                enlaceDescarga.target = "_blank"
                
                tdDescarga.appendChild(enlaceDescarga)
                tdDescarga.classList.add("descarga")
                enlaceDescarga.textContent = "📜"
                if (enlace == null) {
                  tdDescarga.classList.add("deshabilitar")
                }else{
                  tdDescarga.onclick = function(){
                    enlaceDescarga.click();
                  }
                }

                tdArea.textContent = areaRequerimiento
                tdFecha.textContent = arrayFecha[0]
                tdHora.textContent = arrayFecha[1]  
                tdNombre.textContent = nombre
                tdReq.textContent = requerimiento
                
                if(estado){
                 tdEstado.textContent = "Resuelto"
               }else{
                 tdEstado.textContent = "Pendiente"
               }
                
               btnReq.textContent = "Cambiar Estado"
               tdbtn.appendChild(btnReq)
               
               btnReq.onclick = async function(){ 
                  await cambiarEstadoRequerimiento(requerimientoDB.id,{
                   estado:true,
                   resuelto: serverTimestamp()
                 })
               }
              
              filaReq.appendChild(tdArea)
              filaReq.appendChild(tdFecha)
              filaReq.appendChild(tdHora)
              filaReq.appendChild(tdNombre)
              filaReq.appendChild(tdReq)
              filaReq.appendChild(tdEstado)
              filaReq.appendChild(tdDescarga)
              filaReq.appendChild(tdbtn)
              
             tbodyRequerimientos.appendChild(filaReq)
               }
                
              
   
          })
     })
}




async function obtenerRequerimientosBDResueltos(){

  const tbodyRequerimientos = document.getElementById("cajaRequerimientos")
 
  await  leerRequerimientos((requerimientos)=>{
         limpiarHTML(tbodyRequerimientos);
         requerimientos.docs.map(requerimientoDB=>{
              
              const {nombre,areaRequerimiento,fecha,requerimiento,estado,enlace} = requerimientoDB.data();

              if(estado){
               let arrayFecha = fecha.split(" ");
              
               const filaReq = document.createElement("tr");

               const tdArea = document.createElement("td")
               const tdFecha = document.createElement("td")
               const tdHora = document.createElement("td")
               const tdNombre = document.createElement("td")
               const tdReq = document.createElement("td")
               const tdEstado = document.createElement("td")
               const tdbtn = document.createElement("td")
               const btnReq = document.createElement("button")
               btnReq.classList.add("action-button","action-cambEstado")
               const tdDescarga = document.createElement("td")
               tdDescarga.classList.add("descarga")
              
               const enlaceDescarga = document.createElement("a")
               enlaceDescarga.href = enlace
               enlaceDescarga.target = "_blank"
               
               tdDescarga.appendChild(enlaceDescarga)
               tdDescarga.classList.add("descarga")
               enlaceDescarga.textContent = "📜"
               if (enlace == null) {
                 tdDescarga.classList.add("deshabilitar")
               }else{
                 tdDescarga.onclick = function(){
                   enlaceDescarga.click();
                 }
               }
             



               tdArea.textContent = areaRequerimiento
               tdFecha.textContent = arrayFecha[0]
               tdHora.textContent = arrayFecha[1]
               tdNombre.textContent = nombre
               tdReq.textContent = requerimiento
               
               if(estado){
                tdEstado.textContent = "Resuelto"
              }else{
                tdEstado.textContent = "Pendiente"
              }
               
              btnReq.textContent = "Poner Pendiente"
              tdbtn.appendChild(btnReq)
              
              btnReq.onclick = async function(){ 
                  const validador =  confirm("Estas seguro que deseas cambiar el estado de este ticket")
                  if(validador){
                      await cambiarEstadoRequerimiento(requerimientoDB.id,{
                        estado:false,
                        resuelto: null
                      })
                  }
              }
             
             filaReq.appendChild(tdArea)
             filaReq.appendChild(tdFecha)
             filaReq.appendChild(tdHora)
             filaReq.appendChild(tdNombre)
             filaReq.appendChild(tdReq)
             filaReq.appendChild(tdEstado)
             filaReq.appendChild(tdDescarga)
             filaReq.appendChild(tdbtn)
             
            tbodyRequerimientos.appendChild(filaReq)
              }
               
  
         })
    })
}



  

function limpiarHTML(elemento){
    while(elemento.firstChild){
        elemento.removeChild(elemento.firstChild)
    }
}