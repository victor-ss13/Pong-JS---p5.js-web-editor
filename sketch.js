//variável biblioteca

let colidiu = false;

//variáveis da Bolinha

let xBolinha = 300;
let yBolinha = 200;
let diametro = 25;
let raio = diametro / 2;

//variáveis da Raquete

let xRaquete = 5;
let yRaquete = 150;
let wRaquete = 10;
let hRaquete = 100;

//variáveis do Oponente

let xOponente = 585;
let yOponente = 150;
let velocidadeYOponente;
let chanceDeErrar = 0;

//velocidade da Bolinha

let velocidadeXBolinha = 5;
let velocidadeYBolinha = 5;

//placar do jogo

let meusPontos = 0;
let pontosOponente = 0;

//sons do jogo

let raquetada;
let ponto;
let trilha;

function preload() {
  trilha = loadSound("trilha.mp3");
  ponto = loadSound("ponto.mp3");
  raquetada = loadSound("raquetada.mp3");
}


//Função para criar o "quadro" do nosso jogo

function setup() {
  createCanvas(600, 400);
  trilha.loop();
}

//Função para definir a cor do "quadro" e exibir a bolinha

function draw() {
  background(0);
  mostraBolinha();
  movimentaBolinha();
  verificaColisao();
  mostraRaquete(xRaquete, yRaquete);
  movimentaRaquete();
  //colisaoRaquete();
  colisaoRaqueteBiblioteca(xRaquete, yRaquete);
  mostraRaquete(xOponente, yOponente);
  movimentaOponente();
  //multiplayer();
  //colisaoOponenteBiblioteca();
  colisaoRaqueteBiblioteca(xOponente, yOponente)
  incluiPlacar();
  marcaPonto();
  
  }

function mostraBolinha() {
  circle(xBolinha, yBolinha, diametro);
}

function movimentaBolinha() {
  xBolinha += velocidadeXBolinha;
  yBolinha += velocidadeYBolinha;
}

function verificaColisao() {
  if (xBolinha + raio > width || xBolinha - raio < 0) {
    velocidadeXBolinha *= -1
  }
  if (yBolinha + raio > height || yBolinha - raio < 0){
    velocidadeYBolinha *= -1
  }
}

function mostraRaquete(x,y) {
  rect(x, y, wRaquete, hRaquete);
}

function movimentaRaquete() {
  if (keyIsDown(UP_ARROW)) {yRaquete -= 10}
  if (keyIsDown(DOWN_ARROW)) {yRaquete += 10}
}

//Colisão criada por mim

function colisaoRaquete() {
  if (xBolinha - raio < xRaquete + wRaquete && yBolinha - raio < yRaquete + hRaquete && yBolinha + raio > yRaquete) {velocidadeXBolinha *= -1}
}

//Colisão importada da biblioteca

function colisaoRaqueteBiblioteca(x,y) {
  colidiu = collideRectCircle(x, y, wRaquete, hRaquete, xBolinha, yBolinha, raio);
  if(colidiu) {
    velocidadeXBolinha *= -1
      raquetada.play();
    calculaErro();
  }
}

//colisão oponente

function colisaoOponenteBiblioteca() {
  colidiu = collideRectCircle(xOponente - wRaquete, yOponente, wRaquete, hRaquete, xBolinha, yBolinha, raio);
  if(colidiu) {
    velocidadeXBolinha *= -1
  }
}

//criando movimento do oponente

function movimentaOponente() {
  velocidadeYOponente = yBolinha - yOponente - hRaquete / 2 - 37;
  yOponente += velocidadeYOponente + chanceDeErrar;
}

function multiplayer() {
  if (keyIsDown(87)) {yOponente -= 10}
  if (keyIsDown(83)) {yOponente += 10}
}

//placar

function incluiPlacar() {
  stroke(255);
  textAlign(CENTER);
  textSize(18);
  fill(color(255, 140, 0))
  rect(130, 10, 40, 20);
  fill(255);
  text(meusPontos, 150, 26);
  fill(color(255, 140, 0))
  rect(430, 10, 40, 20);
  fill(255);
  text(pontosOponente, 450, 26);
}

//pontuação

function marcaPonto() {
  if(xBolinha > 589){
    meusPontos += 1;
    ponto.play();
    bolinhaNaoFicaPresa();
  }
  if(xBolinha < 11){
    pontosOponente += 1;
    ponto.play();
    calculaErro();
    bolinhaNaoFicaPresa();
  }
}

//calculando o erro

function calculaErro() {
   if(xBolinha < 300){
    chanceDeErrar = round(random(-25,25));
  }else{
    chanceDeErrar = 0;
  }
}

//bolinha não fica presa


function bolinhaNaoFicaPresa(){
    if (xBolinha - raio < 0) {
    xBolinha = 23
    }
    if (xBolinha + raio > 590) {
      xBolinha = 577
    }
}

