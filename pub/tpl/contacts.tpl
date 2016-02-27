<section class="admin-panel">
	<form ng-submit="save()">
		<input class="admin-text" ng-model="contact.mail" type="mail" placeholder="Mail">
		<input class="admin-text" ng-model="contact.phone" type="phone" placeholder="Phone">
		<p></p>
		<input type="submit" value="Сохранить">
	</form>
</section>