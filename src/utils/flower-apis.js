import { parseXmlToJson } from "./xmlparser";
const DATAGO_KEY = process.env.REACT_APP_DATAGO_KEY;

export const getTodayFlower = async (today) => {
  try {
    let url = `/proxya/selectTodayFlower01?serviceKey=${DATAGO_KEY}`;
    const response = await fetch(url, {
      method: "GET",
    });
    if (!response.ok) {
      throw new Error("request is failed!");
    }

    let data = await response.text();
    const xml = new DOMParser().parseFromString(data, "text/xml");
    const result = parseXmlToJson(xml)?.document?.root;

    if (result.resultCode !== "1") {
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
