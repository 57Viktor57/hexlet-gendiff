import yaml from 'js-yaml';

export default (data, type) => {
  const dataType = {
    '.json': JSON.parse,
    '.yaml': yaml.safeLoad,
  };
  return dataType[type](data);
};
