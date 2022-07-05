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
//-----------   Funciones  -------------------


function agregarAlCarrito(id) {

  let item = vinos.find((prod) => prod.id === id)
  carrito.push(item);
  console.log(carrito);

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
  <div class="alerta_compra  ">
    <h1>Producto enviado al carrito</h1>
    <div class="cuerpo_lineaMenu"></div>
    <h3>${item.nombre}</h3>
    <h4>$${item.precio}</h4>
    <button type="button" onclick="cerrar()">Cerrar</button>
  </div>

  `
  div3.classList = "espacio_alerta";
  div3.append(div6);
  cuerpo.prepend(div3);
  setTimeout(cerrar, 3000);

  totalPrecio = 0;
  div8.innerHTML = "";
  funcionSlider();

}



function eliminarDelCarrito(index) {
  if (index != -1) {
    carrito.splice(index, 1)
    console.log(index)
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
  div3.innerHTML = "";

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

  }

  if (carrito.length != 0) {
    div7.innerHTML = `
    <div class="cuerpo_lineaMenu"></div>
    <h1>Total: $${totalPrecio}</h1>
    <button id="boton_compra" type="button" name="button">COMPRAR</button>
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
    div4.className = "menu_slider";
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
    }

  } else if (filtrosVino == 2) {

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





//----------- inciio programa ---------------

let cuerpo_cajaProductos = document.getElementById("cuerpo_cajaProductos");
let header = document.getElementById("header");
let cuerpo = document.getElementById("cuerpo");
let precioMinimo = document.getElementById("precioMinimo");
let precioMaximo = document.getElementById("precioMaximo");
let filtroPrecio = document.getElementById("filtroPrecio");
alertaMinimo = document.createElement("h4");
let MaximoYminimo = document.getElementById("MaximoYminimo");

filtroPrecio.addEventListener("submit", funcionFiltroPrecio);
precioMinimo.addEventListener("change", verificarMinimo)
precioMaximo.addEventListener("change", verificarMaximo)

div2 = document.createElement("div");
div3 = document.createElement("div");
div7 = document.createElement("div");
div4 = document.createElement("div");
div8 = document.createElement("div");
div9 = document.createElement("div");
div4.className = "ocultar";
cuerpo.prepend(div4);
mostrarIndex();
