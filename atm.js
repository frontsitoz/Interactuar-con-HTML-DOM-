//Cajero Automático 
class Billete
{
  constructor(v, c)
  {
    this.valor = v;
    this.cantidad = c;
    this.imagen = new Image();
    this.imagen.src = imagenes[this.valor];
  }
}

var imagenes = [];
imagenes["100"] = "100.png";
imagenes["50"] = "50.png";
imagenes["20"] = "20.png";
imagenes["10"] = "10.png";


var caja = [];
caja.push( new Billete(100, 5) );
caja.push( new Billete(50, 8) );
caja.push( new Billete(20, 7) );
caja.push( new Billete(10, 10) );

var entregado = [];

var dinero;
var div;
var papeles;

var boton_saldo = document.getElementById("ver_saldo");
boton_saldo.addEventListener("click", saldo);

var total = 0;
function saldo() {
  var monto = 0;
  for (var v of caja) {
    monto = monto + v.valor * v.cantidad;
    total = monto;
    resultado.innerHTML = "<h3>Su saldo es: S/"+ monto + "<hr /></h3>" ;
  }
}
function actualizar() {  //actualiza el saldo despues de depositar
  var saldo = 0 ;
  for (var v of caja) {
    saldo = saldo + v.valor * v.cantidad;
    total = saldo;
  }
}


var cantidad = document.getElementById("cantidad");
var resultado = document.getElementById("resultado");
var b = document.getElementById("extraer");


b.addEventListener("click", entregarDinero);



function entregarDinero()
{
  resultado.innerHTML = "";
  var t = document.getElementById("dinero");
  dinero = parseInt(t.value);

  for(var b of caja)
  {
    if(dinero > 0)
    {
      div = Math.floor(dinero / b.valor);

      if(div > b.cantidad)
      {
        papeles = b.cantidad;
      }
      else
      {
        papeles = div;
      }
      entregado.push( new Billete(b.valor, papeles) );
      dinero -= (b.valor * papeles);

      b.cantidad -= papeles;
    }
  }

  if(dinero > 0)
  {
    resultado.innerHTML = " <h3><strong>No podemos darte </strong><strong> esa cantidad :(</strong> <br /><hr /></h3>";
  }
  else
  {
    resultado.innerHTML += "<h3><p>Retiraste:<br /></p></h3>";

    for(var e of entregado)
    {
      if(e.cantidad > 0)
      {
        for(var bi = 1; bi <= e.cantidad ;bi++)
        {
          resultado.innerHTML += "<img src=" + e.imagen.src + " />" + "<br /><hr />";
        }
    
      }
    }
  }
}


function existencia()
{
  var total = 0;

  for(var bi of caja)
  {
    total += bi.valor * bi.cantidad;
  }
  alert("La cantidad actual de dinero es de " + total + "$COP");

  
}
document.getElementById("limpiar").onclick = function borra(){
  resultado.innerHTML = "";
    entregado = [];
}