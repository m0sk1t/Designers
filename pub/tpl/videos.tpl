<section class="admin-panel">
	<a class="admin-button-new" ng-click="create();" href="">Create new</a>
	<a class="admin-button" ng-repeat="v in video" ng-href="#/video/{{v._id}}">{{v.headertext}}</a>
</section>