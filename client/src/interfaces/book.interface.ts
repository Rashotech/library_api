export interface IFilter {
    category?: string;
    publisher?: string;
}

export interface IFilterRequest extends Request {
    query: {
        category?: string;
        publisher?: string;
    }
}