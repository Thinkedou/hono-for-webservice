module.exports = {
  apps : [{
    name   : "hono-api",
    script : "dist/index.js",
    instances: "max",
    exec_mode: "cluster"
  }]
}