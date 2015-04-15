var stream = require('stream');
var Matrix = require('./Matrix.js');

function createMatrix(input) {
    return new Matrix(JSON.parse(input));
}

function printMatrix(matrix) {
    return matrix.toString();
}

function transpose(matrix) {
    return matrix.transpose();
}

function scalar(scalar, matrix) {
    var m = matrix.copy();

    m.arr = m.arr.map(function(entry) {
        return entry * scalar;
    });

    return m;
}

function mult(matrix1, matrix2) {

    if (matrix1.width !== matrix2.height) {
        console.error('wrong matrix dimensions');
        return null;
    }
    var a = [];

    for (var y = 0; y < matrix1.height; y++) {
        var row = [];
        for (var x = 0; x < matrix2.width; x++) {
            var entry = 0;
            for (var i = 0; i < matrix1.width; i++) {
                entry += matrix1.arr[y+i] * matrix2.arr[x+i*matrix2.width];
            }
            row.push(entry);
        }
        a.push(row);
    }

    return new Matrix(a);
}

function inner(matrix1, matrix2) {
    return mult(transpose(matrix1), matrix2);
}

function outer(matrix1, matrix2) {
    return mult(matrix1, transpose(matrix2));
}

module.exports = function (operation, arg1, arg2, arg3) {
    switch (operation) {
        case 'scalar':
            return printMatrix(scalar(Number(arg1), createMatrix(arg2)));
            break;
        case 'mult':
            return printMatrix(mult(createMatrix(arg1), createMatrix(arg2)));
            break;
        case 'dot':
            return printMatrix(inner(createMatrix(arg1), createMatrix(arg2)));
            break;
        case 'cross':
            return printMatrix(outer(createMatrix(arg1), createMatrix(arg2)));
            break;
        case 'transpose':
            return printMatrix(transpose(createMatrix(arg1)));
            break;
        default:
            return printMatrix(createMatrix(operation));
            break;
    }
}