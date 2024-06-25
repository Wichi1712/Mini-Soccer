/*
//Variables globales
var velocidad = 80;
var tamano = 10;

class objeto {
	constructor(){
		this.tamano = tamano;
	}
	choque(obj){
		var difx = Math.abs(this.x - obj.x);
		var dify = Math.abs(this.y - obj.y);
		if(difx >= 0 && difx < tamano && dify >= 0 && dify < tamano){
			return true;
		} else {
			return false;
		}
	}
}

class Cola extends objeto {
	constructor(x,y){
		super();
		this.x = x;
		this.y = y;
		this.siguiente = null;
	}
	dibujar(ctx){
		if(this.siguiente != null){
			this.siguiente.dibujar(ctx);
		}
		ctx.fillStyle = "#0000FF";
		ctx.fillRect(this.x, this.y, this.tamano, this.tamano);
	}
	setxy(x,y){
		if(this.siguiente != null){
			this.siguiente.setxy(this.x, this.y);
		}
		this.x = x;
		this.y = y;
	}
	meter(){
		if(this.siguiente == null){
			this.siguiente = new Cola(this.x, this.y);
		} else {
			this.siguiente.meter();
		}
	}
	verSiguiente(){
		return this.siguiente;
	}
}

class Comida extends objeto {
	constructor(){
		super();
		this.x = this.generar();
		this.y = this.generar();
	}
	generar(){
		var num = (Math.floor(Math.random() * 59))*10;
		return num;
	}
	colocar(){
		this.x = this.generar();
		this.y = this.generar();
	}
	dibujar(ctx){
		ctx.fillStyle = "#FF0000";
		ctx.fillRect(this.x, this.y, this.tamano, this.tamano);
	}
}
//Objetos del juego
var cabeza = new Cola(20,20);
var comida = new Comida();
var ejex = true;
var ejey = true;
var xdir = 0;
var ydir = 0;
function movimiento(){
	var nx = cabeza.x+xdir;
	var ny = cabeza.y+ydir;
	cabeza.setxy(nx,ny);
}
function control(event){
	var cod = event.keyCode;
	if(ejex){
		if(cod == 38){
			ydir = -tamano;
			xdir = 0;
			ejex = false;
			ejey = true;
		}
		if(cod == 40){
			ydir = tamano;
			xdir = 0;
			ejex = false;
			ejey = true;
		}
	}
	if(ejey){
		if(cod == 37){
			ydir = 0;
			xdir = -tamano;
			ejey = false;
			ejex = true;
		}
		if(cod == 39){
			ydir = 0;
			xdir = tamano;
			ejey = false;
			ejex = true;
		}
	}
}

function findeJuego(){
	xdir = 0;
	ydir = 0;
	ejex = true;
	ejey = true;
	cabeza = new Cola(20,20);
	comida = new Comida();
	alert("Perdiste");
}
function choquepared(){
	if(cabeza.x < 0 || cabeza.x > 590 || cabeza.y < 0 || cabeza.y > 590){
		findeJuego();
	}
}
function choquecuerpo(){
	var temp = null;
	try{
		temp = cabeza.verSiguiente().verSiguiente();
	}catch(err){
		temp = null;
	}
	while(temp != null){
		if(cabeza.choque(temp)){
			//fin de juego
			findeJuego();
		} else {
			temp = temp.verSiguiente();
		}
	}
}

function dibujar(){
	var canvas = document.getElementById("canvas");
	var ctx = canvas.getContext("2d");
	ctx.clearRect(0,0, canvas.width, canvas.height);
	//aquí abajo va todo el dibujo
	cabeza.dibujar(ctx);
	comida.dibujar(ctx);
}
function main(){
	choquecuerpo();
	choquepared();
	dibujar();
	movimiento();
	if(cabeza.choque(comida)){
		comida.colocar();
		cabeza.meter();
	}
}
setInterval("main()", velocidad);
*/

//---------------------------------------------------------------

var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var ancho = canvas.width;
var alto = canvas.height;

//variables de balon
var posHor = 80;
var posVer = 50;
var velocidadH = 1;
var velocidadV = 1;

//Variables de player
var X = 280;
var Y = 150;
var testX = 200;
var testY = 100;
var testMoveSpeed = 5;
const DIAMETER = 20;
var moveX = 5;
var moveY = 5;
var speed = 5;
var move = true;
var ejex = true;

