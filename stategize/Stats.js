/**
 * @OnlyCurrentDoc
 */


//T DISTRIBUTION TEST


var SIGNIFICANT = 5; // number of significant digits to be returned

// t-crit (1 degree of freedom, 95th percentile = 0.05 level) 
  tdistOneTailed(5, 0.05);
  tdistTwoTailed(5, 0.05);

function tdistOneTailed ($n, $p) {
	if ($n <= 0 || (Math.abs($n) - Math.abs($n)) != 0) {
		Logger.log("Invalid n: $n\n");
	}
	if ($p <= 0 || $p >= 1) {
		Logger.log("Invalid p: $p\n");
	}
	return (precision_string(_subt($n-0, $p-0)));
}

function tdistTwoTailed ($n, $p) {
  $p = $p/2;
	if ($n <= 0 || (Math.abs($n) - Math.abs(($n)) != 0)) {
		Logger.log("Invalid n: $n\n");
	}
	if ($p <= 0 || $p >= 1) {
		Logger.log("Invalid p: $p\n");
	}
	return (precision_string(_subt($n-0, $p-0)));
}


function precision_string ($x) {
	if ($x) {
		return round_to_precision($x, precision($x));
	} else {
		return "0";
	}
}

function round_to_precision ($x, $p) {
        $x = $x * Math.pow(10, $p);
        $x = Math.round($x);
        return $x / Math.pow(10, $p);
}


function precision ($x) {
	return Math.abs(((Math.log(Math.abs($x))/ Math.LN10) - SIGNIFICANT));
}




function _subu ($p) {
	var $y = -Math.log(4 * $p * (1 - $p));
	var $x = Math.sqrt(
		$y * (1.570796288
		  + $y * (.03706987906
		  	+ $y * (-.8364353589E-3
			  + $y *(-.2250947176E-3
			  	+ $y * (.6841218299E-5
				  + $y * (0.5824238515E-5
					+ $y * (-.104527497E-5
					  + $y * (.8360937017E-7
						+ $y * (-.3231081277E-8
						  + $y * (.3657763036E-10
							+ $y *.6936233982E-12)))))))))));
	if ($p>.5)
                $x = -$x;
	return $x;
}


function _subtprob ($n, $x) {
	var $a;
        var $b;
	var $w = Math.atan2($x / Math.sqrt($n), 1);
	var $z = Math.pow(Math.cos($w), 2);
	var $y = 1;
	for (var $i = $n-2; $i >= 2; $i -= 2) {
		$y = 1 + ($i-1) / $i * $z * $y;
	} 

	if ($n % 2 == 0) {
		$a = Math.sin($w)/2;
		$b = .5;
	} else {
		$a = ($n == 1) ? 0 : Math.sin($w)*Math.cos($w)/Math.PI;
		$b= .5 + $w/Math.PI;
	}
	return Math.max(0, 1 - $b - $a * $y);
}




function _subt ($n, $p) {

	
    if ($p >= 1 || $p <= 0) {
		throw("Invalid p: $p\n");
	}
    

	if ($p == 0.5) {
		return 0;
	} else if ($p < 0.5) {
		return - _subt($n, 1 - $p);
	}

	var $u = _subu($p);
	var $u2 = Math.pow($u, 2);

	var $a = ($u2 + 1) / 4;
	var $b = ((5 * $u2 + 16) * $u2 + 3) / 96;
	var $c = (((3 * $u2 + 19) * $u2 + 17) * $u2 - 15) / 384;
	var $d = ((((79 * $u2 + 776) * $u2 + 1482) * $u2 - 1920) * $u2 - 945) 
				/ 92160;
	var $e = (((((27 * $u2 + 339) * $u2 + 930) * $u2 - 1782) * $u2 - 765) * $u2
			+ 17955) / 368640;

	var $x = $u * (1 + ($a + ($b + ($c + ($d + $e / $n) / $n) / $n) / $n) / $n);

	if ($n <= Math.pow((Math.log($p)/Math.LN10), 2) + 3) {
		var $round;
		do { 
			var $p1 = _subtprob($n, $x);
			var $n1 = $n + 1;
			var $delta = ($p1 - $p) 
				/ Math.exp(($n1 * Math.log($n1 / ($n + $x * $x)) 
					+ Math.log($n/$n1/2/Math.PI) - 1 
					+ (1/$n1 - 1/$n) / 6) / 2);
			$x += $delta;
           //  $round = round_to_precision($delta, Math.abs(integer(log10(Math.abs($x))-4)));
            $round = round_to_precision($delta, Math.abs((Math.log(Math.abs($x))/Math.LN10)-4));   //CONVERTS TO INTEGET IN ORIGINAL FORMULA
			
		} while (($x) && ($round != 0));
	}
	return $x;
}

//Normal inverse

function NormSInv(p) {
    var a1 = -39.6968302866538, a2 = 220.946098424521, a3 = -275.928510446969;
    var a4 = 138.357751867269, a5 = -30.6647980661472, a6 = 2.50662827745924;
    var b1 = -54.4760987982241, b2 = 161.585836858041, b3 = -155.698979859887;
    var b4 = 66.8013118877197, b5 = -13.2806815528857, c1 = -7.78489400243029E-03;
    var c2 = -0.322396458041136, c3 = -2.40075827716184, c4 = -2.54973253934373;
    var c5 = 4.37466414146497, c6 = 2.93816398269878, d1 = 7.78469570904146E-03;
    var d2 = 0.32246712907004, d3 = 2.445134137143, d4 = 3.75440866190742;
    var p_low = 0.02425, p_high = 1 - p_low;
    var q, r;
    var retVal;

    if ((p < 0) || (p > 1))
    {
        alert("NormSInv: Argument out of range.");
        retVal = 0;
    }
    else if (p < p_low)
    {
        q = Math.sqrt(-2 * Math.log(p));
        retVal = (((((c1 * q + c2) * q + c3) * q + c4) * q + c5) * q + c6) / ((((d1 * q + d2) * q + d3) * q + d4) * q + 1);
    }
    else if (p <= p_high)
    {
        q = p - 0.5;
        r = q * q;
        retVal = (((((a1 * r + a2) * r + a3) * r + a4) * r + a5) * r + a6) * q / (((((b1 * r + b2) * r + b3) * r + b4) * r + b5) * r + 1);
    }
    else
    {
        q = Math.sqrt(-2 * Math.log(1 - p));
        retVal = -(((((c1 * q + c2) * q + c3) * q + c4) * q + c5) * q + c6) / ((((d1 * q + d2) * q + d3) * q + d4) * q + 1);
    }

    return retVal;
}




//T Value

function tValueFunc(meanDiff, stdMeanDiff, sampleSize) {
return (meanDiff/(stdMeanDiff/Math.sqrt(sampleSize)));
}

//Student's T distribution

function studentTProb ($n, $x) {
	if (($n <= 0) || ((Math.abs($n) - Math.abs(($n))) !=0)) {
		throw("Invalid n: $n\n"); /* degree of freedom */
	}
	return precision_string(_subtprob($n-0, $x-0));
}

