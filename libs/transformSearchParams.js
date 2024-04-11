export const transformSearchParams = (data = {}, options = {}) => {
  let { limit } = options;

  if (limit === undefined) {
    limit = 6;
  }

  if ("limit" in data) {
    limit = data.limit;
  }

  let newObj = {};

  for (const key of Object.keys(data)) {
    if (key === "page") {
      if (data[key] < 1 || isNaN(data[key])) {
        newObj["offset"] = 0;
      } else {
        newObj["offset"] = (data[key] - 1) * limit;
      }
      continue;
    }

    if (data[key] === null) {
      continue;
    }

    newObj[key] = data[key];
  }

  return newObj;
};
