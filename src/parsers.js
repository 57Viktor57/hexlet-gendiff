import yaml from 'js-yaml';

const dataType = {
  '.json': JSON.parse,
  '.yaml': yaml.safeLoad,
};

export default (data, type) => dataType[type](data);
