//---------- Variables ------------
let carritoOn = 0;
const carrito = [];
const alerta = 0;
let totalPrecio = 0;
let contadorDeId = 0;
let filtrosVino = 0;
let vinosFiltradosPorPrecio2 = [];
let bmini = 0,
  bmax = 0;
let nombre,mail,cuota;
let noti = 0;
let timeOutID;

//-----------   Funciones  -------------------


function agregarAlCarrito(id) {

  let item = vinos.find((prod) => prod.id === id)
  carrito.push(item);
  //console.log(carrito);
  let carritoJSON = JSON.stringify(carrito); //convierto a carrito en formato json
  localStorage.setItem("carritoJSON",carritoJSON); //agrego el carrito en formato Json al local storage
  let carroJSON = localStorage.getItem("carritoJSON");
  let carro = JSON.parse(carroJSON)
  console.log(carro);


  div2.innerHTML = ` <a href="#" onclick="cerrarSlider()">
                    <img src="media/carrito.png" alt="">
                    <div class="fondo-numero">
                      <p>${carrito.length}</p>
                    </div>
                    </a>
  `
  div2.classList = "header_carrito";
  div2.setAttribute("id", "carritoID");

  header.append(div2);

  div6 = document.createElement("div");
  div6.innerHTML = `
  <div class="alerta_compra">
    <h1>Producto enviado al carrito</h1>
    <div class="cuerpo_lineaMenu"></div>
    <h3>${item.nombre}</h3>
    <h4>$${item.precio}</h4>
    <button type="button" onclick="cerrar()">Cerrar</button>
  </div>

  `
  div6.classList = "animacion-entrada"
  espacio_alerta.append(div6);

  if(noti==0){
  timeOutID =setTimeout(cerrar, 3000);
  noti = noti +1;
}else(noti>0)
{
  clearTimeout(timeOutID);
  timeOutID =setTimeout(cerrar, 3000);
}
  totalPrecio = 0;
  div8.innerHTML = "";
  funcionSlider();

}



function eliminarDelCarrito(index) {
  if (index != -1) {
    carrito.splice(index, 1)
    //console.log(index)
  }
  totalPrecio = 0;
  div8.innerHTML = "";
  funcionSlider();
  div2.innerHTML = ` <a href="#" onclick="cerrarSlider()">
                    <img src="media/carrito.png" alt="">
                    <div class="fondo-numero">
                      <p>${carrito.length}</p>
                    </div>
                    </a>
  `
}




function cerrar() {

  div6.classList = "ocultar";
  espacio_alerta.innerHTML = "";
  noti =0;
}




function funcionSlider() {

  for (const produc of carrito) {
    div5 = document.createElement("div");
    let index = carrito.indexOf(produc);
    totalPrecio = totalPrecio + produc.precio;

    div5.innerHTML = `

  <div class="slider_componentes">
    <div class="componentes_imagen">
      <img src="media/${produc.imagen}" alt="">
    </div>
    <div class="componentes_nombres">
      <h3>${produc.nombre}</h3>
      <h4>$${produc.precio}</h4>
    </div>
    <div class="componentes_boton">
      <button type="button" name="button" onclick="eliminarDelCarrito(${index})">X</button>
    </div>
  </div>
  `
    div8.prepend(div5);
    div8.className="overflow"
  }

  if (carrito.length != 0) {
    div7.innerHTML = `
    <div class="cuerpo_lineaMenu"></div>
    <h1>Total: $${totalPrecio}</h1>
    <button id="boton_compra" type="button" name="button" onclick="pagina2()">COMPRAR</button>
`
  } else {
    div7.innerHTML = `
  <div class="cuerpo_lineaMenu"></div>
  <br><br>
  <h1>Actualmente no agrego articulos en su carrito</h1>
  <br><br>
  <div class="cuerpo_lineaMenu"></div>

`
  }
  div4.prepend(div8)
  div4.append(div7);
}




function cerrarSlider() {

  if (carritoOn == 0) {
    div4.className = "entrada menu_slider";
    carritoOn = 1;
  } else if (carritoOn == 1) {
    div4.className = "ocultar";
    carritoOn = 0;
  }
}



