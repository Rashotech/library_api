export interface IUser {
    _id?: string;
    firstName: string;
    lastName: string;
    email: string;
    books?: BorowedBooks[];
}

export interface BorowedBooks {
    title: { type: String },
    author: { type: String },
    category: { type: String },
    publisher: { type: String }
}


