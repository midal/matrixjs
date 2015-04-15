function Matrix(arr, transpose) {
    this.arr    = JSON.parse('[' + arr.toString() + ']');
    this.width  = arr[0].length || 1;
    this.height = arr.length;

    if(transpose) {
        var temp    = this.width;
        this.width  = this.height;
        this.height = temp;
    }
};

Matrix.prototype.toString = function() {
    var output = "[";
    var width = this.width;
    var height = this.height;

    this.arr.map(function(entry, index) {
        if (index+1 === width * height) {
            output += entry + ']';
        }
        else if ((index+1) % width === 0) {
            output += entry + '\n ';
        }
        else {
            output += entry + ", ";
        }
    });

    return output;
};

Matrix.prototype.toArray = function() {
    var arr = [];
    for (var y = 0; y < this.height; y++) {
        var row = [];
        for (var x = 0; x < this.width; x++) {
            row.push(this.arr[y*this.width + x]);
        }
        arr.push(row);
    }
    return arr;
};

Matrix.prototype.transpose = function() {
    return new Matrix(this.toArray(), true);
};

module.exports = Matrix;