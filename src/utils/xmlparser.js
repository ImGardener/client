// xml Data을 JSON으로 변환하는 함수
//childNodeName가 존재할때까지 재귀 호출
export function parseXmlToJson(xml) {
  let response = {};
  function DFS(element) {
    let obj = {};
    let childCount = element.childElementCount;
    if (childCount > 0) {
      for (let i = 0; i < childCount; i++) {
        const child = element.children[i];
        const childNodeName = child.nodeName;
        if (obj[childNodeName]) {
          if (!Array.isArray(obj[childNodeName])) {
            const temp = obj[childNodeName];
            obj[childNodeName] = [];
            obj[childNodeName].push(temp);
          }
          obj[childNodeName].push(DFS(child));
        } else {
          obj[childNodeName] = DFS(child);
        }
      }
    } else {
      obj = element.textContent;
    }
    return obj;
  }
  response = DFS(xml);
  return response;
}
