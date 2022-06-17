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
    const parser = new DOMParser();
    const xml = parser.parseFromString(data, "text/xml");

    const result = parseXmlToJson(xml);

    if (!response.ok) {
      throw new Error("request is failed!");
    }
    if (result.header.resultCode !== "00") {
      throw new Error(result.headers.resultMsg);
    }

    return result.body;
  } catch (error) {
    alert(error);
  }
};

const getVarieties = async () => {};
