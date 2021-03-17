const path = require('path');

const resolveWhenRelative = (dirname) => (dir) => path.isAbsolute(dir) ? dir : path.resolve(dirname, dir)

const createWebpackLibraryConfig = ({ type, entry, output, name }) => (dirname) => (env, args) => {
    const resolveToCwd = resolveWhenRelative(dirname);
    const config = {
        entry: {
            [name]: resolveToCwd(entry)
        },
        output: {
            path: resolveToCwd(output),
            filename: `[name].${type}.js`,
            library: {
                type,
                name
            }
        }
    }

    return config;
}

module.exports = {
    createWebpackLibraryConfig
}