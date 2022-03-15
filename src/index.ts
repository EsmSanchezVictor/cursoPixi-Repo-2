
import { Application, Sprite, Loader, Container, Point } from 'pixi.js'


const app = new Application({
	view: document.getElementById("pixi-canvas") as HTMLCanvasElement,
	resolution: window.devicePixelRatio || 1,
	autoDensity: true,
	backgroundColor: 0x6495ed,
	width: 1280,
	height: 720
});

window.addEventListener("resize",()=>{

	const escalaX= window.innerWidth/app.screen.width;  //lo que el navegador dice sobre la escala del juego (640)
	const escalaY= window.innerHeight/app.screen.height;
	const escala=Math.min(escalaX,escalaY);

	const gameWidth= Math.round(app.screen.width*escala);
	const gameHeight= Math.round(app.screen.height*escala);
	
	const margenHorizontal=Math.floor((window.innerWidth-gameWidth)/2);
	const margenVertical=Math.floor((window.innerHeight-gameHeight)/2);


	app.view.style.width=gameWidth+"px";
	app.view.style.height=gameHeight+"px";

	app.view.style.marginLeft=margenHorizontal+"px";
	app.view.style.marginRight=margenHorizontal+"px";

	app.view.style.marginTop=margenVertical+"px";
	app.view.style.marginBottom=margenVertical+"px";
	
});

window.dispatchEvent(new Event("resize"));


// una forma const myLoader = new Loader();
Loader.shared.add({ url: "./pngegg.png", name: "loki" });
Loader.shared.add({ url: "./fez.png", name: "Fez" });


Loader.shared.onComplete.add(()=>{
	const loki: Sprite = Sprite.from("loki");
	const fez: Sprite = Sprite.from("Fez");
	
	fez.scale.set(0.4,0.4);
	fez.position.set(100,-90);
	
	loki.anchor.set(0);
	
	const lokiconfez: Container =new Container();
		
	
	lokiconfez.addChild(loki); 
	lokiconfez.addChild(fez); 

	
	lokiconfez.scale.set(0.5);
	lokiconfez.x=200;
	lokiconfez.y=200;

	fez.toGlobal(new Point()); //el point lo convierte en coor globales-  gorro decime donde queda tu origen
	fez.parent.toGlobal(fez.position);// padre de fez decime la posicion global del gorro
	
	/*1280*720  mitad de la pantalla  640*360

	const aux=fez.parent.toLocal(new Point(640,360));
	
	fez.position.copyFrom(aux);
	
	fez.position.x=aux.x;
	fez.position.y=aux.y;*/

	app.stage.addChild(lokiconfez);
	
});

Loader.shared.load();
