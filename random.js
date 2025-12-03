const API_LINK = 'https://potterapi-fedeperin.vercel.app/en';

const characterDetail = document.getElementById('characterDetail');
const loadingSpinner = document.getElementById('loading');
const errorMessage = document.getElementById('errorMessage');

const characterImage = document.getElementById('characterImage');
const characterName = document.getElementById('characterName');
const houseBadge = document.getElementById('houseBadge');
const species = document.getElementById('species');
const gender = document.getElementById('gender');
const dateOfBirth = document.getElementById('dateOfBirth');
const yearOfBirth = document.getElementById('yearOfBirth');
const ancestry = document.getElementById('ancestry');
const eyeColour = document.getElementById('eyeColour');
const hairColour = document.getElementById('hairColour');
const patronus = document.getElementById('patronus');
const actor = document.getElementById('actor');

const wandWood = document.getElementById('wandWood');
const wandCore = document.getElementById('wandCore');
const wandLength = document.getElementById('wandLength');

async function fetchRandomCharacter() {
    try {
        const response = await fetch(`${API_LINK}/characters/random`);
        
        if (!response.ok) {
            throw new Error('Failed to fetch character');
        }
        
        const character = await response.json();
        
        if (!character) {
            throw new Error('Character not found');
        }
        
        return character;
    } catch (error) {
        console.error('Error fetching character:', error);
        throw error;
    }
}

function displayCharacterDetails(character) {

    document.title = `${character.fullName || character.nickname} - Harry Potter Characters`;
    

    if (character.image) {
        characterImage.src = character.image;
        characterImage.alt = character.fullName || character.nickname;
    } else {
        characterImage.src = 'https://via.placeholder.com/400x500?text=No+Image';
        characterImage.alt = 'No image available';
    }
    
    characterName.textContent = character.fullName || character.nickname || 'Unknown';
    
    if (character.hogwartsHouse) {
        houseBadge.textContent = character.hogwartsHouse;
        houseBadge.className = `badge ${getHouseBadgeClass(character.hogwartsHouse)}`;
    } else {
        houseBadge.textContent = 'Unknown House';
        houseBadge.className = 'badge bg-secondary';
    }
    
    species.textContent = formatValue(character.species);
    gender.textContent = formatValue(character.gender);
    dateOfBirth.textContent = formatValue(character.birthdate);
    yearOfBirth.textContent = formatValue(character.yearOfBirth);
    ancestry.textContent = formatValue(character.ancestry);
    eyeColour.textContent = formatValue(character.eyeColor || character.eyeColour);
    hairColour.textContent = formatValue(character.hairColor || character.hairColour);
    patronus.textContent = formatValue(character.patronus);
    actor.textContent = formatValue(character.interpretedBy || character.actor);
    

    if (character.wand) {
        wandWood.textContent = formatValue(character.wand.wood);
        wandCore.textContent = formatValue(character.wand.core);
        wandLength.textContent = character.wand.length ? `${character.wand.length} inches` : 'Unknown';
    } else {
        wandWood.textContent = 'Unknown';
        wandCore.textContent = 'Unknown';
        wandLength.textContent = 'Unknown';
    }
}

function showLoading() {
    loadingSpinner.classList.remove('d-none');
    characterDetail.classList.add('d-none');
}

function hideLoading() {
    loadingSpinner.classList.add('d-none');
    characterDetail.classList.remove('d-none');
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

function formatValue(value) {
    if (value === null || value === undefined || value === '') {
        return 'Unknown';
    }
    return value;
}

async function init() {
    showLoading();
    
    try {
        const character = await fetchRandomCharacter();
        
        displayCharacterDetails(character);
        
        hideLoading();
    } catch (error) {
        showError('Failed to load character details. Please try again later.');
    }
}

// Run initialization when DOM is loaded
document.addEventListener('DOMContentLoaded', init);