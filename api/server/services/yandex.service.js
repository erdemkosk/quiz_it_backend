/* eslint-disable func-names */
const YandexTranslator = require('yandex.translate');

const apiKey = 'trnsl.1.1.20200410T075111Z.b8affb846f460127.d055cfd8449fde4b1b8061f87a5f9922bc7cfdc1';
const translator = new YandexTranslator(apiKey);


exports.getTranslatedWordFromYandex = async function ({ word }) {
  const readedValues = await translator.translate(word, 'tr');
  return (
    readedValues[0].toString()
  );
};
