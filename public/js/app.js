'use strict';

var app = angular.module('sudokuApp', []);
app
.directive('mySudokubox', function() {
    return {
        terminal: true,
        priority: 10,
        templateUrl: "js/template/mySudokuBox.html"
    }
})
.directive('mySudoku', function() {
    return {
        require: 'mySudokubox',
        transclude: true,
        templateUrl: "/js/template/mySudoku.html",
        controller: function($scope) {
            $scope.data = [
                [1, 2, 3],
                [4, 5, 6],
                [7, 8, 9]
            ]
        }
    };
});
