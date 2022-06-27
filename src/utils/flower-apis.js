import { DEFAULT_ERROR } from "./errorCase";
import { parseXmlToJson } from "./xmlparser";
const DATAGO_KEY = process.env.REACT_APP_DATAGO_KEY;

// 오늘의 꽃 조회 API.
export const getTodayFlower = async (today) => {
  try {
    let url = `/tDflower/selectTodayFlower01?serviceKey=${DATAGO_KEY}`;
    const response = await fetch(url, {
      method: "GET",
    });
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
