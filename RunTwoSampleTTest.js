function runTwoSampleTTest(cl, range, sheetIndex) {

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


  var sampleSizeA = columns.col1.length;
  var meanA = Math.mean(columns.col1);
  var stdA = Math.stdev(columns.col1);


  var sampleSizeB = columns.col2.length;
  var meanB = Math.mean(columns.col2);
  var stdB = Math.stdev(columns.col2);

  var t = Math.abs((meanA-meanB)/Math.sqrt(((stdA*stdA)/sampleSizeA)+((stdB*stdB)/sampleSizeB)));

  //calculate degrees of freedom
  var numDof = (((stdA*stdA)/sampleSizeA)+((stdB*stdB)/sampleSizeB));
  var d1 = ((stdA*stdA)/sampleSizeA);
  var d2 = ((stdB*stdB)/sampleSizeB);
  var dof =   Math.floor((numDof*numDof)/((d1*d1/(sampleSizeA-1))+(d2*d2/(sampleSizeB-1))));

  var critValue = tdistTwoTailed(dof, cl);

  var diffofMean = meanA-meanB;


  uLim = upperLimitTwoSampleTTest(diffofMean, critValue, numDof);
  lLim = lowerLimitTwoSampleTTest(diffofMean, critValue, numDof);

  scoreDifference = 100-(studentTProb(dof, t)*200);
  
  //var winner = winner(meanA, meanB);
  
  //Logger.log(winner);
  
  return {
    scoreDiff: scoreDifference,
    uLim: uLim,
    lLim: lLim,
  };
}


/*function winner(meanA, meanB) {
  if (meanA < meanB) {
      return 2;
    } else 
      if ( meanA > meanB ) {
        return 1;
      }
  else return 0;
  
}
*/


function upperLimitTwoSampleTTest(diffofMean, critValue, numDof) {
  var upperLimit =  diffofMean + critValue * Math.sqrt(numDof);
   // if (upperLimit >= 100) {
   //   return 100;
   // }
   // else 
      return upperLimit;

}

function lowerLimitTwoSampleTTest(diffofMean, critValue, numDof) {
  var lowerLimit =  diffofMean - critValue * Math.sqrt(numDof);
   // if (lowerLimit <= 0) {
   //   return 0;
   //  }
   // else 
      return lowerLimit;

}
