export function parseXml(content) {
    const doc = new DOMParser().parseFromString(content, 'text/xml');
    const errorNode = doc.querySelector('parsererror');
    if (errorNode) {
        console.error("Error parsing file: " + errorNode)
    } else {
        let result = {};
        for (let node of doc.childNodes) {
            parseNode(node, result);
        }
        return result; 
    }
}

function parseNode(xmlNode, result) {
    if (xmlNode.nodeName == "#text" || xmlNode.nodeName == "#cdata-section") {
        let v = xmlNode.nodeValue;
        if (v.trim()) result['value'] = v;
        return;
    }

    let jsonNode = {};
    let existing = result[xmlNode.nodeName];
    if (existing) {
        if (!Array.isArray(existing)) {
            result[xmlNode.nodeName] = [existing, jsonNode];
        } else { 
            result[xmlNode.nodeName].push(jsonNode);
        }
    }
    else {
        result[xmlNode.nodeName] = jsonNode;
    }

    if (xmlNode.attributes) {
        for (let attribute of xmlNode.attributes) {
            jsonNode[attribute.nodeName] = attribute.nodeValue;
        }
    } 

    for (let node of xmlNode.childNodes) {
        parseNode(node, jsonNode);
    }
}