export interface IEncryptionParams {
    secret: string
}

const CIPHER_ALGO = 'aes-256-ctr';

export namespace Encrypt {

    let crypto: typeof import('crypto');

    export function encrypt(buffer: Buffer, opts: IEncryptionParams): Buffer {
        let { secret } = opts;

        crypto = crypto ?? require("crypto");

        if (buffer.length === 0) {
            return Buffer.from([]);
        }

        if (typeof secret !== 'string' || secret.length === 0) {
            throw new TypeError('Secret must be a non-empty string');
        }

        // consider to use Rfc2898DeriveBytes

        const sha256 = crypto
            .createHash('sha256')
            .update(secret);

        const iv = crypto.randomBytes(16);
        const cipher = crypto.createCipheriv(CIPHER_ALGO, sha256.digest(), iv);


        const ciphertext = cipher.update(buffer);
        const encrypted = Buffer.concat([iv, ciphertext, cipher.final()]);
        return encrypted;
    }

    export function decrypt(buffer: Buffer, opts: IEncryptionParams): Buffer {
        let { secret } = opts;

        crypto = crypto ?? require("crypto");

        if (buffer.length === 0) {
            return Buffer.from([]);
        }

        const sha256 = crypto
            .createHash('sha256')
            .update(secret);

        if (Buffer.byteLength(buffer) < 17) {
            throw new TypeError('Provided "encrypted" must decrypt to a non-empty string or buffer');
        }

        const iv = buffer.slice(0, 16);
        const decipher = crypto.createDecipheriv(CIPHER_ALGO, sha256.digest(), iv);
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
}
