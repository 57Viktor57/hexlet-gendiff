export default ast => ast.reduce((acc, item) => {
  const {
    type, key, beforeValue, afterValue,
  } = item;
  switch (type) {
    case 'equal':
      return [
        ...acc, `${key}: ${beforeValue}`,
      ];
    case 'changed':
      return [
        ...acc, `- ${key}: ${beforeValue}`,
        `+ ${key}: ${afterValue}`,
      ];
    case 'del':
      return [
        ...acc, `- ${key}: ${beforeValue}`,
      ];
    case 'add':
      return [
        ...acc, `+ ${key}: ${afterValue}`,
      ];
    default: return acc;
  }
}, []); // reduce
