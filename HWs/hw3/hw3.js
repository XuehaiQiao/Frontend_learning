Array.prototype.myReduce = function(callback, initialValue) {
    let accumulator = initialValue !== undefined ? initialValue : this[0];
    for (let i = initialValue !== undefined ? 0 : 1; i < this.length; i++) {
      accumulator = callback(accumulator, this[i], i, this);
    }
    return accumulator;
};

Array.prototype.myFilter = function(callback) {
    const filteredArray = [];
    for (let i = 0; i < this.length; i++) {
      if (callback(this[i], i, this)) {
        filteredArray.push(this[i]);
      }
    }
    return filteredArray;
};

Array.prototype.myFind = function(callback) {
    for (let i = 0; i < this.length; i++) {
      if (callback(this[i], i, this)) {
        return this[i];
      }
    }
    return undefined;
};

Array.prototype.myConcat = function(...args) {
    const concatenatedArray = [...this];
    for (let i = 0; i < args.length; i++) {
      if (Array.isArray(args[i])) {
        concatenatedArray.push(...args[i]);
      } else {
        concatenatedArray.push(args[i]);
      }
    }
    return concatenatedArray;
};

Array.prototype.myConcat = function(...args) {
    const concatenatedArray = [...this];
    for (let i = 0; i < args.length; i++) {
      if (Array.isArray(args[i])) {
        concatenatedArray.push(...args[i]);
      } else {
        concatenatedArray.push(args[i]);
      }
    }
    return concatenatedArray;
};

Array.prototype.myPop = function() {
    if (this.length === 0) {
      return undefined;
    }
    const poppedElement = this[this.length - 1];
    this.length = this.length - 1;
    return poppedElement;
};