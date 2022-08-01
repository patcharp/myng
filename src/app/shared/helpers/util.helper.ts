/**
 * Generate random salt
 * @param len: number
 * Cr: https://stackoverflow.com/questions/1349404/generate-random-string-characters-in-javascript
 */
export function generateSalt(len: number): string {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    for (let i = 0; i < len; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

/**
 * Generate table title
 * @param count: number
 * @param total: number
 * @param unit: string
 */
export function viewTblTitle(count: number, total: number, unit: string): string {
    return `จำนวนแสดง ${numberWithCommas(count || 0)} ${unit} จากทั้งหมด ${numberWithCommas(total || 0)} ${unit}`;
}

/**
 * Rearrange number to beautiful number format
 * @param x: number
 */
export function numberWithCommas(x: number): string {
    const parts = x.toString().split('.');
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    return parts.join('.');
}

/**
 * Check empty object
 * @param object: object
 */
export const isEmptyObj = (object: object) => !Object.getOwnPropertySymbols(object).length && !Object.getOwnPropertyNames(object).length;

/**
 * Convert Array buffer to string
 * @param buffer: ArrayBuffer
 */
export const arrayBufferToBase64 = (buffer: ArrayBuffer): string => {
    let binary = '';
    const bytes = new Uint8Array(buffer);
    const len = bytes.byteLength;
    for (let i = 0; i < len; i++) {
        binary += String.fromCharCode(bytes[i]);
    }
    return window.btoa(binary);
};

import * as CryptoJS from 'crypto-js';

/**
 * Encrypt text with secret key
 * @param text: string
 * @param key: string
 */
export const encryptSecret = (text: string, key: string, iv: string): string =>
    CryptoJS.AES.encrypt(text, CryptoJS.enc.Utf8.parse(key), {
        iv: CryptoJS.enc.Utf8.parse(iv), // parse the IV 
        padding: CryptoJS.pad.Pkcs7,
        mode: CryptoJS.mode.CBC
    }).toString();


/**
 * Decrypt cipher with secret key
 * @param cipherText: string
 * @param key: string
 */
export const decryptSecret = (cipherText: string, key: string, iv: string): string =>
    CryptoJS.AES.decrypt(cipherText, key, {
        iv: CryptoJS.enc.Utf8.parse(iv), // parse the IV 
        padding: CryptoJS.pad.Pkcs7,
        mode: CryptoJS.mode.CBC
    }).toString(CryptoJS.enc.Utf8)
