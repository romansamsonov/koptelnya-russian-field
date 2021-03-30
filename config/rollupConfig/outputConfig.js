const distFolder = "./dist/js";

export default function config(asESModules) {
    const dir = asESModules ? distFolder : `${distFolder}/nomodule`;
    const format = asESModules ? 'esm' : 'iife';
    const entryFileNames = asESModules ? '[name].js' : '[name]-bundle.js';

    const config = {dir, format, entryFileNames};

    if (asESModules) {
        config['chunkFileNames'] = '[name].js';
        config['dynamicImportFunction'] = '__import__';
    }

    return config;
}
