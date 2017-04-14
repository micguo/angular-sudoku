describe('sudoku integration test', function() {
    it('it should able to be cleared', function() {
        browser.get('http://192.168.10.10/');

        $('#questionBoard .clear-button').click();
        $$('#questionBoard .sudoku-cell input').map(function (element) {
            expect(element.getAttribute('value')).toEqual('');
        });

        // Problem
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
        var i, j, k, v;
        for (i = 0; i < 3; i++) {
            for (j = 0; j < 3; j++) {
                for (k = 0; k < 3; k++) {
                    for (v = 0; v < 3; v++) {
                        $('#questionBoard .box-row-' + i + '.box-col-' + j + '  .cell-row-' + k + '.cell-col-' + v + ' input')
                            .sendKeys(sudokuQuestionArray[i][j][k][v]);
                    }
                }
            }
        }
        $('#sudokuCalBtn').click();
        for (i = 0; i < 3; i++) {
            for (j = 0; j < 3; j++) {
                for (k = 0; k < 3; k++) {
                    for (v = 0; v < 3; v++) {
                        expect($('#resultBoard .box-row-' + i + '.box-col-' + j + '  .cell-row-' + k + '.cell-col-' + v + ' input')
                            .getAttribute('value')).toEqual(sudokuResultArray[i][j][k][v].toString());
                    }
                }
            }
        }
    });
});