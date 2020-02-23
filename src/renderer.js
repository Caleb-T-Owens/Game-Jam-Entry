import { Entity } from "./entity.js";
import { Coord } from "./coord.js";
import { Helper } from "./helper.js";
export class Renderer {
   /**
    * @function constructor
    * @param {function} post 
    * @param {CanvasRenderingContext2D} ctx 
    * @param {Array} entityList
    */
   constructor (post, ctx, entityList) {
      this.post = post;
      this.ctx = ctx;
      this.cameraAngle = 0;
      this.cameraPosition = new Coord(0, 0);
      this.entityList = entityList;
      this.canvasHeight = ctx.canvas.height;
      this.canvasWidth = ctx.canvas.width;
//    this.loopInterval = setInterval(this.loop, 25); // That is 1/30 of a second right?
   }

   /**
    * @function getAngleRelativeToTheCamera
    * @param {Entity} entity
    */
   getAngleRelativeToTheCamera(entity) {
      let dx = entity.coords.x - this.cameraPosition.x;
      let dy = entity.coords.y - this.cameraPosition.y;

      let trueAngle = Math.atan2(dy, dx); // Atan2 does what my commented out code does

      /*
      if (dy != 0) { // because we cant divide by 0
         let gradient = dx / dy;
         trueAngle = Math.atan(1/gradient);
      }

      if (entity.coords.y < this.cameraPosition.y) {
         if (trueAngle > 0) { // if positive
            trueAngle += Math.PI;
         } else {
            trueAngle -= Math.PI;
         }
      }
      */

      let relativeAngle = trueAngle - this.cameraAngle;
   
      if (relativeAngle > Math.PI) {
         relativeAngle -= Math.PI*2;
      }
      if (relativeAngle < -Math.PI) {
         relativeAngle += Math.PI*2;
      }

      return relativeAngle;
   }
   /**
    * @function getDistanceFromCamera
    * @param {Entity} entity 
    */
   getDistanceFromCamera (entity) {
      return Math.sqrt(Math.pow(entity.coords.x - this.cameraPosition.x, 2) + Math.pow(entity.coords.y - this.cameraPosition.y, 2));
   }

   loop () {
      let renderDistance = 50;

      if (this.cameraAngle > Math.PI) {
         this.cameraAngle -= Math.PI*2;
      }
      if (this.cameraAngle < -Math.PI) {
         this.cameraAngle += Math.PI*2;
      }

      this.ctx.globalAlpha = 1;
      this.ctx.fillStyle = "#1a1a1a";
      this.ctx.fillRect(0,0,this.canvasWidth, this.canvasHeight);

      let gradient = this.ctx.createLinearGradient(this.canvasWidth/2, this.canvasHeight/2, this.canvasWidth/2, this.canvasHeight);
      gradient.addColorStop(0, "#1a1a1a");
      gradient.addColorStop(0.3, "#1b2f1b");

      this.ctx.fillStyle = gradient;
      this.ctx.fillRect(0, this.canvasHeight/2, this.canvasWidth, this.canvasHeight/2);

      class EntityDepthCouple {
         /**
          * @function constructor
          * @param {Entity} entity 
          * @param {Number} depth 
          */
         constructor (entity, depth) {
            this.entity = entity;
            this.depth = depth;
         }
      }

      let entityListByDepth = [];

      this.entityList.forEach(entity => {
         let depth = this.getDistanceFromCamera(entity);
         if (depth < renderDistance) {
            entityListByDepth.push(new EntityDepthCouple(entity, depth));
         }
      });

      entityListByDepth.sort((a, b) => {
         if (a.depth < b.depth) {
            return 1;
         } else if (a.depth > b.depth) {
            return -1;
         } else {
            return 0;
         }
      });

      entityListByDepth.forEach((entityDepthCouple) => {
         let angleRelativeToCamera = this.getAngleRelativeToTheCamera(entityDepthCouple.entity);
         if ((angleRelativeToCamera < 0.100) || (angleRelativeToCamera > -0.100)) {

            let scale = 1/entityDepthCouple.depth;
            let scaledTextureHeight = Math.floor(entityDepthCouple.entity.texture.height * scale);
            let scaledTextureWidth = Math.floor(entityDepthCouple.entity.texture.width * scale);
            this.ctx.globalAlpha = Helper.map(entityDepthCouple.depth, 0, 50, 1, 0);
            let x = Helper.map(angleRelativeToCamera, -0.79, 0.79, 0, this.canvasWidth);
            x -= scaledTextureWidth / 2;
            let y = (this.canvasHeight / 2) - (scaledTextureHeight / 2);

            this.ctx.drawImage(entityDepthCouple.entity.texture, x, y, scaledTextureWidth, scaledTextureHeight);
         }

      });

      gradient = this.ctx.createRadialGradient(this.canvasWidth/2 ,this.canvasHeight/2, 1, this.canvasWidth/2 ,this.canvasHeight/2, 1000);
      gradient.addColorStop(0, "rgba(0,0,0,0)");
      gradient.addColorStop(1, "#000000");

      this.ctx.globalAlpha = 1;
      this.ctx.fillStyle = gradient;
      this.ctx.fillRect(0,0, this.canvasWidth, this.canvasHeight);

      this.post();
   }
}