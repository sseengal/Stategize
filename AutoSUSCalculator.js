function autoSUSRange() {
  var sheet = SpreadsheetApp.getActiveSheet();
  var lastRow = sheet.getLastRow();

  var values = sheet.getRange('B2:K'+lastRow).getValues();

  return values;
}



function susVector(values) {
var sus = [];

for (var i = 0; i < values.length; i++) {
sus[i]=((values[i][0]-1)+(5-values[i][1])+(values[i][2]-1)+(5-values[i][3])+(values[i][4]-1)+(5-values[i][5])+(values[i][6]-1)+(5-values[i][7])+(values[i][8]-1)+(5-values[i][9]))*2.5;
}

return sus;

}


function runAutoSUSCalculator() {
Logger.log("running auto sus calc");
  var columns = [];
  var stdevs = [];

  var sum = [];
  var sus = [0];

  var values = autoSUSRange();


  for (var i = 0; i < values.length; i++) {
  sum[i] = values[i][0]+values[i][1]+values[i][2]+values[i][3]+values[i][4]+values[i][5]+values[i][6]+values[i][7]+values[i][8]+values[i][9];
  }

  Logger.log("Sum is:" + sum);
  columns = extractMultiColumns(values);

  for (var i = 0; i<columns.length; i++) {
  stdevs[i] = Math.stdev(columns[i]);
  }
  Logger.log("Stdevs is:" + stdevs);

  //Calculate Cronbach
  var cron = cronbach(stdevs, sum);
  Logger.log("cronbach is:" + cron);
  //Calculate SUS Scores
  sus = susVector(values);
    Logger.log("sus is:" + sus);
  //Calculate Mean SUS Score
  var meanSUS = Math.mean(sus);

  showSUSColumnAuto(sus);

  return {
  cronbach: cron,
  meanSUS: meanSUS,
  sus: sus
  };
}

function returnArray(value) {
var temp = [value];
return temp;
}



function showSUSColumnAuto(sus) {
  var susObj = [];
Logger.log("sus in susColumn Auto is:" + sus);

  sus.map(function(value) {

  var temp = returnArray(value);
    susObj.push(temp);

  })

var sheet = SpreadsheetApp.getActiveSheet();
var lastRow = sheet.getLastRow();
var insertValuesAt = sheet.getRange('L2:L'+lastRow);
//Logger.log(a1Notation[0]);
insertValuesAt.setValues(susObj);
}



function cronbach(stdevs, sumVector) {
  Logger.log("Cronbach running")
  var k = 10/9;

  Logger.log("k is"+ k);

  var sumOfSquares = Math.sumOfSquares(stdevs);
  Logger.log("Sum of squares is"+ sumOfSquares);

  var sumStdev = Math.stdev(sumVector);

  var squareSumStdev = sumStdev*sumStdev;

  var cronbach = (k*(1-(sumOfSquares/squareSumStdev)));
  Logger.log("cronbach is"+ cronbach);

  return cronbach;

}
