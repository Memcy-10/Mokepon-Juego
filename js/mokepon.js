

const tarjetasataque = document.getElementById("tarjetas-ataque")
const spanmascotaenemigo = document.getElementById("mascota-rival")
const imagenMascotaEnemigo = document.getElementById("imagen-mascota-rival")
const contenedor = document.getElementById("contenedor-tarjetas")
const seccionatacar = document.getElementById("seleccionar-ataque")
const seccionreiniciar = document.getElementById("reiniciar")
const Mascotajugador = document.getElementById("mascota-jugador")
const mensajes = document.getElementById("mensajes")
const ataques = document.getElementById("tarjeta-ataques")
const spanvidasjugador = document.getElementById("vida-jugador")
const spanvidasrival = document.getElementById("vida-rival")

let jugadorId = null
let enemigoId = null
let ataquejugador = []
let ataqueenemigo = []
let opcionesdemokepones
let winsjugador = 0
let winsrival = 0
let seccionmascota
let inputhipodoge
let inputcapipepo
let inputratigueya
let imagenMascotaJugador
let Mascota
let botones
let ataquemokeponenemigo
let indexjugador
let indexrival 
let mokeponesEnemigos = []

// Mapa
const seccionvermapa = document.getElementById("ver-mapa")
const mapa = document.getElementById("mapa")
let lienzo = mapa.getContext("2d")
let intervalo
let mokepon
let mapabackground = new Image()
mapabackground.src = './assets/mokemap.png'
let alturaquebuscamos
let anchodelmapa = window.innerWidth-40
const anchomaximo = 550

if(anchodelmapa > anchomaximo){
    anchodelmapa = anchomaximo -20
}

alturaquebuscamos = anchodelmapa * 600/800
mapa.width = anchodelmapa
mapa.height = alturaquebuscamos


let botonfuego 
let botonagua
let botontierra

let mokepones = []

class Mokepon{
    constructor(nombre, foto, vida,fotomapa,id=null){
        this.id = id
        this.nombre = nombre
        this.foto = foto
        this.vida = vida
        this.ataques = []
        this.ancho = 40
        this.alto = 40
        this.x = aleatorio(0,mapa.width-this.ancho)
        this.y = aleatorio(0,mapa.height-this.alto)
        this.mapaFoto = new Image()
        this.mapaFoto.src = fotomapa
        this.velocidadx = 0
        this.velocidady = 0
    }
    dibujarmokepon(){
        lienzo.drawImage(
        this.mapaFoto,
        this.x,
        this.y,
        this.ancho,
        this.alto
        )
        }
}

let hipodoge = new Mokepon("hipodoge","./assets/mokepons_mokepon_hipodoge_attack.png", 5,"./assets/hipodoge.png")
let capipepo = new Mokepon("capipepo","./assets/mokepons_mokepon_capipepo_attack.png", 5,"./assets/capipepo.png")
let ratigueya = new Mokepon("ratigueya","./assets/mokepons_mokepon_ratigueya_attack.png", 5,"./assets/ratigueya.png")



const HIPODOGE_ATTACKS = [
    {nombre: "AGUA 💧",id: "boton-agua"},
    {nombre: "AGUA 💧",id: "boton-agua"},
    {nombre: "AGUA 💧",id: "boton-agua"},
    {nombre: "FUEGO 🔥",id: "boton-fuego"},
    {nombre: "TIERRA 🌱",id: "boton-tierra"}
]
hipodoge.ataques.push(...HIPODOGE_ATTACKS)

const CAPIPEPO_ATTACKS = [
    {nombre: "AGUA 💧",id: "boton-agua"},
    {nombre: "FUEGO 🔥",id: "boton-fuego"},
    {nombre: "TIERRA 🌱",id: "boton-tierra"},
    {nombre: "TIERRA 🌱",id: "boton-tierra"},
    {nombre: "TIERRA 🌱",id: "boton-tierra"}
]
capipepo.ataques.push(...CAPIPEPO_ATTACKS)

const RATIGUEYA_ATTACKS = [
    {nombre:"AGUA 💧",id:"boton-agua"},
    {nombre: "FUEGO 🔥",id: "boton-fuego"},
    {nombre: "FUEGO 🔥",id: "boton-fuego"},
    {nombre: "FUEGO 🔥",id: "boton-fuego"},
    {nombre: "TIERRA 🌱",id: "boton-tierra"}
]
ratigueya.ataques.push(...RATIGUEYA_ATTACKS)

