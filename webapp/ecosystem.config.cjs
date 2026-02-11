module.exports = {
  apps : [{
    name   : "hono-api",
    script : "dist/index.js",
    instances: 6,
    exec_mode: "cluster"
  }]
}