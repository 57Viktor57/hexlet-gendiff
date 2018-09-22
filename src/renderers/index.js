import diffRender from './diffRender';
import plainRender from './plainRender';
import jsonRender from './jsonRender';

const dataType = {
  diff: diffRender,
  plain: plainRender,
  json: jsonRender,
};

export default (data, type) => dataType[type](data);
