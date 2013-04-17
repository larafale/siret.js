var casper = require('casper').create()
  , query = casper.cli.options.code 
  , url = 'https://www.google.fr/#q='+query+'+site:www.bilansgratuits.fr'
  , info = {}
  , link = null;


function getLinks() {
  var links = document.querySelectorAll('h3.r a');
  if(links.length) {
    return links[0].getAttribute('href');
  }
  return '';
}

casper.start(url, function() {
  var href = this.evaluate(getLinks);

  if(href) {
    link = (href.split('/url?q=')[1]).split('&')[0];
    this.open(link);
  }
});

casper.then(function() {
  if(this.exists('#siret')) {
    var zipCity = this.fetchText('#fiche-societe > div:nth-child(1) > h3:nth-child(3)').split(' ') // 13100 AIX CEDEX
      , dataSelector = function(row, col) {return '#infogene-societe table:nth-of-type(1) tr:nth-of-type('+row+') td:nth-of-type('+col+')'}
      , companyInfos = this.fetchText(dataSelector(4, 1)).replace(/\n/g, '').replace(/\t/g, '').split(':');

    info = {
      name    : this.fetchText('#fiche-societe > div:nth-child(1) > h1:nth-child(1)'),
      address : this.fetchText('#fiche-societe > div:nth-child(1) > h3:nth-child(2)'),
      zipcode : zipCity[0],
      city    : zipCity.splice(0,1) && zipCity.join(' '),
      code    : companyInfos[0].substr(0, companyInfos[0].length -1),
      desc    : companyInfos[1].substr(1, companyInfos[1].length),
      vat     : this.getHTML(dataSelector(6, 1)).replace(/\n/g, '').replace(/\t/g, ''),
      siret   : this.fetchText('#siret').split('siret: ')[1],
      type    : this.getHTML(dataSelector(1, 1)).replace(/\n/g, '').replace(/\t/g, ''),
      capital : this.getHTML(dataSelector(2, 1)).replace(/\n/g, '').replace(/\t/g, ''),
      date    : this.getHTML(dataSelector(2, 2)).replace(/\n/g, '').replace(/\t/g, ''),
      phone   : this.getHTML(dataSelector(5, 1)).replace(/\n/g, '').replace(/\t/g, '').replace(/ /g, ''),
      link    : link
    };
  }
});

casper.run(function(){
  require('utils').dump(info);
  this.exit();
});
