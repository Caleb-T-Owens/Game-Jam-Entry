import { Coord } from "./coord.js";
import { Renderer } from "./renderer.js";

export class Player {
   
   /**
    * 
    * @param {Coord} startingCoords 
    * @param {Number} startingDirection
    * @param {Renderer} renderer
    * @param {HTMLCanvasElement} canvas
    */
   constructor (startingCoords, startingDirection, type, renderer, canvas) {
      this.coords = startingCoords;
      this.direction = startingDirection;
      this.renderer = renderer;

      this.isAPressed = false;
      this.isSPressed = false;
      this.isWPressed = false;
      this.isRPressed = false;
      this.APressedIntervalId;
      this.SPressedIntervalId;
      this.WPressedIntervalId;
      this.RPressedIntervalId;


      this.keyDownEvent = document.addEventListener("keydown", this.keyPressed);
      this.keyUpEvent = document.addEventListener("keyup", this.keyLifted);
   }

   keyPressed(event) {
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
         if (!this.isSPressed) {
            this.isSPressed = true;
            this.SPressedIntervalId = setInterval(function() {

               let event = new CustomEvent("updateCameraPosition", {
                  detail: { angle: 0.05,
               }});
               document.dispatchEvent(event);

            }, 30);
         }
      }

      if (event.key == "a") {
         if (!this.isAPressed) {
            this.isAPressed = true;
            this.APressedIntervalId = setInterval(function() {
               
               let event = new CustomEvent("updateCameraPosition", {
                  detail: { angle: -0.05,
               }});
               document.dispatchEvent(event);

            }, 30);
         }
      }
   }

   keyLifted(event) {
      
      if (event.key == "s") {
         clearInterval(this.SPressedIntervalId);
         this.isSPressed = false;
      }
      if (event.key == "a") {
         clearInterval(this.APressedIntervalId);
         this.isAPressed = false;
      }
   }

   /**
    * Adds an amount to the renderer's camera angle
    * @param {Number} angle An angle in radians 
    */


}
