export function parseRawItem(item) {
    var request = parseRequest(item.request.value, item.request.base64 === 'true');
    var response = {
        body: '',
        headers: []
    }

    if(item.response) {
        response = parseRequest(item.response.value, item.request.base64 === 'true');
    } 

    return {
        request: request,
        response: response,
        raw: item
    };
}

export function parseRequest(request, isBase64Encoded) {   
    return {
        headers: getHeaders(request, isBase64Encoded),
        body: getBody(request, isBase64Encoded)
    }
}

function getHeaders(request, isBase64Encoded) {
    if(isBase64Encoded==true) {
        request = atob(request);
    }
    let lines = request.split(/\r?\n/);
    let headers = []
    for(const [idx, line] of lines.entries()) {
        if(idx>0 && idx<lines.length-1 && line) {
            let split = line.split(':');
            if(split.length>1) {
                headers.push({'key':split[0], 'value':split.slice(1).join(':').trim()});
            }
        } else if(!line) {
            break;
        }
    }
    return headers;
}

function getBody(request, isBase64Encoded) {
    if(isBase64Encoded==true) {
        request = atob(request);
    }
    let lines = request.split(/\r?\n/);
    let body = "";
    let emptyLineFound = false;
    for(const [idx, line] of lines.entries()) {
        if(emptyLineFound) {
            body += line;
        } else if(!line) {
            emptyLineFound = true;
        }
    }
    return body;
}