mokepones.push(hipodoge,capipepo,ratigueya)


function iniciarjuego(){
    const botonMascotaJugador = document.getElementById("boton-mascota")
    const botonreiniciar = document.getElementById("boton-reiniciar")
    mokepones.forEach((mokepon) => {
        opcionesdemokepones = `
            <input type="radio" name="mascota" id="${mokepon.nombre.toLowerCase()}">
            <label class="tarjeta-de-mokepon" for="${mokepon.nombre.toLowerCase()}">
                <img src="${mokepon.foto}" alt="">
                ${mokepon.nombre}
            </label>`
        contenedor.innerHTML += opcionesdemokepones
        })
    seccionatacar.style.display = "none"
    seccionreiniciar.style.display = "none"
    seccionvermapa.style.display = "none"
    seccionmascota = document.getElementById("seleccionar-mascota")
    inputhipodoge = document.getElementById("hipodoge")
    inputcapipepo = document.getElementById("capipepo")
    inputratigueya = document.getElementById("ratigueya")
    imagenMascotaJugador = document.getElementById("imagen-mascota-jugador")
    botonMascotaJugador.addEventListener("click", seleccionarMascotaJugador)
    botonreiniciar.addEventListener("click", reiniciarJuego)
    unirsealjuego()
}

function unirsealjuego(){
    fetch("http://localhost:8080/unirse")
    .then(function (res){
        if(res.ok){
            res.text()
            .then(function (respuesta){
                console.log(respuesta)
                jugadorId = respuesta
            })
        }
    })
}

function seleccionarMascotaJugador(){
    seccionmascota.style.display = "none"
    seccionatacar.style.display = "none"
    seccionvermapa.style.display = "flex"

    if (inputhipodoge.checked){
        Mascotajugador.innerHTML = inputhipodoge.id
        imagenMascotaJugador.src = hipodoge.foto
        Mascota = inputhipodoge.id
    }
    else if (inputcapipepo.checked){
        Mascotajugador.innerHTML = inputcapipepo.id
        imagenMascotaJugador.src = capipepo.foto
        Mascota = inputcapipepo.id
    }
    else if (inputratigueya.checked){
        Mascotajugador.innerHTML = inputratigueya.id
        imagenMascotaJugador.src = ratigueya.foto
        Mascota = inputratigueya.id
    }
    else{
        alert("Selecciona una mascota")
        return
        }
    seleccionarmokepon(Mascota)
    iniciarmapa()
    extraerataques(Mascota)
}

function seleccionarmokepon(Mascota){
    fetch(`http://localhost:8080/mokepon/${jugadorId}`,{
        method: "post",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify({
            mokepon:Mascota
        })
    })
}

function extraerataques(mascota){
    let ataquesdisponibles
    for (let i = 0; i < mokepones.length; i++) {
        if(mascota == mokepones[i].nombre){
            ataquesdisponibles = mokepones[i].ataques
        }
    }
    mostrarataques(ataquesdisponibles)
}

function mostrarataques(ataquesdisponibles){
    ataquesdisponibles.forEach((a)=>{
        tarjeta = `<button class="boton-de-ataque Bataques" id="${a.id}">${a.nombre}</button>`
        tarjetasataque.innerHTML += tarjeta
    })
    botonfuego = document.getElementById("boton-fuego")
    botonagua = document.getElementById("boton-agua")
    botontierra = document.getElementById("boton-tierra")
    botones = document.querySelectorAll(".Bataques")
}

function secuenciaataques(){
    botones.forEach((boton)=>{
        boton.addEventListener("click",(e)=>{
            if (e.target.textContent == "FUEGO 🔥"){
                ataquejugador.push("FUEGO")
                console.log(ataquejugador)
                boton.style.background = "#112f58"
                boton.disabled = true
            } else if (e.target.textContent == "AGUA 💧"){
                ataquejugador.push("AGUA")
                console.log(ataquejugador)
                boton.style.background = "#112f58"
                boton.disabled = true
            } else {
                ataquejugador.push("TIERRA")
                console.log(ataquejugador)
                boton.style.background = "#112f58"
                boton.disabled = true
            }
            if(ataquejugador.length ==5){
                enviarAtaques()
            }
        })
    })

}

