'use strict';

var app = angular.module('sudokuApp', []);
app.controller('MainCtrl', function($scope, sudokuCal) {
    var sudokuQuestionArray = [
        [
            [
                [0,0,0],
                [0,5,9],
                [2,0,0]
            ],
            [
                [0,0,6],
                [0,0,0],
                [0,0,8]
            ],
            [
                [0,0,0],
                [0,0,8],
                [0,0,0]
            ]
        ],
        [
            [
                [0,4,5],
                [0,0,3],
                [0,0,6]
            ],
            [
                [0,0,0],
                [0,0,0],
                [0,0,3]
            ],
            [
                [0,0,0],
                [0,0,0],
                [0,5,4]
            ]
        ],
        [
            [
                [0,0,0],
                [0,0,0],
                [0,0,0]
            ],
            [
                [3,2,5],
                [0,0,0],
                [0,0,0]
            ],
            [
                [0,0,6],
                [0,0,0],
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
