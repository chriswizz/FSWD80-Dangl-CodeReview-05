var products = JSON.parse(data);

// strings generated from imdb.com/plugins
var ratingSpans = [
	'<span class="imdbRatingPlugin" data-user="ur108687636" data-title="tt2356777" data-style="p2"><a href="https://www.imdb.com/title/tt2356777/?ref_=plg_rt_1"><img src="https://ia.media-imdb.com/images/G/01/imdb/plugins/rating/images/imdb_38x18.png" alt=" True Detective (2014) on IMDb" /></a></span><script>(function(d,s,id){var js,stags=d.getElementsByTagName(s)[0];if(d.getElementById(id)){return;}js=d.createElement(s);js.id=id;js.src="https://ia.media-imdb.com/images/G/01/imdb/plugins/rating/js/rating.js";stags.parentNode.insertBefore(js,stags);})(document,"script","imdb-rating-api");</script>',
	'<span class="imdbRatingPlugin" data-user="ur108687636" data-title="tt2294189" data-style="p2"><a href="https://www.imdb.com/title/tt2294189/?ref_=plg_rt_1"><img src="https://ia.media-imdb.com/images/G/01/imdb/plugins/rating/images/imdb_38x18.png" alt=" The Fall (2013) on IMDb" /></a></span><script>(function(d,s,id){var js,stags=d.getElementsByTagName(s)[0];if(d.getElementById(id)){return;}js=d.createElement(s);js.id=id;js.src="https://ia.media-imdb.com/images/G/01/imdb/plugins/rating/js/rating.js";stags.parentNode.insertBefore(js,stags);})(document,"script","imdb-rating-api");</script>',
	'<span class="imdbRatingPlugin" data-user="ur108687636" data-title="tt1637727" data-style="p2"><a href="https://www.imdb.com/title/tt1637727/?ref_=plg_rt_1"><img src="https://ia.media-imdb.com/images/G/01/imdb/plugins/rating/images/imdb_38x18.png" alt=" The Killing (2011) on IMDb" /></a></span><script>(function(d,s,id){var js,stags=d.getElementsByTagName(s)[0];if(d.getElementById(id)){return;}js=d.createElement(s);js.id=id;js.src="https://ia.media-imdb.com/images/G/01/imdb/plugins/rating/js/rating.js";stags.parentNode.insertBefore(js,stags);})(document,"script","imdb-rating-api");</script>',
	'<span class="imdbRatingPlugin" data-user="ur108687636" data-title="tt1474684" data-style="p2"><a href="https://www.imdb.com/title/tt1474684/?ref_=plg_rt_1"><img src="https://ia.media-imdb.com/images/G/01/imdb/plugins/rating/images/imdb_38x18.png" alt=" Luther (2010) on IMDb" /></a></span><script>(function(d,s,id){var js,stags=d.getElementsByTagName(s)[0];if(d.getElementById(id)){return;}js=d.createElement(s);js.id=id;js.src="https://ia.media-imdb.com/images/G/01/imdb/plugins/rating/js/rating.js";stags.parentNode.insertBefore(js,stags);})(document,"script","imdb-rating-api");</script>',
	'<span class="imdbRatingPlugin" data-user="ur108687636" data-title="tt5290382" data-style="p2"><a href="https://www.imdb.com/title/tt5290382/?ref_=plg_rt_1"><img src="https://ia.media-imdb.com/images/G/01/imdb/plugins/rating/images/imdb_38x18.png" alt=" Mindhunter (2017) on IMDb" /></a></span><script>(function(d,s,id){var js,stags=d.getElementsByTagName(s)[0];if(d.getElementById(id)){return;}js=d.createElement(s);js.id=id;js.src="https://ia.media-imdb.com/images/G/01/imdb/plugins/rating/js/rating.js";stags.parentNode.insertBefore(js,stags);})(document,"script","imdb-rating-api");</script>',
	'<span class="imdbRatingPlugin" data-user="ur108687636" data-title="tt2741602" data-style="p2"><a href="https://www.imdb.com/title/tt2741602/?ref_=plg_rt_1"><img src="https://ia.media-imdb.com/images/G/01/imdb/plugins/rating/images/imdb_38x18.png" alt=" The Blacklist (2013) on IMDb" /></a></span><script>(function(d,s,id){var js,stags=d.getElementsByTagName(s)[0];if(d.getElementById(id)){return;}js=d.createElement(s);js.id=id;js.src="https://ia.media-imdb.com/images/G/01/imdb/plugins/rating/js/rating.js";stags.parentNode.insertBefore(js,stags);})(document,"script","imdb-rating-api");</script>',
];

// slice description
var i;
var p;
var maxStringLength = 200;
for(i = 0; i < products.length; i++) {
	p = products[i];
	if (p.description.length > maxStringLength) {
		p.description = p.description.slice(1, maxStringLength) + "...";
	}
}

// add imdb rating to products (sorting of ratingSpans does not matter)
var j;
var imdbRating;
for(i = 0; i < products.length; i++) {
	for (j = 0; j < ratingSpans.length; j++) {
		if (ratingSpans[j].includes(products[i].name) === true) {
			products[i].imdbRating = ratingSpans[j];	
		}
	}
}
console.log(products);

$(document).ready(function() {
	function createItems() {
		$("#containerItems").html("");
		for (i = 0; i < products.length; i++) {
			$("#containerItems").append(`

			<!-- item -->
			<!-- background frame parent -->
			<div class="col-lg-6 p-4">
				<!-- background item -->
				<div class="row no-gutters p-2 bg-black">
					<!-- item left part img -->
					<div class="wrapper-image col-4 embed-responsive embed-responsive-29by42 rounded border border-secondary">
						<img class="embed-responsive-item" src="${products[i].img}" alt="image of crime series ${products[i].name}">
					</div>
					<!-- item right part text-->
					<div class="wrapper-text col-8 d-flex flex-column px-3">
						<div class="card-title h3 m-0">${products[i].name}</div>

						<div class="card-text mb-1">${products[i].date}</div>
						<div class="card-text">${products[i].description}</div>

						<div class="wrapper-imdb-like d-flex flex-grow-1 justify-content-between align-items-end">
							<div>${products[i].imdbRating}</div>

							<div class="wrapper-like d-flex flex-column flex-sm-row align-items-center">		
								<button type="button" id="btn-like-${products[i].id}" class="btn d-flex align-items-center mx-2 mb-2 mb-sm-0 bg-success">Like&nbsp;<img class="scale" src="img/like-outline.png" alt=""></button>

								<div id="count-likes-${products[i].id}" class="count-likes d-flex justify-content-center align-items-center rounded-circle bg-success text-black">${products[i].likeCounts}</div>
							</div>
						</div>
					</div>
				</div>
			</div>

			`);
		}

		// increase count of likes
		$(".btn").on("click", function() {
			for (var i = 0; i < products.length; i++) {
				if ( `btn-like-${products[i].id}` == $(this).attr("id") ) {
					products[i].likeCounts += 1;
				}
				$(`#count-likes-${products[i].id}`).text(products[i].likeCounts);
			}
		});
	}

	createItems();

	// sort items
	$("#selectSort").on("click", function() {
		var select = $(this).val()
		products.sort(function(a, b) {
			switch(select) {
				case "id":
					return a[select] - b[select];
				case "name":
					if (a[select] < b[select]) {
    					return -1;
  					} else if (a[select] > b[select]) {
  						return 1;
					}
				case "likeCounts":
					return b[select] - a[select];
			}
		});
		createItems();
		console.log(`sorting by ${select}:`);
		console.log(products);
	});
});