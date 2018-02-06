import { File } from './File'

export function setSettings (settings: { extensions?: any}){
    if (settings.extensions) {
        File.registerExtensions(settings.extensions);
    }
};