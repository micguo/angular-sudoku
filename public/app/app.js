'use strict';

var app = angular.module('sudokuApp', []);
app.controller('MainCtrl', function($scope, SudokuCal) {
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
    $scope.sudokuQuestion = SudokuCal.initQuestion(sudokuQuestionArray);
    $scope.sudokuResult = SudokuCal.getEmptyBoard($scope.sudokuQuestion);
    $scope.calculate = function() {
        $scope.sudokuResult = SudokuCal.getEmptyBoard($scope.sudokuQuestion);
        $scope.sudokuResult = SudokuCal.cal($scope.sudokuQuestion);
    }
})
// This directive is partially copied from http://stackoverflow.com/questions/19894429/converting-angular-ng-model-to-integer-when-writing-to-firebase
.directive('castToInteger', function () {
    return {
        restrict: 'A',
        require: 'ngModel',
        link: function(scope, element, attrs, ngModel) {
            ngModel.$formatters.push(function(val){
                if (val === 0) {
                    return '';
                } else {
                    return val;
                }
            });
            ngModel.$parsers.unshift(function(value) {
                if (value === '') {
                    return 0;
                }
                return parseInt(value, 10);
            });
        }
    };
})
.directive('mySudokuCell', function() {
    return {
        scope: {
            cellData: "=",
            cellEditable: "="
        },
        templateUrl: "/app/template/mySudokuCell.html",
        link: function(scope, elem, attr) {
            elem.click(function(){
                console.log(scope.cellData);
            });
        }
    }
})
.directive('mySudokuBox', function() {
    return {
        scope: {
            boxData: "=",
            cellEditable: "="
        },
        templateUrl: "/app/template/mySudokuBox.html"
    }
})
.directive('mySudokuBoard', function() {
    return {
        scope: {
            headingText: "@",
            sudokuData: "=",
            cellEditable: "="
        },
        templateUrl: "/app/template/mySudokuBoard.html",
        controller: function ($scope, SudokuCal) {
            $scope.clear = function() {
                $scope.sudokuData = SudokuCal.getEmptyBoard($scope.sudokuData);
                console.log($scope.sudokuData);
            }
        }
    };
});
