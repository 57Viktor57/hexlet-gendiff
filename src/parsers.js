import yaml from 'js-yaml';

const dataType = {
  '.json': JSON.parse,
  '.yaml': yaml.safeLoad,
};

export default (data, type) => {
  return dataType[type](data);
};
