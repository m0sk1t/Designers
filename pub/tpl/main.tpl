<article tabindex="1" style="background-position: {{(100/totalSections) * currentSection + '% 0'}}">
	<span id="left" ng-if="currentSection > 0" ng-click="turnSection(-1)">
		<img ng-src="{{currentSection<0? 'img/left.png': 'img/left-white.png'}}">
	</span>
	<span id="right" ng-if="currentSection < totalSections" ng-click="turnSection(1)">
		<img ng-src="{{currentSection<0? 'img/right.png': 'img/right-white.png'}}">
	</span>
	<section style="margin-left: {{'-' + currentSection + '00%'}}">
		<div class="list">
			<div class="header menu">
				<div class="logo-header">
					<a href="/">
						<img src="img/logo-white.png">
					</a>
				</div>
				<div class="nav">
					<ul>
						<li ng-click="turnSection(0)" class="active">О нас</li>
						<li ng-click="turnSection(3)">Наши работы</li>
						<li ng-click="turnSection(totalSections)">Контакты</li>
					</ul>
				</div>
			</div>
			<div class="content">
				<div class="logo-content"><img src="img/logo-content-white.png"></div>
				<h1>Что мы создаем?</h1>
				<div class="text">
					<div class="colomn">
						<h2>Корпоративные фильмы</h2>
						<p>Кино о бизнесе и для бизнеса.<br>Оно решает конкретные задачи -<br>рассказывает о компании, обучает,<br>налаживает контакты. Поэтому важно<br>не просто рассказать об успехах,<br>важно создать настроение. В основе<br>каждого фильма - авторский<br>сценарий.</p>
					</div>
					<div class="colomn">
						<h2>Рекламные ролики</h2>
						<p>Секунды, чтобы ненавязчиво<br>привлечь внимание, убедить,<br>создать положительный имидж.<br>Для достижения цели нужны<br>оригинальная концепция,<br>профессиональная сьемка,<br>монтаж и эффекты. Но главное -<br>рекламный ход, который мы<br>найдем специально для Вас.</p>
					</div>
					<div class="colomn">
						<h2>Другие фильмы</h2>
						<p>Мы творчески разрабатываем<br>действительность, а не просто<br>показываем жизнь, как есть.<br>Работаем в жанре документально-<br>художественное кино, создаем<br>телевизионные прокты, фильмы<br>о путешествиях, семейное кино.</p>
					</div>
				</div>
			</div>
			<div class="footer">
				<a ng-href="mailto:{{contact.mail}}">{{contact.mail}}</a><br>
				<a ng-href="tel:{{contact.phone}}">{{contact.phone}}</a>
			</div>
		</div>
	</section>
	
	<section>
		<div class="list">
			<div class="header menu">
				<div class="logo-header">
					<a href="/">
						<img src="img/logo-white.png">
					</a>
				</div>
				<div class="nav">
					<ul>
						<li class="active" ng-click="turnSection(0)">О нас</li>
						<li ng-click="turnSection(3)">Наши работы</li>
						<li ng-click="turnSection(totalSections)">Контакты</li>
					</ul>
				</div>
			</div>
			<div class="content">
				<h1>Кто мы?</h1>
				<div class="text">
					<p>Мы создаем фильмы, которые захватывают с первого кадра.<br>Мы ценим каждую секунду, знаем, как привлечь<br>внимание, остановить взгляд, врезаться в память.<br> Мы любим выхватывать мгновения у жизни,<br>чтобы рассказать о мире вокруг.</p>
				</div>
			</div>
			<div class="footer">
				<a ng-href="mailto:{{contact.mail}}">{{contact.mail}}</a><br>
				<a ng-href="tel:{{contact.phone}}">{{contact.phone}}</a>
			</div>
		</div>
	</section>
	
	<section>
		<div class="list">
			<div class="header menu">
				<div class="logo-header">
					<a href="/">
						<img src="img/logo-white.png">
					</a>
				</div>
				<div class="nav">
					<ul>
						<li class="active" ng-click="turnSection(0)">О нас</li>
						<li ng-click="turnSection(3)">Наши работы</li>
						<li ng-click="turnSection(totalSections)">Контакты</li>
					</ul>
				</div>
			</div>
			<div class="content">
				<div class="logo-content"></div>
				<h1>Как мы работаем?</h1>
				<div class="text">Мы стремимся передать свое видение мира, рассказать<br>истории интересных людей. Мы показываем красоту,<br>которая есть во всём. Нужно только посмотреть<br>с правильного ракурса.</div>
				<div class="text">Мы создаем ваш мир в картинках.</div>
			</div>
			<div class="footer">
				<a ng-href="mailto:{{contact.mail}}">{{contact.mail}}</a><br>
				<a ng-href="tel:{{contact.phone}}">{{contact.phone}}</a>
			</div>
		</div>
	</section>
	<section class="our-works" ng-repeat="v in video track by $index" ng-style="{'background-image': 'url(img/' + v.bgimage + ')'}">
		<iframe ng-init="v.display = false" ng-show="v.display" class="full-video" ng-src="{{includeVimeo(v.fullvideo)}}" width="100%" height="100%" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>
		<div class="video-off" ng-if="v.display" ng-click="v.display = false"></div>
		<video autoplay loop muted class="bgvideo" ng-if="$index+3 === currentSection">
			<source ng-src="{{'media/'+v.bgvideo}}" type="video/webm"></source>
		</video>
		<div class="list">
			<div class="header menu">
				<div class="logo-header">
					<a href="/">
						<img src="img/logo-white.png">
					</a>
				</div>
				<div class="nav">
					<ul>
						<li ng-click="turnSection(0)">О нас</li>
						<li class="active">Наши работы</li>
						<li ng-click="turnSection(totalSections)">Контакты</li>
					</ul>
				</div>
			</div>
			<div class="content">
			<pre class="pre-h1">{{v.headertext}}</pre>
			<pre class="text">
				{{v.descriptiontext}}
			</pre>
			<div class="play">
				<p ng-click="v.display = true">Смотреть ролик</p>
			</div>
		</div>
		<div class="footer">
				<a ng-href="mailto:{{contact.mail}}">{{contact.mail}}</a><br>
				<a ng-href="tel:{{contact.phone}}">{{contact.phone}}</a>
		</div>
	</div>
	</section>
	<section id="sec7" name="contact">
	<div class="list">
		<div class="header menu">
			<div class="logo-header">
				<a href="/">
					<img src="img/logo-white.png">
				</a>
			</div>
			<div class="nav">
				<ul>
					<li ng-click="turnSection(0)">О нас</li>
					<li ng-click="turnSection(3)">Наши работы</li>
					<li class="active">Контакты</li>
				</ul>
			</div>
		</div>
		<div class="content">
			<h1>Как с нами связаться</h1>
			<div class="text">
				<a ng-href="mailto:{{contact.mail}}">{{contact.mail}}</a><br>
				<a ng-href="tel:{{contact.phone}}">{{contact.phone}}</a><br>
				<a href="tel:+79050564937">+7 905 056-49-37</a><br>
				<a href="tel:+79209028177">+7 920 902-81-77</a><br>
			</div>
		</div>
		<div class="footer">
			<a ng-href="mailto:{{contact.mail}}">{{contact.mail}}</a><br>
			<a ng-href="tel:{{contact.phone}}">{{contact.phone}}</a>
		</div>
	</div>
	</section>
</article>