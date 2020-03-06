import { Renderer } from "./renderer.js";
import { Entity } from "./entity.js";
import { Coord } from "./coord.js";
import { Helper } from "./helper.js";
import { Textures } from "./textures.js";
import { Sounds } from "./sounds.js";
import { Player } from "./player.js";

let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");

// This is a test and not final code



let post = () => {

};

let entityList = [];

for (let i = 0; i!=50000; ++i) {
   let x = Helper.map(Math.random(), 0, 1, -1000, 1000);
   let y = Helper.map(Math.random(), 0, 1, -1000, 1000);

   entityList.push(new Entity(new Coord(x, y), Textures.tree, "tree"));
}

let renderer = new Renderer(post, ctx, entityList);

setInterval(function() {renderer.loop();}, 30);

Sounds.heartbeat.loop();
Sounds.heartbeat.sound.playbackRate = 1;

let mainPlayer = new Player(new Coord(0,0), 0, renderer);