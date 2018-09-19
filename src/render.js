export default ast => ast.reduce((acc, item) => {
  const {
    type, key, beforeValue, afterValue,
  } = item;
  switch (type) {
    case 'equal':
      return [...acc, `${key}: ${beforeValue}`];
      break;
    case 'changed':
      return [...acc, `- ${key}: ${beforeValue}`,
        `+ ${key}: ${afterValue}`];
      break;
    case 'del':
        return [...acc, `- ${key}: ${beforeValue}`];
        break;
    case 'add':
        return [...acc, `+ ${key}: ${afterValue}`];
        break;
    default: return acc;
  }
}, []); // reduce
