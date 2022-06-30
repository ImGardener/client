import { DEFAULT_ERROR } from "./errorCase";
import { parseXmlToJson } from "./xmlparser";
const DATAGO_KEY = process.env.REACT_APP_DATAGO_KEY;

// 오늘의 꽃 조회 API.
export const getTodayFlower = async (today) => {
  try {
    let url = `/tDflower/selectTodayFlower01?serviceKey=${DATAGO_KEY}`;

    let response = await fetchWrapper(url, {}, 3000);

    if (!response.ok) {
      throw new Error(DEFAULT_ERROR);
    }
    // xml type data parsing
    let data = await response.text();
    const xml = new DOMParser().parseFromString(data, "text/xml");
    const result = parseXmlToJson(xml)?.document?.root;

    if (!result) throw new Error(DEFAULT_ERROR);
    if (result?.resultCode !== "1") {
      throw new Error(result.resultMsg);
    }
    const flowerInfo = {
      name: result.result.flowNm,
      img: result.result.imgUrl1,
      id: result.result.dataNo,
      content: result.result.fContent,
    };
    return flowerInfo;
  } catch (error) {
    throw error;
  }
};

// load가 오래걸리는 경우가 빈번해서 TIMEOUT 지정
const fetchWrapper = async (url, requestConfig = {}, ms = 2000) => {
  if (!url) throw new Error("INVALID URL");
  return new Promise((resolve, reject) => {
    fetch(url, requestConfig)
      .then((result) => {
        resolve(result);
      })
      .catch((error) => reject(error));

    setTimeout(() => {
      reject(new Error("TIME_OUT"));
    }, ms);
  });
};
