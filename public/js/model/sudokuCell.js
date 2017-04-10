'use strict';

function SudokuCell() {

}

SudokuCell.prototype.removePossibleVal = function(val){
    if (this.possibleVal.length === 1) {
        if (val === this.possibleVal[0]) {
            throw new SudokuCellGuessingFailureException(this);
        }
    }

    var index = this.possibleVal.indexOf(val);
    if (index > -1) {
        this.possibleVal.splice(index, 1);
        if (this.possibleVal.length === 1) {
            this.value = this.possibleVal[0];
            return true;
        }
    }

    return false;
};

SudokuCell.prototype.setVal = function(a) {
    this.value = a;
};

SudokuCell.prototype.copy = function(org) {
    if (! (org instanceof SudokuCell)) {
        throw new Error("Invalid org object has been given.");
    }

    this.i = org.i;
    this.j = org.j;
    this.k = org.k;
    this.v = org.v;

    this.setVal(org.value);
    if (org.possibleVal !== null) {
        this.possibleVal = org.possibleVal.slice();
    } else {
        this.possibleVal = null;
    }

    return this;
};