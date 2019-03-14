var casper = require('casper').create();

casper.start('http://blueanchor.io/', function() {
    this.echo(this.getTitle());
});

casper.run();
