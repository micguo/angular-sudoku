'use strict';

app.service('sudokuCal', function() {
    this.resultData = null;
    this.reRunNeeded = true;
    this.gussingPointList = [];

    this.cal = function(questionData) {
        this.gussingPointList = [];
        this.resultData = SudokuCell.copyAllCells(SudokuCell.initAllCellsByArray(questionData));
        var nextGuessingPoint = null;
        try {
            // We won't back off until we get a result!
            while (SudokuCell.getUnsolvedCellCount(this.resultData) > 0) {
                do {
                    try {
                        this.reRunNeeded = false;
                        this.calRow();
                        this.calCol();
                        this.calBox();
                    } catch (e) {
                        if (e instanceof SudokuCellGuessingFailureException) {
                            // If current guessing point has no more possible value, fall back one step
                            while(nextGuessingPoint.possibleVal.length === 0) {
                                nextGuessingPoint = this.gussingPointList.pop();
                                if (nextGuessingPoint === undefined) {
                                    alert("No possbile solution.");
                                    throw new Error("No possible solution.");
                                }
                            }
                            this.resultData = SudokuCell.copyAllCells(nextGuessingPoint.cacheSudokuData);
                            this.doGuessing(nextGuessingPoint);
                            this.reRunNeeded = true;
                        } else {
                            throw e;
                        }
                    }
                } while (
                    // Rerun if we had made some progress in this loop.
                    this.reRunNeeded
                );

                if (SudokuCell.getUnsolvedCellCount(this.resultData) > 0) {
                    // We can't solve the problem without guessing at this point, so do some guessing work
                    nextGuessingPoint = this.getNextGuessingPoint();
                    this.doGuessing(nextGuessingPoint);
                    this.gussingPointList.push(nextGuessingPoint);
                }

            }
        } catch (e) {
           alert("something wrong.");
           throw e;
        }
        return this.resultData;
    };
    this.initQuestion = function(questionArray){
        var des;
        des = JSON.parse(JSON.stringify(questionArray));
        for (var i = 0; i < 3; i++) {
            for (var j = 0; j < 3; j++) {
                for (var k = 0; k < 3; k++) {
                    for (var v = 0; v < 3; v++) {
                        des[i][j][k][v] = {"value": questionArray[i][j][k][v]};
                    }
                }
            }
        }
        return des;
    };
    this.getEmptyBoard = function(org) {
        var des = JSON.parse(JSON.stringify(org));
        for (var i = 0; i < 3; i++) {
            for (var j = 0; j < 3; j++) {
                for (var k = 0; k < 3; k++) {
                    for (var v = 0; v < 3; v++) {
                        // Show the result as empty box
                        des[i][j][k][v] = {"value": 0};
                    }
                }
            }
        }
        return des;
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
        var nextGuessingPoint = new GuessingPoint();
        nextGuessingPoint.setLocation(point.i, point.j, point.k, point.v);
        nextGuessingPoint.setCacheSudokuData(this.resultData);
        nextGuessingPoint.setPossibleVal(this.resultData[point.i][point.j][point.k][point.v].possibleVal.slice(0));

        return nextGuessingPoint;
    };
    this.doGuessing = function(guessingPoint) {
        var location = guessingPoint.location;
        var targetCell = this.resultData[location.i][location.j][location.k][location.v];
        targetCell.value = guessingPoint.possibleVal.pop();
        targetCell.possibleVal = [targetCell.value];
    };
});

function SudokuCellGuessingFailureException(obj) {this.cell = obj}