function enviarAtaques(){
    fetch(`http://localhost:8080/mokepon/${jugadorId}/ataques`,{
        method:"post",
        headers:{
            "Content-Type":"application/json"
        },
        body: JSON.stringify({
            ataques:ataquejugador
        })
    })
    intervalo = setInterval(obtenerAtaques,200)
}

function obtenerAtaques(){
    fetch(`http://localhost:8080/mokepon/${enemigoId}/ataques`)
    .then(function(res){
        if(res.ok){
            res.json()
            .then(function({ataques}){
                if(ataques.length === 5){
                    ataqueenemigo = ataques
                    combate()
                }
            })
        }

    })
}

function mascotaenemiga(enemigo){
    for (let i = 0;i<mokepones.length;i++){
        if(mokepones[i].nombre==enemigo.nombre){
        spanmascotaenemigo.innerHTML = mokepones[i].nombre
        imagenMascotaEnemigo.src = mokepones[i].foto
        ataquemokeponenemigo = mokepones[i].ataques
        secuenciaataques()
        }
    }

}

function ataquerival(){
    let numeroaleatorio = aleatorio(0,ataquemokeponenemigo.length-1)
    if (numeroaleatorio == 0 || numeroaleatorio == 1){
        ataqueenemigo.push("FUEGO")
    }
    else if(numeroaleatorio == 3 || numeroaleatorio == 4){
        ataqueenemigo.push("AGUA")
    }
    else {
        ataqueenemigo.push("TIERRA")
    }
    console.log(ataqueenemigo)
    iniciarpelea()
}

function iniciarpelea(){
    if (ataquejugador.length == 5){
        combate()
    }
}

function indexambosoponentes(jugador,rival){
    indexjugador = ataquejugador[jugador]
    indexrival = ataqueenemigo[rival]
}

function combate(){
    clearInterval(intervalo)
    for (let index = 0; index < ataquejugador.length; index++) {
        indexambosoponentes(index,index)
        if (ataquejugador[index] == ataqueenemigo[index]){
            resultado = "Empate"
            mensaje(resultado)
        }
        else if (ataquejugador[index] == "FUEGO" && ataqueenemigo[index] == "TIERRA"){
            resultado = "Ganaste"
            mensaje(resultado)
            winsjugador++
            spanvidasjugador.innerHTML = winsjugador
        }
        else if (ataquejugador[index] == "AGUA" && ataqueenemigo[index] == "FUEGO"){
            resultado = "Ganaste"
            mensaje(resultado)
            winsjugador++
            spanvidasjugador.innerHTML = winsjugador
        }
        else if (ataquejugador[index] == "TIERRA" && ataqueenemigo[index] == "AGUA"){
            resultado = "Ganaste"
            mensaje(resultado)
            winsjugador++
            spanvidasjugador.innerHTML = winsjugador
        }
        else{
            resultado = "Perdiste"
            mensaje(resultado)
            winsrival++
            spanvidasrival.innerHTML = winsrival
        }
    }
    revisarwins()
}

function revisarwins(){
    if (winsjugador == winsrival){
        mensajefinal("Esto es un empate")
    }
    else if (winsjugador > winsrival){
        mensajefinal("Felicidades, ganaste")
    }
    else{
        mensajefinal("Lo siento, perdiste")
    }
}

function mensajefinal(resultado){
    let parrafo = document.createElement("p")
    parrafo.innerHTML = resultado
    mensajes.appendChild(parrafo)
    mensajes.scrollTop = mensajes.scrollHeight
    seccionreiniciar.style.display = "block"
}

function mensaje(resultado){
    let parrafo = document.createElement("p")
    parrafo.innerHTML = `${indexjugador} - ${indexrival} resultado: ${resultado}`
    mensajes.appendChild(parrafo)
    mensajes.style.display = "flex"
    mensajes.scrollTop = mensajes.scrollHeight
}

function aleatorio(min,max){
    return Math.floor(Math.random()*(max-min+1) + min)
}

