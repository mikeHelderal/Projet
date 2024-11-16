
export interface reactionEvents {
    // Model attributes are defined here
    EventId : Number,
    TypeId : Number,
    UserId  :   string | null,
    createdAt  : String,
    id  :  Number,
    updatedAt  :  String
    
}


export type RootStateEvent = {
todo: {
data: reactionEvents[]
}
}
