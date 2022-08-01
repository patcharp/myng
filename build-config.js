console.log('Building environment configuration file');
// Read .env file into environment file
require('dotenv').config({ path: '.env' });
const envConfigFile = `// This file was generate from script, You should not commit or upload this file to public
// It was contain many system credential for build only
export const config = {
    production: ${process.env.PRODUCTION === 'true'},
    app_name: '${process.env.APP_NAME}',
    app_version: '${process.env.VERSION}',
    build_time: '${process.env.BUILD_TIME}',
    build_commit: '${process.env.BUILD_COMMIT}',
};
`;

// Set target file path
const targetEnvFile = './src/environments/config.ts';
const fs = require('fs');
fs.writeFile(targetEnvFile, envConfigFile, function (err) {
    if (err) {
        throw console.error(err);
    } else {
        console.log('Already write config to file >', targetEnvFile);
    }
})
