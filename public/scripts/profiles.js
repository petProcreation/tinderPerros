const profileContainer = document.getElementById('profileContainer');


function getAllProfiles() {
    return fetch('/api/v0/pets/')
        .then(response => response.json())
        .then(profiles => {
            return profiles;
        });
}

function createProfileCard(profile){
    const profileCard = document.createElement('div');
    profileCard.className = 'profile-card';
    profileCard.innerHTML = `
        <div class="card">
            <img src="${profile.image}" class="card-img-top" alt="Labrador café" height="240" width="40">
            <div class="card-body">
                <h5 class="card-title">${profile.name}</h5>
                <p class="card-text">${profile.description}</p>
                <a href="chat.html" class="btn btn-primary">Chat</a>
            </div>
        </div>`;
    return profileCard;
}

function renderProfiles(profiles){
    profileContainer.innerHTML = '';
    const container = document.createElement('div');
    container.classList.add('container');
    container.classList.add('mt-5');

    const row = document.createElement('div');
    row.classList.add('row');
    row.classList.add('card-deck');
    row.classList.add('row-cols-1');
    row.classList.add('row-cols-sm-2');
    row.classList.add('row-cols-md-3');
    row.classList.add('row-cols-lg-4');
    row.classList.add('g-4');



    profiles.slice(0, 4).forEach((profile, index) => {
        const profileCard = createProfileCard(profile);
        row.appendChild(profileCard);
        container.appendChild(row);

        if ((index + 1) % 4 === 0) {
            profileContainer.appendChild(row.cloneNode(true));
            row.innerHTML = '';
        }
    });

    if (row.innerHTML !== '') {
        profileContainer.appendChild(row);
    }
}

function drawPagination(){
    getAllProfiles().then(profiles => {
        const totalPages = Math.ceil(profiles.length / 4);
        const navBar = document.getElementById('pagination');
        navBar.innerHTML = '';

        const navList = document.createElement('ul');
        navList.className = 'pagination';
        navList.classList.add('justify-content-center');

        for (let i = 1; i <= totalPages; i++) {
            const navItem = document.createElement('li');
            navItem.className = 'page-item';

            const navLink = document.createElement('a');
            navLink.className = 'page-link';
            navLink.href = '#';
            navLink.textContent = i;
            navLink.addEventListener('click', (event) => {
                event.preventDefault();
                const start = (i - 1) * 4;
                const end = start + 4;
                renderProfiles(profiles.slice(start, end));
            });

            navItem.appendChild(navLink);
            navList.appendChild(navItem);
        }

        navBar.appendChild(navList);
        document.body.insertBefore(navBar, profileContainer);
    });
}

const allProfiles = getAllProfiles();
allProfiles.then(profiles => {
    renderProfiles(profiles);
    drawPagination();
});

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