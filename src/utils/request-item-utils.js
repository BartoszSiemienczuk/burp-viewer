export function parseRequest(request, isBase64Encoded) {   
    return {
        headers: getHeaders(request, isBase64Encoded),
        body: getBody(request, isBase64Encoded)
    }
}

export function matchesFilter(filter, item) {
    var filterBy = filter.caseSensitive ? filter.text : filter.text.toLowerCase();
    var urlMatch = false, bodyMatch = false, headersMatch = false;
    if(!isEmpty(filterBy)) {
        var url = filter.caseSensitive ? item.url.value : item.url.value.toLowerCase();
        if(url.includes(filterBy)) {
            urlMatch = true;
        }

        //TODO filtering by body and headers
        return (urlMatch && filter.urls) || (bodyMatch && filter.bodies) || (headersMatch && filter.headers);
    } 
    return true;
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

function isEmpty(value) {
    if (value==null) return true;
    return value.replace(/\s/g, '').length == 0;
}