var teclaIzquierda = 37;
var teclaAbajo = 38;
var teclaArriba = 40;
var teclaDerecha = 39;
var teclaEspacio = 32;
var teclaPulsada = null;
var tecla = [];

var ingAni = 0;
var ingAni2 = 0;
var player_array = new Array();
//var player_arrayRed = new Array();

//Variables de imagenes
var imgBandera;

function cargaImagenes(){
    imgBandera = new Image();
    
    imgBandera.src = "img/sagi 02.jpg"
}

cargaImagenes();

function dibujaBandera(){
    var posX = 20;
    var posY = 10;
    var anchoBandera = 40;
    var altoBandera = 30;
    ctx.drawImage(imgBandera,posX,posY,anchoBandera,altoBandera);
}

function dibujaFondo() {
    var anchoLinea = 5;
    var medioCampoHor = ancho/2;
    var medioCampoVer = alto/2;
    var anchoArcoI = 60;
    var anchoArcoD = ancho - 60;
    
    ctx.fillStyle = "#ffffff";
    //Lineas horizontales
    ctx.fillRect(10,10,ancho - 20,anchoLinea);//Izquierda
    ctx.fillRect(10,alto - 15,ancho - 20,anchoLinea);//Derecha

    //Lineas verticales
    ctx.fillRect(10,10,anchoLinea,alto - 20);//izquierda
    ctx.fillRect(medioCampoHor,10,anchoLinea,alto - 20);//centro
    ctx.fillRect(ancho - 15,10,anchoLinea,alto - 20);//derecha

	/*
    //Lineas de prueba
    //Diagonal
    ctx.moveTo(medioCampoR, 10);
    ctx.lineTo(585, 285);
    //Del punto medio hacia la derecha
    ctx.moveTo(medioCampoR,canvasRequest.height/2);
    ctx.lineTo(550, canvasRequest.height/2);
    //Del punto medio hacia la izquierda
    ctx.moveTo(medioCampoR,canvasRequest.height/2);
    ctx.lineTo(50, canvasRequest.height/2);

    ctx.strokeStyle = "#30ff30";//color de linea
	ctx.stroke();
	*/

    //Circulo centro de campo
    ctx.beginPath();
    ctx.arc(ancho/2, alto/2, 30, 0, 2 * Math.PI);
    ctx.strokeStyle = "#ffffff";//color de linea
	ctx.stroke();
	

    //TEST LINES
    //ctx.beginPath();
    /*
    ctx.moveTo(10, 60);
    ctx.lineTo(40, 60);
    ctx.moveTo(40, 60);
    ctx.lineTo(40, 140);
    ctx.moveTo(40, 140);
    ctx.lineTo(10, 140);
    ctx.strokeStyle = "white";
    ctx.stroke();
    */
    
    //ARCOS DERECHO E IZQUIERDO
    /*A partir de aqui se dibuja los arcos donde entrara el balon para hacer puntos.
    Se usan 3 lineas para cada arco (Desde - Hasta)
    */
    //Izquierda
    //ctx.beginPath();
    ctx.moveTo(10, medioCampoVer - 50);//Desde punto X Y
    ctx.lineTo(anchoArcoI, medioCampoVer - 50);//Hasta punto X Y
    
    ctx.moveTo(anchoArcoI, medioCampoVer - 50);//Desde punto X Y
    ctx.lineTo(anchoArcoI, medioCampoVer + 50);//Hasta punto X Y
    
    ctx.moveTo(anchoArcoI, medioCampoVer + 50);//Desde punto X Y
    ctx.lineTo(10, medioCampoVer + 50);//Hasta punto X Y
    ctx.strokeStyle = "white";
    ctx.stroke();
    
    //Derecho
    //ctx.beginPath();
    ctx.moveTo(ancho - 10, medioCampoVer - 50);//Desde punto X Y
    ctx.lineTo(anchoArcoD, medioCampoVer - 50);//Hasta punto X Y
    
    ctx.moveTo(anchoArcoD, medioCampoVer - 50);//Desde punto X Y
    ctx.lineTo(anchoArcoD, medioCampoVer + 50);//Hasta punto X Y
    
    ctx.moveTo(anchoArcoD, medioCampoVer + 50);//Desde punto X Y
    ctx.lineTo(ancho - 10, medioCampoVer + 50);//Hasta punto X Y
    ctx.strokeStyle = "white";
    ctx.stroke();
    
}

