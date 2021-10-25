interface arrayContent {
    value: string | number
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

export { searchBody };