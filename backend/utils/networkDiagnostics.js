/**
 * Network Diagnostics Utility
 * Helps diagnose network connectivity issues
 */

const dns = require('dns').promises;
const https = require('https');

/**
 * Check if a hostname can be resolved
 */
async function checkDNSResolution(hostname) {
  try {
    const addresses = await dns.resolve4(hostname);
    return {
      success: true,
      hostname,
      addresses,
      message: `DNS resolution successful for ${hostname}`
    };
  } catch (error) {
    return {
      success: false,
      hostname,
      error: error.message,
      code: error.code,
      message: `DNS resolution failed for ${hostname}: ${error.message}`
    };
  }
}

/**
 * Check if a URL is reachable
 */
function checkHTTPSReachability(url) {
  return new Promise((resolve) => {
    const timeout = 5000; // 5 seconds
    const timer = setTimeout(() => {
      req.destroy();
      resolve({
        success: false,
        url,
        error: 'Connection timeout',
        message: `Connection to ${url} timed out after ${timeout}ms`
      });
    }, timeout);

    const req = https.get(url, (res) => {
      clearTimeout(timer);
      resolve({
        success: true,
        url,
        statusCode: res.statusCode,
        message: `Successfully connected to ${url} (Status: ${res.statusCode})`
      });
      res.destroy();
    });

    req.on('error', (error) => {
      clearTimeout(timer);
      resolve({
        success: false,
        url,
        error: error.message,
        code: error.code,
        message: `Failed to connect to ${url}: ${error.message}`
      });
    });
  });
}

/**
 * Run comprehensive network diagnostics
 */
async function runNetworkDiagnostics() {
  const results = {
    timestamp: new Date().toISOString(),
    checks: []
  };

  // Check DNS resolution for Google APIs
  const dnsChecks = [
    'oauth2.googleapis.com',
    'www.googleapis.com',
    'googleapis.com'
  ];

  for (const hostname of dnsChecks) {
    const dnsResult = await checkDNSResolution(hostname);
    results.checks.push({
      type: 'DNS',
      ...dnsResult
    });
  }

  // Check HTTPS connectivity
  const httpsChecks = [
    'https://oauth2.googleapis.com',
    'https://www.googleapis.com'
  ];

  for (const url of httpsChecks) {
    const httpsResult = await checkHTTPSReachability(url);
    results.checks.push({
      type: 'HTTPS',
      ...httpsResult
    });
  }

  // Summary
  const allSuccessful = results.checks.every(check => check.success);
  results.summary = {
    allChecksPassed: allSuccessful,
    totalChecks: results.checks.length,
    passedChecks: results.checks.filter(check => check.success).length,
    failedChecks: results.checks.filter(check => !check.success).length
  };

  return results;
}

module.exports = {
  checkDNSResolution,
  checkHTTPSReachability,
  runNetworkDiagnostics
};



