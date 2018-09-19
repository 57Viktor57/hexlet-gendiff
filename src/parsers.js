import yaml from 'js-yaml';
import ini from 'ini';

const dataType = {
  '.json': JSON.parse,
  '.yaml': yaml.safeLoad,
  '.ini': ini.parse,
};

export default (data, type) => dataType[type](data);
