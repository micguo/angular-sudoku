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

GuessingPoint.prototype.setCacheSudokuData = function(org) {
    this.cacheSudokuData = SudokuCell.copyAllCells(org);
};
