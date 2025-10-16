module.exports = {
  apps: [
    {
      name: 'shuffle-strapi',
      cwd: '/opt/shuffle-strapi',
      script: 'yarn',
      args: 'start',
      env: {
        NODE_ENV: 'production',
      },
      max_memory_restart: '512M',
      instances: 1,
      exec_mode: 'fork',
      autorestart: true,
      watch: false,
      error_file: './logs/err.log',
      out_file: './logs/out.log',
      log_file: './logs/combined.log',
      time: true,
    },
  ],
};
