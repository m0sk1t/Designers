<section class="admin-panel" ng-style="{'background-image': 'url(img/' + video.bgimage + ')'}">
	<h5>Редактирование видео '{{video.headertext}}'</h5>
	<div>
		<a class="admin-button-delete" ng-click="del();" href="">Delete</a>
		<div>Фоновое изображение</div>
		<input accept="image/jpeg,image/jpg,image/png" type="file" nv-file-select="" uploader="picUpload">
		<button ng-click="picUpload.uploadAll(); loading = picUpload.isUploading;">Загрузить</button>
		<div>Фоновое видео</div>
		<input accept="video/webm" type="file" nv-file-select="" uploader="videoUpload">
		<button ng-click="videoUpload.uploadAll(); loading = videoUpload.isUploading;">Загрузить</button>
		<p>
			<video autoplay loop muted ng-if="video.bgvideo" class="video-preview">
				<source ng-src="{{'media/'+video.bgvideo}}" type="video/webm"></source>
			</video>
		</p>
		<div>Заголовок: </div>
		<input class="admin-text" ng-model="video.headertext" type="text">
		<div>Описание</div>
		<textarea class="admin-text" ng-model="video.descriptiontext" rows="10"></textarea>
		<a class="admin-button-new" ng-click="save();" href="">Сохранить</a>
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