class slopeInterceptObject {
  constructor(slope, yIntercept) {
    this.slope = slope;
    this.yIntercept = yIntercept;
  }

  compareTo(other) {
    let returnValue = 0;
    returnValue = this.slope - other.slope;
    if(returnValue === 0) {
      returnValue = this.yIntercept - other.yIntercept;
    }
    return returnValue;
  }
}

exports.slopeInterceptObject = slopeInterceptObject;
