import { parseXmlToJson } from "./xmlparser";
import { NONGSARO_KEY } from "./key-store";
export const getInsttList = async () => {
  try {
    let url = "/service/varietyInfo/insttList?apiKey=" + NONGSARO_KEY;
    const response = await fetch(url, {
      method: "POST",
      headers: { "content-type": "application/json" },
    });

    let data = await response.text();
    const xml = new DOMParser().parseFromString(data, "text/xml");
    const result = parseXmlToJson(xml).response;

    if (!response.ok) {
      throw new Error("request is failed!");
    }
    if (result.header.resultCode !== "00") {
      throw new Error(result.headers.resultMsg);
    }

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
    console.log("call?");
    let url = "/service/varietyInfo/mainCategoryList?apiKey=" + NONGSARO_KEY;
    const response = await fetch(url, {
      method: "POST",
      headers: { "content-type": "application/json" },
    });

    let data = await response.text();
    const parser = new DOMParser();
    const xml = parser.parseFromString(data, "text/xml");

    const result = parseXmlToJson(xml).response;

    if (!response.ok) {
      throw new Error("request is failed!");
    }
    if (result.header.resultCode !== "00") {
      throw new Error(result.headers.resultMsg);
    }
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
      "/service/varietyInfo/varietyList?apiKey=" +
      NONGSARO_KEY +
      "&svcCodeNm=" +
      svcCodeNm +
      insttNameParam +
      categoryParam;
    const response = await fetch(url, {
      method: "POST",
      headers: { "content-type": "application/json" },
    });
    if (!response.ok) {
      throw new Error("request is failed!");
    }
    let data = await response.text();
    const parser = new DOMParser();
    const xml = parser.parseFromString(data, "text/xml");

    const result = parseXmlToJson(xml).response;

    if (result.header.resultCode !== "00") {
      throw new Error(result.headers.resultMsg);
    }
    let preVarieties = {};
    let varieties = [];
    if (result.body.items.totalCount < 1) return [];
    result.body.items.item.forEach((variety) => {
      if (!preVarieties[variety.prdlstCtgCode]) {
        preVarieties[variety.prdlstCtgCode] = {
          description: variety.mainChartrInfo,
          name: variety.svcCodeNm,
          id: variety.prdlstCtgCode,
          instt: variety.unbrngInsttInfo,
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
