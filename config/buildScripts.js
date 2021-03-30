import rollup from "./rollupConfig/rollup";

export const scriptsRelease = async(done) => {
    await Promise.all([
        rollup({asESModules: true, production: true}),
        rollup({asESModules: false, production: true})
    ]);

    done();
};

export const scriptsDev = async(done) => {
    await rollup({asESModules: true});

    done();
};

export const scriptsWatch = async (done) => {
    await rollup({asESModules: true, watch: true});

    done();
};
