'use strict';

describe('SudokuCal service', function() {
    var SudokuCal;
    var sudokuQuestionArray = [
        [
            [
                [4,0,0],
                [5,9,0],
                [0,0,1]
            ],
            [
                [9,0,5],
                [3,0,0],
                [0,0,0]
            ],
            [
                [0,1,0],
                [4,0,0],
                [0,0,0]
            ]
        ],
        [
            [
                [0,2,0],
                [0,1,4],
                [3,0,0]
            ],
            [
                [7,0,0],
                [6,0,2],
                [0,0,1]
            ],
            [
                [0,0,1],
                [5,8,0],
                [0,4,0]
            ]
        ],
        [
            [
                [0,0,0],
                [0,0,7],
                [0,5,0]
            ],
            [
                [0,0,0],
                [0,0,9],
                [4,0,7]
            ],
            [
                [7,0,0],
                [0,5,6],
                [0,0,9]
            ]
        ]
    ];
    var sudokuResultArray = [
        [
            [
                [4,8,3],
                [5,9,2],
                [6,7,1]
            ],
            [
                [9,7,5],
                [3,1,6],
                [8,2,4]
            ],
            [
                [6,1,2],
                [4,7,8],
                [3,9,5]
            ]
        ],
        [
            [
                [8,2,5],
                [7,1,4],
                [3,6,9]
            ],
            [
                [7,4,3],
                [6,9,2],
                [5,8,1]
            ],
            [
                [9,6,1],
                [5,8,3],
                [2,4,7]
            ]
        ],
        [
            [
                [9,3,6],
                [1,4,7],
                [2,5,8]
            ],
            [
                [1,5,8],
                [2,3,9],
                [4,6,7]
            ],
            [
                [7,2,4],
                [8,5,6],
                [1,3,9]
            ]
        ]
    ];

    // Load sudokuApp module
    beforeEach(angular.mock.module('sudokuApp'));

    beforeEach(inject(function(_SudokuCal_) {
        SudokuCal = _SudokuCal_;
    }));

    // A simple test to verify the sudokuCal service exists
    it('should exist', function() {
        expect(SudokuCal).toBeDefined();
    });

    it('should able to calculate result', function() {
        var questionData = SudokuCal.initQuestion(sudokuQuestionArray);
        var actualResult = SudokuCal.cal(questionData);
        for (var i = 0; i < 3; i++) {
            for (var j = 0; j < 3; j++) {
                for (var k = 0; k < 3; k++) {
                    for (var v = 0; v < 3; v++) {
                        expect(actualResult[i][j][k][v].value).toEqual(sudokuResultArray[i][j][k][v]);
                    }
                }
            }
        }
    });
});