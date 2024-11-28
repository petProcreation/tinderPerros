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
        body: JSON.stringify({
            name: petName.value,
            age: petAge.value,
            breed: petBreed.value,
            size: petSize.value,
            gender: petGender.value,
            description: petDescription.value
        })
    }).then(response => response.json())
      .then(data => {
          console.log(data);
      });
});

document.getElementById('registerForm').addEventListener('submit', async function(event) {
    event.preventDefault();
    const name = document.getElementById('registerName').value;
    const age = document.getElementById('registerAge').value;
    const email = document.getElementById('registerEmail').value;
    const password = document.getElementById('registerPassword').value;
    const confirmPassword = document.getElementById('confirmPassword').value;

    try {
        const response = await fetch('/api/v0/users/register', {
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
            const errorText = await response.text();
            alert(`Error al registrarse: ${errorText}`);
        }
    } catch (error) {
        console.error('Error en la solicitud de registro:', error);
        alert('Error al registrarse');
    }
});

document.getElementById('loginForm').addEventListener('submit', async function(event) {
    event.preventDefault();
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;

    try {
        const response = await fetch('/api/v0/users/login', {
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
            const errorText = await response.text();
            alert(`Error al iniciar sesión: ${errorText}`);
        }
    } catch (error) {
        console.error('Error en la solicitud de inicio de sesión:', error);
        alert('Error al iniciar sesión');
    }
});