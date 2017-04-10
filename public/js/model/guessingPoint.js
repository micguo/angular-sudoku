'use strict';

function GuessingPoint() {

}

GuessingPoint.prototype.setLocation = function(i, j, k, v) {
    this.location = {};
    this.location.i = i;
    this.location.j = j;
    this.location.k = k;
    this.location.v = v;
};

GuessingPoint.prototype.setPossibleVal = function(possibleVal) {
    var a = possibleVal;
    this.possibleVal = a;
};

GuessingPoint.prototype.setCacheSudokuData = function(resultData) {
    this.cacheSudokuData = JSON.parse(JSON.stringify(resultData));
    for (var i = 0; i < 3; i++) {
        for (var j = 0; j < 3; j++) {
            for (var k = 0; k < 3; k++) {
                for (var v = 0; v < 3; v++) {
                    this.cacheSudokuData[i][j][k][v] = new SudokuCell();

                    this.cacheSudokuData[i][j][k][v].i = i;
                    this.cacheSudokuData[i][j][k][v].j = j;
                    this.cacheSudokuData[i][j][k][v].k = k;
                    this.cacheSudokuData[i][j][k][v].v = v;

                    this.cacheSudokuData[i][j][k][v].setVal(resultData[i][j][k][v].value);
                    if (resultData[i][j][k][v].possibleVal !== null) {
                        this.cacheSudokuData[i][j][k][v].possibleVal = resultData[i][j][k][v].possibleVal.slice();
                    } else {
                        this.cacheSudokuData[i][j][k][v].possibleVal = null;
                    }
                }
            }
        }
    }
};

GuessingPoint.prototype.setUnsolvedCellCount  = function(unsolvedCellCount) {
    this.unsolvedCellCount = unsolvedCellCount;
};