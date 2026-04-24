
import axios from "axios";


// import { BASE_URL, SUB_URL } from "../constant";
import crypto from "crypto";

function isTokenExpired(expiryTime) {
    if (!expiryTime) return true;
    return Date.now() >= expiryTime - 60000; // 60 sec buffer
}
async function fetchNewToken() {
    let body = {
        username: "imagicaaworld_api_user",
        password: "123456",
        secret_key: "MyFirstBikeIsTriumph"
    };
    // here will the cripted credentials be used
    const ConvertTOBase64 = (str) => {
        return Buffer.from(str).toString('base64');
    }
    const ConvertToAlphaNumeric = (str) => {
        return str.replace(/[^a-zA-Z0-9]/g, '');
    }

    const ConvertTOEncriptedFormat = (str) => {
        const algorithm = 'aes-256-cbc';
        const key = crypto.randomBytes(32); // or use a fixed key
        const iv = crypto.randomBytes(16);

        const cipher = crypto.createCipheriv(algorithm, key, iv);
        let encrypted = cipher.update(str, 'utf8', 'base64');
        encrypted += cipher.final('base64');

        return { encrypted, key: key.toString('hex'), iv: iv.toString('hex') };
    };
    let credentials = `${body.username}:${body.password}:${body.secret_key}`;
    const test1 = ConvertTOEncriptedFormat(credentials);


    const url_Token = `https://daveandbustersindia.com/nucleus_api/generate_token.php`;
    const response = await axios.post(url_Token, test1, {
        headers: { "Content-Type": "application/json", }
    });

    if (response.data.status === 1) {
        const token = response.data.token;
        const expiryTime = new Date(response.data.expiry_time).getTime();

        // Save to Cookies Storage
        // Cookies.set("token", token, { expires: new Date(expiryTime) });
        // Cookies.set("token_expiry", expiryTime, { expires: new Date(expiryTime) });            
        // saveToSessionStorage("token", token);
        // saveToSessionStorage("token_expiry", expiryTime);

        return token;
    } else {
        throw new Error("Failed to fetch token");
    }
}

export async function getToken() {
    // Check cookies first  
    // const token = Cookies.get("token");
    // if (token) {
    //   // Check if token is expired
    //   const expiry = Cookies.get("token_expiry");
    //   if (expiry && !isTokenExpired(parseInt(expiry))) {
    //     return token;
    //   }
    // }

    // const storedToken = getFromSessionStorage("token");
    // const storedExpiry = getFromSessionStorage("token_expiry");

    // if (storedToken && storedExpiry && !isTokenExpired(parseInt(storedExpiry))) {
    //     return storedToken;
    // }

    // Else get new one
    return await fetchNewToken();
}
