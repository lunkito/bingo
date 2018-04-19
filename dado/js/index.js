function tirarDado(idDado, idLista){
  var rand = Math.floor(Math.random() * 6) + 1
  var dado = document.getElementById(idDado)
  var lista = document.getElementById(idLista)
  
  // window.setTimeout(() => { dado.innerHTML = rand } , 1000)

  lista.innerHTML += "<li>" + rand + "</li>"
}

function reset(lista){
  var ul = document.getElementById(lista)
  ul.innerHTML = "<li></li>"
}