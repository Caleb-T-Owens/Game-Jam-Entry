import {Renderer} from "./renderer.js";
import { Entity } from "./entity.js";
import { Coord } from "./coord.js";
let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");
let tree = document.createElement("img");
tree.height = 500;
tree.width = 200;
tree.src = "./tree.png";

let post = () => {

};

let entityList = [
   new Entity(new Coord(5,0), tree, "tree"),
   new Entity(new Coord(5,5), tree, "tree"),
   new Entity(new Coord(5,3), tree, "tree"),
   new Entity(new Coord(2,8), tree, "tree"),
   new Entity(new Coord(1,2), tree, "tree"),
   new Entity(new Coord(0,5), tree, "tree"),
];

let renderer = new Renderer(post, ctx, entityList);
renderer.loop();

document.addEventListener("keyup", (event) => {
   if (event.key == "w") {
      renderer.cameraPosition.x += 0.2;
      renderer.loop();
   }
   if (event.key == "s") {
      renderer.cameraAngle += 0.26;
      renderer.loop();
   }
});