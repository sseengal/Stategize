
function runPairedTTest(cl, range, sheetIndex) {
  
  var columns={};
  var uLim = 0;
  var lLim = 0;
  var scoreDifference = 0;
  var diffVec = [];
  var tValue = 0;
  
  cl = (100-cl)/100;
  
  var documentProperties = PropertiesService.getDocumentProperties();
  var values = JSON.parse(documentProperties.getProperty('RANGE_TO_TEST'));
  
  
  columns = extractColumns(values); 
  diffVec = differenceVector(columns.col1, columns.col2); 
 
  
  
  uLim = upperLimit(Math.mean(diffVec), tdistTwoTailed(columns.col1.length-1, cl), Math.stdev(diffVec), columns.col1.length);
  lLim = lowerLimit(Math.mean(diffVec), tdistTwoTailed(columns.col1.length-1, cl), Math.stdev(diffVec), columns.col1.length);
  
  tValue = tValueFunc(Math.mean(diffVec), Math.stdev(diffVec), columns.col1.length);
  
  scoreDifference = 100-(studentTProb(columns.col1.length-1, tValue)*200);


  return {
    scoreDiff: scoreDifference,
    uLim: uLim,
    lLim: lLim
  };
}

function upperLimit(meanDiff, critValue, stdMeanDiff, sampleSize) {
  //Logger.log(meanDiff + critValue * (stdMeanDiff / Math.sqrt(sampleSize)));
  var upperLimit =  meanDiff + critValue * (stdMeanDiff / Math.sqrt(sampleSize));
  if (upperLimit > 100) {
    return 100;
  }
  else return upperLimit;
}

function lowerLimit(meanDiff, critValue, stdMeanDiff, sampleSize) {
  //Logger.log(meanDiff - critValue * (stdMeanDiff / Math.sqrt(sampleSize)));
  var lowerLimit =  meanDiff - critValue * (stdMeanDiff / Math.sqrt(sampleSize));
  if (lowerLimit < 0) {
    return 0;
  }
  else return lowerLimit;
}