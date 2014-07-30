siret.js
========

Get full company information providind SIRET or VAT number (only french companies)

### Usage

`casperjs siret.js FR84752052761`
`casperjs siret.js 'company name'`

```
{
    "Activité": "7010Z Activités des sièges sociaux",
    "Capital": "10 250 000 €",
    "Capitaux propres": "1 562 318 K €",
    "Chiffre d'affaires": "3 838 139 K €",
    "Création": "01/1977",
    "Date de publication de l'exercice": "2012",
    "Durée de l'exercice": "12 mois",
    "Effectifs": "4 046",
    "Forme juridique": "(Autre) SA à directoire",
    "Immatriculation": "Lille Métropole",
    "Nombre d'actionnaires": "3",
    "Nombre d'établissements": "47",
    "Nombre de décideurs connus": "6",
    "Nombre de filiales directes": "68",
    "Président du directoire": "CLAUDE Yves",
    "Resultat net": "408 344 K €",
    "Résultat d'exploitation": "-7%",
    "Siren": "306 138 900",
    "TVA intracommunautaire": "Obtenir le numéro de TVA",
    "Type": "Société commerciale",
    "Nom": "DECATHLON",
    "Adresse": "4 Bd De Mons59650 Villeneuve D'ascq",
    "Siret": "306 138 900 01294",
    "Source": "http://www.bilansgratuits.fr/entreprise/fiche/30613890001294.htm"
}
```

### Dependencies
* casperjs
* source from bilansgratuits.fr
