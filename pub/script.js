(function() {
	var app = angular.module('Designers', ['ngRoute', 'angularFileUpload']);
	app.config(function($routeProvider, $locationProvider) {
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
	}).controller('MainCtrl', function($sce, $scope, Video, Contact) {
		var keys = {
			left: 37,
			right: 39,
		};
		$scope.video = [];
		$scope.contact = {};
		$scope.totalSections = 0;
		$scope.currentSection = 0;
		$scope.keyTurn = function($event) {
			if (!$event) { return; }
			$event.keyCode === keys.left && $scope.turnSection(-1);
			$event.keyCode === keys.right && $scope.turnSection(1);
		};
		$scope.includeVimeo = function(id) {
			$scope.vimeo = $sce.trustAsResourceUrl("https://player.vimeo.com/video/" + id + "?title=0&byline=0&portrait=0");
		};
		$scope.removeVimeo = function(id) {
			$scope.vimeo = '';
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
		Contact.get().then(function(res) {
			$scope.contact = res.data[0];
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
	}).controller('VideoCtrl', function($scope, $location, $routeParams, Video, FileUploader) {
		$scope.user = localStorage.user ? JSON.parse(localStorage.user) : {};
		!$scope.user && $location.path('/');
		$scope.loading = false;
		$scope.video = {};
		$scope.load = function() {
			Video.get($routeParams._id).then(function(res) {
				$scope.video = res.data;
			}, function(res) {
				console.error(res.data);
			});
		};
		$scope.picUpload = new FileUploader({
			removeAfterUpload: true,
			url: "/bgpic/" + $scope.user.hash + '/' + $routeParams._id
		});
		$scope.videoUpload = new FileUploader({
			removeAfterUpload: true,
			url: "/bgvideo/" + $scope.user.hash + '/' + $routeParams._id
		});
		$scope.save = function() {
			$scope.video.hash = $scope.user.hash;
			Video.set($routeParams._id, $scope.video).then(function(res) {
				swal('OK!', 'Изменения сохранены!');
				console.log(res.data);
			}, function(res) {
				console.error(res.data);
			});
		};
		$scope.del = function() {
			Video.del({
				hash: $scope.user.hash,
				_id: $routeParams._id
			}).then(function(res) {
				$location.path('/videos');
			}, function(res) {
				console.error(res.data);
			});
		};
		$scope.picUpload.onCompleteItem = function(fileItem, response, status, headers) {
			$scope.load();
			$scope.loading = false;
			swal('OK!', 'Фоновое изображение успешно загружено!');
			console.log(fileItem, response, status, headers);
		};
		$scope.videoUpload.onCompleteItem = function(fileItem, response, status, headers) {
			$scope.load();
			$scope.loading = false;
			swal('OK!', 'Фоновое видео успешно загружено!');
			console.log(fileItem, response, status, headers);
		};
		$scope.load();
	}).controller('VideosCtrl', function($scope, $location, Video) {
		$scope.user = localStorage.user ? JSON.parse(localStorage.user) : {};
		!$scope.user && $location.path('/');
		$scope.videos = [];
		$scope.create = function() {
			Video.add($scope.user).then(function(res) {
				$location.path('/video/' + res.data._id);
			}, function(res) {
				console.error(res.data);
			});
		};
		Video.get().then(function(res) {
			$scope.video = res.data;
		}, function(res) {
			console.error(res.data);
		});
	}).controller('ContactsCtrl', function($scope, Contact) {
		$scope.user = localStorage.user ? JSON.parse(localStorage.user) : {};
		!$scope.user && $location.path('/');
		$scope.contact = {};
		$scope.load = function() {
			Contact.get().then(function(res) {
				$scope.contact = res.data[0];
			}, function(res) {
				console.error(res.data);
			});
		};
		$scope.save = function() {
			$scope.contact.hash = $scope.user.hash;
			Contact.set($scope.contact).then(function(res) {
				swal('OK!', 'Изменения сохранены!');
			}, function(res) {
				console.error(res.data);
			});
		};
		$scope.load();
	}).factory('Video', function($http) {
		return {
			get: function(id) {
				return $http.get('/video/' + (id ? id : 'all'));
			},
			add: function(data) {
				return $http.post('/video/new', data);
			},
			set: function(id, data) {
				return $http.put('/video/' + id, data);
			},
			del: function(data) {
				return $http.patch('/video/' + data._id, data);
			}
		}
	}).factory('Contact', function($http) {
		return {
			get: function() {
				return $http.get('/contact');
			},
			set: function(data) {
				return $http.put('/contact', data);
			}
		}
	});
})();