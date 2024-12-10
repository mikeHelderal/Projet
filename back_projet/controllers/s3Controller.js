import { GetObjectCommand } from"@aws-sdk/client-s3";
import s3Client from '../config/S3';
import stream from 'stream';
import { autoAsyncHandler } from '../Utils/asyncHandler';

const generateSignedUrl = async (req, res) => {
    const { key } = req.body; // On récupère le key de l'image depuis l'URL
    const bucketName = process.env.AWS_BUCKET_NAME; // Nom du bucket S3

    // Prépare la commande pour récupérer l'objet
    const command = new GetObjectCommand({
        Bucket: bucketName,
        Key: key, // Chemin du fichier dans le bucket S3
    });

    // Exécute la commande pour obtenir l'objet
    const data = await s3Client.send(command);

    // Créer un stream pour transférer les données de S3
    const passThrough = new stream.PassThrough();
    data.Body.pipe(passThrough);

    
        res.setHeader('Content-Type', data.ContentType);

    passThrough.pipe(res);
};


export default  autoAsyncHandler({
    generateSignedUrl
});