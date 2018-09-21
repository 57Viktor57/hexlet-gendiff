import diffRender from './diffRender';
import plainRender from './plainRender';

const dataType = {
  diff: diffRender,
  plain: plainRender,
};

export default (data, type) => dataType[type](data);
