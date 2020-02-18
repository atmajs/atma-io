import { Io } from './IIo'

const g = global as any;
const logger = g.logger || require('atma-logger');
const io: Io = {} as any

export {
    g as global
};

export {
    logger,
    io
};