interface arrayContent {
    value: string | Number
}

interface searchBody {
    quote: Array<arrayContent>,
    fileext: Array<arrayContent>,
    folder: Array<arrayContent>,
    wildcard: Array<arrayContent>,
    minus: Array<arrayContent>,
    general: Array<arrayContent>,
    raw?: string
}

export {
    searchBody
};