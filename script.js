const gastoDisplay = document.getElementById("gastoDisplay");
const saldoDisplay = document.getElementById("saldoDisplay");
let presupuesto = 0;
let gastos = 0;
let saldo = 0;
let presupuestoCreado = false;

class Gasto {
    constructor(id, nombre, cantidad){
        this.id = id;
        this.nombre = nombre;
        this.cantidad = cantidad;
    }
}

function ingresarPresupuesto(){
    let presupuestoInput = document.getElementById("presupuestoInput");
    if( isNaN(presupuestoInput.value) || presupuestoInput.value == null || presupuestoInput.value < 1 ){
        alert("Ha ingresado un valor no valido, por favor intentelo nuevamente.")
    }else{
        let presupuestoDisplay = document.getElementById("presupuestoDisplay");
        presupuestoDisplay.innerText = presupuestoInput.value
        presupuesto = parseInt(presupuestoInput.value)
        saldo = parseInt(presupuesto)
        saldoDisplay.innerText = saldo
        presupuestoCreado = true;
    }
}

function crearGasto(gasto){
    const tr = document.createElement('tr')

    tr.id = `elemento${gasto.id}`
    tr.innerHTML = `
    <tr id="elemento${gasto.id}">
    <td>${gasto.nombre}</td>
    <td>$${gasto.cantidad}</td>
    <td><a href="#" onclick="eliminarGasto(${gasto.id})"><i class="fa-solid fa-trash"></i></a></td>
    `
    document.getElementById("tablaGastos").appendChild(tr)

}

let arrayGastos = [];
let contadorGastos = 0;

function ingresarGasto(){
    if(!presupuestoCreado){
        alert("Necesita crear un presupuesto antes de ingresar gastos.")
    }else{
        let nombreGasto = document.getElementById("nombreGasto").value;
        let cantidadGasto = document.getElementById("cantidadGasto").value;
        if(nombreGasto == null || cantidadGasto == null || nombreGasto == "" || cantidadGasto == "" ||  isNaN(cantidadGasto) || parseInt(cantidadGasto) < 1){
                alert("Ingrese un gasto valido.")
        }else{
                let gasto = new Gasto(contadorGastos + 1,nombreGasto,cantidadGasto)
                contadorGastos +=1;
                arrayGastos.push(gasto)
                crearGasto(gasto)
                gastos = gastos + parseInt(cantidadGasto);
                saldo = saldo - parseInt(cantidadGasto);
                gastoDisplay.innerText = gastos
                saldoDisplay.innerText = saldo
                console.log(arrayGastos);
            }
        }
    }

function eliminarGasto(gasto){
    for (let i = 0; i < arrayGastos.length; i++) {
        if(gasto == arrayGastos[i].id){
            let paraBorrar = document.getElementById("elemento"+gasto)
            paraBorrar.remove()
            gastos = gastos - arrayGastos[i].cantidad
            saldo = saldo + parseInt(arrayGastos[i].cantidad)
            gastoDisplay.innerText = gastos
            saldoDisplay.innerText = saldo
            arrayGastos.splice(i,1)
            console.log(arrayGastos);
        }
    }

}