var Matrix = require('./Matrix.js');

function printMatrix (matrix) {
    return matrix.toString();
}

function transpose (matrix) {
    return matrix.transpose();
}

module.exports = function (operation, arg1, arg2, arg3) {
    switch (operation) {
        case 'transpose':
            return printMatrix(transpose(new Matrix(JSON.parse(arg1))));
        default:
            return printMatrix(new Matrix(JSON.parse(operation)));
            break;
    }
}