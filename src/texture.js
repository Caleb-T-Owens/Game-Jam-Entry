export class Texture {
   /**
    * @function constructor
    * @param {String} textureURL 
    * @param {Number} width 
    * @param {Number} height 
    */
   constructor (textureURL, width, height) {
      this.texture = document.createElement("img")
      this.texture.src = textureURL;
      this.texture.width = width;
      this.texture.height = height;
   }
}