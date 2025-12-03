# Harry Potter Characters App

A web application that displays characters from the Harry Potter universe using the HP-API.

## Live Demo

- **GitHub Pages:** [Your GitHub.io URL here]
- **Repository:** [Your GitHub.com URL here]

## Features

- Browse all Harry Potter characters
- Filter characters by Hogwarts house
- Search characters by name
- View detailed character information
- Responsive design for all devices

## API Information

**API:** HP-API  
**Base URL:** https://potterapi-fedeperin.vercel.app/en 
**Authentication:** None required

### Endpoints Used

| Endpoint | Description |
|----------|-------------|
| `GET /api/characters` | Returns all characters |
| `GET /api/character/{id}` | Returns a specific character by ID |

### Sample API Response

```json
{
  "id": "9e3f7ce4-b9a7-4244-b709-dae5c1f1d4a8",
  "name": "Harry Potter",
  "house": "Gryffindor",
  "dateOfBirth": "31-07-1980",
  "yearOfBirth": 1980,
  "ancestry": "half-blood",
  "eyeColour": "green",
  "hairColour": "black",
  "patronus": "stag",
  "actor": "Daniel Radcliffe",
  "image": "https://..."
}
```

## Technologies Used

- HTML5
- CSS3
- Bootstrap 5.3.2
- Vanilla JavaScript (ES6+)
- Fetch API

## Project Structure

```
harry-potter-app/
├── index.html          # Home page - character grid
├── detail.html         # Detail page - individual character
├── about.html          # About page - project info
├── css/
│   └── styles.css      # Custom styles
├── js/
│   ├── app.js          # Main page logic
│   └── detail.js       # Detail page logic
└── README.md           # Documentation
```

## How to Use

1. Open `index.html` in a web browser
2. Browse through the character cards on the home page
3. Use the search bar to find specific characters by name
4. Use the dropdown to filter characters by Hogwarts house
5. Click on any character card to view detailed information

## Local Development

1. Clone the repository
2. Open `index.html` in your browser
3. No build process or dependencies required

## Deployment

This project is deployed using GitHub Pages:

1. Push code to your GitHub repository
2. Go to Settings > Pages
3. Select the main branch as source
4. Your site will be available at `https://[username].github.io/[repo-name]`

## Author

[Your Name]

## License

This project is for educational purposes.

## Acknowledgments

- [HP-API](https://hp-api.onrender.com/) for providing the character data
- Bootstrap for the UI framework