function funcionFiltroPrecio(e) {
  e.preventDefault();

  if (filtroPrecio.filtro.value) {
    if (filtroPrecio.filtro.value == "1") {
      const vinosFiltradosPorPrecio = vinos.filter((el) => el.precio < 1000)
      vinosFiltradosPorPrecio2 = vinosFiltradosPorPrecio;
      cuerpo_cajaProductos.innerHTML = "";
      alertaMinimo.innerHTML = ""
      filtrosVino = 1;
      mostrarIndex();
    } else if (filtroPrecio.filtro.value == "2") {
      const vinosFiltradosPorPrecio = vinos.filter((el) => el.precio < 2000 && el.precio > 1000)
      vinosFiltradosPorPrecio2 = vinosFiltradosPorPrecio;
      cuerpo_cajaProductos.innerHTML = "";
      alertaMinimo.innerHTML = ""
      filtrosVino = 1;
      mostrarIndex();
    } else if (filtroPrecio.filtro.value == "3") {
      const vinosFiltradosPorPrecio = vinos.filter((el) => el.precio > 2000)
      vinosFiltradosPorPrecio2 = vinosFiltradosPorPrecio;
      cuerpo_cajaProductos.innerHTML = "";
      alertaMinimo.innerHTML = ""
      filtrosVino = 1;
      mostrarIndex();
    }
  } else if (filtroPrecio.minimo.value || filtroPrecio.maximo.value) {
    if (filtroPrecio.minimo.value) {
      const vinosFiltradosPorPrecio = vinos.filter((el) => el.precio > filtroPrecio.minimo.value)
      vinosFiltradosPorPrecio2 = vinosFiltradosPorPrecio;
      cuerpo_cajaProductos.innerHTML = "";
      alertaMinimo.innerHTML = ""
      filtrosVino = 1;
      mostrarIndex();
    }else if(filtroPrecio.maximo.value){
      const vinosFiltradosPorPrecio = vinos.filter((el) => el.precio < filtroPrecio.maximo.value)
      vinosFiltradosPorPrecio2 = vinosFiltradosPorPrecio;
      cuerpo_cajaProductos.innerHTML = "";
      alertaMinimo.innerHTML = ""
      filtrosVino = 1;
      mostrarIndex();
    }else if(filtroPrecio.minimo.value && filtroPrecio.maximo.value){
      const vinosFiltradosPorPrecio = vinos.filter((el) =>  el.precio > filtroPrecio.minimo.value && el.precio < filtroPrecio.maximo.value)
      vinosFiltradosPorPrecio2 = vinosFiltradosPorPrecio;
      cuerpo_cajaProductos.innerHTML = "";
      alertaMinimo.innerHTML = ""
      filtrosVino = 1;
      mostrarIndex();
    }

  } else {
    alertaMinimo.innerHTML = "Ingrese un valor"
    MaximoYminimo.append(alertaMinimo);
  }
}




function funcionBuscar(e){
e.preventDefault();

if (buscador.buscar.value) {

    const vinosFiltradosPorBuscador = vinos.filter((el) => el.nombre.toLowerCase().includes(buscador.buscar.value.toLowerCase()) || el.bodega.toLowerCase().includes(buscador.buscar.value.toLowerCase()) || el.tipo.toLowerCase().includes(buscador.buscar.value.toLowerCase()))
    console.log(buscador.buscar.value);
    console.log(vinosFiltradosPorBuscador);
    vinosFiltradosPorBuscadr2 = vinosFiltradosPorBuscador;
    cuerpo_cajaProductos.innerHTML = "";
    alertaBuscador.innerHTML = ""
    filtrosVino = 2;
    mostrarIndex();
  }else{
    alertaBuscador.innerHTML="<h4>Por Favor ingrese un valor</h4>"
  }

}



