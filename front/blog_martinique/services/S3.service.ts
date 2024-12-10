import { getFileByKey } from "../src/Utils/s3";

const getImageFromS3 = async (imageKey : any) => {
    if (imageKey === null || imageKey === undefined) return null;
    if (imageKey.charAt(0) == "/") imageKey = imageKey.substr(1);

    try {
        const response = await getFileByKey(imageKey);

        if (!response.ok) {
            throw new Error('Erreur lors de la récupération de l\'image');
        }

        // Convertir la réponse en blob (binary data)
        const imageBlob = await response.blob();
        return URL.createObjectURL(imageBlob);
    } catch (error) {
        console.error("Erreur lors de la récupération de l'image:", error);
        return null;
    }
}

export { getImageFromS3} ;