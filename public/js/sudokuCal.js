app.service('sudokuCal', function() {
    this.resultData = null;
    this.reRunNeeded = true;
    this.gussingPointList = [];
    this.unsolvedCellCount = 81;
    this.cal = function(questionData) {
        this.init(questionData);
        do {
            this.reRunNeeded = false;
            this.calRow();
            this.calCol();
            this.calBox();
            console.log(this.unsolvedCellCount);
        } while (this.reRunNeeded);

        try {
            do {
                var nextGuessingPoint = this.getNextGuessingPoint();
                this.doGuessing(nextGuessingPoint);
                this.gussingPointList.push(nextGuessingPoint);
                // console.log(JSON.stringify(this.gussingPointList));
                do {
                    try {
                        console.log("ran.");
                        this.reRunNeeded = false;
                        this.calRow();
                        this.calCol();
                        this.calBox();
                        console.log(this.unsolvedCellCount);
                        // if (this.unsolvedCellCount == 42) {
                        //     throw new Error();
                        // }
                    } catch (e) {

                        if (e instanceof SudokuCellGuessingFailureException) {
                            console.log(e);
                            // If current guessing point has no more possible value, fall back one step
                            while(nextGuessingPoint.possibleVal.length === 0) {
                                nextGuessingPoint = this.gussingPointList.pop();
                                if (nextGuessingPoint === undefined) {
                                    throw new Error("No possible solution.");
                                }
                            }
                            this.sudokuDataCopy(nextGuessingPoint.cacheSudokuData, this.resultData);
                            console.log(JSON.stringify(this.resultData));
                            this.unsolvedCellCount = nextGuessingPoint.unsolvedCellCount;
                            this.doGuessing(nextGuessingPoint);
                            this.reRunNeeded = true;
                            console.log(this.unsolvedCellCount);
                        } else {
                            throw e;
                        }
                    }
                } while (this.reRunNeeded);
            } while (this.unsolvedCellCount > 0);
        } catch (e) {
           alert("something wrong.");
        }
        return this.resultData;
    };
    this.init = function(questionData) {
        //todo, array padding
        this.resultData = JSON.parse(JSON.stringify(questionData));

        for (var i = 0; i < 3; i++) {
            for (var j = 0; j < 3; j++) {
                for (var k = 0; k < 3; k++) {
                    for (var v = 0; v < 3; v++) {
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
                            this.unsolvedCellCount--;
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
                                    if (this.resultData[i][x][k][y].possibleVal !== null && !(x === j && y === v)) {
                                        var solved = this.resultData[i][x][k][y].removePossibleVal(this.resultData[i][j][k][v].value);
                                        if (solved) {
                                            this.unsolvedCellCount--;
                                            this.reRunNeeded = true;
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    };
    this.calCol = function() {
        for (var i = 0; i < 3; i++) {
            for (var j = 0; j < 3; j++) {
                for (var k = 0; k < 3; k++) {
                    for (var v = 0; v < 3; v++) {
                        if (this.resultData[i][j][k][v].value !== 0) {
                            for (var x = 0; x < 3; x++) {
                                for (var y = 0; y < 3; y++) {
                                    if (this.resultData[x][j][y][v].possibleVal !== null && !(x === i && y === k)) {
                                        var solved = this.resultData[x][j][y][v].removePossibleVal(this.resultData[i][j][k][v].value);
                                        if (solved) {
                                            this.unsolvedCellCount--;
                                            this.reRunNeeded = true;
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    };
    this.calBox = function() {
        for (var i = 0; i < 3; i++) {
            for (var j = 0; j < 3; j++) {
                for (var k = 0; k < 3; k++) {
                    for (var v = 0; v < 3; v++) {
                        if (this.resultData[i][j][k][v].value !== 0) {
                            for (var x = 0; x < 3; x++) {
                                for (var y = 0; y < 3; y++) {
                                    if (this.resultData[i][j][x][y].possibleVal !== null && !(x === k && y === v)) {
                                        var solved = this.resultData[i][j][x][y].removePossibleVal(this.resultData[i][j][k][v].value);
                                        if (solved) {
                                            this.unsolvedCellCount--;
                                            this.reRunNeeded = true;
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    };
    this.getNextGuessingPoint = function() {
        var minPossibleVal = 9;
        var point = {};
        for (var i = 0; i < 3; i++) {
            for (var j = 0; j < 3; j++) {
                for (var k = 0; k < 3; k++) {
                    for (var v = 0; v < 3; v++) {
                        if (this.resultData[i][j][k][v].value === 0 && this.resultData[i][j][k][v].possibleVal.length < minPossibleVal)
                        {
                            minPossibleVal = this.resultData[i][j][k][v].possibleVal.length;
                            point.i = i;
                            point.j = j;
                            point.k = k;
                            point.v = v;
                        }
                    }
                }
            }
        }
        if (minPossibleVal === 9) {
            throw new Error("Something wrong.");
        }
        nextGuessingPoint = new GuessingPoint();
        nextGuessingPoint.setLocation(point.i, point.j, point.k, point.v);
        nextGuessingPoint.setCacheSudokuData(this.resultData);
        nextGuessingPoint.setPossibleVal(this.resultData[point.i][point.j][point.k][point.v].possibleVal.slice(0));
        nextGuessingPoint.setUnsolvedCellCount(this.unsolvedCellCount);


        return nextGuessingPoint;
    };
    this.doGuessing = function(guessingPoint)
    {
        console.log("Guessing ");
        console.log(JSON.stringify(guessingPoint.location));
        console.log(JSON.stringify(guessingPoint.possibleVal));
        var location = guessingPoint.location;
        var targetCell = this.resultData[location.i][location.j][location.k][location.v];
        targetCell.value = guessingPoint.possibleVal.pop();
        targetCell.possibleVal = [targetCell.value];
        this.unsolvedCellCount--;
    };
    this.sudokuDataCopy = function(org, des) {
        this.resultData = JSON.parse(JSON.stringify(org));
        for (var i = 0; i < 3; i++) {
            for (var j = 0; j < 3; j++) {
                for (var k = 0; k < 3; k++) {
                    for (var v = 0; v < 3; v++) {
                        this.resultData[i][j][k][v] = new SudokuCell();

                        this.resultData[i][j][k][v].i = i;
                        this.resultData[i][j][k][v].j = j;
                        this.resultData[i][j][k][v].k = k;
                        this.resultData[i][j][k][v].v = v;
                        this.resultData[i][j][k][v].setVal(org[i][j][k][v].value);
                        if (org[i][j][k][v].possibleVal !== null) {
                            this.resultData[i][j][k][v].possibleVal = org[i][j][k][v].possibleVal.slice();
                        } else {
                            this.resultData[i][j][k][v].possibleVal = null;
                        }
                    }
                }
            }
        }
    }
});

function SudokuCell() {
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
    }
}

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

function SudokuCellGuessingFailureException(obj) {this.cell = obj}