function mostrarIndex() {

  if (filtrosVino == 0) {
    for (const vino of vinos) {
      div = document.createElement("div");
      div.innerHTML = `

                      <div class="cuerpo__cajasIndex--imagen">

                        <a href="#"> <img src="media/${vino.imagen}" alt=""> </a>
                      </div>
                      <div class="cuerpo__cajasIndex--texto">

                              <h1>${vino.bodega}</h1>
                              <h2>${vino.nombre}</h2>
                              <h3>${vino.tipo}</h3>
                              <h4 class="cuerpo__cajas--precioTachado">$${vino.precioTachado}</h4>
                              <h4 class="cuerpo__cajas--precio">$${vino.precio}</h4>
                              <button onclick="agregarAlCarrito(${vino.id})" type="button" name="button" class="boton">COMPRAR</button>
                              <p>Compra minima 6 u.</p>

                      </div>
                    `

      div.classList = "cuerpo__cajas"
      cuerpo_cajaProductos.append(div);
    }

  } else if (filtrosVino == 1) {

    if(vinosFiltradosPorPrecio2.length >0){

    for (const vino2 of vinosFiltradosPorPrecio2) {
      div = document.createElement("div");
      div.innerHTML = `

                      <div class="cuerpo__cajasIndex--imagen">

                        <a href="#"> <img src="media/${vino2.imagen}" alt=""> </a>
                      </div>
                      <div class="cuerpo__cajasIndex--texto">

                              <h1>${vino2.bodega}</h1>
                              <h2>${vino2.nombre}</h2>
                              <h3>${vino2.tipo}</h3>
                              <h4 class="cuerpo__cajas--precioTachado">$${vino2.precioTachado}</h4>
                              <h4 class="cuerpo__cajas--precio">$${vino2.precio}</h4>
                              <button onclick="agregarAlCarrito(${vino2.id})" type="button" name="button" class="boton">COMPRAR</button>
                              <p>Compra minima 6 u.</p>

                      </div>
                    `

      div.classList = "cuerpo__cajas"
      cuerpo_cajaProductos.append(div);
    }}else{
      cuerpo_cajaProductos.innerHTML=`

      <div class="noSeEncontro">
        <h3>¡Disculpe! No se encontro nada con los datos solicitados</h3>
      </div>


      `
    }

  } else if (filtrosVino == 2) {

    if(vinosFiltradosPorBuscadr2.length>0){
    for (const vino2 of vinosFiltradosPorBuscadr2) {
      div = document.createElement("div");
      div.innerHTML = `

                      <div class="cuerpo__cajasIndex--imagen">

                        <a href="#"> <img src="media/${vino2.imagen}" alt=""> </a>
                      </div>
                      <div class="cuerpo__cajasIndex--texto">

                              <h1>${vino2.bodega}</h1>
                              <h2>${vino2.nombre}</h2>
                              <h3>${vino2.tipo}</h3>
                              <h4 class="cuerpo__cajas--precioTachado">$${vino2.precioTachado}</h4>
                              <h4 class="cuerpo__cajas--precio">$${vino2.precio}</h4>
                              <button onclick="agregarAlCarrito(${vino2.id})" type="button" name="button" class="boton">COMPRAR</button>
                              <p>Compra minima 6 u.</p>

                      </div>
                    `

      div.classList = "cuerpo__cajas"
      cuerpo_cajaProductos.append(div);
    }}else{

      cuerpo_cajaProductos.innerHTML=`

      <div class="noSeEncontro">
        <h3>¡Disculpe! No se encontro nada con los datos solicitados</h3>
      </div>


      `
    }

  } else if (filtrosVino == 3) {

  }

}


function verificarMinimo() {

  if (!isNaN(precioMinimo.value)) {
    alertaMinimo.innerHTML = ""
    bmini = 1;
  } else {
    alertaMinimo.innerHTML = "Solo numeros"
    MaximoYminimo.append(alertaMinimo);
  }
}


function verificarMaximo() {

  if (!isNaN(precioMaximo.value)) {
    alertaMinimo.innerHTML = ""
    bmax = 1;
  } else {
    alertaMinimo.innerHTML = "Solo numeros"
    MaximoYminimo.append(alertaMinimo);
  }
}


