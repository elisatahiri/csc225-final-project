
const API_LINK = 'https://potterapi-fedeperin.vercel.app/en';

const charactersContainer = document.getElementById('charactersContainer');
const loadingSpinner = document.getElementById('loading');
const errorMessage = document.getElementById('errorMessage');
const searchInput = document.getElementById('searchInput');
const houseFilter = document.getElementById('houseFilter');
const loadMoreContainer = document.getElementById('loadMoreContainer');
const loadMoreBtn = document.getElementById('loadMoreBtn');


let allCharacters = [];
let filteredCharacters = [];
let currentIndex = 0;
const CHARACTERS_PER_PAGE = 12;

async function fetchCharacters() {
    try {
        const response = await fetch(`${API_LINK}/characters`);
        
        if (!response.ok) {
            throw new Error('Failed to fetch characters');
        }
        
        const characters = await response.json();
        console.log('Sample character:', characters[0]);
        return characters;
    } catch (error) {
        console.error('Error fetching characters:', error);
        throw error;
    }
}

function createCharacterCard(character) {
    const hasNickname = character.nickname ? true : false;
    const imageHTML = character.image
        ? `
            <img 
                src="${character.image}" 
                class="card-img-top" 
                alt="${character.fullName || character.nickname || 'Character image'}"
            >
          `
        : `
            <div class="d-flex align-items-center justify-content-center bg-light text-muted" 
                 style="height: 300px;">
                <i class="bi bi-person-fill" style="font-size: 4rem;"></i>
            </div>
          `;

    return `
        <div class="col">
            <div class="card h-100 shadow-sm character-card"
                 role="button"
                 onclick="window.location.href='detail.html?index=${character.index}'">               
                ${imageHTML}
                <div class="card-body text-center">
                    <h5 class="card-title mb-2">
                        ${character.fullName || character.nickname || 'Unknown'}
                    </h5>
                    <div class="row">
                        <div class="text-muted mb-0 py-1">
                            <strong>House:</strong> 
                            <span>${character.hogwartsHouse || 'None'}</span>
                        </div>
                        ${hasNickname ? `
                            <div class="text-muted mb-0 py-1">
                                <strong>Nickname:</strong> <em>${character.nickname}</em>
                            </div>
                        ` : ''}
                    </div>
                </div>
            </div>
        </div>
    `;
}

function displayCharacters(characters) {
    currentIndex = 0;
    filteredCharacters = characters;
    
    charactersContainer.innerHTML = '';
    
    const charactersToShow = characters.slice(0, CHARACTERS_PER_PAGE);
    currentIndex = charactersToShow.length;
    
    charactersToShow.forEach(character => {
        charactersContainer.innerHTML += createCharacterCard(character);
    });

    console.log(charactersContainer.innerHTML)

    updateLoadMoreButton();
}

function loadMoreCharacters() {
    const nextBatch = filteredCharacters.slice(currentIndex, currentIndex + CHARACTERS_PER_PAGE);
    currentIndex += nextBatch.length;
    
    nextBatch.forEach(character => {
        charactersContainer.innerHTML += createCharacterCard(character);
    });
    
    updateLoadMoreButton();
}

function updateLoadMoreButton() {
    if (currentIndex < filteredCharacters.length) {
        loadMoreContainer.classList.remove('d-none');
        const remaining = filteredCharacters.length - currentIndex;
        loadMoreBtn.innerHTML = `<i class="bi bi-chevron-down me-2"></i>Load More (${remaining} remaining)`;
    } else {
        loadMoreContainer.classList.add('d-none');
    }
}

function filterCharacters() {
    const searchTerm = searchInput.value.toLowerCase().trim();
    const selectedHouse = houseFilter.value;
    
    let filtered = allCharacters;
    
    if (searchTerm) {
        filtered = filtered.filter(character => {
            const name = (character.fullName || character.nickname || '').toLowerCase();
            return name.includes(searchTerm);
        });
    }
    
    if (selectedHouse) {
        filtered = filtered.filter(character => {
            return character.hogwartsHouse === selectedHouse;
        });
    }
    
    displayCharacters(filtered);
}

function showLoading() {
    loadingSpinner.classList.remove('d-none');
    charactersContainer.classList.add('d-none');
    loadMoreContainer.classList.add('d-none');
}

function hideLoading() {
    loadingSpinner.classList.add('d-none');
    charactersContainer.classList.remove('d-none');
}

function showError(message) {
    errorMessage.textContent = message;
    errorMessage.classList.remove('d-none');
    loadingSpinner.classList.add('d-none');
}

function getHouseBadgeClass(house) {
    const houseClasses = {
        'Gryffindor': 'badge-gryffindor',
        'Slytherin': 'badge-slytherin',
        'Ravenclaw': 'badge-ravenclaw',
        'Hufflepuff': 'badge-hufflepuff'
    };
    return houseClasses[house] || 'bg-secondary';
}

searchInput.addEventListener('input', filterCharacters);

houseFilter.addEventListener('change', filterCharacters);

loadMoreBtn.addEventListener('click', loadMoreCharacters);

async function init() {
    showLoading();
    
    try {
        allCharacters = await fetchCharacters();
        
        displayCharacters(allCharacters);
        
        hideLoading();
    } catch (error) {
        showError('Failed to load characters. Please try again later.');
    }
}

document.addEventListener('DOMContentLoaded', init);