module.exports = {
  apps: [
    {
      name: 'shri-haridutt-ayurvedic-college',
      script: './node_modules/next/dist/bin/next',
      args: 'start',
      env_production: {
        NODE_ENV: 'production',
        PORT: process.env.PORT || 3000,
      },
      instances: 'max',
      exec_mode: 'cluster',
      autorestart: true,
      watch: false,
      max_memory_restart: '1G',
    },
  ],
};
