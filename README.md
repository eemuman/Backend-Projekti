# WORD-APP -- Opettele uusien kielten sanastoja!

#### Toimiva versio löytyy nyt herokusta! https://eemu-backend-projekti.herokuapp.com/

## Featuret:
* Opettele useiden kielten eri sanastoja!
* Voit halutessasi valita vain tietyn teeman mukaisia sanoja! (Esim. Eläimet, Ajoneuvot, ym. Muita)
* Tai halutessasi voit vain yleisesti opetella tietyn kielen sanastoja.
* Hallintapaneelin kautta voidaan helposti ja vaivattomasti lisätä uusia sanoja ja niiden käännöksiä, sekä teemoja ja kieliä!

## Teknologiat
Sovellus on toteutettu full-stackina, eli front- ja backend ovat kummatkin meikäläisen omaa käsialaa. 
Frontend on toteutettu Reactilla.
Backend on toteutettu NodeJSllä.

### Frontend
* React
* Axios
* Material-UI
* React-Router

### Backend
* NodeJS
* Express
* MySql
* Jsonwebtoken

# Käyttöohjeet sivulle
### Saapuessa sivuille
![Imgur](https://i.imgur.com/vNPHEEr.png)
* Kun saavut sivuille, ensimmäisenä törmäät kirjautumispaneeliin.
* Jos haluat vain pelata, paina vihreää Siirry Pelaamaan - nappia.
* Jos haluat tutustua hallintapaneeliin, lue alta.

### Painettuasi Siirry Pelaamaan - nappia
![Imgur](https://i.imgur.com/fSDrSL3.png)
* Seuraavaksi saavut asetukset sivuille, jossa voit valita haluamasi asetukset.
* Kysymyskieli on se, millä sanat näkyvät kysyttäessä. 
* Vastauskieli on se, mille kielelle sinä pelaajana käännät sanat.
* Sanojen määrän ja teeman valinta ovat toivottavasti kohtalaisen yksselitteisiä.
* Kun olet tyytyväinen asetuksiin, ja olet valinnut jokaiseen asetukseen jonkun valinnan, pääset 'pelaamaan' painamalla vihreää Pelaamaan - nappia.

#### HUOM sanoja on hyvin pieni määrä, eli jos haluat pelata yli viiden sanan pelejä, suosittelen valitsemaan kaikki teemat!

### Pelin pelaaminen
![Imgur](https://i.imgur.com/fFUcHPN.png)
* Tämän jälkeen saavut pelin pelaamissivulle.
* Vasemmalla näkyy sana ja oikealla on paikka, mihin vastata käännökselläsi.
* Kun olet vastannut kaikkiin, tai niihin, mihin tiedät vastauksen, paina Tarkista vastaukset - näppäintä.
* Peli käy läpi vastauksesi, näyttää mitkä ovat oikein ja mitkä väärin, sekä alhaalle tulee näkymään kokonaistulos.
* Jos haluat pelata uudestaan samoilla asetuksilla, paina Pelaa Uudestaan - näppäintä ja peli arpoo sinulle uudet sanat.
* Jos taas haluat vaihtaa asetuksia, paina sinistä Palaa Takaisin - näppäintä.

# Hallintapaneeli

Jos haluat tutustua Hallintapaneeliin sekä sen toimintaan sinulla on kaksi vaihtoehtoa:
* Ole meikäläiseen yhteydessä saadaksesi käyttäjätunnus sekä salasana.
* Ohita meikäläsen yksinkertaiset suojaukset ja mene katsomaan omin luvin. (Sekä kerro meikäläiselle miten siinä onnistuit!)

#### HUOM älä koske mihinkään hallintapaneelissa jo olevaan dataan! Jos haluat testata sen toimintaa, luo uusia ja poista ne lopuksi!
