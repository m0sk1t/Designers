<section class="admin-panel" ng-style="{'background-image': 'url(img/' + video.bgimage + ')'}">
	<div>
		<ul class="admin-list">
			<li>
				<a class="admin-button-delete" ng-click="del();" href="">Delete</a>
			</li>
			<li>
				<div>Фоновое изображение</div>
				<input accept="image/jpeg,image/jpg,image/png" type="file" nv-file-select="" uploader="picUpload">
				<button ng-click="picUpload.uploadAll(); loading = picUpload.isUploading;">Загрузить</button>
			</li>
			<li>
				<div>Фоновое видео</div>
				<input accept="video/webm" type="file" nv-file-select="" uploader="videoUpload">
				<button ng-click="videoUpload.uploadAll(); loading = videoUpload.isUploading;">Загрузить</button>
				<p>
					<video autoplay loop muted ng-if="video.bgvideo" class="video-preview">
						<source ng-src="{{'media/'+video.bgvideo}}" type="video/webm"></source>
					</video>
				</p>
			</li>
			<li>
				<div>Vimeo ID: </div>
				<input class="admin-text" ng-model="video.fullvideo" type="text">
			</li>
			<li>
				<div>Заголовок: </div>
				<input class="admin-text" ng-model="video.headertext" type="text">
			</li>
			<li>
				<div>Описание</div>
				<textarea class="admin-text" ng-model="video.descriptiontext" rows="10"></textarea>
			</li>
			<li>
				<a class="admin-button-new" ng-click="save();" href="">Сохранить</a>
			</li>
			<li></li>
		</ul>
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