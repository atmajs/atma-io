import { File } from '../File'
import { logger } from '../global'
import { Env } from '../Env'

export const JsonMiddleware = {
    read(file: File) {
		if (typeof file.content !== 'string') {
            return;
        }

        try {
            file.content = JSON.parse(file.content);
        } catch (error) {
            logger.error(`<json:parser> ${file.uri.toString()} ${error}`);
        }
    },

    write(file: File, config) {

        if (file.content == null || typeof file.content !== 'object') {
            return;
        }

        try {
            var indent = config && config.minify
                ? null
                : 2
                ;

            file.content = JSON
                .stringify(file.content, null, indent)
                .replace(/\n/g, Env.newLine)
                ;

        } catch (error) {
            logger.error(`<json:stringify> ${file.uri.toString()} ${error}`);
        }

    }
};
