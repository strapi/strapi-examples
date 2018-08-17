/* eslint-disable import/unambiguous */

const withBundleAnalyzer = require('@zeit/next-bundle-analyzer')

module.exports = withBundleAnalyzer({
  analyzeServer: ['server', 'both'].includes(process.env.BUNDLE_ANALYZE),
  analyzeBrowser: ['browser', 'both'].includes(process.env.BUNDLE_ANALYZE),
  bundleAnalyzerConfig: {
    server: {
      analyzerMode: 'static',
      reportFilename: 'bundle-analysis-server.html'
    },
    browser: {
      analyzerMode: 'static',
      reportFilename: 'bundle-analysis-browser.html'
    }
  }
})
