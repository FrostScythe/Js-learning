var myNinjaApp = angular.module('myApp', []);

myNinjaApp.config(function(){

});

myNinjaApp.run(function(){

});

myNinjaApp.controller("NinjaController", function($scope){
    $scope.favMeal = ['Pizza', 'Burger', 'Pasta'];
    $scope.numbers = [1,2,3,4];
    $scope.color = 'orange';
});