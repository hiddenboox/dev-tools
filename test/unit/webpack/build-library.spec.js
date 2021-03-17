const path = require('path');
const webpack = require('webpack');

const { createWebpackLibraryConfig } = require('../../../webpack/build-library')

jest.setTimeout(100000);

const compiler = (config) => new Promise((resolve, reject) => {
    webpack(config, (err, stats) => {
        if (err) {
            console.log(err)
            reject(err)
        } else {
            console.log(stats)

            resolve(stats);
        }
    })
});

const createTemporaryDir = async (callback) => {
    const fs = require('fs/promises');

    const temporaryDirPath = path.resolve(__dirname, '.tmp');
    try {
        await fs.mkdir(temporaryDirPath);
        await callback(temporaryDirPath);
    } finally {
        await fs.rm(temporaryDirPath, { recursive: true, force: true });
    }
}

describe('webpack:build-library', () => {

    test('createWebpackLibraryConfig', async () => {
        await createTemporaryDir(async (temporaryDirPath) => {
            const config = createWebpackLibraryConfig({ type: 'umd', name: 'utils', entry: '../../fixtures/library/index.js', output: temporaryDirPath})(__dirname)() 

            expect(await compiler(config)).not.toThrow()
        });
    })
})