'use strict';

var app = angular.module('sudokuApp', []);
app.controller('MainCtrl', function($scope, sudokuCal) {
    var sudokuQuestionArray = [
        [
            [
                [0,0,0],
                [0,6,0],
                [0,0,0]
            ],
            [
                [0,2,0],
                [3,0,0],
                [4,0,0]
            ],
            [
                [5,0,8],
                [0,9,7],
                [3,0,0]
            ]
        ],
        [
            [
                [1,7,0],
                [0,0,0],
                [0,2,0]
            ],
            [
                [0,0,9],
                [0,0,0],
                [8,0,0]
            ],
            [
                [0,6,0],
                [0,0,0],
                [0,7,1]
            ]
        ],
        [
            [
                [0,0,4],
                [9,8,0],
                [7,0,1]
            ],
            [
                [0,0,6],
                [0,0,2],
                [0,4,0]
            ],
            [
                [0,0,0],
                [0,3,0],
                [0,0,0]
            ]
        ]
    ];
    $scope.sudokuQuestion = SudokuCell.initAllCellsByArray(sudokuQuestionArray);
    $scope.sudokuResult = sudokuCal.initResult($scope.sudokuQuestion);
    $scope.calculate = function() {
        $scope.sudokuResult = sudokuCal.cal($scope.sudokuQuestion);
    }
})
.directive('mySudokuCell', function() {
    return {
        scope: {
            cellData: "="
        },
        templateUrl: "js/template/mySudokuCell.html"
    }
})
.directive('mySudokuBox', function() {
    return {
        scope: {
            boxData: "="
        },
        templateUrl: "js/template/mySudokuBox.html"
    }
})
.directive('mySudoku', function() {
    return {
        scope: {
            headingText: "@",
            sudokuData: "="
        },
        templateUrl: "/js/template/mySudoku.html"
    };
});
