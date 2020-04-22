const isEmptyObject = (obj) =>
  Object.keys(obj).length === 0 && obj.constructor === Object;

const diffDate = (d1, d2) => {
  const diffTime = Math.abs(d2 - d1);
  return Math.ceil(diffTime / (1000 * 60 * 60));
};

module.exports = {
  isEmptyObject,
  diffDate
};
