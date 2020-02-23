export class Helper {
   /**
    * @function
    * @param {Number} value 
    * @param {Number} istart 
    * @param {Number} iend 
    * @param {Number} ostart 
    * @param {Number} oend 
    */
   static map (value, istart, iend, ostart, oend) {
   return ostart + (oend - ostart) * ((value - istart) / (iend - istart));
   } 
}