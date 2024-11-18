
document.getElementById('login-btn').addEventListener('click', () => {
    document.getElementById('login-modal').classList.remove('hidden');
  });
  
  document.getElementById('register-btn').addEventListener('click', () => {
    document.getElementById('register-modal').classList.remove('hidden');
  });
  
  document.getElementById('close-login').addEventListener('click', () => {
    document.getElementById('login-modal').classList.add('hidden');
  });
  
  document.getElementById('close-register').addEventListener('click', () => {
    document.getElementById('register-modal').classList.add('hidden');
  });
  