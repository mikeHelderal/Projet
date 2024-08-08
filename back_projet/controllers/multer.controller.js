
import {Publications} from "../models/index.js";

export const uploadImage = async (req, res, next) => {
    //code de add publication
    let profilePicture = ""
    const publicationObject = req.body
    try {
       
       
        if (req.file) {
            const { buffer, originalname } = req.file
            console.log("Jusqu'ici tout va bien...", req.file.originalname)
            const timestamp = Date.now()
            const name = originalname.split('.');

            const ref = `${name[0]}-${timestamp}.png`
            const path = `./uploads/${ref}`
            profilePicture = `${req.protocol}://${req.get('host')}/uploads/${ref}`
            console.log("profile.picture => ",profilePicture);
        }
        req.body.image = profilePicture ;
        console.log("body => ", req.body);
        console.log("req file => ", req.file );

        const publi = {
            SubjectId: publicationObject.SubjectId,
            title: publicationObject.title,
            resume: publicationObject.resume,
            image: profilePicture,
            content: publicationObject.content,
            UserId: publicationObject.UserId
        }
        
        const response = await Publications.create(publi);
        res.status(201).json({message: "Publication added successfully", data: response})
    } catch (error) {
        res.status(500).json({message : "add Publication encountered a problem", data: error});

    }
}

export const uploadImages = (req, res, next) => {
    res.send("uploaded successfully")
}

