//Basic Operations by Extending Math Object

Math.add = function add(vector1, vector2, range) {
  var result = []
    for(var i = 0; i < range; i++) {
        result.push( vector1[i] + vector2[i])
    }
    return result;
}

Math.subtract = function subtract(vector1, vector2, range) {
  var result = []
    for(var i = 0; i < range; i++) {
        result.push(Math.abs(vector1[i] - vector2[i]))
    }
    return result;
}

Math.multiply = function multiply(vector1, vector2, range) {
  var result = []
    for(var i = 0; i < range; i++) {
        result.push( vector1[i] * vector2[i])
    }
    return result;
}

Math.divide = function divide(vector1, vector2, range) {
  var result = []
    for(var i = 0; i < range; i++) {
        result.push( vector1[i] / vector2[i])
    }
    return result;
}

Math.logVec = function logVec(vector1, range) {
  var result = []
    for(var i = 0; i < range; i++) {
        result.push( Math.log(vector1[i]));
    }
    return result;
}


Math.sum = function sum(vector) {
   var result = 0;
    for(var i = 0; i < vector.length; i++) {
      result += vector[i];
    }
    return result;
}

Math.sumOfSquares = function sum_sq(vector) {
  var sum = 0, 
      i = vector.length;
  while (i--) 
   sum += Math.pow(vector[i], 2);
  return sum;
}
 

Math.mean = function mean(vector) {
  return Math.sum(vector)*1/vector.length;
}

Math.besselMean = function besselMean(vector) {
  return Math.sum(vector)*1/(vector.length-1);
}


// SAMPLE STANDARD DEVIATION - Uses besselMean instead of mean. Use mean for population standard deviation.

Math.stdev = function standardDeviation(values){
  var avg = Math.mean(values);
  
  var squareDiffs = values.map(function(value){
    var diff = value - avg;
    var sqrDiff = diff * diff;
    return sqrDiff;
  });
  
  var avgSquareDiff = Math.besselMean(squareDiffs);

  var stdDev = Math.sqrt(avgSquareDiff);
  return stdDev;
}

//VECTOR MATH

function extractColumns(values) {
  
  var col1 = [];
  var col2 = [];
  
  var i = 0;
  while ( i < values.length) {
    
    col1 = values.map(function(value,index) { return value[0]; });
    col2 = values.map(function(value,index) { return value[1]; });
   
  i++;
  }
  
  col1 = removeEmptyValues(col1);
  col2 = removeEmptyValues(col2);
  
  return {
    col1: col1,
    col2: col2
  };
}

// PROPER EXTRACT COLUMNS, IF WORKS, REPLACE EXTRACTCOLUMNS WITH THIS. 
//OKAY THIS WORKS NOW.
function extractMultiColumns(values) {
  
  var columns = [];
  
  var i = 0;
  while ( i < values.length) {
     for (var j = 0; j<values[i].length; j++) {
    columns[j] = values.map(function(value,index) { return value[j]; });
     }
  i++;
  }
  
  
  return columns;
}



function differenceVector(col1, col2) {
  return Math.subtract(col1, col2, col1.length);
}

function logVector(col1) {
  return Math.logVec(col1, col1.length);
}



function removeEmptyValues(my_array) {
var my_array = my_array.filter(function(x){
  return (x !== (undefined || null || ''));
});
  return my_array;
}


