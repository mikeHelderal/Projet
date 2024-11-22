
import {Events, Publications} from "../models/index.js";

export const uploadImage = async (req, res, next) => {
    //code de add publication
    let profilePicture = ""
    const publicationObject = req.body
    try {
       
       
        if (req.file) {
            const { buffer, originalname } = req.file
            const timestamp = Date.now()
            const name = originalname.split('.');

            const ref = `${name[0]}-${timestamp}.jpeg`
            const path = `./uploads/${ref}`
            profilePicture = `${req.protocol}://${req.get('host')}/uploads/${ref}`
        }
        req.body.image = profilePicture ;

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


export const uploadImageEvent = async (req, res, next) => {
    //code de add publication
    let profilePicture = ""
    const EventObject = req.body
    try {
       
       
        if (req.file) {
            const { buffer, originalname } = req.file
            const timestamp = Date.now()
            const name = originalname.split('.');

            const ref = `${name[0]}-${timestamp}.jpeg`
            const path = `./uploads/${ref}`
            profilePicture = `${req.protocol}://${req.get('host')}/uploads/${ref}`
        }
        req.body.image = profilePicture ;

        const event = {
            title: EventObject.title,
            image: profilePicture,
            content: EventObject.content,
            UserId: EventObject.UserId,
            adresse: EventObject.adresse,
            ville: EventObject.ville,
            date_event: EventObject.date_event,
            heure_debut: EventObject.heure_debut,
            heure_fin: EventObject.heure_fin,


        }
        
        const response = await Events.create(event);
        res.status(201).json({message: "Event added successfully", data: response})
    } catch (error) {
        res.status(500).json({message : "add Event encountered a problem", data: error});

    }
}

