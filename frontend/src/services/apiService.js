import config from './constants.js';

// Connection test function
export const testBackendConnection = async () => {
  console.log('🔍 [CONNECTION] Testing backend connection...');
  console.log('🔍 [CONNECTION] Backend URL:', config.BACKEND_URL);
  
  try {
    const response = await fetch(`${config.BACKEND_URL}/health`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    
    if (response.ok) {
      console.log('✅ [CONNECTION] Backend connection successful!');
      console.log('✅ [CONNECTION] Status:', response.status, response.statusText);
      return { success: true, status: response.status };
    } else {
      console.error('❌ [CONNECTION] Backend connection failed!');
      console.error('❌ [CONNECTION] Status:', response.status, response.statusText);
      return { success: false, status: response.status, error: response.statusText };
    }
  } catch (error) {
    console.error('❌ [CONNECTION] Backend connection error:', error);
    console.error('❌ [CONNECTION] This usually means:');
    console.error('   - Backend is not running');
    console.error('   - Backend URL is incorrect');
    console.error('   - CORS issues');
    console.error('   - Network connectivity problems');
    return { success: false, error: error.message };
  }
};