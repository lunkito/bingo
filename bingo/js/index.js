// No tomar en serio. Tiene fallos a patadas, sobre todo a la hora de nombrar.

var elements = {
  player: document.querySelector(".card-player"),
  cpu: document.querySelector(".card-cpu"),
  dice: document.querySelector(".dice"),
  button: document.querySelector(".button"),
  modal: document.querySelector(".modal")

  //// FUNCIONES PA USAR MAS TARDE ////

  // Crea los numeros del cartón
  // 15 para jugadores. 90 para el total
};var createNumbers = function createNumbers(many) {
  var numbers = _.range(1, 90);
  var shuffled = _.shuffle(numbers);
  return shuffled.splice(0, many);
};

// Crea divs con numero del jugador y lo añade al padre
var showCard = function showCard(father, card) {
  card.forEach(function (number, index) {
    var div = document.createElement('div');
    div.textContent = number;
    div.classList.add("number");
    div.classList.add("number" + number);
    father.appendChild(div);
  });
};

// Funcion para boton Lanzar.
// Genera numero al azar. Lo elimina del carton general. Comprueba ganador
var newNumber = function newNumber() {
  var random = all.pop();
  elements.dice.textContent = random;

  // Busqueda del numero en los div. Devuelve array con 0, 1 o 2 divs.
  var selectedDivs = document.querySelectorAll(".number" + random);
  selectedDivs.forEach(function (div) {
    return div.classList.add("rejected");
  });

  checkWinner(random, player);
  checkWinner(random, cpu);
};

var checkWinner = function checkWinner(number, player) {
  // Eliminar el numero elegido
  if (player.card.includes(number)) player.card = _.pull(player.card, number);

  // Comprobar si hay ganador
  if (player.card.length == 0) finish(player);

  // Comprobar Linea
  checkLines(player);
};

var doIt = true;
// Todos los div de jugador. Lineas de 5 elementos. check rejected por linea
var checkLines = function checkLines(player) {
  var selectedItems = [];
  var selectedCount = 0;

  if (doIt) {
    selectedItems = document.querySelectorAll(".card-" + player.name + " .number");
    selectedCount = 0;
    for (var i = 0; i < 5; i++) {
      if (selectedItems[i].classList.contains("rejected")) selectedCount++;
      if (selectedCount == 5) {
        document.querySelector(".card-" + player.name + " .number").classList.add("active-line1");
        doIt = false;
      }
    }

    selectedCount = 0;
    for (var _i = 5; _i < 10; _i++) {
      if (selectedItems[_i].classList.contains("rejected")) selectedCount++;
      if (selectedCount == 5) {
        document.querySelector(".card-" + player.name + " .number").classList.add("active-line2");
        doIt = false;
      }
    }

    selectedCount = 0;
    for (var _i2 = 10; _i2 < 15; _i2++) {
      if (selectedItems[_i2].classList.contains("rejected")) selectedCount++;
      if (selectedCount == 5) {
        document.querySelector(".card-" + player.name + " .number").classList.add("active-line3");
        doIt = false;
      }
    }
  }
};

// Mostrar pantallazo con ganador y quitar el foco de teclado para que machacar enter no lo bugee
var finish = function finish(player) {
  elements.modal.querySelector("h1").textContent = "Ganador " + player.name;
  elements.modal.classList.toggle("active");
  elements.button.blur();
};

// Click en boton resset del modal. Quitar modal y reiniciar valores
// Yo del futuro, no seas mongol. main() se llama desde fuera de main(), no hay llamadas infinitas ni paranoias raras.
// Por que lo llamas main en vez de init o algo asi? por mongol seguramente. Pereza cambiar nombres
var reset = function reset() {
  elements.modal.classList.toggle("active");

  // Reiniciar vars
  doIt = true;
  player.card = null;
  cpu.card = null;
  elements.player.textContent = null;
  elements.cpu.textContent = null;
  elements.dice.textContent = null;

  main();
};

var player = {};
var cpu = {};
// MAIN //
var main = function main() {
  player = {
    card: createNumbers(15),
    name: "player"
  };
  cpu = {
    card: createNumbers(15),
    name: "cpu"
  };
  all = createNumbers(90);

  showCard(elements.player, player.card);
  showCard(elements.cpu, cpu.card);
};

main();