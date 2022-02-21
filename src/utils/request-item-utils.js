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

export function isEmpty(value) {
    if (value==null) return true;
    return value.replace(/\s/g, '').length == 0;
}
