import { Renderer } from "./renderer.js";
import { Entity } from "./entity.js";
import { Coord } from "./coord.js";
import { Helper } from "./helper.js";
import { Textures } from "./textures.js";
import { Sounds } from "./sounds.js";

let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");

let post = () => {

};

let entityList = [];

for (let i = 0; i!=10000; ++i) {
   let x = Helper.map(Math.random(), 0, 1, -100, 100);
   let y = Helper.map(Math.random(), 0, 1, -100, 100);

   entityList.push(new Entity(new Coord(x, y), Textures.tree, "tree"));
}

let renderer = new Renderer(post, ctx, entityList);

setInterval(function() {renderer.loop();}, 30);

Sounds.heartbeat.loop();

document.addEventListener("keydown", (event) => {
   if (event.key == "w") {
      renderer.cameraPosition.x += 0.2;
   }
   if (event.key == "s") {
      renderer.cameraAngle += 0.2;
   }
});