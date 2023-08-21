// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-app.js";
import { 
    getFirestore ,
    collection, 
    onSnapshot,
    addDoc,
    doc,
    updateDoc,
    deleteDoc
    }
from "https://www.gstatic.com/firebasejs/10.1.0/firebase-firestore.js"
import { 
   getStorage,
   ref,
   uploadBytes,
   getDownloadURL
} 
from "https://www.gstatic.com/firebasejs/10.1.0/firebase-storage.js"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
 const firebaseConfig = {
 apiKey: "AIzaSyCAmttOqkP_P8Zm4fWHANEb1ePwFYfmW3k",
 authDomain: "generadortickets-85431.firebaseapp.com",
 projectId: "generadortickets-85431",
 storageBucket: "generadortickets-85431.appspot.com",
  messagingSenderId: "72748645012",
   appId: "1:72748645012:web:bed34cdd02f689e4481281"
 };



// Inicializar Firebase
const app = initializeApp(firebaseConfig)

//Inicializar BASE DE DATOS
const db = getFirestore(app)

//Inicializar Almacenamiento
const storage = getStorage(app)

//CRUD 
export const  crearRequerimiento = (requerimiento,coleccion) => addDoc(collection(db,coleccion),requerimiento) 

export const  leerRequerimientos = (fcFlecha)  => onSnapshot(collection(db,"requerimientos"),fcFlecha)

export const cambiarEstadoRequerimiento = (referencia,estadoActualizado) => updateDoc(doc(db,"requerimientos",referencia),estadoActualizado)

export const eliminarRequerimiento = (referencia) => deleteDoc(doc(db,"requerimientos",referencia))


/*PARTE DE ALMACENAMIENTO*/

export const crearReferencia = (nombreArchivo) => ref(storage,`archivos/${nombreArchivo}`)

export const subirArchivo =  (archivo,referencia) => uploadBytes(referencia,archivo)

export const obtenerEnlaceDescarga = referencia => getDownloadURL(ref(storage,referencia))
