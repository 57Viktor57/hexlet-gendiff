import fs from 'fs';

// Получилось массивно, но это из-за стремления создать машино-читаемый формат данных.
// Можно было бы сразу в строку складывать результат и отказатсья от парсера, но так
// менее эффективно, как мне кажется.

// Кстати, о парсере. Если такой вариант решения является корректным, не было бы
// правильнее вынести парсер в отедльный модуль и ретурнить из функции genDiff
// не строку, а данные?

const genDiff = (path1, path2) => {

  const firstFile = JSON.parse(fs.readFileSync(__dirname + '/' + path1.toString().trim(), 'utf8'));
  const secondFile = JSON.parse(fs.readFileSync(__dirname + '/' + path2.toString().trim(), 'utf8'));

  const keysFirstFile = Object.keys(firstFile);
  const keysSecondFile = Object.keys(secondFile);

  const compare = {
    'equal': {},
    'changed': {},
    'add': {},
    'del': {}
  } // compare
  const changedElem = compare.changed;
  const equalElem = compare.equal;
  const addElem = compare.add;
  const delElem = compare.del;

  // Последовательно проверяем значение каждого ключа из
  // массива keysFirstFile и удаляем
  // просмотренный элемент из обоих массивов ключей. Оставшиеся
  // после проверки массива keysFirstFile
  // ключи в массиве keysSecondFile
  // добавляем в графу changed результирующего объекта.

  while (keysFirstFile.length > 0) {
    const key = keysFirstFile.pop();
    if (firstFile[key] === secondFile[key]) {
      equalElem[key] = firstFile[key];
      keysSecondFile.splice([keysSecondFile.indexOf(key)], 1);
    } else if (secondFile[key]) {
      changedElem[key] = [firstFile[key], secondFile[key]];
      keysSecondFile.splice([keysSecondFile.indexOf(key)], 1);
    } else if (secondFile[key] === undefined) {
      delElem[key] = firstFile[key];
    } // if
  } // while

  for (let elem = 0; elem < keysSecondFile.length; elem += 1) {
    addElem[keysSecondFile[elem]] = secondFile[keysSecondFile[elem]];
  } // for

  // Parser here

  let result = '';

  for (let value in compare) {
    switch (value) {
      case 'changed':
        for (let elements in changedElem) {
          const [del, add] = changedElem[elements];
          result += `- ${elements}: ${del}\n+ ${elements}: ${add}\n`;
        } // for
        break;
      case 'add':
        for (let elements in addElem) {
          result += `+ ${elements} ${addElem[elements]}\n`
        } // for
        break;
      case 'equal':
        for (let elements in equalElem) {
          result += `${elements} ${equalElem[elements]}\n`
        } // for
        break;
      case 'del':
        for (let elements in delElem) {
          result += `- ${elements} ${delElem[elements]}\n`
        } // for
        break;
    } // switch
  } // for

  result = '{\n' + result + '}';
  return result;
} // function genDiff

export default genDiff;
