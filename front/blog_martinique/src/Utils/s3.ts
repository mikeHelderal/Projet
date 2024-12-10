export const getFileByKey = async (key: any) => {
    return await fetch('/s3/get', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ key })
    });
}