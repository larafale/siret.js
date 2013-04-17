siret.js
========

Get full company information providind SIRET or VAT number (only french companies)

### Example

`casperjs siret.js --code=FR84752052761`

```
{
  "name": "CHOKOLA",
  "address": "15 CRS MIRABEAU",
  "zipcode": "13100",
  "city": "AIX EN PROVENCE",
  "code": "6201Z",
  "desc": "Programmation informatique",
  "vat": "FR84752052761",
  "siret": "75205276100018",
  "type": "SARL unipersonnelle",
  "capital": "1100 Euros",
  "date": "06/2012",
  "phone": "N.C",
  "link": "http://www.bilansgratuits.fr/CHOKOLA-(13100)--75205276100018.htm"
}
```

### Dependencies
* casperjs
* source from bilansgratuits.fr
