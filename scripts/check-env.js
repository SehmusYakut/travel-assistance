#!/usr/bin/env node

/**
 * Environment Security Check Script
 * Validates that API keys are properly configured and secure
 */

const fs = require('fs');
const path = require('path');

const RED = '\x1b[31m';
const GREEN = '\x1b[32m';
const YELLOW = '\x1b[33m';
const RESET = '\x1b[0m';

function log(message, color = RESET) {
  console.log(`${color}${message}${RESET}`);
}

function checkFile(filePath, description) {
  if (fs.existsSync(filePath)) {
    log(`✅ ${description} exists`, GREEN);
    return true;
  } else {
    log(`❌ ${description} missing`, RED);
    return false;
  }
}

function validateEnvironmentFiles() {
  log('\n🔍 Checking environment files...\n');
  
  let hasErrors = false;
  
  // Check that .env.example exists
  if (!checkFile('.env.example', '.env.example')) {
    hasErrors = true;
  }
  
  // Check that .env.local does NOT exist in repo (should be gitignored)
  if (fs.existsSync('.env.local')) {
    log(`❌ .env.local found in repository! This should be gitignored.`, RED);
    hasErrors = true;
  } else {
    log(`✅ .env.local not in repository (correct)`, GREEN);
  }
  
  // Check .gitignore patterns
  const gitignoreContent = fs.existsSync('.gitignore') ? fs.readFileSync('.gitignore', 'utf8') : '';
  const requiredPatterns = ['.env*', '*.key', '*.pem'];
  
  for (const pattern of requiredPatterns) {
    if (gitignoreContent.includes(pattern)) {
      log(`✅ .gitignore includes ${pattern}`, GREEN);
    } else {
      log(`❌ .gitignore missing ${pattern}`, RED);
      hasErrors = true;
    }
  }
  
  return !hasErrors;
}

function checkAPIKeyConfiguration() {
  log('\n🔑 Checking API key configuration...\n');
  
  let hasErrors = false;
  
  // Check if API key is set
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
  
  if (!apiKey) {
    log(`⚠️  NEXT_PUBLIC_GOOGLE_MAPS_API_KEY not set in environment`, YELLOW);
    log(`   This is expected in CI/CD, but required for local development`, YELLOW);
  } else if (apiKey === 'your_google_maps_api_key_here' || apiKey === 'your_actual_google_maps_api_key_here') {
    log(`❌ API key is still using placeholder value`, RED);
    hasErrors = true;
  } else if (apiKey.length < 30) {
    log(`❌ API key appears to be too short (possible invalid key)`, RED);
    hasErrors = true;
  } else if (!apiKey.startsWith('AIza')) {
    log(`⚠️  API key doesn't start with 'AIza' (unusual for Google Maps)`, YELLOW);
  } else {
    log(`✅ API key appears to be properly configured`, GREEN);
  }
  
  return !hasErrors;
}

function scanForHardcodedSecrets() {
  log('\n🕵️  Scanning for hardcoded secrets...\n');
  
  const patterns = [
    { regex: /AIza[0-9A-Za-z\\-_]{35}/, description: 'Google API Key' },
    { regex: /sk-[a-zA-Z0-9]{32,}/, description: 'OpenAI API Key' },
    { regex: /(password|secret|token)\s*[:=]\s*['""][^'""]{8,}/, description: 'Potential hardcoded secret' }
  ];
  
  const excludeFiles = ['.git', 'node_modules', '.next', 'scripts', 'SECURITY.md'];
  const includeExtensions = ['.ts', '.tsx', '.js', '.jsx', '.json'];
  
  let hasSecrets = false;
  
  function scanDirectory(dir) {
    const files = fs.readdirSync(dir);
    
    for (const file of files) {
      const filePath = path.join(dir, file);
      const stat = fs.statSync(filePath);
      
      if (stat.isDirectory() && !excludeFiles.includes(file)) {
        scanDirectory(filePath);
      } else if (stat.isFile() && includeExtensions.some(ext => file.endsWith(ext))) {
        const content = fs.readFileSync(filePath, 'utf8');
        
        for (const pattern of patterns) {
          if (pattern.regex.test(content)) {
            log(`❌ Potential ${pattern.description} found in ${filePath}`, RED);
            hasSecrets = true;
          }
        }
      }
    }
  }
  
  try {
    scanDirectory('.');
    if (!hasSecrets) {
      log(`✅ No obvious hardcoded secrets detected`, GREEN);
    }
  } catch (error) {
    log(`⚠️  Error during scanning: ${error.message}`, YELLOW);
  }
  
  return !hasSecrets;
}

function generateSecurityReport() {
  log('\n📋 Security Report Summary\n', YELLOW);
  
  const envCheck = validateEnvironmentFiles();
  const apiCheck = checkAPIKeyConfiguration();
  const secretsCheck = scanForHardcodedSecrets();
  
  const allPassed = envCheck && apiCheck && secretsCheck;
  
  if (allPassed) {
    log('\n🎉 All security checks passed!', GREEN);
    log('Your API key configuration appears secure.', GREEN);
  } else {
    log('\n⚠️  Some security issues detected!', RED);
    log('Please review the issues above and fix them.', RED);
  }
  
  log('\n📚 Security Resources:');
  log('- Security Guide: ./SECURITY.md');
  log('- GitGuardian: https://blog.gitguardian.com/secrets-api-management/');
  log('- Google Maps Security: https://developers.google.com/maps/api-security-best-practices');
  
  return allPassed;
}

// Main execution
if (require.main === module) {
  const success = generateSecurityReport();
  process.exit(success ? 0 : 1);
}

module.exports = {
  validateEnvironmentFiles,
  checkAPIKeyConfiguration,
  scanForHardcodedSecrets,
  generateSecurityReport
};