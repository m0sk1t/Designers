(function() {
	var app = angular.module('Designers', ['ngRoute']);
	app.config(function($routeProvider, $locationProvider) {
		//		$locationProvider.hashPrefix('!');
		$routeProvider.when('/', {
			templateUrl: 'tpl/main.tpl',
			controller: 'MainCtrl'
		}).when('/admin', {
			templateUrl: 'tpl/admin.tpl',
			controller: 'AdminCtrl'
		}).when('/video/:_id', {
			templateUrl: 'tpl/video.tpl',
			controller: 'VideoCtrl'
		}).when('/videos', {
			templateUrl: 'tpl/videos.tpl',
			controller: 'VideosCtrl'
		}).when('/contacts', {
			templateUrl: 'tpl/contacts.tpl',
			controller: 'ContactsCtrl'
		}).otherwise({
			redirectTo: '/',
			controller: 'MainCtrl'
		});
	}).controller('MainCtrl', function($sce, $scope, Video) {
		$scope.video = [];
		$scope.totalSections = 0;
		$scope.currentSection = 0;
		$scope.keyTurn = function($event) {
			var keys = {
				left: 37,
				right: 39,
			};
			if (!$event) {
				return;
			}
			$event.keyCode === keys.left && $scope.turnSection(-1);
			$event.keyCode === keys.right && $scope.turnSection(1);
		};
		$scope.includeVimeo = function(id) {
			return $sce.trustAsResourceUrl("https://player.vimeo.com/video/" + id + "?title=0&byline=0&portrait=0");
		};
		$scope.turnSection = function(dir) {
			if (dir > 1 || dir === 0) {
				$scope.currentSection = dir;
			} else {
				if ((dir === -1 && $scope.currentSection === 0) || (dir === 1 && $scope.currentSection === $scope.totalSections)) {
					return;
				}
				$scope.currentSection += dir;
			}
		};
		Video.get().then(function(res) {
			$scope.video = res.data;
			$scope.totalSections = 3 + $scope.video.length;
		}, function(res) {
			console.error(res.data);
		});
	}).controller('AdminCtrl', function($http, $scope, Video) {
		$scope.credentials = {
			login: '',
			password: ''
		}
		$scope.user = localStorage.user ? JSON.parse(localStorage.user) : {};
		$scope.login = function() {
			$http.post('/login', $scope.credentials).then(function(res) {
				$scope.user = res.data;
				localStorage.user = JSON.stringify(res.data);
			}, function(res) {
				alert('Wrong credentials!');
			});
		};
	}).controller('VideoCtrl', function($scope, $routeParams, Video) {
		$scope.video = [];
		Video.get($routeParams._id).then(function(res) {
			$scope.video = res.data;
		}, function(res) {
			console.error(res.data);
		});
	}).controller('VideosCtrl', function($scope, Video) {
		$scope.videos = [];
		Video.get().then(function(res) {
			$scope.video = res.data;
		}, function(res) {
			console.error(res.data);
		});
	}).controller('ContactsCtrl', function($scope, Video) {
		var a = {};
	}).factory('Video', function($http) {
		return {
			get: function(id) {
				return $http.get('/video/' + (id? id: 'all'));
			}
		}
	});
})();