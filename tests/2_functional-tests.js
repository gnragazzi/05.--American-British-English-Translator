const chai = require('chai');
const chaiHttp = require('chai-http');
const assert = chai.assert;
const server = require('../server.js');

chai.use(chaiHttp);

let Translator = require('../components/translator.js');
const {invalidLocaleField, randomGenerator, validLocaleField,validText} = require('./../components/data')

suite('Functional Tests', () => {
    // a. Translation with text and locale fields: POST request to /api/translate
    test('Translation with text and locale fields: POST request to /api/translate',(done)=>{
        chai.request(server)
            .post('/api/translate')
            .send({
                text: validText,
                locale: 'american-to-british'
            })
            .end((err,res)=>{
                assert.equal(res.status, 200)
                assert.isObject(res.body)
                assert.propertyVal(res.body,'text',validText)
                assert.propertyVal(res.body,'translation','Mangoes are my <span class="highlight">favourite</span> fruit')
                done()
            })
    })
    // b. Translation with text and invalid locale field: POST request to /api/translate
    test('Translation with text and invalid locale field: POST request to /api/translate',(done)=>{
        chai.request(server)
            .post('/api/translate')
            .send({
                locale: randomGenerator(invalidLocaleField),
                text: validText
            })
            .end((err,res)=>{
                assert.equal(res.status,200)
                assert.isObject(res.body)
                assert.propertyVal(res.body,'error','Invalid value for locale field')
                done()
            })
    })
    // c. Translation with missing text field: POST request to /api/translate
    test('Translation with missing text field: POST request to /api/translate',(done)=>{
        chai.request(server)
            .post('/api/translate')
            .send({
                locale: randomGenerator(validLocaleField)
            })
            .end((err,res)=>{
                assert.equal(res.status,200)
                assert.isObject(res.body)
                assert.propertyVal(res.body,'error','Required field(s) missing')
                done()
            })
    })
    // d. Translation with missing locale field: POST request to /api/translate
    test('Translation with missing locale field: POST request to /api/translate',(done)=>{
        chai.request(server)
        .post('/api/translate')
        .send({
            text: validText
        })
        .end((err,res)=>{
            assert.equal(res.status,200)
            assert.isObject(res.body)
            assert.propertyVal(res.body,'error','Required field(s) missing')
            done()
        })
    })
    // e. Translation with empty text: POST request to /api/translate
    test('Translation with empty text: POST request to /api/translate',(done)=>{
        chai.request(server)
            .post('/api/translate')
            .send({
                locale: randomGenerator(validLocaleField),
                text: ''
            })
            .end((err,res)=>{
                assert.equal(res.status,200)
                assert.isObject(res.body)
                assert.propertyVal(res.body,'error','No text to translate')
                done()
            })
    })
    //Translation with text that needs no translation: POST request to /api/translate
    test('Translation with text that needs no translation: POST request to /api/translate',(done)=>{
        chai.request(server)
            .post('/api/translate')
            .send({
                locale: randomGenerator(validLocaleField),
                text: 'This do not need translation'
            })
            .end((err,res)=>{
                assert.equal(res.status,200)
                assert.isObject(res.body)
                assert.propertyVal(res.body,'translation','Everything looks good to me!')
                done()
            })
    })
});
