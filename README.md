# Harry Potter Characters App

A web application that displays characters from the Harry Potter universe using the HP-API.

## Live Demo

- **GitHub Pages:** [(https://elisatahiri.github.io/csc225-final-project/)]
- **Repository:** [https://github.com/elisatahiri/csc225-final-project/]

## Features

- Browse all Harry Potter characters with pagination
- Filter characters by Hogwarts house
- Search characters by name
- View detailed character information
- View a random character
- Responsive design for all devices

## API Information

**API:** HP-API (fedeperin)  
**Base URL:** https://potterapi-fedeperin.vercel.app/en 
**Authentication:** None required

### Endpoints Used

| Endpoint | Description |
|----------|-------------|
| `GET /characters` | Returns all characters (used for main grid/search/filter) |
| `GET /characters/random` | Returns a single random character |

### Sample API Response (Structure may vary slightly)

```json
{
  "id": "9e3f7ce4-b9a7-4244-b709-dae5c1f1d4a8",
  "fullName": "Harry Potter",
  "hogwartsHouse": "Gryffindor",
  "birthdate": "31-07-1980",
  "yearOfBirth": 1980,
  "ancestry": "half-blood",
  "eyeColor": "green",
  "hairColor": "black",
  "patronus": "stag",
  "interpretedBy": "Daniel Radcliffe",
  "image": "https://...",
  "wand": {
    "wood": "Holly",
    "core": "Phoenix feather",
    "length": 11
  }
}
