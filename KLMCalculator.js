function  runKLMCalculator(values) {
  // destructure.. too bad es6 is not supported in appscript
  var k = parseFloat(values.k);
  var b = parseFloat(values.b);
  var p = parseFloat(values.p);
  var h = parseFloat(values.h);
  var m = parseFloat(values.m);
  var actions = values.actions;
  var time = 0;

  for (var i = 0; i<actions.length; i++) {
    switch(actions[i]) {
      case 'k':
      time = time+k;
      break;
      case 'b':
      time = time+b;
      break;
      case 'p':
      time = time+p;
      break;
      case 'h':
      time = time+h;
      break;
      case 'm':
      time = time+m;
      break;
      default:
      break;
    }
  }
  return Math.round(time*100)/100;
}
