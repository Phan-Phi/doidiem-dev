import queryString from "query-string";

export default (originalUrl, addtionalParams) => {
  let { url, query: params } = queryString.parseUrl(originalUrl);

  params = {
    ...params,
    ...addtionalParams,
  };

  return `${url}?${queryString.stringify(params)}`;
};
