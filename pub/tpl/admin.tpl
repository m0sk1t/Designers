<section ng-if="user.admin" class="admin-panel">
	<a class="admin-button" href="#/videos">Редактировать видео</a>
	<a class="admin-button" href="#/contacts">Редактировать контактную информацию</a>
</section>
<section ng-if="!user.admin" class="admin-panel">
	<h3>Please enter your credentials!</h3>
	<input type="text" placeholder="login" ng-model="credentials.login"></input>
	<input type="password" placeholder="password" ng-model="credentials.password"></input>
	<input type="submit" ng-submit="login()"></input>
</section>