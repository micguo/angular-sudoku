'use strict';

app.service('SudokuCal', function() {
    this.resultData = null;
    this.reRunNeeded = true;
    this.gussingPointList = [];
    this.currentGussingPoint = null;

    /**
     * Main processing function
     * @param questionData
     * @returns {*|null}
     */
    this.cal = function(questionData) {
        try {
            this.validateQuestion(questionData);
        } catch (e) {
            if (e instanceof SudokuInvalidQuestionException) {
                alert("Invalid question.");
                throw e;
            } else {
                throw e;
            }
        }
        this.gussingPointList = [];
        this.resultData = SudokuCell.copyAllCells(SudokuCell.initAllCellsByArray(questionData));
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
                        while(this.currentGussingPoint.possibleVal.length === 0) {
                            this.currentGussingPoint = this.gussingPointList.pop();
                            if (this.currentGussingPoint === undefined) {
                                alert("No possbile solution.");
                                throw new Error("No possible solution.");
                            }
                        }
                        this.resultData = SudokuCell.copyAllCells(this.currentGussingPoint.cacheSudokuData);
                        this.doGuessing(this.currentGussingPoint);
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
                this.currentGussingPoint = this.getNextGuessingPoint();
                this.doGuessing(this.currentGussingPoint);
                this.gussingPointList.push(this.currentGussingPoint);
            }
        }
        return this.resultData;
    };

    /**
     * Valid the question we got is valid
     * @param questionData
     */
    this.validateQuestion = function(questionData) {
        for (var i = 0; i < 3; i++) {
            for (var j = 0; j < 3; j++) {
                for (var k = 0; k < 3; k++) {
                    for (var v = 0; v < 3; v++) {
                        if (questionData[i][j][k][v].value !== 0) {
                            //Valid question
                            //Valid row
                            for (var x = 0; x < 3; x++) {
                                for (var y = 0; y < 3; y++) {
                                    // Skip itself
                                    if (x === j && y === v) {
                                        continue;
                                    }
                                    if (questionData[i][x][k][y].value === questionData[i][j][k][v].value) {
                                        throw new SudokuInvalidQuestionException();
                                    }
                                }
                            }
                            //Valid col
                            for (x = 0; x < 3; x++) {
                                for (y = 0; y < 3; y++) {
                                    // Skip itself
                                    if (x === i && y === k) {
                                        continue;
                                    }
                                    if (questionData[x][j][y][v].value === questionData[i][j][k][v].value) {
                                        throw new SudokuInvalidQuestionException();
                                    }
                                }
                            }
                            //Valid box
                            for (x = 0; x < 3; x++) {
                                for (y = 0; y < 3; y++) {
                                    // Skip itself
                                    if (x === k && y === v) {
                                        continue;
                                    }
                                    if (questionData[i][j][x][y].value === questionData[i][j][k][v].value) {
                                        throw new SudokuInvalidQuestionException();
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    };

    /**
     * Translate question array(numbers) to array(objects) for display
     * @param questionArray
     * @returns {*}
     */
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

    /**
     * Get a empty array(objects) represent an empty sudoku board
     * @param org
     */
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

    /**
     * Use row constraint to narrow down possible solution
     */
    this.calRow = function() {
        for (var i = 0; i < 3; i++) {
            for (var j = 0; j < 3; j++) {
                for (var k = 0; k < 3; k++) {
                    for (var v = 0; v < 3; v++) {
                        if (this.resultData[i][j][k][v].value !== 0) {
                            for (var x = 0; x < 3; x++) {
                                for (var y = 0; y < 3; y++) {
                                    // Skip itself
                                    if (x === j && y === v) {
                                        continue;
                                    }
                                    if (this.resultData[i][x][k][y].possibleVal !== null) {
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

    /**
     * Use column constraint to narrow down possible solution
     */
    this.calCol = function() {
        for (var i = 0; i < 3; i++) {
            for (var j = 0; j < 3; j++) {
                for (var k = 0; k < 3; k++) {
                    for (var v = 0; v < 3; v++) {
                        if (this.resultData[i][j][k][v].value !== 0) {
                            for (var x = 0; x < 3; x++) {
                                for (var y = 0; y < 3; y++) {
                                    // Skip itself
                                    if (x === i && y === k) {
                                        continue;
                                    }
                                    if (this.resultData[x][j][y][v].possibleVal !== null) {
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

    /**
     * Use box constraint to narrow down possible solution
     */
    this.calBox = function() {
        for (var i = 0; i < 3; i++) {
            for (var j = 0; j < 3; j++) {
                for (var k = 0; k < 3; k++) {
                    for (var v = 0; v < 3; v++) {
                        if (this.resultData[i][j][k][v].value !== 0) {
                            for (var x = 0; x < 3; x++) {
                                for (var y = 0; y < 3; y++) {
                                    // Skip itself
                                    if (x === k && y === v) {
                                        continue;
                                    }
                                    if (this.resultData[i][j][x][y].possibleVal !== null) {
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

    /**
     * Get the next guessing point. Choose the one with least possible value
     * @returns {GuessingPoint}
     */
    this.getNextGuessingPoint = function() {
        var minPossibleVal = 9;
        var point = {};
        for (var i = 0; i < 3; i++) {
            for (var j = 0; j < 3; j++) {
                for (var k = 0; k < 3; k++) {
                    for (var v = 0; v < 3; v++) {
                        if (this.resultData[i][j][k][v].value === 0 && this.resultData[i][j][k][v].possibleVal.length <= minPossibleVal)
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

        var nextGuessingPoint = new GuessingPoint();
        nextGuessingPoint.setLocation(point.i, point.j, point.k, point.v);
        nextGuessingPoint.setCacheSudokuData(this.resultData);
        nextGuessingPoint.setPossibleVal(this.resultData[point.i][point.j][point.k][point.v].possibleVal.slice(0));

        return nextGuessingPoint;
    };

    /**
     * Guess a value for a given guessing point.
     * @param guessingPoint
     */
    this.doGuessing = function(guessingPoint) {
        var location = guessingPoint.location;
        var targetCell = this.resultData[location.i][location.j][location.k][location.v];
        targetCell.value = guessingPoint.possibleVal.pop();
        targetCell.possibleVal = [targetCell.value];
    };
});

/**
 * Exception for failed guessing
 * @param obj
 * @constructor
 */
function SudokuCellGuessingFailureException(obj) {this.cell = obj}

/**
 * Exception for
 * @constructor
 */
function SudokuInvalidQuestionException() {}