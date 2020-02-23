import {Renderer} from "./renderer.js";
import { Entity } from "./entity.js";
import { Coord } from "./coord.js";
let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");
let tree = document.createElement("img");
tree.src = "./tree.png";

let post = () => {

};

let entityList = [
   new Entity(new Coord(1,0), tree),
];

let renderer = new Renderer(post, ctx, entityList);
renderer.loop();