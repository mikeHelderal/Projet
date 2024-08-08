/* V1
interface Todo {
email: string,
password: string,
}*/

// V2 
export interface reactionPubli {
            // Model attributes are defined here
            PublicationId : Number,
            TypeId : Number,
            UserId  :   string | null,
            createdAt  : String,
            id  :  Number,
            updatedAt  :  String
            
    }
    
    
    export type RootState = {
      todo: {
        data: reactionPubli[]
      }
    }
   