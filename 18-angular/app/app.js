var myNinjaApp = angular.module('myApp', ['ngRoute']);

myNinjaApp.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
    // Angular 1.6+ defaults to '#!/'; keep clean '#/' links working
    $locationProvider.html5Mode(true).hashPrefix('');
    $routeProvider
        .when('/', {
            templateUrl: 'views/home.html'
        })
        .when('/directory', {
            templateUrl: 'views/directory.html',
            controller: 'NinjaController'
        })
        .when('/about', {
            templateUrl: 'views/about.html'
        })
        .when('/contact', {
            templateUrl: 'views/contact.html',
            controller: 'ContactController'
        })
        .when('/contact-success', {
            templateUrl: 'views/contact-success.html',
            controller: 'ContactController'
        })
        // .when('/contact',{
        //     templateUrl: 'views/contactForm.html'
        // })
        .otherwise({
            redirectTo: '/'
        });
}]);
// myNinjaApp.run(function () {});

myNinjaApp.controller("NinjaController", ['$scope', '$http',function ($scope, $http) {
    $scope.remove = function (meal) {
        var removeMeal = $scope.favMeal.indexOf(meal);
        $scope.favMeal.splice(removeMeal, 1);//removes the meal from the array
    }

    // $scope.favMeal = [
    //     { 'name': 'Pizza', 'rating': 5, 'price': 160, available: true ,thumb:"content/img/pizza.png"},
    //     { 'name': 'Burger', 'rating': 4, 'price': 80, available: true ,thumb:"content/img/burger.png"},
    //     { 'name': 'Pasta', 'rating': 3, 'price': 120, available: false ,thumb:"content/img/pasta.png"},
    //     { 'name': 'Salad', 'rating': 2, 'price': 60, available: true ,thumb:"content/img/salad.png" },
    //     { 'name': 'Sushi', 'rating': 5, 'price': 200, available: false ,thumb:"content/img/sushi.png"},
    //     { 'name': 'Ice Cream', 'rating': 4, 'price': 50, available: true ,thumb:"content/img/ice-cream.png"}
    // ];
    $scope.numbers = [1, 2, 3, 4];
    $scope.color = 'orange';
    $scope.ratings = [5, 4, 3, 2];

    $scope.getStars = function (rating) {
        return '⭐'.repeat(rating);
    };

    $scope.newMeal = {};


    $scope.addMeal = function () {
        $scope.favMeal.push({
            name: $scope.newMeal.name,
            price: Number($scope.newMeal.price),
            available: true,
            rating: Number($scope.newMeal.rating)
        });

        $scope.newMeal = {};
    };

    $http.get('data/favMeal.json').then(function (response) {
        $scope.favMeal = response.data;
    }, function (error) {
        console.error('Error fetching meals:', error);
    });
}]);



myNinjaApp.controller('ContactController', ['$scope', '$location', function ($scope, $location) {
    // $scope.contact = {};
    $scope.sendMessage = function () {
        // Implementation for sending message
        $location.path('/contact-success');
    };
}]);