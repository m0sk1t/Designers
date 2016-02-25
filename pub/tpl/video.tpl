<section class="admin-panel">
<h5>Редактирование видео '{{video.headertext}}'</h5>
<div>
    <form ng-submit="save();">
        <a class="admin-button-delete" ng-click="delete();">Delete</a>
        <div>
            <div>Заголовок: </div>
            <input class="admin-text" ng-model="video.headertext" type="text">
        </div>
        <div>Описание</div>
        <textarea class="admin-text" ng-model="video.descriptiontext" rows="10"></textarea>
        <a class="admin-button" ng-click="save();">Save</a>
    </form>
</div>

<div class="loader" ng-show="loading">
	<div class="cssload-loader-inner">
		<div class="cssload-cssload-loader-line-wrap-wrap">
			<div class="cssload-loader-line-wrap"></div>
		</div>
		<div class="cssload-cssload-loader-line-wrap-wrap">
			<div class="cssload-loader-line-wrap"></div>
		</div>
		<div class="cssload-cssload-loader-line-wrap-wrap">
			<div class="cssload-loader-line-wrap"></div>
		</div>
		<div class="cssload-cssload-loader-line-wrap-wrap">
			<div class="cssload-loader-line-wrap"></div>
		</div>
		<div class="cssload-cssload-loader-line-wrap-wrap">
			<div class="cssload-loader-line-wrap"></div>
		</div>
	</div>
</div>
</section>