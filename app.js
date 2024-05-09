/*La idea es hacer un ecomerce de una librería*/
/*clase libro para crear objetos libros*/

class Libro {
    constructor(titulo, autor, precio, descripcion) {
      this.titulo = titulo;
      this.autor = autor;
      this.precio = precio;
      this.descripcion = descripcion;
    }
  
    agregar(cantidad) {
      this.cantidad += cantidad;
    }
  }
  
  /*instancias de Libro*/
  const libro0 = new Libro(
    "Casa negra",
    "Stephen King , Peter Straub",
    34.999,
    "Una obra maestra de la mano de dos genios de la literatura de terror. Una historia absolutamente espeluznante. En Casa Negra Stephen King y Peter Straub cuentan otra historia de Jack Sawyer, protagonista de El Talismán, el primer libro que escribieron juntos."
  );
  const libro1 = new Libro(
    "Harry Potter y las Reliquias de la Muerte",
    "J. K Rowling",
    52.499,
    "Una obra maestra de la mano de dos genios de la literatura de terror. Una historia absolutamente espeluznante. En Casa Negra Stephen King y Peter Straub cuentan otra historia de Jack Sawyer, protagonista de El Talismán, el primer libro que escribieron juntos."
  );
  const libro2 = new Libro(
    "DUNE (pack: Dune | El mesías de Dune | Hijos de Dune)",
    "Frank Herbert",
    15.291,
    "Esta imponente edición estuche reúne los tres primeros volúmenes en edición actualizada de «Dune», la saga que se convirtió en un fenómeno de culto desde su publicación hace ya más de medio siglo."
  );
  const libro3 = new Libro(
    "Juego de tronos (Canción de hielo y fuego 1)",
    "George R.R Martin",
    22.941,
    "En este majestuoso escenario, lord Stark y su familia se encuentran en el centro de un conflicto que desatará todas las pasiones: la traición y la lealtad, la compasión y la sed de venganza, el amor y el poder, la lujuria y el incesto, todo ello para ganar la más mortal de las batallas: el trono de hierro, una poderosa trampa que atrapará a los personajes... y al lector."
  );
  const libro4 = new Libro(
    "El poder de las palabras : Cómo cambiar tu cerebro (y tu vida) conversando",
    "Stephen King Peter Straub",
    23.299,
    "Una obra maestra de la mano de dos genios de la literatura de terror. Una historia absolutamente espeluznante. En Casa Negra Stephen King y Peter Straub cuentan otra historia de Jack Sawyer, protagonista de El Talismán, el primer libro que escribieron juntos."
  );
  const libro5 = new Libro(
    "Freud: En su tiempo y el nuestro",
    "Elisabeth Roudinesco",
    26.999,
    " Aquí está Freud en su tiempo, en su familia, rodeado de sus colecciones, con sus mujeres, sus hijos, sus perros; enfrentado al pesimismo ante el auge de los extremismos, lleno de dudas a la hora de emprender su exilio en Londres, donde morirá. Pero también lo veremos en nuestro tiempo, alimentando nuestras preguntas con sus propias dudas, sus fracasos y sus pasiones."
  );
  const libro6 = new Libro(
    "De La Pampa a los Estados Unidos",
    "René Favaloro",
    9.999,
    "La vida de los hombres oculta razones, decisiones y matices que sólo los protagonistas de esas vidas conocen a fondo. El testimonio del doctor Favaloro permite a los lectores adentrarse en una vida apasionante, tanto por las convicciones que la alientan como por los abundantes episodios anecdóticos que ayudan a entenderla. La carrera profesional del médico argentino que viajó a Estados Unidos para perfeccionarse y logró convertirse en un cirujano eminente está aquí junto a las profundas reflexiones de un hombre cuyos múltiples intereses provocan curiosidad, admiración y respeto."
  );
  
  /*array que contiene los objetos libros para poder recorrerlos*/
  
  const libros = [libro0, libro1, libro2, libro3, libro4, libro5, libro6];
  
  const ul = document.getElementById("lista");
  
  libros.forEach((element, i) => {
    const li = document.createElement("li");
    li.innerHTML = `
        
          <ul class="col">
            <div class="card shadow-sm">
              <img src="./assets/libro${i}.jpg" alt="" class="bd-placeholder-img card-img-top imgCover" width="100%" height="600">
              <div class="card-body">
                <h3>${element.titulo}</h3>
                <p class="card-text cardD ofHidden">${element.descripcion}</p>
                <div class="d-flex justify-content-between align-items-center">
                  <small class="text-muted">Autor: ${element.autor}</small>
                  <span>$${element.precio}</span>
                  <div class="btn-group">
                    <input type="text" class="form-control" placeholder="Cant." size="1px" id="inputCantidad${i}">
                    <button type="button" class="btn btn-sm btn-outline-secondary" id="btnAgregar${i}">Agregar</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
      `;
    ul.appendChild(li);
  });
  
  function finder(titulo) {
    let index = carrito.findIndex((object) => {
      return object.titulo === titulo;
    });
    return index;
  }
  
  function calcularTotal() {
    const totalCarrito = document.createElement("div");
    containerCarrito.appendChild(totalCarrito);
    let total = 0;
    carrito.forEach((element) => {
      total += element.precioUn * element.cant;
    });
  
    totalCarrito.innerHTML = "Total: $" + total;
    return totalCarrito;
  }
  
  function funcVaciarCarrito() {
    carrito = [];
    localStorage.clear();
  }
  
  let carrito = [];
  const carritoLS = JSON.parse(localStorage.getItem("carrito"));
  
  if (carritoLS) {
    carrito = carritoLS;
  }
  let finded;
  
  libros.forEach((element, i) => {
    const inputCantidad = document.getElementById(`inputCantidad${i}`);
    const btnAgregar = document.getElementById(`btnAgregar${i}`);
  
    btnAgregar.addEventListener("click", () => {
      const cantidad = inputCantidad.value;
  
      if (cantidad === "") return;
  
      finded = finder(element.titulo);
  
      if (finded == -1) {
        carrito.push({
          titulo: element.titulo,
          cant: cantidad,
          precioUn: element.precio,
        });
      } else {
        for (let index = 0; index < cantidad; index++) {
          carrito[finded].cant++;
        }
      }
  
      const carritoJSON = JSON.stringify(carrito);
      localStorage.setItem("carrito", carritoJSON);
  
      const alertText = document.getElementById("alertAgregado");
      alertText.innerHTML = `Agregaste ${cantidad} ${element.titulo} al carrito.`;
      document.getElementById("alertAgregado").style.display = "block";
  
      setTimeout(displayNone, 4000);
  
      inputCantidad.value = "";
    });
  });
  
  function displayNone() {
    document.getElementById("alertAgregado").style.display = "none";
  }
  
  const containerCarrito = document.getElementById("containerCarrito");
  
  const mostrarCarrito = document.getElementById("mostrarCarrito");
  
  mostrarCarrito.addEventListener("click", () => {
    document.getElementById("panelCarrito").className = "animate__fadeInRightBig";
    document.getElementById("panelCarrito").style.left = "34%";
  
    const listaCarrito = document.createElement("ul");
    containerCarrito.appendChild(listaCarrito);
  
    carrito.forEach((element) => {
      const li = document.createElement("li");
      let subtotal = 0;
      subtotal = element.precioUn * element.cant;
      li.innerHTML = `${element.cant} x ${element.titulo} $${subtotal}`;
      listaCarrito.appendChild(li);
    });
  
    totalCarrito = calcularTotal();
  
    const cerrarCarrito = document.getElementById("close");
    cerrarCarrito.addEventListener("click", () => {
      document.getElementById("panelCarrito").style.left = "100%";
      listaCarrito.remove();
      totalCarrito.remove();
    });
    const vaciarCarrito = document.getElementById("vaciarCarrito");
  
    vaciarCarrito.addEventListener("click", () => {
      listaCarrito.remove();
      totalCarrito.remove();
      totalCarrito = calcularTotal();
      funcVaciarCarrito();
    });
  });
  