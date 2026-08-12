import createMDX from '@next/mdx'
 
/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ['js', 'jsx', 'mdx', 'ts', 'tsx'],
}
 
// We removed the rehype plugin to bypass the strict serialization error
const withMDX = createMDX()
 
export default withMDX(nextConfig)
