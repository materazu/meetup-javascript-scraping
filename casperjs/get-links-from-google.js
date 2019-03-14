var casper = require('casper').create();
var links = [];
function getLinks() {
    // Identifier les titres et retourner les URLS
    var links = document.querySelectorAll('h3.r a');
    return Array.prototype.map.call(links, function(e) {
        return e.getAttribute('href').replace(/(\/url\?q=)/g, "").replace(/(\/search\?q=)/g, "https://google.fr/search?q=");
    });
};
casper.start('http://google.fr/')
      .waitForSelector('form[action="/search"]')
      .then(function() {
        this.fill('form[action="/search"]', { q: 'blueanchor.io' }, true);
      })
      .then(function() {
        links = links.concat(this.evaluate(getLinks));
      })
      .then(function() {
        this.echo(links.length + ' links found:');
        this.echo(' - ' + links.join('\n - ')).exit();
      })
      .run();
