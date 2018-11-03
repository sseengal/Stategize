function getProblemDiscoverySampleSize(chanceToObserve, probabilityOfOccurrence) {


  //var ss = Math.LN10(1-chanceToObserve/100)/Math.LN10(1-probabilityOfOccurrence/100);
  var ss = Math.ceil((Math.log(1-chanceToObserve/100))/(Math.log(1-probabilityOfOccurrence/100))) ;

  return ss;

}


function buildProblemDiscoveryMatrix(users, problems) {
  var matrix = [];
  for ( var i = 0; i <= users; i++ ) {
    matrix[i] = [""];
    for ( var j = 0; j <= problems; j++ ) {
      if ((i==0)&&(j!=0)) {
        matrix[i][j] = ("Problem "+(j));
      }
       else if ((j==0)&&(i!=0)) {
        matrix[i][j] = ("User "+(i));
      }
      else matrix[i][j] = ("");
    }
}

var ss = SpreadsheetApp.getActiveSpreadsheet();
ss.insertSheet(0);
var activeSheet = ss.getActiveSheet();

//Range needs to match values exactly

var range = activeSheet.getRange(1,1,parseInt(users)+1,parseInt(problems)+1);
activeSheet.setName("New Problem Discovery Matrix");
range.setValues(matrix);

}


function autoPDMRange(rows, columns) {
  return SpreadsheetApp.getActiveSheet().getRange(2,2,rows,columns);
}
