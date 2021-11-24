export function parseRequest(request) {
    let lines = request.split(/\r?\n/);
    let lastLine = lines[lines.length-1];
    let body = "";
    if(lastLine) {
        body = lastLine;
    }
    let headers = []
    lines.forEach((line, idx) => {
        if(idx>0 && idx<lines.length-1 && line) {
            let split = line.split(':');
            headers.push({'key':split[0], 'value':split[1].trim()});
        }
    })

    return {
        headers: headers,
        body: body
    }
}