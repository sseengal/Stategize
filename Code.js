
function doGet(request) {
  return HtmlService.createTemplateFromFile('index')
      .evaluate();
}

function include(filename) {
  return HtmlService.createHtmlOutputFromFile(filename)
      .getContent();
}


function onOpen() {
  SpreadsheetApp.getUi() // Or DocumentApp or FormApp.
      .createMenu('Stategize (beta)')
      .addItem('Launch', 'showSidebar')
      .addToUi();
}


function showSidebar() {
  var html = HtmlService.createTemplateFromFile('Screens/index.html').evaluate()
      .setTitle('Stategize (beta)')
      .setWidth(300);
  SpreadsheetApp.getUi() // Or DocumentApp or FormApp.
      .showSidebar(html);
}



//LAUNCH TESTS


var columns = [];

/*
function columnTests() {
columns[0]=[5, 4 ,3];
columns.push([53, 24 ,31]);
Logger.log("columns are " + columns);
  Logger.log("Value at index 1 is " + columns[1]);
}
*/


function testPropertySet() {
var documentProperties = PropertiesService.getDocumentProperties();
documentProperties.setProperty('RANGE_TO_TEST', JSON.stringify(rangeValues));
}

function testPropertyGet() {
  var documentProperties = PropertiesService.getDocumentProperties();
  var values = JSON.parse(documentProperties.getProperty('RANGE_TO_TEST'));

  //var column1;

  extractColumns(values);
  //Logger.log("Column1 " + column1);
}


function getRange() {

  var rangeValues = [];

  var sheet = SpreadsheetApp.getActiveSheet();

  var A1Notation = sheet.getActiveRange().getA1Notation();
  Logger.log("A1="+ A1Notation);

  var sheetIndex = sheet.getIndex();

  var sheetName = sheet.getSheetName();

  //Get range and cell when user hits update
  rangeValues = sheet.getActiveRange().getValues();
  //var cell = sheet.getSelection().getCurrentCell().getA1Notation();

  //Logger.log("cell is" + cell);

  PropertiesService.getDocumentProperties().setProperty('RANGE_TO_TEST', JSON.stringify(rangeValues));


  return {
    A1Notation: A1Notation,
    sheetIndex: sheetIndex,
    sheetName: sheetName
  };
}


function getCell() {
  var cell = {};

  var sheet = SpreadsheetApp.getActiveSheet();

  cell.sheetName = sheet.getSheetName();

  cell.A1Notation = sheet.getSelection().getCurrentCell().getA1Notation();

  cell.Row = sheet.getSelection().getCurrentCell().getRow();

  cell.Column = sheet.getSelection().getCurrentCell().getColumn();

  PropertiesService.getDocumentProperties().setProperty('ANSWER_CELL', cell);

  return cell;
}




function checkInputs(cl, range, sheetIndex) {
  if ((cl<= 0 || cl>=100) || (range == "")) {
   return 0;
  }
  else return 1;
}




//Payments

// // IFRAME mode required
// function doGet() {
// return HtmlService.createHtmlOutputFromFile('HTML')
// .setSandboxMode(HtmlService.SandboxMode.IFRAME);
// }

// /**
//  * Read Stripe token passed from google.script.run instead of
//  * using a form POST request - which can't happen in HtmlService.
//  *
//  * @param {Object} token from checkout.js
//  * @return {number} HTTP Response code
//  */
// function processCharge(token) {


// var tokenId = token.id;
// var stripeEmail =  token.email;

// // Create a Customer

// var path = "/customers";
// var customer = Stripe_PostRequest(path, [], [], {
//   "description": "test customer",
//   "source": tokenId,
//   "email": stripeEmail
// });


// var custId = JSON.parse( customer.getContentText() ).id;


// // Create a Charge
// path = "/charges";
// var charge = Stripe_PostRequest(path, [], [], {
//    "currency": "usd",
//    "amount": "500",
//    "customer": custId
// });

// return charge.getResponseCode();
// }

// /**
//  * Generic function for making a POST request to the Stripe API.
//  * Provided by Stripe support
//  *
//  * @param {string} path
//  * @param {Object} parameters
//  * @return {HTTPResponse}
//  */
// var Stripe_PostRequest = function(path, fields, expandableFields, parameters) {
//   // Expand related fields when accessing sub-properties
//   // (e.g. `customer.email` should expand the customer
//   // object when retrieving a charge).
//   if (expandableFields !== undefined) {
//     parameters["expand[]"] = [];
//     fields.forEach(function(field) {
//       field = field.split(".")[0];
//       if (expandableFields.indexOf(field) !== -1) {
//         parameters["expand[]"].push("data." + field);
//       }
//     });
//   }

//   var scriptProperties = PropertiesService.getScriptProperties();
//   var secret = scriptProperties.getProperty('testSecret');

//   var options = {
//     "method" : "post",
//     "headers": {
//       "Authorization": "Bearer " + secret,
//       "User-Agent": "Stripe Example/0.1"
//     }
//   };
//   var url = "https://api.stripe.com/v1" + path + serializeQueryString(parameters);
//   return UrlFetchApp.fetch(url, options);
// }

// /**
//  * Serialize a dictionary to a query string for GET requests
//  */
// var serializeQueryString = function(parameters) {
//   var str = [];
//   for (var key in parameters) {
//     var value = parameters[key];
//     if (parameters.hasOwnProperty(key) && value) {
//       if (value.map) {
//         str.push(value.map(function(array_value) {
//           return key + "=" + encodeURIComponent(array_value);
//         }).join("&"));
//       } else {
//         str.push(key + "=" + encodeURIComponent(value));
//       }
//     }
//   }
//   return '?' + str.join("&");
// }





//FORM COPY ATTEMPT


function emailSUSForm() {


  //Obtain the ID of the Google Form. Replace the ID below
  //Make sure your ID is enclosed in single quotations.

  var formId = '1mH7Rp_fRl7b9mvPas3Tmlk6ya5Xm5UXs3rVpG0P4cHQ'



  //Press the run button in the toolbar. Looks like a sideways triangle.




  //DO NOT EDIT BELOW. LEAVE THE CODE ALONE!
  var form = DriveApp.getFileById(formId).makeCopy();
  var Url = form.getUrl();
  var email = form.getOwner().getEmail();
  var name = form.getOwner().getName();
  GmailApp.sendEmail(email, name+' Your copy of the SUS Questionnaire has been created', 'Click on the link below to access it.\n\n'+Url);

  return {
    email: email
  }

}
