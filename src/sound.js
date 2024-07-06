export class Sound {
   /**
    * @function constructor
    * @param {Audio} sound 
    */
   constructor (sound) {
      this.sound = sound;
      this.duration = sound.duration;
      this.isLooping = false;
      this.loopingInterval = 0;
      this.sound.preservesPitch = true;
   }

   play () {
      // Modern browsers don't allow you to play sounds before someone interacts with the document
      // this.sound.play();
   }

   loop () {
      if (!this.isLooping) {
         let _this = this;
         this.loopingInterval = setInterval(function() {_this.play();}, this.duration);
         this.isLooping = true;
      } else {
         console.log("attempted to loop an already looping sound")
      }
   }

   stopLoop () {
      if (this.isLooping) {
         clearInterval(this.loopingInterval);
         this.isLooping = false;
      }
   }
}
