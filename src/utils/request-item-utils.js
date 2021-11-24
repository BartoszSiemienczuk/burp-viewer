export function parseRequest(request) {   
    return {
        headers: getHeaders(request),
        body: getBody(request)
    }
}

function getHeaders(request) {
    let lines = request.split(/\r?\n/);
    let headers = []
    for(const [idx, line] of lines.entries()) {
        if(idx>0 && idx<lines.length-1 && line) {
            let split = line.split(':');
            if(split.length>1) {
                headers.push({'key':split[0], 'value':split[1].trim()});
            }
        } else if(!line) {
            break;
        }
    }
    return headers;
}

function getBody(request) {
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