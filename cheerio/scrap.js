const argv = require('minimist')(process.argv.slice(2));
const cheerio = require('cheerio');
const request = require('request');

const borough = argv.borough || '05';
const url = `https://restaurant.michelin.fr/restaurants/paris-${borough}/restaurants-michelin`;
let $;

request(url, (error, response, html) => {
  if (!error && response.statusCode == 200) {
    $ = cheerio.load(html);
    scrap();
  }
});

const scrap = _ => {
  const poisElements = $('.poi_card-description').toArray();

  const pois = poisElements
    .map(poi => {
      const title = $(poi)
        .find('.poi_card-display-title')
        .text()
        .trim()
      ;

      return title;
    })
    .sort(_ => 0.5 - Math.random())
  ;

  const encodedQuery = encodeURI(pois[0] + ` Paris ${borough}ème`);
  const link = `https://www.google.fr/search?&q=${encodedQuery}`;

  console.log(`Aujourd'hui, on mange ici : ${pois[0]} => ${link}`);
}