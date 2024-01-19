const zlib = require('zlib')

async function compressSent (data){
    data = JSON.stringify(data); 
    // Convert the JSON string to a Buffer
    data = Buffer.from(data);
    // Compress the data
    return zlib.gzipSync(data);
}



async function decompressSent (data){
    // Decode base64 string to Buffer
    data = Buffer.from(data, 'base64');

    // Decompress the Buffer
    data = zlib.gunzipSync(data);

    // Parse the decompressed data back to the array of products
    return JSON.parse(data.toString());
}


module.exports = {
    compressSent,
    decompressSent
};