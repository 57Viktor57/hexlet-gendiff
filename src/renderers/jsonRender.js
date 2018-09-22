export default ast => JSON.stringify(ast, (key, value) => {
  if (key === 'level') {
    return undefined;
  }
  return value;
}, 2);
