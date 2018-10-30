function newUMUXLiteSheet() {


  //Values need to match range exactly
  var values = [
    ["About the test: An example is given below. The responses and SUS scores of each participant (p1, p2, p3 and p4 and so on) are marked under each question. Each response should be an integer between 1 and 5. You should override the responses and add rows as needed. You can select the range of the data with your mouse or use Ctrl+Shift+Arrow Key(s). Click 'Update range' to ready the test, then Click on run test to see the results.", "", ""],
	["", "", ""],
	["", "", ""],
	["", "[This system’s] capabilities meet my requirements.",
		"[This system] is easy to use.",
	],
	["p1", "4", "4"],
	["p2", "4", "3"],
	["p3", "3", "1"],
	["p4", "1", "2"]
];



  var ss = SpreadsheetApp.getActiveSpreadsheet();
  ss.insertSheet(0);
  //ss.setActiveSheet(0);

  var activeSheet = ss.getActiveSheet();

  //Range needs to match values exactly

  var range = activeSheet.getRange("A1:C8");

  activeSheet.setName("New UMUX-Lite Sheet");

  range.setValues(values);


  //range.getCell(7, 12).setValue('SUS heress');

  //SpreadsheetApp.setCurrentCell(values)


}



function showSUS(a1Notation) {

  var documentProperties = PropertiesService.getDocumentProperties();
  var values = JSON.parse(documentProperties.getProperty('RANGE_TO_TEST'));
  var sus = umuxLiteVector(values);
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



   function runUMUXLiteCalculator() {

   Logger.log("running UMUXLite Calc");

   var documentProperties = PropertiesService.getDocumentProperties();
   var values = JSON.parse(documentProperties.getProperty('RANGE_TO_TEST'));
   //     var cell = documentProperties.getProperty('ANSWER_CELL');

   var columns = [];



  columns = extractMultiColumns(values);



    //Calculate SUS Scores


    var sus = umuxLiteVector(values);

     var meanSUS = Math.mean(sus);
   // Logger.log("sus is " + sus);
    // Logger.log("meanSUS is "+ meanSUS);
    //Logger.log("cell Notation is " + cell );
   //showSUS(sus, cell);

    return {
      meanSUS: meanSUS,
      sus: sus
  };

  }


function umuxLiteVector(values) {
 var sus = [];

   for (var i = 0; i < values.length; i++) {
  sus[i]=(0.65*(values[i][0]+values[i][1] - 2)*(100/12))+22.9;
   }

  return sus;

}
