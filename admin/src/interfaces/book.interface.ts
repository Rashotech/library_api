import { Request } from 'express';

export interface IBook {
    _id?: string;
    title: string;
    author: string;
    publisher: string;
    category: string;
    availability?: boolean;
    availDate?: Date;
}

export interface IFilterRequest extends Request {
    query: {
        category?: string;
        publisher?: string;
    }
}

export interface IFilter {
    category?: string;
    publisher?: string;
    availability?: boolean;
}