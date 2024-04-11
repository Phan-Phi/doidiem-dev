import axios from "../axios.config";
import { SETTINGS } from "../apis";

import transformUrl from "./transformUrl";

export default async (originalUrlList, { locale } = {}) => {
  try {
    const additionalUrlList = [SETTINGS];

    const mergedUrlList = [...originalUrlList, ...additionalUrlList];

    const originalResList = [];
    const fallbackList = {};

    for await (const res of mergedUrlList.map(async (el) => {
      return axios.get(el).then(({ data }) => {
        return [el, data];
      });
    })) {
      const [key, value] = res;

      if (originalUrlList.includes(key)) {
        originalResList.push(value);
      } else {
        fallbackList[key] = value;
      }
    }

    return {
      resList: originalResList,
      fallback: fallbackList,
    };
  } catch (err) {
    throw new Error(err);
  }
};
