import glob from "glob";
import path from "path";

import Babel from "rollup-plugin-babel";
import NodeResolve from 'rollup-plugin-node-resolve';
import CommonJS from "rollup-plugin-commonjs";
import ModulepreloadManifestPlugin from "./ModulepreloadManifestPlugin/ModulepreloadManifestPlugin";
import {terser} from "rollup-plugin-terser";

const getEntries = () => {
    const files = glob.sync("src/js/*.js");

    return files.reduce((entries, entry) => {
        const {name} = path.parse(entry);
        entries[name] = `./${entry}`;

        return entries;
    }, {});
};

const getBabelConfig = asESModules => {
    const browsers = !asESModules ? ['ie 11'] : [
        'last 2 Chrome versions',
        'last 2 Safari versions',
        'last 2 iOS versions',
        'last 2 Edge versions',
        'Firefox ESR',
    ];

    return {
        exclude: /node_modules/,
        runtimeHelpers: true,
        presets: [
            [
                '@babel/preset-env',
                {
                    targets: {browsers},
                    useBuiltIns: 'usage',
                    corejs: 3,
                }
            ]
        ],
        plugins: [
            '@babel/plugin-transform-runtime',
            '@babel/plugin-proposal-class-properties',
            '@babel/plugin-proposal-private-methods'
        ]
    }
};

const getPlugins = (asESModules, isProduction) => {
    const babelConfig = getBabelConfig(asESModules);

    const plugins = [
        NodeResolve(),
        Babel(babelConfig),
        CommonJS(),
    ];

    if (asESModules) {
        plugins.push(ModulepreloadManifestPlugin());
    }

    if (isProduction) {
        plugins.push(terser({module: asESModules}))
    }

    return plugins;
};

const manualChunks = id => {
    if (id.includes('node_modules')) {
        const directories = id.split(path.sep);
        const externalModuleName = directories[directories.lastIndexOf('node_modules') + 1];

        return `${externalModuleName}.external`;
    }

    const {name} = path.parse(id);

    return `${name}`;
};

const config = (asESModules, isProduction) => {
    const entries = getEntries();
    const plugins = getPlugins(asESModules, isProduction);

    if (asESModules) {
        return [{input: entries, plugins, manualChunks}]
    }

    return Object.entries(entries).map(([entryName, entryPath]) => ({
        input: {[entryName]: entryPath},
        plugins,
        inlineDynamicImports: true,
    }));
};

export default config;
