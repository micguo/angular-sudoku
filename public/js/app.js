'use strict';

var app = angular.module('sudokuApp', []);
app.controller('MainCtrl', function($scope) {
    $scope.sodukuData = [
        [
            [
                [1,2,3],
                [4,5,6],
                [7,8,9]
            ],
            [
                [1,2,3],
                [4,5,6],
                [7,8,9]
            ],
            [
                [1,2,3],
                [4,5,6],
                [7,8,9]
            ]
        ],
        [
            [
                [1,2,3],
                [4,5,6],
                [7,8,9]
            ],
            [
                [1,2,3],
                [4,5,6],
                [7,8,9]
            ],
            [
                [1,2,3],
                [4,5,6],
                [7,8,9]
            ]
        ],
        [
            [
                [1,2,3],
                [4,5,6],
                [7,8,9]
            ],
            [
                [1,2,3],
                [4,5,6],
                [7,8,9]
            ],
            [
                [1,2,3],
                [4,5,6],
                [7,8,9]
            ]
        ]
    ];
    $scope.data = 'haha';
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
        templateUrl: "js/template/mySudokuBox.html",
        link: function(scope, elem, attrs) {
            elem.bind('click', function() {
                console.log(scope);
            });
        }
    }
})
.directive('mySudoku', function() {
    return {
        templateUrl: "/js/template/mySudoku.html"
    };
});
