import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config();

console.log('\nTesting Environment Variables:');
console.log('------------------------------');

const requiredEnvVars = [
  'PORT',
  'MONGODB_URI',
  'JWT_SECRET',
  'JWT_EXPIRES_IN',
  'NODE_ENV'
];

let allVarsPresent = true;

requiredEnvVars.forEach(varName => {
  const value = process.env[varName];
  if (!value) {
    console.error(`❌ ${varName} is not set`);
    allVarsPresent = false;
  } else {
    // Don't show the actual JWT_SECRET value for security
    if (varName === 'JWT_SECRET') {
      console.log(`✅ ${varName} is set (value hidden for security)`);
    } else {
      console.log(`✅ ${varName} is set to: ${value}`);
    }
  }
});

console.log('\nMongoDB Connection Test:');
console.log('------------------------');

mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('✅ Successfully connected to MongoDB');
    mongoose.connection.close();
  })
  .catch(err => {
    console.error('❌ MongoDB connection error:', err.message);
  });

if (!allVarsPresent) {
  console.error('\n❌ Some required environment variables are missing!');
  process.exit(1);
} else {
  console.log('\n✅ All required environment variables are present!');
} 