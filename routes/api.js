'use strict';

const Translator = require('../components/translator.js');

const {validLocaleField} = require('../components/data')
module.exports = function (app) {
  
  const translator = new Translator();

  app.route('/api/translate')
    .post((req, res) => {
      const {locale, text} = req.body
      if(!locale || text === undefined) return res.json({ error: 'Required field(s) missing' })
      if(text === '') return res.json({ error: 'No text to translate' })
      if(!validLocaleField.find(validLocale => validLocale === locale)) return res.json({ error: 'Invalid value for locale field' })
      let translation = translator.translate(text,locale)
      if(text === translation) return res.json({text,translation: 'Everything looks good to me!'})
      return res.json({text,translation})
    });
};
