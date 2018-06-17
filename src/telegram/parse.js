const readline = require('readline');
const fs = require('fs');

const rl = readline.createInterface({
  input: fs.createReadStream('./companies.csv'),
});
const companies = [];

/**
 * № п/п,
 * ПОЛНОЕ НАИМЕНОВАНИЕ,
 * КРАТКОЕ НАИМЕНОВАНИЕ,
 * ПРЕЖНЕЕ НАИМЕНОВАНИЕ,
 * Номер лицензии на ОСАГО,
 * Дата выдачи лицензии на ОСАГО,
 * Номер Свид-ва РСА,
 * Дата Свид-ва РСА,
 * Основной телефон/факс,
 * E-mail общий,
 * АДРЕС,
 * ИНН
 */

rl.on('line', (line) => {
  const str = Buffer.from(line).toString();
  const splitted = str.split(',');

  companies.push({
    id: splitted[0],
    fullName: splitted[1],
    shortName: splitted[2],
    oldName: splitted[3],
    licenseNumber: splitted[4],
    licenseDate: splitted[5],
    RUANumber: splitted[6],
    RUADate: splitted[7],
    phone: splitted[8],
    email: splitted[9],
    address: splitted[10],
    inn: splitted[11],
  });
});

rl.on('close', () => {
  fs.writeFileSync('./companies.json', JSON.stringify(companies));
});
