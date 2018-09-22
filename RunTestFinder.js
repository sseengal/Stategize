
function getTest(data, test, users, groups) {
  switch (data) {
    case 'continuous':
      switch(test) {
        case 'comparison':
          switch (users) {
            case 'different':
              switch (groups) {
                case 'morethanthree':
                  return 'Anova or Multiple Two-Sample t Test'
                  break;
                case 'lessthanthree':
                  return 'Two-Sample t Test'
                  break;
              }
              
            case 'same':
               switch (groups) {
                case 'morethanthree':
                  return 'Anova or Multiple paired t Test'
                  break;
                case 'lessthanthree':
                  return 'Paired t Test'
                  break;
              }
              
          }
          
      case 'correlation': 
          return 'Correlation and Regression Test'
      case 'benchmark':
          switch (users) {
            case 'tasktime':
              return 'One-Sample t(log) Test'
              break;
            case 'scores':
              return 'One-Sample t Test'
              break;
          }
      case 'baseline':
          switch (users) {
            case 'tasktime':
              return 't(log) or Median Confidence Interval'
              break;
            case 'scores':
              return 't Confidence Interval'
              break;
          }
      }
    case 'binary':
        switch(test) {
        case 'comparison':
          switch (users) {
            case 'different':
              switch (groups) {
                case 'morethanthree':
                  return 'Chi-Square or Adjusted Wald Difference in Proportions Test'
                  break;
                case 'lessthanthree':
                  return 'N-1 Two Proportion Test and Fisher Exact Test'
                  break;
              }
              
            case 'same':
               switch (groups) {
                case 'morethanthree':
                  return 'Adjusted Wald Confidence Interval for Difference in Matched Proportions Test'
                  break;
                case 'lessthanthree':
                  return 'McNemar Exact Test'
                  break;
              }
              
          }
          
      case 'correlation': 
          return 'Phi Correlation Test'
      case 'benchmark':
         return 'One-Sample Binomial or One-Sample z Test';
      case 'baseline':
          return 'Adjusted Wald Confidence Interval Test';
      }    
  }
}


