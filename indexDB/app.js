let db;
document.addEventListener('DOMContentLoaded', () => {
    crmDB();

    setTimeout(() =>{
        crearCliente();
    },5000);

})

function crmDB() {
    let crmDB = window.indexedDB.open('crmDB', 1);
    
    //si hay un error
    crmDB.onerror = function() {
        console.log('hubo un error');
}

crmDB.onsuccess = function(){
    console.log('base de datos fue creada');
    db = crmDB.result;
}

crmDB.onupgradeneeded = function(e){
    console.log('prueba');
    const db = e.target.result;
    console.log(e.target.result);

    const objectStore = db.createObjectStore('crmDB',{
        keypath:'crmDB',
        autoIncrement:true
    })

    objectStore.createIndex('nombre','nombre',{unique:false});
    objectStore.createIndex('email','email',{unique: true});
    objectStore.createIndex('telefono','telefono',{unique: false});

}

}
function crearCliente(){
    let transaction = db.transaction(['crmDB'],'readwrite');
    transaction.oncomplete = function(){
        console.log('la transaccion a sido creada');
    }

    transaction.onerror = function(){
        console.log('ha ocurrido un error');
    }

    const objectStore = transaction.objectStore('crmDB');
    const nnuevoCliente = {
        nombre: 'Odry',
        telefono: 123456,
        email:'odrygd@gmail.com'
    }
    let peticion = objectStore.add(nnuevoCliente);
    console.log(peticion);

}