

export interface Publications {
    // Model attributes are defined here
"comments":  [],
"SubjectId":number,
"UserId": number,
"content": string,
"createdAt": string,
"date_publication":string,
"id": number,
"image": string,
"is_valid": boolean,
"resume": string,
"title": string,
"updatedAt": string,    
}


export type RootStatePublications = {
todo: {
data: Publications[]
}
}
