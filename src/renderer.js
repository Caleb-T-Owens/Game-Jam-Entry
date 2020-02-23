import {Entity} from "./entity.js";
import {Coord} from "./coord.js";
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
         angle = Math.atan(1/gradient);
      }

      if (entity.coords.y < this.cameraPosition.y) {
         if (angle > 0) { // if positive
            angle += Math.PI;
         } else {
            angle -= Math.PI;
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

   /**
    * @function map
    * @param {Number} value 
    * @param {Number} istart 

    * @param {Number} iend 
    * @param {Number} ostart 
    * @param {Number} oend 
    */
   map (value, istart, iend, ostart, oend) { // Needs to be added to a helper class at some point, it isn't specific to this class in any way
      return ostart + (oend - ostart) * ((value - istart) / (iend - istart));
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
      console.log(this.entityList);
      this.entityList.forEach(entity => {
         entityListByDepth.push(new EntityDepthCouple(entity, this.getDistanceFromCamera(entity)));
      });

      entityListByDepth.sort((a, b) => {
         if (a.depth < b.depth) {
            return -1;
         } else if (a.depth > b.depth) {
            return 1;
         } else {
            return 0;
         }
      });

      entityListByDepth.forEach((entityDepthCouple) => {
         let angleRelativeToCamera = this.getAngleRelativeToTheCamera(entityDepthCouple.entity);
         if ((angleRelativeToCamera < 0.90) || (angleRelativeToCamera > -0.90)) {

            let scale = 1/this.getDistanceFromCamera(entityDepthCouple.entity);
            let scaledTextureHeight = Math.floor(entityDepthCouple.entity.texture.height * scale);
            let scaledTextureWidth = Math.floor(entityDepthCouple.entity.texture.width * scale);

            let x = this.map(angleRelativeToCamera, -0.79, 0.79, 0, 500);
            x -= scaledTextureWidth / 2;
            let y = (500 / 2) - (scaledTextureHeight / 2);

            this.ctx.drawImage(entityDepthCouple.entity.texture, x, y, scaledTextureWidth, scaledTextureHeight);
         }

      });

      this.post();
   }
}