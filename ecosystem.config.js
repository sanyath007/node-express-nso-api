module.exports = {
    apps: [
        {
            name: "knex-test",
            script: "./dist/index.js",
            watch: true,
            instances: 2,
            env: {
                NODE_ENV: "development"
            },
            env_production: {
                NODE_ENV: "production"
            }
        }
    ]
}
