#!/usr/bin/env node

/**
 * API Key Rotation Helper Script
 * Helps rotate Google Maps API keys securely
 */

const fs = require('fs');
const readline = require('readline');

const RED = '\x1b[31m';
const GREEN = '\x1b[32m';
const YELLOW = '\x1b[33m';
const BLUE = '\x1b[34m';
const RESET = '\x1b[0m';

function log(message, color = RESET) {
  console.log(`${color}${message}${RESET}`);
}

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function askQuestion(question) {
  return new Promise((resolve) => {
    rl.question(question, resolve);
  });
}

async function rotateAPIKey() {
  log('\n🔄 Google Maps API Key Rotation Helper\n', BLUE);
  
  log('This script will help you safely rotate your Google Maps API key.\n');
  
  // Step 1: Verify current setup
  log('📋 Pre-rotation Checklist:', YELLOW);
  log('1. ✅ Have access to Google Cloud Console');
  log('2. ✅ Backup current .env.local file');
  log('3. ✅ Ready to deploy updated environment variables');
  log('4. ✅ Monitoring/alerting configured for API usage\n');
  
  const proceed = await askQuestion('Do you want to proceed with rotation? (y/N): ');
  if (proceed.toLowerCase() !== 'y') {
    log('❌ Rotation cancelled.', YELLOW);
    rl.close();
    return;
  }
  
  // Step 2: Generate new key instructions
  log('\n🔑 Step 1: Generate New API Key', BLUE);
  log('1. Go to Google Cloud Console: https://console.cloud.google.com/');
  log('2. Navigate to APIs & Services > Credentials');
  log('3. Click "CREATE CREDENTIALS" > "API key"');
  log('4. Copy the new API key');
  log('5. Apply the same restrictions as your current key:');
  log('   - Application restrictions (HTTP referrers)');
  log('   - API restrictions (Maps JavaScript, Places, Geocoding)');
  
  const newKey = await askQuestion('\nEnter your new API key: ');
  
  if (!newKey || newKey.length < 30 || !newKey.startsWith('AIza')) {
    log('❌ Invalid API key format. Please check and try again.', RED);
    rl.close();
    return;
  }
  
  // Step 3: Update .env.local
  log('\n📝 Step 2: Updating .env.local', BLUE);
  
  if (!fs.existsSync('.env.local')) {
    log('❌ .env.local not found. Creating new file...', YELLOW);
  }
  
  // Read current .env.local or create new
  let envContent = '';
  if (fs.existsSync('.env.local')) {
    envContent = fs.readFileSync('.env.local', 'utf8');
  }
  
  // Update or add the API key
  if (envContent.includes('NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=')) {
    envContent = envContent.replace(
      /NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=.*/,
      `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=${newKey}`
    );
  } else {
    envContent += `\nNEXT_PUBLIC_GOOGLE_MAPS_API_KEY=${newKey}\n`;
  }
  
  // Backup old file
  if (fs.existsSync('.env.local')) {
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    fs.copyFileSync('.env.local', `.env.local.backup.${timestamp}`);
    log(`✅ Backup created: .env.local.backup.${timestamp}`, GREEN);
  }
  
  // Write new file
  fs.writeFileSync('.env.local', envContent);
  log('✅ .env.local updated with new API key', GREEN);
  
  // Step 4: Testing instructions
  log('\n🧪 Step 3: Testing', BLUE);
  log('1. Run: npm run dev');
  log('2. Test all map functionality in your application');
  log('3. Verify Places search works correctly');
  log('4. Check browser console for any API errors');
  
  const testComplete = await askQuestion('\nHave you completed testing? (y/N): ');
  if (testComplete.toLowerCase() !== 'y') {
    log('⚠️  Please complete testing before proceeding.', YELLOW);
    rl.close();
    return;
  }
  
  // Step 5: Deployment instructions
  log('\n🚀 Step 4: Deployment', BLUE);
  log('1. Update environment variables in your deployment platform:');
  log('   - Netlify: Site settings > Environment variables');
  log('   - Vercel: Project settings > Environment variables');
  log('   - Other: Update according to platform documentation');
  log('2. Deploy your application');
  log('3. Test production deployment');
  
  const deployComplete = await askQuestion('\nHave you completed deployment? (y/N): ');
  if (deployComplete.toLowerCase() !== 'y') {
    log('⚠️  Please complete deployment before finalizing rotation.', YELLOW);
    rl.close();
    return;
  }
  
  // Step 6: Cleanup instructions
  log('\n🧹 Step 5: Cleanup', BLUE);
  log('1. Wait 24-48 hours to ensure stability');
  log('2. Disable/delete the old API key in Google Cloud Console');
  log('3. Update your password manager/documentation');
  log('4. Schedule next rotation (recommended: 30-90 days)');
  
  // Generate rotation log
  const rotationLog = {
    timestamp: new Date().toISOString(),
    oldKeyLastChars: '****',
    newKeyLastChars: newKey.slice(-4),
    nextRotationDue: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000).toISOString(), // 60 days
    status: 'completed'
  };
  
  fs.writeFileSync('.api-rotation-log.json', JSON.stringify(rotationLog, null, 2));
  log('\n✅ API key rotation completed successfully!', GREEN);
  log('📋 Rotation log saved to .api-rotation-log.json', GREEN);
  log(`📅 Next rotation recommended: ${rotationLog.nextRotationDue.split('T')[0]}`, YELLOW);
  
  rl.close();
}

// Main execution
if (require.main === module) {
  rotateAPIKey().catch(console.error);
}

module.exports = { rotateAPIKey };