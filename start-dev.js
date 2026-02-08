const { Nuxt, Builder } = require('nuxt')
const config = require('./nuxt.config.js')
const net = require('net')

// Function to check if port is available
function isPortAvailable(port) {
  return new Promise((resolve) => {
    const server = net.createServer()

    server.once('error', (err) => {
      if (err.code === 'EADDRINUSE') {
        resolve(false)
      } else {
        resolve(false)
      }
    })

    server.once('listening', () => {
      server.close()
      resolve(true)
    })

    server.listen(port, '0.0.0.0')
  })
}

// Function to find available port
async function findAvailablePort(startPort, maxAttempts = 10) {
  for (let i = 0; i < maxAttempts; i++) {
    const port = startPort + i
    const available = await isPortAvailable(port)
    if (available) {
      return port
    }
    console.log(`Port ${port} is busy, trying next port...`)
  }
  throw new Error(`Could not find available port after ${maxAttempts} attempts`)
}

async function start() {
  const defaultPort = config.server?.port || 3000
  const host = config.server?.host || 'localhost'

  // Find available port starting from default port
  const availablePort = await findAvailablePort(defaultPort)

  if (availablePort !== defaultPort) {
    console.log(`\x1b[33m⚠ Port ${defaultPort} is in use, using port ${availablePort} instead\x1b[0m`)
  }

  // Update config with available port
  config.server = {
    ...config.server,
    port: availablePort,
    host
  }

  // Create nuxt instance
  const nuxt = new Nuxt(config)

  // Enable live build & reloading on dev
  if (config.dev !== false) {
    const builder = new Builder(nuxt)
    await builder.build()
  }

  // Start server
  await nuxt.listen(availablePort, host)

  console.log(`\x1b[32m✓ Server running on http://${host}:${availablePort}\x1b[0m`)
}

start().catch((err) => {
  console.error('Error starting server:', err)
  process.exit(1)
})
