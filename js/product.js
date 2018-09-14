
var ProductData = {
	
	catalogue: null,
	
	save: function(data) {
		ProductData.catalogue = data;
	},
	
	displayErrorMessage: function() {
		$('body').attr('id', 'error').find('#beer-listings').append('<h2>Oops, looks like we\'ve had one too many beers!</p><p><a href="#">Checkout out our new beers</a> whilst we get to the bottom of this problem.</p>');
	},
	
	retrieveProductsIfAvailable: function(success) {
	
		var request = new XMLHttpRequest();
		request.open('GET', 'http://demo8465751.mockable.io/products', true);
		
		request.onload = function() {
						
			if(request.status >= 200 && request.status < 400) {
				var data = JSON.parse(this.response);
				success(data);
			} else {
				ProductData.displayErrorMessage();
				// Here I would fire a GA event to track that the error was shown and include the URL and status code
			}
		}
		request.send();	
	}
};


var ProductListing = {
	
	addItemsToPage: function() {
	
		for(var i = 0; i < ProductData.catalogue.length; i++) {
			
			var currentItem = ProductData.catalogue[i];
			var image = "<img src=" + currentItem.image_url + " alt=\"" + currentItem.beer + "\">";
			var beerName = "<h3>" + currentItem.beer + ' ' + currentItem.size +  "</h3>";
			var price = "<span class=\"price\">" + currentItem.price + "</span>"
			var reviews = "<div>Not rated yet</div>";
			
			if(currentItem.average_review_rating_0_to_5 != 0) {
				reviews = "<div>Rated " + currentItem.average_review_rating_0_to_5 + "/5</div>";
			}
			
			$('#beer-listings').append("<div>" + image + beerName + "<div>" + price + "</div>" + reviews + "</div>");
		}
	},
	
	hideItemsWithBrokenImages: function() {
		$("img").error(function(){
			$(this).parent('div').hide();
		});		
	},
	
	itemQualityAssurance: function() {
		ProductListing.hideItemsWithBrokenImages();
	}
};


ProductData.retrieveProductsIfAvailable(function(data) {
	ProductData.save(data);
	ProductListing.addItemsToPage();
	ProductListing.itemQualityAssurance();
});




