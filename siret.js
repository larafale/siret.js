var casper = require('casper').create()
  , query = casper.cli.args[0] 
  , url = 'https://www.google.fr/#q='+query+'+site:www.bilansgratuits.fr'
  , info = {}
  , link = null;

function getLinks() {
  var links = document.querySelectorAll('h3.r a');
  return links.length ? Array.prototype.map.call(links, function(link){ return link.getAttribute('href') }) : null;
}

casper.start(url, function() {
  var links = this.evaluate(getLinks);
  
  if(links.length){
    for(var i=0; i<links.length; i++){
      link = (links[i].split('/url?q=')[1]).split('&')[0];

      if(/.*.[0-9]{5,}\.htm$/.test(link)){
        this.open(link);
        // console.log('found link -> ' + link);
        break;
      }
    }
  }

});

casper.then(function() {

  if(!this.exists('.tableResult')) {
    console.log('ooo')
    return;
  }

  info = this.evaluate(function(){
      var output = {}
      var nodes = document.querySelectorAll('.leftElement');
      [].map.call(nodes, function(node) {
        output[node.textContent] = node.nextSibling.nextSibling.textContent;
      });
      return output
  });

  info["Nom"] = this.fetchText('h1.accroche')
  info["Adresse"] = this.fetchText('p.adresse').replace(/\n/g, '').replace(/\t/g, '')
  info["Siret"] = this.fetchText('p.siret').split('Siret : ')[1]
  info["Source"] = link


});

casper.run(function(){
  require('utils').dump(info);
  this.exit();
});