//BALON
function dibujaBalon() {
    ctx.fillStyle = "#0000FF";
    ctx.fillRect(posHor, posVer, 20, 20);
    
    //Mueve balon
    //colision horizontal
    if(posHor > ancho){
        velocidadH = -1;
	}else if(posHor < 0){velocidadH = 1}
	//Colision vertical
	if(posVer > alto){
        velocidadV = -1;
    }else if(posVer < 0){velocidadV = 1}
	
    //move
	posHor = posHor + velocidadH;
    posVer = posVer + velocidadV;
}
//---------------------------------------------------------------------------------
//OBJETO PLAYER
function Player(posX, posY, tamano, color) {
	this.posX = posX;
	this.posY = posY;
	this.tamano = tamano;
	this.color = color;

	//this.dibuja = function () {
	ctx.save();
	ctx.fillStyle = this.color;
	ctx.fillRect(this.posX, this.posY, this.tamano, this.tamano);
	//this.posY = this.posY + 10;
	ctx.restore();
	//};
	
}

//----------------------------------------------------------------------------
function Test(posx, posy, tamano, color) {
	this.x = posx;
	this.y = posy;
	this.tamano = tamano;
	this.color = color;

	this.dibuja = function () {
	ctx.save();
	ctx.fillStyle = this.color;
	ctx.fillRect(this.x, this.y, this.tamano, this.tamano);
	//this.posY = this.posY + 10;
	ctx.restore();
	};
/*
	this.move = function () {
		if (tecla[teclaDerecha]) this.x += testMoveSpeed;
		if (tecla[teclaIzquierda]) this.x -= testMoveSpeed;
		if (tecla[teclaArriba]) this.y += testMoveSpeed;
		if (tecla[teclaAbajo]) this.y -= testMoveSpeed;
	};

*/
}

function moveTest() {
	//this.move = function () {
		if (tecla[teclaDerecha]) testX += testMoveSpeed;
		if (tecla[teclaIzquierda]) testX -= testMoveSpeed;
		if (tecla[teclaArriba]) testY += testMoveSpeed;
		if (tecla[teclaAbajo]) testY -= testMoveSpeed;
	//};
}

var test = new Test(testX ,testY , 30,"cyan");
//console.log(player);
//--------------------------------------------------------------------------------

//EQUIPO DE PLAYER
function equipoBluePlayer() {
	for (var i = 0; i < 3; i++) {//filas
		for (var j = 0; j < 2; j++) {//columnas
			player_array.push(new Player(X + 30 * j, Y + 45 * i, DIAMETER, "blue"));
		}
	}
}

function equipoRedPlayer() {
	for (var i = 0; i < 3; i++) {//filas
		for (var j = 0; j < 2; j++) {//columnas
			player_array.push(new Player(410 + 40 * j, 30 + 50 * i, DIAMETER, "red"));
		}		
	}
}

function equipoTest() {
	
	for (var i = 0; i < 5; i++) {//filas
		for (var j = 0; j < 3; j++) {//columnas
			var test = new Test(testX + 30 * j, testY  + 30* i, 10, "yellow");
			//test.move();
			test.dibuja();
		}		
	}
			
}


//-----------------------------------------------------------------------------------------------

//PLAYER1
function player1() {
    
    ctx.fillStyle = "#aa0000";
    ctx.fillRect(X, Y, DIAMETER, 30);
    
}

function movePlayer() {

	//Limites de movimiento
	if( X > canvas.width - DIAMETER) {X = canvas.width - DIAMETER;}
	else if( X < 0) {X = 0;}
	else if( Y > canvas.height - DIAMETER) {Y = canvas.height - DIAMETER;}
	else if ( Y < 0) {Y = 0;}

    //move
	//X = X + moveX;
	//Y = Y + moveY;
	if (tecla[teclaDerecha]) X += speed;
	if (tecla[teclaIzquierda]) X -= speed;
	if (tecla[teclaArriba]) Y += speed;
	if (tecla[teclaAbajo]) Y -= speed;
	
	//Verifica cañon
	//if (x > canvas.width - 20) x = canvas.width - 20;
	//if (x < 0) x = 0;
	//Disparo
	if (tecla[teclaEspacio]) {
		console.log("tecla espacio pulsada");
		/*
		if (tiempoBala == true && municion !=0 ){
			tiempoBala = false;
			balas_array.push(new Bala(nave.x + 12, nave.y - 3, 5));
			(municion >0)?municion = municion - 1 : false;
			tecla[teclaEspacio] = false;
			disparaEnemigo();
			setTimeout(function(){tiempoBala = true;}, 300);
		}
		*/
	}
	
}

