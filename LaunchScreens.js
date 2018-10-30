
function launchPairedTTest() {
  var html = HtmlService.createTemplateFromFile('Screens/PairedTTest.html').evaluate()
      .setTitle('Paired T Test')
      .setWidth(300);
  SpreadsheetApp.getUi() // Or DocumentApp or FormApp.
      .showSidebar(html);

}

function launchTwoSampleTTest() {
  var html = HtmlService.createTemplateFromFile('Screens/TwoSampleTTest.html').evaluate()
      .setTitle('Two Sample T Test')
      .setWidth(300);
  SpreadsheetApp.getUi() // Or DocumentApp or FormApp.
      .showSidebar(html);

}

function launchOneSampleTTest() {
  var html = HtmlService.createTemplateFromFile('Screens/OneSampleTTest.html').evaluate()
      .setTitle('One Sample T Test')
      .setWidth(300);
  SpreadsheetApp.getUi() // Or DocumentApp or FormApp.
      .showSidebar(html);

}

function launchOneSampleTLogTest() {
  var html = HtmlService.createTemplateFromFile('Screens/OneSampleTLogTest.html').evaluate()
      .setTitle('One Sample T (Log) Test')
      .setWidth(300);
  SpreadsheetApp.getUi() // Or DocumentApp or FormApp.
      .showSidebar(html);

}

function launchN_1TwoProportionTest() {
  var html = HtmlService.createTemplateFromFile('Screens/N_1TwoProportionTest.html').evaluate()
      .setTitle('N-1 Two Proportion Test')
      .setWidth(300);
  SpreadsheetApp.getUi() // Or DocumentApp or FormApp.
      .showSidebar(html);

}

  function launchAnythingSUS() {
  var html = HtmlService.createTemplateFromFile('Screens/AnythingSUS.html').evaluate()
      .setTitle('Anything SUS')
      .setWidth(300);
  SpreadsheetApp.getUi()
      .showSidebar(html);


}


  function launchSUSCalculator() {
  var html = HtmlService.createTemplateFromFile('Screens/SUSCalculator.html').evaluate()
      .setTitle('SUS Calculator')
      .setWidth(300);
  SpreadsheetApp.getUi()
      .showSidebar(html);


}

function launchProblemDiscoverySampleSize() {
  var html = HtmlService.createTemplateFromFile('Screens/ProblemDiscoverySampleSize.html').evaluate()
      .setTitle('Sample Size Calculator')
      .setWidth(300);
  SpreadsheetApp.getUi() // Or DocumentApp or FormApp.
      .showSidebar(html);

}

function launchProblemDiscoveryMatrix() {
  var html = HtmlService.createTemplateFromFile('Screens/ProblemDiscoveryMatrix.html').evaluate()
      .setTitle('Problem Discovery Matrix')
      .setWidth(300);
  SpreadsheetApp.getUi() // Or DocumentApp or FormApp.
      .showSidebar(html);
}




function launchUMUXLiteTesting() {
  var html = HtmlService.createTemplateFromFile('Screens/UMUXLiteTesting.html').evaluate()
      .setTitle('UMUX-Lite Testing')
      .setWidth(300);
  SpreadsheetApp.getUi() // Or DocumentApp or FormApp.
      .showSidebar(html);

}

function launchOneClickSUS() {
  var html = HtmlService.createTemplateFromFile('Screens/OneClickSUS.html').evaluate()
      .setTitle('One Click SUS')
      .setWidth(300);
  SpreadsheetApp.getUi() // Or DocumentApp or FormApp.
      .showSidebar(html);

}

function launchTestFinder() {
  var html = HtmlService.createTemplateFromFile('Screens/TestFinder.html').evaluate()
      .setTitle('Test finder tool')
      .setWidth(300);
  SpreadsheetApp.getUi() // Or DocumentApp or FormApp.
      .showSidebar(html);

}

function launchSummativeTesting() {
  var html = HtmlService.createTemplateFromFile('Screens/SummativeTesting.html').evaluate()
      .setTitle('Summative Testing')
      .setWidth(300);
  SpreadsheetApp.getUi() // Or DocumentApp or FormApp.
      .showSidebar(html);

}

function launchFormativeTesting() {
  var html = HtmlService.createTemplateFromFile('Screens/FormativeTesting.html').evaluate()
      .setTitle('Formative Testing')
      .setWidth(300);
  SpreadsheetApp.getUi() // Or DocumentApp or FormApp.
      .showSidebar(html);

}


function launchTaskLevelBenchmark() {
  var html = HtmlService.createTemplateFromFile('Screens/TaskLevelBenchmarking.html').evaluate()
      .setTitle('Task Level Benchmarking')
      .setWidth(300);
  SpreadsheetApp.getUi() // Or DocumentApp or FormApp.
      .showSidebar(html);

}

function launchStudyLevelBenchmark() {
  var html = HtmlService.createTemplateFromFile('Screens/StudyLevelBenchmarking.html').evaluate()
      .setTitle('Study Level Benchmarking')
      .setWidth(300);
  SpreadsheetApp.getUi() // Or DocumentApp or FormApp.
      .showSidebar(html);

}

function launchPostStudyQuestionnaires() {
  var html = HtmlService.createTemplateFromFile('Screens/PostStudyQuestionnaires.html').evaluate()
      .setTitle('Post Study Questionnaires')
      .setWidth(300);
  SpreadsheetApp.getUi() // Or DocumentApp or FormApp.
      .showSidebar(html);

}

function launchPostTaskQuestionnaires() {
  var html = HtmlService.createTemplateFromFile('Screens/PostTaskQuestionnaires.html').evaluate()
      .setTitle('Post Study Questionnaires')
      .setWidth(300);
  SpreadsheetApp.getUi() // Or DocumentApp or FormApp.
      .showSidebar(html);

}
