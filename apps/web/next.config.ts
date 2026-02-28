import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
    reactStrictMode: true,
    transpilePackages: ['@universo/start-frt', '@universo/auth-frt'],
}

export default nextConfig
