'use strict';

const Handlebars = require('handlebars');
const I18n = require('i18n');

Handlebars.registerHelper('I18n',
  function(str){
    return (I18n != undefined ? I18n.t(str) : str);
  }
);