document.addEventListener("keydown", function(e){
	teclaPulsada = e.keyCode;
	tecla[e.keyCode] = true;
	console.log(keyCode);//Muestra la tecla pulsada
	/*
	var cod = e.keyCode;
	if(move){
			
		if(cod == 38){
			moveY = -1;
			//xdir = 0;
			//ejex = false;
			//ejey = true;
			//move = true;
		}
		if(cod == 40){
			moveY = 1;
			//xdir = 0;
			//ejex = false;
			//ejey = true;
		}
			
	}

	if(move){
		if(cod == 37){
			//ydir = 0;
			moveX = -1;
			//ejey = false;
			//ejex = true;
		}
		if(cod == 39){
			//ydir = 0;
			moveX = 1;
			//ejey = false;
			//ejex = true;
		}
	}
    
 */   
});
document.addEventListener("keyup", function (e) {
	tecla[e.keyCode] = false;
	//moveX = 0; moveY = 0;
});


function puntuacion() {
	ctx.font = "30px Arial";
	ctx.fillStyle = "#ffffff";
	ctx.fillText("TEXTO" ,20,60);

	ctx.font = "30px Comic Sans MS";
	ctx.fillText("Hello World", 200, 50);
}


function borraCanvas() {
    ctx.clearRect(0,0, ancho, alto);
}


function animation(){
    borraCanvas();
    //cargaImagenes();
    dibujaBandera();
    dibujaFondo();
	dibujaBalon();
	test.dibuja();
	//test.move();
	moveTest();
	player1();
	movePlayer();
	//player2();
	puntuacion();
	//player.dibuja();//Rectangulo de prueba
	equipoBluePlayer();//Funcion de prueba
	equipoRedPlayer();//Funcion de prueba
	equipoTest();
    
    
    requestAnimationFrame(animation);
}

animation();

//-----------------------------------------------------------------------

