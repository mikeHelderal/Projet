

export interface nbReactionEvent {
    // Model attributes are defined here
    "Eventid": number,
    "TypeId": number,
    "nombre": number
    
}


export type RootStateNbReactiontEvent = {
todo: {
data: nbReactionEvent[]
}
}
