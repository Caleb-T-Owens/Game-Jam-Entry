import { Coord } from "./coord.js";
import { Renderer } from "./renderer.js";

/**
 * I really dont like this code, it just feels icky and it stresses me out to read.
 * It would need to be refactored if anything was to be done with this game
 */
export class Player {

   /**
    * 
    * @param {Coord} startingCoords 
    * @param {Number} startingDirection
    * @param {Renderer} renderer
    * @param {HTMLCanvasElement} canvas
    * @param {Boolean} isMainPlayer Sets wether or not is is the main player, either enables or disables the key event listeners
    */
   constructor(startingCoords, startingDirection, type, renderer, canvas, isMainPlayer) {
      this.coords = startingCoords;
      this.direction = startingDirection;
      this.renderer = renderer;

      // Keypress constants
      this.isAPressed = false;
      this.isSPressed = false;
      this.isWPressed = false;
      this.isRPressed = false;
      this.APressedIntervalId;
      this.SPressedIntervalId;
      this.WPressedIntervalId;
      this.RPressedIntervalId;

      // Event listeners
      // These event listeners are chill
      if (isMainPlayer) {
         this.keyDownEvent = document.addEventListener("keydown", this.keyPressed);
         this.keyUpEvent = document.addEventListener("keyup", this.keyLifted);
      }
   }

   /**
    * 
    * @param {KeyDownEvent} event 
    */
   keyPressed(event) {
      if (event.key == "w") {
         if (!this.isWPressed) {
            this.isWPressed = true;
            this.WPressedIntervalId = setInterval(function () {
               let event = new CustomEvent("updateCameraPosition", {detail: {
                  move: 0.5
               }});
               document.dispatchEvent(event);

            }, 30);
         }

      }

      if (event.key == "r") {
         if (!this.isRPressed) {
            this.isRPressed = true;
            this.RPressedIntervalId = setInterval(function () {
               let event = new CustomEvent("updateCameraPosition", {detail: {
                  move: -0.5
               }});
               document.dispatchEvent(event);

            }, 30);
         }

      }

      if (event.key == "s") {
         if (!this.isSPressed) {
            this.isSPressed = true;
            this.SPressedIntervalId = setInterval(function () {
               this.direction += 0.05;
               let event = new CustomEvent("updateCameraAngle", {
                  detail: {
                     angle: 0.05,
                  }
               });
               document.dispatchEvent(event);

            }, 30);
         }
      }

      if (event.key == "a") {
         if (!this.isAPressed) {
            this.isAPressed = true;
            this.APressedIntervalId = setInterval(function () {
               this.direction += -0.05;
               let event = new CustomEvent("updateCameraAngle", {
                  detail: {
                     angle: -0.05,
                  }
               });
               document.dispatchEvent(event);

            }, 30);
         }
      }
   }

   /**
    * 
    * @param {KeyUpEvent} event 
    */
   keyLifted(event) {
      if (event.key == "w") {
         clearInterval(this.WPressedIntervalId);
         this.isWPressed = false;
      }
      if (event.key == "r") {
         clearInterval(this.RPressedIntervalId);
         this.isRPressed = false;
      }
      if (event.key == "s") {
         clearInterval(this.SPressedIntervalId);
         this.isSPressed = false;
      }
      if (event.key == "a") {
         clearInterval(this.APressedIntervalId);
         this.isAPressed = false;
      }
   }

}
