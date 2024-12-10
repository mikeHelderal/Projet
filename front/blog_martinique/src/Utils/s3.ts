import { URl } from '../../src/Utils/Constant/URL';


export const getFileByKey = async (key: any) => {
    return await fetch( URl.IMAGE_S3, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ key })
    });
}