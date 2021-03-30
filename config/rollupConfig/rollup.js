import {rollup, watch as rollupWatch} from "rollup";
import log from "fancy-log";

import inputConfig from "./inputConfig";
import outputConfig from "./outputConfig";

const getBuildFuncs = (inputConfigs, outputConfig) => {
    return inputConfigs.map((config) => {
        return (async () => {
            const bundle = await rollup(config);
            await bundle.write(outputConfig);
        })();
    });
};

export default async function build({asESModules = true, production = false, watch = false} = {}) {
    const inputCfgs = inputConfig(asESModules, production);
    const outputCfg = outputConfig(asESModules);

    if (watch) {
        const watcher = rollupWatch(inputCfgs.map(config => ({...config, output: outputCfg})));
        watcher.on('event', event => {
            if (event.code === 'BUNDLE_START') log.info('Start build JavaScript bundle');
            if (event.code === 'BUNDLE_END') log.info('End build JavaScript bundle');
            if (event.code === 'ERROR') log.error(event.error);
        });

        return;
    }

    await Promise.all(getBuildFuncs(inputCfgs, outputCfg));
}
