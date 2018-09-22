function newSUSSheet() { 
  
  
  //Values need to match range exactly
  var values = [
    ["About the test: An example is given below. The responses and SUS scores of each participant (p1, p2, p3 and p4 and so on) are marked under each question. Each response should be an integer between 1 and 5. You should override the responses and add rows as needed. You can select the range of the data with your mouse or use Ctrl+Shift+Arrow Key(s). Click 'Update range' to ready the test, then Click on run test to see the results.", "", "", "", "", "", "", "", "", "","",""],
	["", "", "", "", "", "", "", "", "", "", "", ""],
	["", "", "", "", "", "", "", "", "", "", "", ""],
	["", "I think that I would like to use this system frequently.",
		"I found the system unnecessarily complex.",
		"I thought the system was easy to use.",
		"I think that I would need the support of a technical person to be able to use this system.",
		"I found the various functions in this system were well integrated.",
		"I thought there was too much inconsistency in this system.",
		"I would imagine that most people would learn to use this system very quickly.",
		"I found the system very cumbersome to use.",
		"I felt very confident using the system.",
		"I needed to learn a lot of things before I could get going with this system.", ""
	],
	["p1", "4", "4", "4", "4", "4", "2", "4", "2", "4", "2", ""],
	["p2", "4", "3", "4", "2", "3", "2", "4", "2", "4", "2", ""],
	["p3", "3", "1", "4", "1", "4", "1", "4", "1", "4", "1", ""],
	["p4", "1", "2", "3", "1", "2", "2", "2", "3", "3", "2", ""]
];


  
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  ss.insertSheet(0);
  //ss.setActiveSheet(0);
  
  var activeSheet = ss.getActiveSheet();
    
  //Range needs to match values exactly
    
  var range = activeSheet.getRange("A1:L8");
  
  activeSheet.setName("New SUS Score Sheet");
  
  range.setValues(values);
  
  
  //range.getCell(7, 12).setValue('SUS heress');
  
  //SpreadsheetApp.setCurrentCell(values)  

  
}
     


function showSUS(a1Notation) {
  
  var documentProperties = PropertiesService.getDocumentProperties();
  var values = JSON.parse(documentProperties.getProperty('RANGE_TO_TEST'));
  var sus = susVector(values);
  var susObj = [];
 
  
  sus.map(function(value) {
       
  var temp = returnArray(value);
    susObj.push(temp);
  
  }) 


      
      
  //REMOVES FIRST CHARACTER OF THE A1NOTATION. WILL NOT WORK FOR COLUMNS > Z . That is AA, AB and so on.
  var subString = a1Notation.substr(1);
  var rowEnd = parseInt(subString) + (sus.length-1);
  Logger.log("rowEnd"+ rowEnd);
  var cellRange = a1Notation + ":"+ a1Notation[0] + rowEnd;
 // Logger.log(cell); 
  var insertValuesAt = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet().getRange(cellRange);
 //Logger.log(a1Notation[0]);
  insertValuesAt.setValues(susObj);
}    



function returnArray(value) {
var temp = [value];
  return temp;
}



   function runSUSCalculator() {
     
   Logger.log("running SUS Calc");  
    
   var documentProperties = PropertiesService.getDocumentProperties();
   var values = JSON.parse(documentProperties.getProperty('RANGE_TO_TEST'));
   //     var cell = documentProperties.getProperty('ANSWER_CELL');
    
   var columns = [];
   var stdevs = [];
  
  //Calculate total of rows (10 columns) to use for cronbach 
  var sum = [];
     Logger.log("Values are" + values);
   for (var i = 0; i < values.length; i++) {
    sum[i] = values[i][0]+values[i][1]+values[i][2]+values[i][3]+values[i][4]+values[i][5]+values[i][6]+values[i][7]+values[i][8]+values[i][9];
   }
   
  Logger.log("sum is " + sum);
  
  
  columns = extractMultiColumns(values);
   
  for (var i = 0; i<columns.length; i++) {
   stdevs[i] = Math.stdev(columns[i]); 
  }
  
  //Logger.log(stdevs);
  var cron = cronbach(stdevs, sum);
 // Logger.log("cronbach is" + cron);
    //Calculate SUS Scores
     
     
    var sus = susVector(values);

 
   cronbach(stdevs, sum);
  
     var meanSUS = Math.mean(sus);
   // Logger.log("sus is " + sus);
    // Logger.log("meanSUS is "+ meanSUS);
    //Logger.log("cell Notation is " + cell );
   //showSUS(sus, cell);
     
    return {
    cronbach: cron,
      meanSUS: meanSUS,
      sus: sus
  }; 
  
  }


function susVector(values) {
 var sus = [];
    
   for (var i = 0; i < values.length; i++) {
  sus[i]=((values[i][0]-1)+(5-values[i][1])+(values[i][2]-1)+(5-values[i][3])+(values[i][4]-1)+(5-values[i][5])+(values[i][6]-1)+(5-values[i][7])+(values[i][8]-1)+(5-values[i][9]))*2.5;
   }
  
  return sus;

}


/*function showSUS(sus, cell) {

  var susObject = toNeededFormat(sus);
 
  //SpreadsheetApp.getActive().getSheetByName(cell.sheetName).getRange(1, 1).setValue('Hello');
  //SpreadsheetApp.getActiveSheet().getRange("A1:"+"A"+sus.length).setValues([["1"],["2"]]);
  //JSON.stringify(sus);
  Logger.log("susObject" + susObject);
}

  
  function toNeededFormat(sus) {
  var rv = [][sus.length];
  for (var i = 0; i < sus.length; ++i)
    rv[0][i] = sus[i];
  return rv;
}
*/

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