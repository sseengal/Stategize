
function runOneSampleTTest(cl, range, sheetIndex, benchmark) {
  
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
 
  var sampleSize = columns.col1.length;
  var mean = Math.mean(columns.col1);
  var stdev = Math.stdev(columns.col1);
 
  var critValue = tdistTwoTailed(sampleSize-1, cl);
  var tValue = Math.abs((mean-benchmark)/(stdev/Math.sqrt(sampleSize)));
  //var pValue = studentTProb(columns.col1.length-1, tValue);
  
  //Logger.log(pValue);
  
  uLim = upperLimitOneSampleTTest(mean, critValue, stdev, sampleSize);
  lLim = lowerLimitOneSampleTTest(mean, critValue, stdev, sampleSize);
  
  
  scoreDifference = 100-(studentTProb(columns.col1.length-1, tValue)*100);


  return {
    scoreDiff: scoreDifference,
    uLim: uLim,
    lLim: lLim
  };
}

function upperLimitOneSampleTTest(mean, critValue, stdev, sampleSize) {
  //Logger.log(meanDiff + critValue * (stdMeanDiff / Math.sqrt(sampleSize)));
  var upperLimit =  mean + critValue * (stdev / Math.sqrt(sampleSize));
  //if (upperLimit > 100) {
  //  return 100;
 // }
  //else 
  return upperLimit;
}

function lowerLimitOneSampleTTest(mean, critValue, stdev, sampleSize) {
  //Logger.log(meanDiff - critValue * (stdMeanDiff / Math.sqrt(sampleSize)));
   var lowerLimit =  mean - critValue * (stdev / Math.sqrt(sampleSize));
  //if (lowerLimit < 0) {
  //  return 0;
  //}
  //else 
  return lowerLimit;
}