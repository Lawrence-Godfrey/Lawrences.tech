const appRoot = process.env.APP_CURRENT_DIR || __dirname;
const appName = process.env.PM2_APP_NAME || 'backend';

module.exports = {
    apps: [
        {
            name: appName,
            cwd: appRoot,
            script: 'server/bin/www.js',
            instances: 1,
            exec_mode: 'fork',
            time: true,
            env: {
                NODE_ENV: 'production',
            },
            env_production: {
                NODE_ENV: 'production',
            },
        },
    ],
};