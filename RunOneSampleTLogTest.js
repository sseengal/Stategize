
function runOneSampleTLogTest(cl, range, sheetIndex, benchmark) {
  
  var columns={};
  var uLim = 0;
  var lLim = 0;
  var scoreDifference = 0;
  var logVec = [];
  var tValue = 0;
  
  cl = (100-cl)/100;
  
  var documentProperties = PropertiesService.getDocumentProperties();
  var values = JSON.parse(documentProperties.getProperty('RANGE_TO_TEST'));
   
  
  columns = extractColumns(values); 
  
  logVec = logVector(columns.col1);   
 
  //NOTE ALL are LOG VALUES
  var sampleSize = logVec.length;
  var mean = Math.mean(logVec);
  var stdev = Math.stdev(logVec);
  var logBenchmark = Math.log(benchmark);
 
  var critValue = tdistTwoTailed(sampleSize-1, cl);
  var tValue = Math.abs((logBenchmark-mean)/(stdev/Math.sqrt(sampleSize)));
  var pValue = studentTProb(columns.col1.length-1, tValue);
  

  uLim = upperLimitOneSampleTLogTest(mean, critValue, stdev, sampleSize);
  lLim = lowerLimitOneSampleTLogTest(mean, critValue, stdev, sampleSize);
  
  
  scoreDifference = 100-(studentTProb(columns.col1.length-1, tValue)*100);

  return {
    scoreDiff: scoreDifference,
    uLim: uLim,
    lLim: lLim
  };
}

function upperLimitOneSampleTLogTest(mean, critValue, stdev, sampleSize) {
  //Logger.log(meanDiff + critValue * (stdMeanDiff / Math.sqrt(sampleSize)));
  var upperLimit =  Math.exp(mean + critValue * (stdev / Math.sqrt(sampleSize)));
  if (upperLimit > 100) {
    return 100;
  }
  else return upperLimit;
}

function lowerLimitOneSampleTLogTest(mean, critValue, stdev, sampleSize) {
  //Logger.log(meanDiff - critValue * (stdMeanDiff / Math.sqrt(sampleSize)));
  var lowerLimit =  Math.exp(mean - critValue * (stdev / Math.sqrt(sampleSize)));
  if (lowerLimit < 0) {
    return 0;
  }
  else return lowerLimit;
}