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

for (let i = 0; i!=50000; ++i) {
   let x = Helper.map(Math.random(), 0, 1, -1000, 1000);
   let y = Helper.map(Math.random(), 0, 1, -1000, 1000);

   entityList.push(new Entity(new Coord(x, y), Textures.tree, "tree"));
}

let renderer = new Renderer(post, ctx, entityList);

setInterval(function() {renderer.loop();}, 30);

Sounds.heartbeat.loop();
Sounds.heartbeat.sound.playbackRate = 1;

document.addEventListener("keydown", (event) => {
   if (event.key == "w") {
      if ((renderer.cameraAngle>0)&&(renderer.cameraAngle<=1.57)) {
      let movementBoundary = Helper.map(renderer.cameraAngle, 0,1.57,0,1);
      let moveX = 1 - movementBoundary;
      let moveY = movementBoundary;

      renderer.cameraPosition.x += moveX;
      renderer.cameraPosition.y += moveY;
      }
   }
   if (event.key == "s") {
      renderer.cameraAngle += 0.2;
   }
   if (event.key == "a") {
      renderer.cameraAngle -= 0.2;
   }
});