'use strict';

const {
    promisify
} = require('util');

const fs = require('fs');
const Handlebars = require('Handlebars');
const readFileAsync = promisify(fs.readFile);
const i18n = require('i18n');

const mailerGet = {
    method: 'GET',
    path: '/mailer',
    handler: async (request, h) => {
        try {

            await readFileAsync('./templates/notificationTemplate.hbs', 'utf-8', function(error, source){

                let compiledTemplate = null;
                Handlebars.registerHelper('i18n', function(context) {
                    return request.i18n.__(context);
                });

                compiledTemplate = Handlebars.compile(source);

                const html = compiledTemplate({
                    message1: request.i18n.__('Thank you, %s.', 'John Doe'),
                    message2: request.i18n.__('Thank you, %s, for starting the process.', 'John Doe')
                });

                const mailObj = {
                    'to': 'someone@somewhere.com',
                    'from': 'me@me.com',
                    'subject': request.i18n.__('Thank you, %s.', 'John Doe'),
                    html
                };

                console.log(mailObj); //Look at console to see the mailObj
            });
        }
        catch (e) {
            console.log(e);
        }
    }
};

module.exports = [
    mailerGet
];
