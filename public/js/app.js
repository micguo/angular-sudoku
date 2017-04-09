'use strict';

var app = angular.module('sudokuApp', []);
app.controller('MainCtrl', function($scope, sudokuCal) {

    $scope.sudokuQuestion = [
        [
            [
                [4,0,9],
                [0,0,0],
                [8,0,3]
            ],
            [
                [0,0,0],
                [0,4,0],
                [2,0,0]
            ],
            [
                [0,0,0],
                [6,0,0],
                [0,0,9]
            ]
        ],
        [
            [
                [0,0,0],
                [0,5,0],
                [3,0,0]
            ],
            [
                [0,6,3],
                [0,1,0],
                [8,2,0]
            ],
            [
                [0,0,4],
                [0,7,0],
                [0,0,0]
            ]
        ],
        [
            [
                [9,0,0],
                [0,0,1],
                [0,0,0]
            ],
            [
                [0,0,8],
                [0,5,0],
                [0,0,0]
            ],
            [
                [4,0,2],
                [0,0,0],
                [7,0,1]
            ]
        ]
    ];
    $scope.sudokuResult = sudokuCal.cal($scope.sudokuQuestion);

})
.directive('mySudokuCell', function() {
    return {
        scope: {
            cellData: "="
        },
        templateUrl: "js/template/mySudokuCell.html",
        link: function(scope, elem, attrs) {
            elem.bind('click', function() {
                console.log(scope.cellData);
            });
        }
    }
})
.directive('mySudokuBox', function() {
    return {
        scope: {
            boxData: "="
        },
        templateUrl: "js/template/mySudokuBox.html",

    }
})
.directive('mySudoku', function() {
    return {
        scope: {
            sudokuData: "="
        },
        templateUrl: "/js/template/mySudoku.html"
    };
});
