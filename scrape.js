const puppeteer = require("puppeteer");

const CAR_INFO = require("./constants");

let getUrl = (page) => {
	let base = "https://www.polovniautomobili.com/auto-oglasi/pretraga?";
	let pageQuery = "";
	if (page > 1) {
		return `${base}page=${page}&sort=basic&fuel%5B0%5D=2312&fuel%5B1%5D=2308&city_distance=0&showOldNew=all&without_price=1`;
	}
	return `https://www.polovniautomobili.com/auto-oglasi/pretraga?${pageQuery}brand=mazda&sort=basic&model%5B0%5D=3&price_from=5000&year_from=2010&year_to=2017&fuel%5B0%5D=45&door_num=3013&without_price=1&showOldNew=all`;
};

const ADS_PER_PAGE = 25;

const getCars = async () => {
	let url = getUrl();
	const browser = await puppeteer.launch({ headless: true });
	const page = await browser.newPage();
	page.on("console", (consoleObj) => console.log(consoleObj.text()));
	await page.goto(url);

	const results = await numberOfAds(page);
	const adsNumber = parseInt(results[0]);

	let pageNumber = 1;
	let totalnumberOfPages = Math.ceil(adsNumber / ADS_PER_PAGE);
	let allAds = [];

	while (pageNumber <= totalnumberOfPages) {
		await page.goto(getUrl(pageNumber));

		const ads = await page.$$eval(
			"article:not(.uk-hidden)",
			(elements, { CAR_INFO }) =>
				elements.map((el) => {
					const divs = el.querySelectorAll(".bottom, .top");
					let singleDiv = {};

					singleDiv["name"] = el
						.querySelector(".textContent h2 a")
						.innerHTML.replace(/\n|\t/g, "");

					singleDiv["price"] = el.getAttribute("data-price");

					divs.forEach((div, index) => {
						singleDiv[CAR_INFO[index]] = div.innerHTML
							.split("</i>")
							.pop()
							.trim()
							.replace(/\n|\t/g, "");
					});

					return singleDiv;
				}),
			{ CAR_INFO }
		);

		allAds = [...allAds, ...ads];
		pageNumber++;
	}

	const newCars = allAds.map((car) => processCarObject(car));

	console.log(sortArray(newCars, "price"));

	browser.close();
};

const numberOfAds = (page) =>
	page
		.$$eval("small", (priceString) =>
			priceString.map((el) => {
				const strings = el.innerHTML.split(" ");
				if (strings.length === 9) return strings[strings.length - 1];
			})
		)
		.then((el) => el.filter((el) => el));

getCars();

const processCarObject = (car) => ({
	...car,
	price: formatWithoutUnit(car.price),
	mileage: formatWithoutUnit(car.mileage),
	year: formatWithoutUnit(car.year),
});

const formatWithoutUnit = (amount) =>
	parseInt(amount.split(" ")[0].replace(".", ""));

const sortArray = (arr, by) =>
	arr.sort((a, b) => (a[by] > b[by] ? 1 : a[by] === b[by] ? 0 : -1));
