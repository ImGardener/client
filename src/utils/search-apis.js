import { DEFAULT_ERROR } from "./errorCase";
import { parseXmlToJson } from "./xmlparser";
const NONGSARO_KEY = process.env.REACT_APP_NONGSARO_KEY;
const urlPath = "/nonsaro/";
// /nonsaro/
export const getInsttList = async () => {
  try {
    let url = urlPath + "varietyInfo/insttList?apiKey=" + NONGSARO_KEY;
    const response = await fetch(url, {
      method: "POST",
      headers: { "content-type": "application/json" },
    });

    const result = await nongsaroDataParsing(response);

    const instts = result.body.items.item.map((instt) => {
      return {
        value: instt.codeNm,
        name: instt.codeNm,
        id: Math.random().toString(),
      };
    });
    return instts;
  } catch (error) {
    throw error;
  }
};

export const getCategoryList = async () => {
  try {
    let url = urlPath + "varietyInfo/mainCategoryList?apiKey=" + NONGSARO_KEY;
    const response = await fetch(url, {
      method: "POST",
      headers: { "content-type": "application/json" },
    });

    const result = await nongsaroDataParsing(response);

    const category = result.body.items.item.map((category) => {
      return {
        value: category.categoryCode,
        name: category.categoryNm,
        id: Math.random().toString(),
      };
    });
    return category;
  } catch (error) {
    throw error;
  }
};

export const getVarietyList = async ({ category, insttName, svcCodeNm }) => {
  try {
    const insttNameParam = insttName ? `&insttName=${insttName}` : "";
    const categoryParam = category ? `&category=${category}` : "";
    let url =
      urlPath +
      "varietyInfo/varietyList?apiKey=" +
      NONGSARO_KEY +
      "&svcCodeNm=" +
      svcCodeNm +
      insttNameParam +
      categoryParam;
    const response = await fetch(url, {
      method: "POST",
      headers: { "content-type": "application/json" },
    });

    const result = await nongsaroDataParsing(response);

    let preVarieties = {};
    let varieties = [];
    if (result.body.items.totalCount < 1) return [];
    result.body.items.item.forEach((variety) => {
      if (!preVarieties[variety.prdlstCtgCode]) {
        preVarieties[variety.prdlstCtgCode] = {
          description: variety.mainChartrInfo,
          name: variety.svcCodeNm,
          plantId: variety.prdlstCtgCode,
          instt: variety.unbrngInsttInfo,
          imgLink: variety.imgFileLink,
        };
      }
    });
    for (let variety of Object.keys(preVarieties)) {
      varieties.push(preVarieties[variety]);
    }
    return varieties;
  } catch (error) {
    throw error;
  }
};

const nongsaroDataParsing = async (response) => {
  if (!response.ok) {
    throw new Error(DEFAULT_ERROR);
  }

  let data = await response.text();
  const xml = new DOMParser().parseFromString(data, "text/xml");

  const result = parseXmlToJson(xml).response;

  if (result.header.resultCode !== "00") {
    throw new Error(result.headers.resultMsg);
  }
  return result;
};
