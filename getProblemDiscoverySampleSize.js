function getProblemDiscoverySampleSize(chanceToObserve, probabilityOfOccurrence) {

  
  //var ss = Math.LN10(1-chanceToObserve/100)/Math.LN10(1-probabilityOfOccurrence/100);
  var ss = Math.ceil((Math.log(1-chanceToObserve/100))/(Math.log(1-probabilityOfOccurrence/100))) ;
  
  Logger.log("hello ss is");
    return ss;

}