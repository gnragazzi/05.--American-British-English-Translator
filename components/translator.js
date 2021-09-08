const americanOnly = require('./american-only.js');
const americanToBritishSpelling = require('./american-to-british-spelling.js');
const americanToBritishTitles = require("./american-to-british-titles.js")
const britishOnly = require('./british-only.js')

class Translator {
    translate(text,locale){
        let wordsObject = {};
        let wordsArray = [];
        let timeRegex = / /
        if(locale === 'american-to-british'){
            wordsObject = {...americanOnly,...americanToBritishSpelling,...americanToBritishTitles}
            timeRegex = /\:(?=\d{2})/
        }
        else {
            let britishToAmericanSpelling = {}
            for(const key in americanToBritishSpelling){
                britishToAmericanSpelling[americanToBritishSpelling[key]] = key
            }
            let britishToAmericanTitles = {}
            for(const key in americanToBritishTitles){
                britishToAmericanTitles[americanToBritishTitles[key]] = key
            }
            wordsObject = {...britishOnly, ...britishToAmericanSpelling, ...britishToAmericanTitles}
            timeRegex = /\.(?=\d{2})/
        }
        wordsArray = Object.keys(wordsObject)
        let translation = text
        wordsArray.forEach(word=>{
            const regex = new RegExp(`${word}(?!\\w)`,'ig') //puede que necesite agregar la g para observar si el texto a traducir tiene varias veces la misma palabra
            if(text.match(regex)){
                translation = translation.replace(regex,`<span class="highlight">${wordsObject[word]}</span>`)
            }
        })
        if(translation.match(timeRegex)) {
            translation = translation.replace(timeRegex,locale==='american-to-british'? '.' : ':')
            const highlightRegex = /\d+[\.|\:]\d\d/
            const initialString = translation.slice(0,translation.match(highlightRegex).index, translation.match(highlightRegex).index);
            const highlightString = `<span class="highlight">` + translation.slice(translation.match(highlightRegex).index, translation.match(highlightRegex).index + translation.match(highlightRegex)[0].length) + "</span>"
            const restOfTheString = translation.slice(translation.match(highlightRegex).index + translation.match(highlightRegex)[0].length)
            translation = initialString + highlightString + restOfTheString
        }
        console.log(translation)
        return translation
    }
}

module.exports = Translator;