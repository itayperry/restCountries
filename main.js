getAllCountries();

$('form').submit(function(e) {
	e.preventDefault();
	var searchItem = $(e.target).find('input[type=search]').val();
	console.log(searchItem)
	filterCountries(searchItem);
});

$('button').click(getAllCountries)

function getAllCountries () {
	$('#countries-retreived').empty();
	$.get('https://restcountries.eu/rest/v2/all', function(data) {
		console.log(data);
		data.forEach(singleCountry => {
			var singleCountryInfo = getCountryInfo(singleCountry);
			createOneCountry(singleCountryInfo.name, singleCountryInfo.domain, singleCountryInfo.capital, singleCountryInfo.imageUrl, singleCountryInfo.currenciesString);
		})
	});
}

function getCountryInfo(singleCountry) {
	var currencies = singleCountry.currencies;
	var currenciesString = "";
	currencies.forEach(singleCurrency => {
		currenciesString += " " + singleCurrency.code + " " + singleCurrency.name + " " + singleCurrency.symbol;
	})
    var singleCountryInfo = {
		name: singleCountry.name,
		domain: singleCountry.topLevelDomain,
		capital: singleCountry.capital,
		imageUrl: singleCountry.flag,
		currenciesString: currenciesString
	}; 
	return singleCountryInfo;
}

function createOneCountry(name, domain, capital, imageUrl, currenciesString) {
	
	var section = $('<section>');
	section.appendTo('#countries-retreived')

	var imageDiv = $('<div>');
	var image = $('<img>', {
		src: imageUrl,
		width: "11rem"
	});
	console.log(image);
	image.appendTo(imageDiv);
	imageDiv.appendTo(section);

	var infoDiv = $('<div>', {
		class: "country-info", 
	});
	infoDiv.appendTo(section);;
	$('<span>', {
		text: 'Name: ' + name
	}).appendTo(infoDiv);
	$('<span>', {
		text: 'Top Level Domain: ' + domain
	}).appendTo(infoDiv);
	$('<span>', {
		text: 'Capital: ' + capital
	}).appendTo(infoDiv);
	$('<span>', {
		text: 'Currencies: ' + currenciesString
	}).appendTo(infoDiv);
}

function filterCountries(searchItem) {
	$('#countries-retreived').empty();
	$.get('https://restcountries.eu/rest/v2/all', function(data) {
		data.forEach(singleCountry => {
			var name = singleCountry.name;
			if (name.toLowerCase().includes(searchItem.toLowerCase())) {
				var singleCountryInfo = getCountryInfo(singleCountry);
				createOneCountry(singleCountryInfo.name, singleCountryInfo.domain, singleCountryInfo.capital, singleCountryInfo.imageUrl, singleCountryInfo.currenciesString);
			}
		})
	});
}
