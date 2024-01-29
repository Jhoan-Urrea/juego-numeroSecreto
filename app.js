let numeroSecreto = 0;
let numeroIntentos = 0;
let intentosMaximos = 3;
let listaNumerosSorteados = [];
let numeroMaximo = 10;

function cambiarColorIntentos(valor) {
    if(valor<=1){
        cambiarColorEstado('textoIntentos','red');
    }else{
        cambiarColorEstado('textoIntentos','#07DB14');
    }
    
}

function cambiarColorEstado(elementoId,color) {
    let elementoHTML = document.getElementById(elementoId);
    elementoHTML.style.color = color;
    
}

//Metodo que asigna un valor ingresado por parametro a una etiqueta html igualmente ingresada por parametro

function asignarTextoElemento(elemento,texto){
    let elementoHTML = document.querySelector(elemento);
    elementoHTML.innerHTML = texto;
    return;
}
//Metodo que asigna un valor ingresado por parametro a una etiqueta html con su identificador igualmente ingresade por parametro
function asignarTextoElementoId(elementoId,texto){
    let valor = document.getElementById(elementoId);
    if(valor) {
        valor.innerHTML = texto;
    } else {
        console.log('No se encontró ningún elemento con el id: ' + elementoId);
    }
    
}

function intentoDeUsuario (){
    let intentosFaltantes = intentosMaximos-numeroIntentos;
    asignarTextoElementoId('textoIntentos',`Intentos: ${intentosFaltantes}`);
    cambiarColorIntentos(intentosFaltantes);
    let numeroUsuario = parseInt(document.getElementById('valorUsuario').value);
    if((intentosMaximos-numeroIntentos)>0){
        if(numeroSecreto===numeroUsuario){

            asignarTextoElementoId('textoParrafo',`Acertaste el número en ${numeroIntentos} ${(numeroIntentos===1)? 'vez' : 'veces'}`);
            document.getElementById('reiniciar').removeAttribute('disabled');
        
        }else{
            if(numeroSecreto>numeroUsuario){
                asignarTextoElementoId('textoParrafo','El número secreto es mayor');
            }else{
                asignarTextoElementoId('textoParrafo','El numero es menor');
            }
            numeroIntentos++;

            limpiarCaja();
        
        }
       
    }else{
        asignarTextoElementoId('textoParrafo','Ya no tienes mas intentos');
        document.querySelector('#intentar').setAttribute('disabled','true');
        document.getElementById('reiniciar').removeAttribute('disabled');

    }
    
    
    return;
}

function limpiarCaja (){
    document.querySelector('#valorUsuario').value = '';
}

function generarNumeroSecreto() {
    let numeroAleatorio = Math.floor(Math.random()*numeroMaximo)+1;

    if(listaNumerosSorteados.length === numeroMaximo){
        asignarTextoElementoId('textoParrafo','Ya salieron todos los numeros posibles');
    }else{
        if(listaNumerosSorteados.includes(numeroAleatorio)){
            return generarNumeroSecreto();
        }else{
            listaNumerosSorteados.push(numeroAleatorio);
            return numeroAleatorio;
        }
    }

    
}

function condicionesIniciales() {
    
    asignarTextoElemento('h1','Juego del numero secreto');
    asignarTextoElementoId('textoParrafo','Ingresa un numero del 1 al 10');
    
    limpiarCaja();
    numeroSecreto = generarNumeroSecreto();
    numeroIntentos = 1;
    asignarTextoElementoId('textoIntentos',`Intentos: ${intentosMaximos}`);
    cambiarColorIntentos(numeroMaximo);
    document.getElementById('intentar').removeAttribute('disabled');
    document.querySelector('#reiniciar').setAttribute('disabled','true');
    console.log(numeroSecreto);
    
}

function reiniciarJuego() {
    condicionesIniciales();
    
}

condicionesIniciales();
