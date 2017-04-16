'use strict';

function SudokuCell() {

}
/**
 * Remove possible value from a cell
 * @param val
 * @returns {boolean}
 */
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

/**
 * Set the value for a cell
 * @param a
 */
SudokuCell.prototype.setVal = function(a) {
    this.value = a;
};

/**
 * Duplicate a cell object
 * @param org
 * @returns {SudokuCell}
 */
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

/**
 * Duplicate the whole board
 * @param org
 */
SudokuCell.copyAllCells = function(org) {
    var des = JSON.parse(JSON.stringify(org));
    for (var i = 0; i < 3; i++) {
        for (var j = 0; j < 3; j++) {
            for (var k = 0; k < 3; k++) {
                for (var v = 0; v < 3; v++) {
                    des[i][j][k][v] = new SudokuCell;
                    des[i][j][k][v].copy(org[i][j][k][v]);
                }
            }
        }
    }
    return des;
};

/**
 * Init a SudokuCell based
 * @param orgArray
 */
SudokuCell.initAllCellsByArray = function(orgArray) {
    var des = JSON.parse(JSON.stringify(orgArray));
    for (var i = 0; i < 3; i++) {
        for (var j = 0; j < 3; j++) {
            for (var k = 0; k < 3; k++) {
                for (var v = 0; v < 3; v++) {
                    des[i][j][k][v] = new SudokuCell;
                    des[i][j][k][v].i = i;
                    des[i][j][k][v].j = j;
                    des[i][j][k][v].k = k;
                    des[i][j][k][v].v = v;

                    des[i][j][k][v].setVal(orgArray[i][j][k][v].value);
                    if (orgArray[i][j][k][v].value !== 0) {
                        des[i][j][k][v].possibleVal = null;
                    } else {
                        des[i][j][k][v].possibleVal = [1,2,3,4,5,6,7,8,9];
                    }
                }
            }
        }
    }
    return des;
};

/**
 * Get unsolved cell number from a cell array
 * @param org
 * @returns {number}
 */
SudokuCell.getUnsolvedCellCount = function(org) {
    var count = 81;
    for (var i = 0; i < 3; i++) {
        for (var j = 0; j < 3; j++) {
            for (var k = 0; k < 3; k++) {
                for (var v = 0; v < 3; v++) {
                    if (org[i][j][k][v].value !== 0) {
                        count--;
                    }
                }
            }
        }
    }
    return count;
};