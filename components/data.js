module.exports = {
    validText : 'Mangoes are my favorite fruit',
    validLocaleField : ['american-to-british', 'british-to-american'],
    invalidLocaleField : ['amorican-ti-british', 'britis-to-american'],
    randomGenerator : (array)=>{
        return array[Math.floor(Math.random() * array.length)]
    }
}
