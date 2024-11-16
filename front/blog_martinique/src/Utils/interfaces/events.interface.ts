export interface events {
    UserId:1,
adresse: string,
content:string,
createdAt:string,
date_event:string,
heure_debut:string,
heure_fin: string,
id: number,
is_valid: boolean,
title: string,
updatedAt: string,
ville: string,
}

export type RootStateEvents = {
    todo: {
        data: events[]
        }
}

