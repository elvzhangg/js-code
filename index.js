"use strict";

const Tp = require('thingpedia');
const url = 'https://haas.stanford.edu/students/cardinal-quarter/fellowships';
const cheerio = require('cheerio');

module.exports = class cardinalQuarter extends Tp.BaseDevice {
    get_links() {
        return Tp.Helpers.Http.get(url).then((res) => {
            // we use cheerio to parse the html and retrieve the href of the element with class "class_slides"
            // note that this will only work if the website is static.
            const $ = cheerio.load(res);
            const output = [];
            $('.fellowship_links').each((i, links) => {
                output.push({ link: url + $(links).attr('href') });
            });

            return output;
        });
    }
};