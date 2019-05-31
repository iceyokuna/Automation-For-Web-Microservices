export function getElementIdFromLaneValue(username, bpmnJson) {
  let laneSet = bpmnJson.elements[0].elements[1].elements[0].elements;
  var elementId = null;
  for (let item of laneSet) {
    const { id, name } = item.attributes;
    if (name === username) {
      elementId = id;
      break;
    };
  }
  return elementId;
}