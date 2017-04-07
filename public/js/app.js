'use strict';

var app = angular.module('sudokuApp', []);
app.directive('mySudoku', function() {
    return {
        templateUrl: "/js/template/mySudoku.html"
    };
});