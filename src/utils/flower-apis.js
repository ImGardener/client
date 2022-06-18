import { parseXmlToJson } from "./xmlparser";
import { DATAGO_KEY } from "./key-store";
export const getTodayFlower = async (today) => {
  console.log(today);
  try {
    let url = `/NihhsTodayFlowerInfo01/selectTodayFlower01?serviceKey=${DATAGO_KEY}&Month=${today.month}&Day${today.day}`;
    console.log(url);

    const response = await fetch(url, {
      method: "GET",
      //   headers: { "content-type": "application/json" },
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
    };
    return flowerInfo;
  } catch (error) {
    alert(error);
  }
};
