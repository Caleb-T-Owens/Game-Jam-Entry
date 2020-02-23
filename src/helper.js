export class Helper {
   static map (value, istart, iend, ostart, oend) {
   return ostart + (oend - ostart) * ((value - istart) / (iend - istart));
   } 
}