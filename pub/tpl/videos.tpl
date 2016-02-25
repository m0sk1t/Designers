<section class="admin-panel">
	<a class="admin-button-new" ng-click="create();">Create new</a>
	<a class="admin-button" ng-repeat="v in videos" ng-href="#/video/{{v._id}}">{{v.headertext}}</a>
</section>