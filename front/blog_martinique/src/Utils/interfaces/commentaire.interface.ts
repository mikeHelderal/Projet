

export interface commentair {
    // Model attributes are defined here
    PublicationId : Number,
    UserId  :   string | null,
    content : string,
    createdAt  : String,
    id  :  Number,
    updatedAt  :  String
    
}


export type RootStateCom = {
todo: {
data: commentair[]
}
}