/**************
INICIO

window.onload = function () {
	canvas = document.getElementById("miCanvas");
	if (canvas && canvas.getContext) {
		ctx = canvas.getContext("2d");
		if (ctx) {
			x = canvas.width / 2;
			mensaje("INVASORES");
			imgNave = new Image();
			imgOvni = new Image();
			imgOvni.src = "imagenes/ovni.png";
			imgNave.src = "imagenes/nave.png";
			imgNave.onload = function () {
				nave = new nave(0);
			}
			imgOvni.onload = function () {
				for (var i = 0; i < 5; i++) {
					for (var j = 0; j < 10; j++) {
						ovnis_array.push(new Enemigo(100 + 40 * j, 30 + 45 * i));
					}
				}
				setTimeout(anima, 1500);
				disparoEnemigo = setTimeout(disparaEnemigo, tiempoDisparo);
			}
		} else {
			alert("Error al crear tu contexto");
		}
	}
}

//LISTENER
window.requestAnimationFrame = (function () {
	return window.requestAnimationFrame ||
		window.webkitRequestAnimationFrame ||
		window.mozRequestAnimationFrame ||
		function (callback) { window.setTimeout(callback, 17); }
})();
document.addEventListener("keydown", function (e) {
	teclaPulsada = e.keyCode;
	tecla[e.keyCode] = true;
});
document.addEventListener("keyup", function (e) {
	tecla[e.keyCode] = false;
});

//VARIABLES

var canvas, ctx;
var x = 100;
var y = 100;
var teclaIzquierda = 37;
var teclaDerecha = 39;
var teclaEspacio = 32;
var imgNave, imgOvni;
var municion = 100;
var ultimos = new Array();
var imgAni = 0;
var imgAni2 = 0;
var enemigosVivos = 50;
var tiempoBala = true ;
var teclaPulsada = null;
var tecla = [];
var balas_array = new Array();
var ovnis_array = new Array();
var balasEnemigas_array = new Array();
var endGame = false;
var disparoEnemigo;
var tiempoDisparo = 500;
var puntos = 0;

//OBJETOS

function Bala(x, y, w) {
	this.x = x;
	this.y = y;
	this.w = w;
	this.dibuja = function () {
		ctx.save();
		ctx.fillStyle = "blue";
		ctx.fillRect(this.x, this.y, this.w, this.w);
		this.y = this.y - 6;
		ctx.restore();
	};
	this.dispara = function () {
		ctx.save();
		ctx.fillStyle = "red";
		ctx.fillRect(this.x, this.y, this.w, this.w);
		this.y = this.y + 4;
		ctx.restore();
	};
}
function nave(x) {
	this.x = x;
	this.y = 450;
	this.w = 30;
	this.h = 15;
	this.dibuja = function (x) {
		this.x = x;
		if(imgAni2 < 5){
			ctx.drawImage(imgNave,0   , 0   , 32  , 32  , this.x, this.y, 35  , 35);
			imgAni2 = imgAni2 + 1;
			imgAni = imgAni + 1;
			checarBalas();
			//setInterval(checarBalas(),1000);
		} else if(imgAni2 < 10) {
			ctx.drawImage(imgNave,32  , 0   , 32  , 32  , this.x, this.y, 35  , 35);
			imgAni2 = imgAni2 + 1;
			imgAni = imgAni + 1;
		} else{
			ctx.drawImage(imgNave,32  , 0   , 32  , 32  , this.x, this.y, 35  , 35);
			imgAni2 = 0;
		}
		
	};
}
function Enemigo(x, y) {
	this.x = x;
	this.y = y;
	this.w = 35;
	this.veces = 0;
	this.dx = 5;
	this.ciclos = 0;
	this.num = 14;
	this.figura = true;
	this.vive = true;
	this.dibuja = function () {
		//Retraso
		if (this.ciclos > 20) {
			//saltitos
			if (this.veces > this.num) {
				this.dx *= -1;
				this.veces = 0;
				this.num = 28;
				this.y += 40;
				this.dx = (this.dx > 0) ? this.dx++ : this.dx--;
			} else {
				this.x += this.dx;
			}
			this.veces++;
			this.ciclos = 0;
			this.figura = !this.figura;
		} else {
			this.ciclos++;
		}
		if (this.vive) {
			if (imgAni < 4) {
				ctx.drawImage(imgOvni, 0   , 0   , 32  , 32  , this.x, this.y, 35  , 35);
				//           (imgFile, xini, yini, wimg, himg, xpos  , ypos  , wrez, hrez)
			} else if(imgAni < 8) {
				ctx.drawImage(imgOvni, 32, 0, 32, 32, this.x, this.y, 35, 35);
			} else if(imgAni < 12) {
				ctx.drawImage(imgOvni, 64, 0, 32, 32, this.x, this.y, 35, 35);
			} else if(imgAni > 11) {
				ctx.drawImage(imgOvni, 0, 0, 32, 32, this.x, this.y, 35, 35);
				imgAni = 0;
			}
		} else {
			ctx.fillStyle = "black";
			ctx.fillRect(this.x, this.y, 35, 30);
		}

	};
}

//FUNCIONES

function anima() {
	if (endGame == false) {
		requestAnimationFrame(anima);
		verifica();
		pinta();
		colisiones();
	}
}
function mensaje(cadena) {
	var lon = (canvas.width - (50 * cadena.length)) / 2;
	ctx.fillStyle = "white";
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	ctx.font = "bold 75px Arial";
	ctx.fillText(cadena, lon, 220);
}
function colisiones() {
	for (var i = 0; i < ovnis_array.length; i++) {
		for (var j = 0; j < balas_array.length; j++) {
			enemigo = ovnis_array[i];
			bala = balas_array[j];
			if (enemigo != null && bala != null) {
				if ((bala.x > enemigo.x) &&
					(bala.x < enemigo.x + enemigo.w) &&
					(bala.y > enemigo.y) &&
					(bala.y < enemigo.y + enemigo.w)) {
					enemigo.vive = false;
					enemigosVivos = enemigosVivos - 1;
					ovnis_array[i] = null;
					balas_array[j] = null;
					puntos += 10;
					score();
				}
			}
		}
	}
	for (var j = 0; j < balasEnemigas_array.length; j++) {
		bala = balasEnemigas_array[j];
		if (bala != null) {
			if ((bala.x > nave.x) &&
				(bala.x < nave.x + nave.w) &&
				(bala.y > nave.y) &&
				(bala.y < nave.y + nave.h)) {
				gameOver();
			}
		}
	}
}
function gameOver() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	balas_array = [];
	ovnis_array = [];
	balasEnemigas_array = [];
	if( enemigosVivos == 0 ){
		mensaje("GANASTE");
	}else{
		mensaje("GAME OVER");
	}
	endGame = true;
	clearTimeout(disparoEnemigo);
}
function score() {
	ctx.save();
	ctx.fillStyle = "white";
	ctx.clearRect(0, 0, canvas.width, 20);
	ctx.font = "bold 12px Courier";
	ctx.fillText("SCORE: " + puntos, 10, 20);
	ctx.restore();
}
function municiones() {
	ctx.save();
	ctx.fillStyle = "white";
	ctx.clearRect(0, 20, canvas.width, 20);
	ctx.font = "bold 12px Courier";
	ctx.fillText("Municion: " + municion, 10, 40);
	ctx.restore();
}
function verifica() {
	if (tecla[teclaDerecha]) x += 5;
	if (tecla[teclaIzquierda]) x -= 5;
	//Verifica cañon
	if (x > canvas.width - 20) x = canvas.width - 20;
	if (x < 0) x = 0;
	//Disparo
	if (tecla[teclaEspacio]) {
		if (tiempoBala == true && municion !=0 ){
			tiempoBala = false;
			balas_array.push(new Bala(nave.x + 12, nave.y - 3, 5));
			(municion >0)?municion = municion - 1 : false;
			tecla[teclaEspacio] = false;
			disparaEnemigo();
			setTimeout(function(){tiempoBala = true;}, 300);
		}
	}
}
function checarBalas(){
	var balasArrayVal = 0;
	for(let i = 0 ; i < balas_array.length; i++){
		if(balas_array[i] != null){
			balasArrayVal = 1;
		}
	}
	if(municion == 0 && balas_array.length == 100 && balasArrayVal == 0 && enemigosVivos > 0){
		tecla[teclaEspacio] = false;
			alert("Sin municion");
			gameOver();
	}
}
function pinta() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	score();
	municiones();
	nave.dibuja(x);
	//Balas
	for (var i = 0; i < 100; i++) {
		if (balas_array[i] != null) {
			balas_array[i].dibuja();
			if (balas_array[i].y < 0) balas_array[i] = null;
		}
	}
	//Balas Enemigas
	for (var i = 0; i < balasEnemigas_array.length; i++) {
		if (balasEnemigas_array[i] != null) {
			balasEnemigas_array[i].dispara();
			if (balasEnemigas_array[i].y > canvas.height) balasEnemigas_array[i] = null;
		}
	}
	//Enemigos
	numEnemigos = 0;
	for (var i = 0; i < ovnis_array.length; i++) {
		if (ovnis_array[i] != null) {
			ovnis_array[i].dibuja();
			if (ovnis_array[i].y == nave.y) {
				gameOver();
			}
			numEnemigos++;
		}
	}
	if (numEnemigos == 0) gameOver();
}
function disparaEnemigo() {
	for (var i = ovnis_array.length - 1; i > 0; i--) {
		if (ovnis_array[i] != null) {
			ultimos.push(i);
		}
		if (ultimos.length >= 10) break;
	}
	Array.prototype.clean = function(deleteValue) { 
		for (var i = 0; i < this.length; i++) {
				if (this[i] == deleteValue) { 
					this.splice(i, 1); i--; 
				} 
			} return this; 
		}; 
	ovnis_array.clean(undefined);
	d = ultimos[Math.floor(Math.random() * ovnis_array.length)];
	if(ovnis_array[d] == null || d == null){
		ovnis_array.clean(undefined);
		d = Math.floor(Math.random() * ovnis_array.length);
	}
	balasEnemigas_array.push(new Bala(ovnis_array[d].x + ovnis_array[d].w / 2, ovnis_array[d].y, 5));
	clearTimeout(disparoEnemigo);
	disparoEnemigo = setTimeout(disparaEnemigo, tiempoDisparo);
}
*/