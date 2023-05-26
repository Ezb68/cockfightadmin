/** @type {import('next').NextConfig} */
const path = require('path')

const nextConfig = {
  reactStrictMode: true,
  sassOptions: {
    fiber: false,
    includePaths: [path.join(__dirname, 'styles')],
  },
}


const sassOptions = {

}

module.exports = nextConfig