function reiniciarJuego(){
    location.reload()
}
window.addEventListener("load", iniciarjuego)


function iniciarmapa(){
    mokepon = obtenermascota()
    intervalo = setInterval(pintarcanvas,200)
    window.addEventListener("keydown",sepresionounatecla)
    window.addEventListener("keyup",detenermovimiento)
}
function pintarcanvas(){
    mokepon.x = mokepon.x + mokepon.velocidadx
    mokepon.y = mokepon.y + mokepon.velocidady
    lienzo.clearRect(0,0,mapa.width,mapa.height)
    lienzo.drawImage(
        mapabackground,
        0,
        0,
        mapa.width,
        mapa.height
    )
    mokepon.dibujarmokepon()
    enviarPosicion(mokepon.x,mokepon.y)
    mokeponesEnemigos.forEach(function(mokepon){
        mokepon.dibujarmokepon()
        revisarcolisiones(mokepon)
    })
}

function enviarPosicion(x,y){
    fetch(`http://localhost:8080/mokepon/${jugadorId}/posicion`,{
        method:"post",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify({
            x,
            y
        }
        )

    })
    .then(function(res){
        if(res.ok){
            res.json()
                .then(function( {enemigos} ){
                    console.log("ENEMIGOS:", JSON.stringify(enemigos))
                    mokeponesEnemigos = enemigos.map(function(enemigo){
                        let mokeponEnemigo = null
                        const mokeponNombre = enemigo.mokepon.nombre || ""
                        if(mokeponNombre == "hipodoge"){
                            mokeponEnemigo = new Mokepon("hipodoge","./assets/mokepons_mokepon_hipodoge_attack.png", 5,"./assets/hipodoge.png",enemigo.id)
                        }
                        else if (mokeponNombre == "capipepo"){
                            mokeponEnemigo = new Mokepon("capipepo","./assets/mokepons_mokepon_-capipepo_attack.png", 5,"./assets/capipepo.png",enemigo.id)
                        }
                        else if (mokeponNombre == "ratigueya"){
                            mokeponEnemigo = new Mokepon("ratigueya","./assets/mokepons_mokepon_ratigueya_attack.png", 5,"./assets/ratigueya.png",enemigo.id)
                        }
                        mokeponEnemigo.x = enemigo.x
                        mokeponEnemigo.y = enemigo.y
                        return mokeponEnemigo
                    })

                })
        }
    })
}

function moverarriba(){
    mokepon.velocidady = -5
}
function moverderecha(){
    mokepon.velocidadx = 5
}
function moverizquierda(){
    mokepon.velocidadx = -5
}
function moverabajo(){
    mokepon.velocidady = 5
}
function detenermovimiento(){
    mokepon.velocidadx = 0
    mokepon.velocidady = 0
}
function sepresionounatecla(event){
    switch (event.key) {
        case "ArrowUp":
            event.preventDefault()
            moverarriba()
            break;
        case "ArrowRight":
            event.preventDefault()
            moverderecha()
            break;
        case "ArrowDown":
            event.preventDefault()
            moverabajo()
            break;
        case "ArrowLeft":
            event.preventDefault()
            moverizquierda()
            break;
    
        default:
            break;
    }
}

function revisarcolisiones(enemigo){
    const arribaenemigo = enemigo.y
    const abajoenemigo = enemigo.y + enemigo.alto
    const derechaenemigo = enemigo.x + enemigo.ancho
    const izquierdaenemigo = enemigo.x
    const arribamascota = mokepon.y
    const abajomascota= mokepon.y + mokepon.alto
    const derechamascota = mokepon.x + mokepon.ancho
    const izquierdamascota = mokepon.x

    if(
        abajomascota < arribaenemigo||
        arribamascota > abajoenemigo||
        derechamascota < izquierdaenemigo||
        izquierdamascota > derechaenemigo
    )
    {
        return
    }
    detenermovimiento()
    clearInterval(intervalo)
    enemigoId = enemigo.id
    seccionatacar.style.display = "flex"
    seccionvermapa.style.display = "none"
    mascotaenemiga(enemigo)
}


function obtenermascota(){
        for (let i = 0; i < mokepones.length; i++) {
        if(Mascota == mokepones[i].nombre){
            return mokepones[i]
        }
    }
}