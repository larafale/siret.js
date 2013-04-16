var casper = require('casper').create()
  , query = casper.cli.options.code 
  , url = 'https://www.google.fr/#q='+query+'+bilansgratuits'
  , info = {}
  , link = null


function getLinks() {
  var links = document.querySelectorAll('h3.r a')
  return Array.prototype.map.call(links, function(e) {
    return e.getAttribute('href')
  })
}

casper
.start()
.thenOpen(url, function(){

  var links = this.evaluate(getLinks)
    , match = null

  //match link
  for(var i=0; i< links.length; i++){
    match = (links[i].split('/url?q=')[1]).split('&')[0]
    if(/.*bilansgratuits.*/.test(match)){
      link = match
      break
    }
  }

  if(link) this.open(link)

})

.then(function() {
  
  if(this.exists('#siret')){

    var a,b

    info.name     = this.fetchText('#fiche-societe > div:nth-child(1) > h1:nth-child(1)')
    info.address  = this.fetchText('#fiche-societe > div:nth-child(1) > h3:nth-child(2)')

    a = this.fetchText('#fiche-societe > div:nth-child(1) > h3:nth-child(3)').split(' ') // 13100 AIX CEDEX
    info.zipcode  = a[0]
    a.splice(0,1)
    info.city     = a.join(' ')

    a = this.fetchText('#infogene-societe table:nth-of-type(1) tr:nth-of-type(4) td:nth-of-type(1)').replace(/\n/g, '').replace(/\t/g, '').split(':')
    info.code     = a[0].substr(0, a[0].length -1)
    info.desc     = a[1].substr(1, a[1].length)
    
    info.vat      = this.getHTML('#infogene-societe table:nth-of-type(1) tr:nth-of-type(6) td:nth-of-type(1)').replace(/\n/g, '').replace(/\t/g, '')
    info.siret    = this.fetchText('#siret').split('siret: ')[1]
    info.type     = this.getHTML('#infogene-societe table:nth-of-type(1) tr:nth-of-type(1) td:nth-of-type(1)').replace(/\n/g, '').replace(/\t/g, '')
    info.capital  = this.getHTML('#infogene-societe table:nth-of-type(1) tr:nth-of-type(2) td:nth-of-type(1)').replace(/\n/g, '').replace(/\t/g, '')
    info.date     = this.getHTML('#infogene-societe table:nth-of-type(1) tr:nth-of-type(2) td:nth-of-type(2)').replace(/\n/g, '').replace(/\t/g, '')
    info.phone    = this.getHTML('#infogene-societe table:nth-of-type(1) tr:nth-of-type(5) td:nth-of-type(1)').replace(/\n/g, '').replace(/\t/g, '').replace(/ /g, '')
    info.link     = link

  }

})


casper.run(function(){
  require('utils').dump(info)
  this.exit()
});
