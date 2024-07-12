/* V1
interface Todo {
email: string,
password: string,
}*/

// V2 
export interface User {
            // Model attributes are defined here
            firstName: string,
            lastname: string ,
            email: string,
            password: string ,           
            born: string,
            isAdmin: boolean,
            isSuperAdmin:  boolean
    }
    
    
    export type RootState = {
      todo: {
        data: User[]
      }
    }
   