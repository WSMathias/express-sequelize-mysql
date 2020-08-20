const dotenv = require('dotenv')

const autorestart = true
const watch = false
const maxMemoryRestart = '512M'

module.exports = {
  apps: [
    {
      name: 'myapp_dev',
      script: 'npm run clear && npm run dev',
      instances: 1,
      autorestart,
      watch,
      max_memory_restart: maxMemoryRestart,
      env: dotenv.config({ path: './config/.env.dev' }).parsed
    },
    {
      name: 'myapp_deb',
      script: 'npm run clear && npm run deb',
      instances: 1,
      autorestart,
      watch,
      max_memory_restart: maxMemoryRestart,
      env: dotenv.config({ path: './config/.env.deb' }).parsed
    },
    {
      name: 'myapp_sta',
      script: 'npm run clear && npm run sta',
      instances: 1,
      autorestart,
      watch,
      max_memory_restart: maxMemoryRestart,
      env: dotenv.config({ path: './config/.env.sta' }).parsed
    },
    {
      name: 'myapp_pro',
      script: 'npm run clear && npm run build && npm run start',
      instances: 1,
      autorestart,
      watch,
      max_memory_restart: maxMemoryRestart,
      env: dotenv.config({ path: './config/.env.pro' }).parsed
    }
  ],

  deploy: {
    myapp_dev: {
      user: 'zupstock',
      host: '192.168.1.103',
      ref: 'origin/master',
      repo: 'git@github.com:owner/myapp_v1.git',
      path: '/',
      'post-deploy':
        'cd myapp_v1 && npm install && pm2 startOrRestart ecosystem.config.js --only myapp_dev'
    }
  }
}
