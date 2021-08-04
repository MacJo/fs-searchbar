export interface arrayContent {
    value: string | Number
}
export interface searchBody {
    quote: Array<arrayContent>,
    fileext: Array<arrayContent>,
    folder: Array<arrayContent>,
    wildcard: Array<arrayContent>,
    minus: Array<arrayContent>,
    general: Array<arrayContent>,
    raw?: string
}