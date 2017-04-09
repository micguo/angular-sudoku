app.service('sudokuCal', function() {
    this.resultData = null;
    this.reRunNeeded = true;
    this.cal = function(questionData) {
        this.init(questionData);
        do {
            this.reRunNeeded = false;
            this.calRow();
            this.calCol();
            this.calBox();
        } while (this.reRunNeeded);
        return this.resultData;
    };
    this.init = function(questionData) {
        //todo, array padding
        this.resultData = JSON.parse(JSON.stringify(questionData));

        for (var i = 0; i < 3; i++) {
            for (var j = 0; j < 3; j++) {
                for (var k = 0; k < 3; k++) {
                    for (var v = 0; v < 3; v++) {
                        var a = new SudokuCell();
                        this.resultData[i][j][k][v] = new SudokuCell();

                        this.resultData[i][j][k][v].i = i;
                        this.resultData[i][j][k][v].j = j;
                        this.resultData[i][j][k][v].k = k;
                        this.resultData[i][j][k][v].v = v;

                        this.resultData[i][j][k][v].setVal(questionData[i][j][k][v]);
                        if (questionData[i][j][k][v] === 0) {
                            this.resultData[i][j][k][v].possibleVal = [1, 2, 3, 4, 5, 6, 7, 8, 9];
                        } else {
                            this.resultData[i][j][k][v].possibleVal = null;
                        }

                        questionData[i][j][k][v] = {"value": questionData[i][j][k][v]};
                    }
                }
            }
        }

    };
    this.calRow = function() {
        for (var i = 0; i < 3; i++) {
            for (var j = 0; j < 3; j++) {
                for (var k = 0; k < 3; k++) {
                    for (var v = 0; v < 3; v++) {
                        if (this.resultData[i][j][k][v].value !== 0) {
                            for (var x = 0; x < 3; x++) {
                                for (var y = 0; y < 3; y++) {
                                    if (this.resultData[i][x][k][y].possibleVal !== null) {
                                        this.reRunNeeded = this.resultData[i][x][k][y].removePossibleVal(this.resultData[i][j][k][v].value) || this.reRunNeeded;
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
    this.calCol = function() {
        for (var i = 0; i < 3; i++) {
            for (var j = 0; j < 3; j++) {
                for (var k = 0; k < 3; k++) {
                    for (var v = 0; v < 3; v++) {
                        if (this.resultData[i][j][k][v].value !== 0) {
                            for (var x = 0; x < 3; x++) {
                                for (var y = 0; y < 3; y++) {
                                    if (this.resultData[x][j][y][v].possibleVal !== null) {
                                        this.reRunNeeded = this.resultData[x][j][y][v].removePossibleVal(this.resultData[i][j][k][v].value) || this.reRunNeeded;
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
    this.calBox = function() {
        for (var i = 0; i < 3; i++) {
            for (var j = 0; j < 3; j++) {
                for (var k = 0; k < 3; k++) {
                    for (var v = 0; v < 3; v++) {
                        if (this.resultData[i][j][k][v].value !== 0) {
                            for (var x = 0; x < 3; x++) {
                                for (var y = 0; y < 3; y++) {
                                    if (this.resultData[i][j][x][y].possibleVal !== null) {
                                        this.reRunNeeded = this.resultData[i][j][x][y].removePossibleVal(this.resultData[i][j][k][v].value) || this.reRunNeeded;
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
});

function SudokuCell() {
    SudokuCell.prototype.removePossibleVal = function(val){
        var index = this.possibleVal.indexOf(val);
        if (index > -1) {
            this.possibleVal.splice(index, 1);
        }
        if (this.possibleVal.length === 1) {
            if (val === this.possibleVal[0]) {
                throw new SudokuCellGuessingFailureException();
            } else {
                this.value = this.possibleVal[0];
                return true;
            }
        }


        return false;
    };
    SudokuCell.prototype.setVal = function(a) {
        this.value = a;
    }
}

function SudokuCellGuessingFailureException() {}