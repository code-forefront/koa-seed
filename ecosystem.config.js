const _ = require('lodash')

const isDev = !_.some(_.filter(process.argv, arg => {
  if (arg.indexOf('--') === 0) {
    return arg === '--production' || arg === '--staging'
  }
  return false
}))

module.exports = {
  apps: [{
    name: "<projectname>",
    script: "./dist/index.js",
    watch: isDev ? 'dist' : false,
    watch_options: {
      usePolling: true
    },
    env: {
      NODE_ENV: "development",
    },
    env_staging: {
      NODE_ENV: "staging",
    },
    env_production: {
      NODE_ENV: "production",
    }
  }],
  deploy: {
    production: {
      user: "root",
      host: ["<projecthost>"],
      ssh_options: "StrictHostKeyChecking=no",
      ref: "origin/master",
      repo: "git@bitbucket.org:<projectowner>/<projectname>.git",
      path: "/var/<projectname>",
      'pre-setup': "",
      'post-setup': "",
      'pre-deploy': "pm2 delete <projectname> || true",
      'post-deploy': "npm install && npm run build && pm2 start ./ecosystem.config.js --env production"
    },
  }
}