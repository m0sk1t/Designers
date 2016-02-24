(function() {
	var app = angular.module('designers', []);
	app.controller('MainCtrl', function($sce, $scope, Video) {
		$scope.video = Video.get();
		$scope.totalSections = 4 + $scope.video.length;
		$scope.currentSection = 0;
		$scope.includeVimeo = function(id) {
			return $sce.trustAsResourceUrl("https://player.vimeo.com/video/" + id + "?title=0&byline=0&portrait=0");
		};
		$scope.htmlize = function(txt) {
			return $sce.trustAsHtml(txt);
		}
		$scope.turnSection = function(dir) {
			if (dir > 1) {
				$scope.currentSection = dir;
			} else {
				$scope.currentSection += dir;
			}
		};
		/*		Video.get().then(function(res) {
			$scope.video = res.data;
		}, function(res) {
			console.error(res.data);
		});
*/
	}).factory('Video', function($http) {
		return {
			get: function() {
				return [{
					bgimage: 'work-1.jpg',
					bgvideo: 'work-1.webm',
					fullvideo: '151870669',
					headertext: 'Презентационный фильм "Красная Пахра"',
					descriptiontext: '\r\nВ презентационном фильме о курорте "Красная Пахра"\r\nмы хотели передать основную идею:\r\nкурорт "Красная Пахра" - это то место,\r\nгде стоит остановиться и позволить себе отдохнуть!'
				}, {
					bgimage: 'work-2.jpg',
					bgvideo: 'work-2.webm',
					fullvideo: '151873562',
					headertext: 'Имиджевый ролик "Мелагро"',
					descriptiontext: '\r\nИмиджевый ролик для  крупнейшего  производителя\r\nкартофеля во Владимирской области - компании "Мелагро"'
				}, {
					bgimage: 'work-3.jpg',
					bgvideo: 'work-3.webm',
					fullvideo: '151875705',
					headertext: 'Презентационный фильм "Мелагро"',
					descriptiontext: '\r\nМы сняли фильм о людях, которые любят свое дело.\r\nОни начинают работу раньше восхода солнца.\r\nЗаканчивают при свете луны. Но помимо трудностей,\r\nработа на земле дает такую энергию,\r\nкоторую больше нигде не найти.\r\nЭти люди знают цену настоящему и умеют его создавать. '
				}, {
					bgimage: 'work-4.jpg',
					bgvideo: 'work-4.webm',
					fullvideo: '151812202',
					headertext: '"Вознесенская слобода".\r\n Ваша история начинается здесь',
					descriptiontext: '\r\nАтмосфера "Вознесенской слободы"  вдохновляет на то,\r\nчтобы здесь начинались самые\r\nнеобыкновенные и  трогательные истории.'
				}];
			}
		}
		/*		return {
			get: function() {
				return $http.get('/video');
			}
		}
*/
	});
})();