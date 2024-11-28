
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

document.getElementById('registerPet').addEventListener('click', () => {
    const petName = document.getElementById('petName');
    const petAge = document.getElementById('petAge');
    const petBreed = document.getElementById('petBreed');
    const petSize = document.getElementById('petSize');
    const petGender = document.getElementById('petGender');
    const petDescription = document.getElementById('petDescription');
    
    fetch('/api/v0/pets/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(
            { name: petName.value,
                age: petAge.value,
                 breed: petBreed.value, 
                 size: petSize.value,
                gender: petGender.value,
                description: petDescription.value})
                .then(response => response.json())
    })
});




  document.getElementById('registerForm').addEventListener('submit', async function(event) {
    event.preventDefault();
    const name = document.getElementById('registerName').value;
    const age = document.getElementById('registerAge').value;
    const email = document.getElementById('registerEmail').value;
    const password = document.getElementById('registerPassword').value;
    const confirmPassword = document.getElementById('confirmPassword').value;

    const response = await fetch('/auth/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, age, email, password, confirmPassword })
    });

    if (response.ok) {
        const { token } = await response.json();
        localStorage.setItem('token', token);
        window.location.href = '/home';
    } else {
        alert('Error al registrarse');
    }
});

document.getElementById('loginForm').addEventListener('submit', async function(event) {
    event.preventDefault();
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;

    const response = await fetch('/auth/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
    });

    if (response.ok) {
        const { token } = await response.json();
        localStorage.setItem('token', token);
        window.location.href = '/home';
    } else {
        alert('Credenciales incorrectas');
    }
});