export default ast => ast.reduce((acc, item) => {
  const {
    type, key, beforeValue, afterValue,
  } = item;
  if (type === 'equal') {
    return [...acc, `${key}: ${beforeValue}`];
  } // if
  if (type === 'changed') {
    return [...acc, `- ${key}: ${beforeValue}`,
      `+ ${key}: ${afterValue}`];
  } // if
  if (type === 'del') {
    return [...acc, `- ${key}: ${beforeValue}`];
  } // if
  if (type === 'add') {
    return [...acc, `+ ${key}: ${afterValue}`];
  } // if
  return acc;
}, []); // reduce
