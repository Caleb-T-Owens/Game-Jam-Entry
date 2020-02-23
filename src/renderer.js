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
      return Math.sqrt(((entity.coords.x - this.cameraPosition.x)^2)+((entity.coords.y - this.cameraPosition.y)^2));
   }

   loop () {
      if (this.cameraAngle > Math.PI) {
         this.cameraAngle -= Math.PI*2;
      }
      if (this.cameraAngle < -Math.PI) {
         this.cameraAngle += Math.PI*2;
      }
      this.ctx.fillStyle = "#111111";
      this.ctx.fillRect(0,0,500,500)
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
         entityListByDepth.push(new EntityDepthCouple(entity, this.getDistanceFromCamera(entity)));
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

            let x = Helper.map(angleRelativeToCamera, -0.79, 0.79, 0, 500);
            x -= scaledTextureWidth / 2;
            let y = (500 / 2) - (scaledTextureHeight / 2);

            this.ctx.drawImage(entityDepthCouple.entity.texture, x, y, scaledTextureWidth, scaledTextureHeight);
         }

      });

      this.post();
   }
}