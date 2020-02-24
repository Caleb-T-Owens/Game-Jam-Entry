export class Helper {
   /**
    * @function map maps a value to a range
    * @param {Number} value the input value
    * @param {Number} istart the start of the input range
    * @param {Number} iend the end of the input range
    * @param {Number} ostart the start of the output range
    * @param {Number} oend the end of the output range
    */
   static map (value, istart, iend, ostart, oend) {
   return ostart + (oend - ostart) * ((value - istart) / (iend - istart));
   } 
}