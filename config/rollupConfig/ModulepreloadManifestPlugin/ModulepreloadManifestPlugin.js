export default function modulepreloadPlugin() {
    return {
        name: 'modulepreload',
        generateBundle(options, bundle) {
            const modulepreloadMap = {};

            for (const [fileName, chunkInfo] of Object.entries(bundle)) {
                if (chunkInfo.isEntry) {
                    modulepreloadMap[chunkInfo.name] = [fileName, ...chunkInfo.imports];
                }
            }

            this.emitFile({
                type: 'asset',
                fileName: 'modulepreload.json',
                source: JSON.stringify(modulepreloadMap, null, 2),
            });
        },
    };
}
