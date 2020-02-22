import {Coord} from "./coord.js";

export class Entity {
   /**
    * @function constructor
    * @param {Coord} coords 
    * @param {HTMLImageElement} texture 
    * @param {String} type
    */
   constructor (coords, texture, type) {
      this.coords = coords;
      this.texture = texture;
      this.type = type;
   }
}