import { Encrypt } from '../../../src/util/encrypt';
import { File } from '../../../src/File'


const path_Secret = 'test/bin/encrypted.json';


UTest({
    '$config': {
        timeout: Infinity,
    },
    '$before'() {
        if (File.exists(path_Secret)) {
            File.remove(path_Secret);
        }
    },
    'encrypt - decrypt content' () {
        const secret = 'hello';
        const message = 'lorem';

        const cipher = Encrypt.encrypt(Buffer.from(message), {
            secret
        });

        notEq_(cipher.toString(), message);

        const decipher = Encrypt.decrypt(cipher, { secret });
        eq_(decipher.toString(), message);

        let err: Error;
        try {
            const decipherWrong = Encrypt.decrypt(cipher, { secret: 'hello1' });
        } catch (error) {
            err = error;
        }
        eq_(err.message, 'Invalid secret key or data');
    },
    async 'encrypt - decrypt files, also when hooks are used' () {
        let json  = {
            date: Date.now()
        };
        let secret = 'mysecret';
        await File.writeAsync(path_Secret, json, {
            aes256: { secret }
        });

        File.clearCache();

        let source = await File.readAsync(path_Secret, {
            skipHooks: true,
            encoding: 'utf8'
        });
        hasNot_(source, 'date');

        File.clearCache();

        let back = await File.readAsync(path_Secret, {
            aes256: { secret }
        });
        deepEq_(json, back);

        File.clearCache();

        let err: Error;
        try {
            let invalidBack = await File.readAsync(path_Secret, {
                aes256: {
                    secret: 'invalid_key'
                }
            });
        } catch (error) {
            err = error;
        }
        notEq_(err, null);
        eq_(err.message, 'Invalid secret key or data');
    }
})
