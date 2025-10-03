module.exports = {
  apps: [
    {
      name: "random-riddle-api",
      script: "src/app.ts",
      interpreter: "ts-node",
      instances: 1,
      exec_mode: "fork",
      env: {
        NODE_ENV: "development",
        PORT: 8080,
      },
      env_production: {
        NODE_ENV: "production",
        PORT: 8080,
      },
      // Restart options
      max_memory_restart: "1G",
      restart_delay: 4000,

      // Logging
      log_file: "./logs/app.log",
      out_file: "./logs/out.log",
      error_file: "./logs/error.log",

      // Watch options (disable in production)
      watch: false,
      ignore_watch: ["node_modules", "logs"],
    },
  ],
};
