let img;
function preload() {
  imgBack = loadImage('BACK.png');
  imglivro = loadImage('lvl.png');
  imgcaveira = loadImage('caveira.png');
  imgBackInicial = loadImage('BACKINICIAL.png');
  imgBackFinal = loadImage('BACKFINAL.png');
}
var altura = 400;
var largura = 600;
var pontos = 0;
var tela = 1;

function setup(){
	createCanvas(600, 400);
}
//Funções do jogo** (Inicio, meio e fim)
function draw(){
    if(tela == 1) {
     background(imgBackInicial);
      
    if(keyIsDown(ENTER)){
    tela = 2 
    }
    }
    if(tela == 2){
      clear();
	background(imgBack);
	if(keyIsDown(32)){
		jogador.yVelocidade = 10;
	}
	jogador.update();
	jogador.draw();
	fill("#FFF");
    textSize(20)
	text("Pontuação : " + pontos, 10, 20);
	obstaculos = obstaculos.filter(function(obstaculo){
		return obstaculo.active;
	});
	obstaculos.forEach(function(obstaculo){
		obstaculo.update();
		obstaculo.draw();
	});
    }
      
	obstaculos.forEach(function(obstaculo){
      
		if(colisao(jogador, obstaculo)){
            background(imgBackFinal)
            noLoop(0)
            textSize(40);
            text("Sua pontuação final é " + pontos, 90, 240)
            
		}
      
	});
}

//Atribuições jogador**
var jogador = {
	x: 100,
	y: 190,
	larg: 40,
	altu: 40,
	yVelocidade : 0,
	yAceleracao: -1.7,
	draw : function(){
		image(imgcaveira,this.x, this.y, this.larg, this.altu);
	},
	update : function(){
		this.yVelocidade = this.yVelocidade + 0.5*this.yAceleracao;
		var tempy = this.y - this.yVelocidade;
		if(tempy<0)
			this.y = 0;
		else if(tempy > altura - this.altu)
			this.y = altura - this.altu;
		else
			this.y -= this.yVelocidade;
	}
}

//Obstáculos do jogo**
var obstaculos = [];

function obstaculo(I){
	I.active = true;
	I.x = largura;
	I.xVelocidade = 2;
	I.oaltu = 150;
	I.larg = 20;
	I.o = Math.random() * (altura - I.oaltu);
	I.limites = function(){
		return I.x +I.larg;
	}
	I.update = function(){
		I.active = I.active && I.limites();
		I.x -= I.xVelocidade;
	};
	I.draw = function(){
		image(imglivro,I.x, 0, I.larg, I.o);
		image(imglivro,I.x, I.o + I.oaltu, I.larg, altura - (I.o + I.oaltu) );
	};
	return I;
}
//Geração de Obstáculos**
setInterval(function(){
	obstaculos.push(obstaculo({}));
	pontos++;
}, 2000);

//Detectar colisão**
function colisao(jogador, obstaculo){
	return (jogador.y <= obstaculo.o || jogador.y + jogador.larg >= obstaculo.o + obstaculo.oaltu) && 
		jogador.x + jogador.larg >= obstaculo.x && jogador.x <= obstaculo.x + obstaculo.larg
}


