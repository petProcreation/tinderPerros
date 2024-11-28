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