function pagina2(){
    cuerpo__cuerpoFlex.className="ocultar"
    div4.className = "ocultar";
    div2.className="ocultar";

    cuerpo__cuerpoFlex2.className="cuerpo__cuerpoFlex2"
    cuerpo__cuerpoFlex2.innerHTML = `
    <div class="cuerpo__cuerpoFlex--titulo">
      <div class="cuerpo__cuerpoFlex--tituloLinea">
      </div>
      <h1>Finaliza tu compra</h1>
      <div class="cuerpo__cuerpoFlex--tituloLinea">
      </div>
    </div>


    <div class="cuerpo_cajasProductos2">
      <div class="lista_compra" id="lista_compra">
        <div id="lista" class="overflow">
        </div>
      <div class="cuerpo_lineaMenu"></div>
      <h1>Total: $${totalPrecio}</h1>
      </div>



      <div class="formularioConTarjeta">
        <h1>Datos personales</h1>

        <form class="" id="datosPersonales" method="post">
          <label for="">Nombre</label>
          <input type="text" name="nombre" value="Juan Perez">

          <label for="">email</label>
          <input type="text" name="email" value="ejemplo@email.com">

          <label for="">Telefono</label>
          <input type="text" name="" value="381300000">

          <label for="">Cantidad de cuotas</label>
          <select  id="cuotas" name="selector">
            <option value="1">1 Pago de $${totalPrecio}</option>
            <option value="2">3 Pagos de $${(totalPrecio/3).toFixed(2)}</option>
            <option value="3">6 Pagos de $${(totalPrecio/6).toFixed(2)}</option>
            <option value="4">12 Pagos de $${(totalPrecio/12).toFixed(2)}</option>
          </select>



        <h1>Datos de la tarjeta de credito</h1>
        <div class="tarjeta">


            <div class="nombre_tarjeta">
              <img src="media/chip.png" alt="">
              <label for="">Nombre de la tarjeta:</label>
              <input type="text" name="" value="Juan Perez"><br>
              <label for="">Numero de la tarjeta:</label>
              <input type="text" name="" value="123456789"><br>
              <label for="">CVC</label>
              <input type="text" name="" value="123">
            </div>

            <div class="expiracion_tarjeta">
              <label for="">Desde:</label>
              <input type="text" name="" value="12/02"><br>
              <label for="">Hasta:</label>
              <input type="text" name="" value="29/24">
            </div>


        </div>
        <div class="cuerpo_lineaMenu"></div>
        <button type="submit" name="button"  >CONFIRMAR COMPRA</button>
        </form>
      </div>

      <!--    fin productos -->
    </div>

    `

lista = document.getElementById("lista");

    for (const produc of carrito) {
      div5 = document.createElement("div");
      div5.innerHTML = `

    <div class="slider_componentes">
      <div class="componentes_imagen">
        <img src="media/${produc.imagen}" alt="">
      </div>
      <div class="componentes_nombres">
        <h3>${produc.nombre}</h3>
        <h4>$${produc.precio}</h4>
      </div>

    </div>
    `
      lista.prepend(div5);

    }

datosPersonales = document.getElementById("datosPersonales")
datosPersonales.addEventListener("submit",animacion)
}

function animacion(e){
  e.preventDefault();
  cuerpo__cuerpoFlex2.innerHTML = `
  <div class="agradecimientos">
    <div class="giro">
    </div>
  </div>
  `
  setTimeout(pagina3,1000)
}


function pagina3(){

    nombre= datosPersonales.nombre.value;
    email = datosPersonales.email.value;
    cuota = datosPersonales.cuotas.value;
    let division = totalPrecio/cuota
    division = division.toFixed(2)

    cuerpo__cuerpoFlex2.className="ocultar"
    cuerpo__cuerpoFlex3.className="cuerpo__cuerpoFlex3"
    cuerpo__cuerpoFlex3.innerHTML=`

    <div class="agradecimientos">
      <h1>¡Gracias <strong>${nombre}</strong> por elegirnos!</h1>
      <h2>¡El pago fue realizado con exito!</h2>
      <h2>Corrobora las instrucciones en tu correo: <strong>${email}</strong></h2>
      <h2>Pagaste $${totalPrecio} en ${cuota} cuotas de $${division}</h2>
    </div>
    `
}


//----------- inciio programa ---------------

let cuerpo_cajaProductos = document.getElementById("cuerpo_cajaProductos");
let header = document.getElementById("header");
let cuerpo = document.getElementById("cuerpo");
let precioMinimo = document.getElementById("precioMinimo");
let precioMaximo = document.getElementById("precioMaximo");
let filtroPrecio = document.getElementById("filtroPrecio");
let buscador = document.getElementById("buscador");
let alertaBuscador = document.getElementById("alertaBuscador");
let cuerpo__cuerpoFlex = document.getElementById("cuerpo__cuerpoFlex")
let cuerpo__cuerpoFlex2 = document.getElementById("cuerpo__cuerpoFlex2")
let cuerpo__cuerpoFlex3 = document.getElementById("cuerpo__cuerpoFlex3")
let espacio_alerta = document.getElementById("espacio_alerta")
alertaMinimo = document.createElement("h4");
let MaximoYminimo = document.getElementById("MaximoYminimo");

filtroPrecio.addEventListener("submit", funcionFiltroPrecio);
buscador.addEventListener("submit", funcionBuscar);
precioMinimo.addEventListener("change", verificarMinimo)
precioMaximo.addEventListener("change", verificarMaximo)

div2 = document.createElement("div");
div7 = document.createElement("div");
div4 = document.createElement("div");
div8 = document.createElement("div");
div9 = document.createElement("div");
div4.className = "ocultar";
cuerpo.prepend(div4);
mostrarIndex();
