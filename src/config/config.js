const port = 3000;
const secretKey = "some secret key";
const timeExpired = 900; // 15 minutes

module.exports ={
    port : port,
    jwt : {
        secret: secretKey,
        expire: timeExpired
    }
}