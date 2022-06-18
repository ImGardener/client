// export function parseXmlToJson2(xml) {
//   let childCount = xml.childElementCount;
//   let ref = {};
//   if (childCount === 0) {
//     return { parentName: xml.child };
//   } else {
//     let queue = [];
//     queue.push(xml);

//     while (queue.length > 0) {
//       const len = queue.length;

//       for (let j = 0; j < len; j++) {
//         const target = queue.shift();
//         childCount = target.childElementCount;
//         ref[target.nodeName] = {};

//         for (let i = 0; i < childCount; i++) {
//           const child = target.children[i];
//           if (child.childElementCount > 0) {
//             queue.push(child);
//           } else {
//             if (!ref[child.nodeName]) ref[child.nodeName] = [];
//             ref[child.nodeName] = child.textContent;
//             continue;
//           }
//         }
//         ref = ref[target.nodeName];
//       }

//       // ref = ref[target.nodeName];
//     }
//   }
// }
// xml parse to JSON
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
  return response.response;
}
