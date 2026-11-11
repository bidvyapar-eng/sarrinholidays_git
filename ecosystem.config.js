module.exports = {
  apps: [
    {
      name: "sarrinholidays",
      script: "node_modules/next/dist/bin/next",
      args: "start -p 999",
      cwd: "/opt/projects/sarrinholidays",
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: "1G",
      env: {
        NODE_ENV: "production",
        PORT: "999",
        NEXT_PUBLIC_SITE_URL: "https://sarrin.bidvyapar.com"
      }
    }
  ]
};
