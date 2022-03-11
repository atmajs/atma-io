import { Env } from '../src/Env';

UTest({

    'readFiles - directory' () {
        has_(Env.applicationDir.toString(), /atma\/$/);
    },
});
