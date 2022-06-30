import { DEFAULT_ERROR } from "./errorCase";
import { parseXmlToJson } from "./xmlparser";
const NONGSARO_KEY = process.env.REACT_APP_NONGSARO_KEY;
const urlPath = "/service/";
// /nonsaro/

// 기관명 조회 API
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
// 카테고리 조회 API
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

// 품종 조회 API
export const getVarietyList = async ({
  category,
  insttName,
  svcCodeNm,
  pageNo,
}) => {
  try {
    // svcCodeNm = svcCodeNm.trim();
    const insttNameParam = insttName ? `&insttName=${insttName}` : "";
    const categoryParam = category ? `&category=${category}` : "";
    const svcCodeNmParam = `&svcCodeNm=${svcCodeNm}`;
    const pageNoParam = `&pageNo=${pageNo}`;
    if (svcCodeNm === "t") throw new Error("test");
    let url =
      urlPath +
      "varietyInfo/varietyList?apiKey=" +
      NONGSARO_KEY +
      svcCodeNmParam +
      insttNameParam +
      categoryParam +
      pageNoParam +
      "&numOfRows=10";
    const response = await fetch(url, {
      method: "POST",
      headers: { "content-type": "application/json" },
    });
    const result = await nongsaroDataParsing(response);

    let varieties = [];
    console.log("url ::: ", url);

    console.log("result ::: ", result);
    // 남은 length 가 1일경우 객체타입으로 response.
    if (result.body.items.totalCount - (pageNo - 1) * 10 === 1) {
      result.body.items.item = [result.body.items.item];
    }
    if (result.body.items.totalCount > 1) {
      result.body.items.item.forEach((variety) => {
        varieties.push({
          description: variety.mainChartrInfo,
          name: variety.svcCodeNm,
          plantId: variety.cntntsNo,
          instt: variety.unbrngInsttInfo,
          imgLink: variety.imgFileLink,
        });
      });
    }
    return { plants: varieties, totalCount: result.body.items.totalCount };
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
  if (!result) throw new Error(DEFAULT_ERROR);

  if (result.header.resultCode !== "00") {
    throw new Error(result.headers.resultMsg);
  }
  return result;
};
