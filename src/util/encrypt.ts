export interface IEncryptionParams {
    secret: string | Buffer
}

const CIPHER_ALGO = 'aes-256-ctr';

export namespace Encrypt {

    let crypto: typeof import('crypto');

    export function encrypt(buffer: Buffer, opts: IEncryptionParams): Buffer {
        let { secret } = opts;

        crypto = crypto ?? require('crypto');

        if (buffer.length === 0) {
            return Buffer.from([]);
        }

        // we use salt only for derived keys. When the password was provided, in case of Buffer it should be already cryptographically strong.
        const { key, salt } = getKeyToEncrypt(secret);
        const iv = crypto.randomBytes(16);
        const cipher = crypto.createCipheriv(CIPHER_ALGO, key, iv);

        const ciphertext = cipher.update(buffer);
        const encrypted = Buffer.concat([salt, iv, ciphertext, cipher.final()].filter(Boolean));
        return encrypted;
    }

    export function decrypt(buffer: Buffer, opts: IEncryptionParams): Buffer {
        let { secret } = opts;

        crypto ??= require('crypto');

        if (buffer.length === 0) {
            return Buffer.from([]);
        }
        if (Buffer.byteLength(buffer) < 17) {
            throw new TypeError('Provided "encrypted" must decrypt to a non-empty string or buffer');
        }
        const { key, salt } = getKeyToDecrypt(secret, buffer);
        if (salt != null) {
            buffer = buffer.slice(salt.length);
        }

        const iv = buffer.slice(0, 16);
        const decipher = crypto.createDecipheriv(CIPHER_ALGO, key, iv);
        const cipherbuf = buffer.slice(16);
        const output = Buffer.concat([decipher.update(cipherbuf), decipher.final()]);
        return output;
    }


    export function delegateEncrypt (params: IEncryptionParams) {
        return function (content: Buffer): Buffer {
            return encrypt(content, params);
        };
    }
    export function delegateDecrypt (params: IEncryptionParams) {
        return function (content: Buffer): Buffer {
            return decrypt(content, params);
        };
    }

    function getKeyToEncrypt (secret: string | Buffer): { key: Buffer, salt?: Buffer } {
        if (Buffer.isBuffer(secret)) {
            return { key: secret };
        }
        if (/^0x[a-f\d]$/i.test(secret)) {
            return { key: Buffer.from(secret.substring(2), 'hex') };
        }
        return derive(secret);
    }
    function getKeyToDecrypt (secret: string | Buffer, file: Buffer): { key: Buffer, salt?: Buffer } {
        if (Buffer.isBuffer(secret)) {
            return { key: secret };
        }
        if (/^0x[a-f\d]$/i.test(secret)) {
            return { key: Buffer.from(secret.substring(2), 'hex') };
        }

        let salt = file.slice(0, 32);
        return derive(secret, salt);
    }
    function derive(key: string, salt: Buffer = null) {

        crypto ??= require('crypto');
        salt ??= crypto.randomBytes(32);

        const derived = crypto.pbkdf2Sync(key, salt, 10_000, 32, 'sha256');
        return { key: derived, salt };
    }
}
