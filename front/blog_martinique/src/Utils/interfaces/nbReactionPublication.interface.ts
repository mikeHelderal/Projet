

export interface nbReactionPublication {
    // Model attributes are defined here
    "Publicationid": number,
    "TypeId": number,
    "nombre": number
    
}


export type RootStateReaciontPublication = {
todo: {
data: nbReactionPublication[]
}
}
