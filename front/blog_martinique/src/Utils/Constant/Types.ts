export type USER = {
    id: number;
    firstName: string;
    lastname: string;
    email: string;
    password: string;
    born: string;
    isAdmin: boolean;
    isSuperAdmin: boolean ;
    createdAt: string;
    updateAt: string;
    SubjectId: number;
}

export type CITY = {
    id: number;
    name:string ;
    createdAt: string;
    updateAt: string;
}

export type COMMENT = {
    id: number;
    content: string ;
    date_comment: string ;
    createdAt: string;
    updateAt: string;
    PublicationId: number;
    UserId: number;
}

export type EVENTS = {
    id: number;
    title: string;
    date_event: string ;
    content: string ;
    is_valid: boolean;
    createdAt: string;
    updateAt: string;
    NeighbordhoodId: number;
    UserId: number ;
}

export type MESSAGE = {
    id: number;
    content: string ;
    date_message: string ;
    createdAt: string;
    updateAt: string;
}

export type  NEIGHBORHOOD = {
    id: number;
    name: string ;
    createdAt: string;
    updateAt: string;
    CityId: number ;
}

export type NEWS = {
    id: number;
    title: string;
    content: string;
    date_news: string;
    is_valid: boolean;
    createdAt: string;
    updateAt: string;
    NeighbordhoodId: number;
    UserId: number ;
}

export type PUBLICATION = {
    id: number;
    title: string;
    resume: string;
    content: string;
    is_valid: boolean;
    createdAt: string;
    updateAt: string;
    SubjectId: number ;
    UserId: number ;
}

export type REACTIONS_EVENT = {
    id: number;
    EventId: number;
    UserId: number;
    TypeId: number ;
    createdAt: string;
    updateAt: string;
}

export type REACTIONS_PUBLICATION = {
    id: number;
    PublicationId: number;
    UserId: number;
    TypeId: number ;
    createdAt: string;
    updateAt: string;
}

export type RESPONSE = {
    id: number ;
    content: string;
    createdAt: string;
    updateAt: string;
    MessageId: number ;
}

export type SUBJECT = {
    id: number;
    name: string;
    createdAt: string;
    updateAt: string;
}

export type TYPES = {
    id: number;
    name: string;
    createdAt: string;
    updateAt: string;
}
