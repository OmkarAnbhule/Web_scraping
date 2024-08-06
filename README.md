# Scrap Shop

Web Scraping Shopify addons

## Description

This project is a web scraping application built using React with Vite for the client-side and Node.js for the server-side. It targets Shopify addons websites, allowing users to extract and utilize data from these platforms efficiently.

## Project Structure

```
/project-root
│
├── /client          # React frontend
│   └── ...          # Client-side code and assets
│
└── /server          # Node.js backend
    ├── index.js     # Main entry point for the server
    └── ...          # Server-side code and configurations
```

## Getting Started

### Prerequisites

- Node.js (version 18 or higher)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/OmkarAnbhule/Web_scraping.git
   cd Web_scraping
   ```

2. Install dependencies for both client and server:
   ```bash
   # For client
   cd client
   npm install
   # or
   yarn install

   # For server
   cd ../server
   npm install
   # or
   yarn install
   ```

3. Start the development servers:
   ```bash
   # Start server
   cd server
   node index.cjs

   # Start client
   cd ../client
   npm run dev
   ```

## Usage

To scrape data from Shopify addons, simply run the server and access the client interface. If you encounter any CORS errors while scraping, please click the following link to resolve the issue:

- [CORS Proxy Link](https://cors-anywhere.herokuapp.com/corsdemo)

## Deployed Link

You can access the deployed version of the project here: [Deployed Application Link](https://webscrap-sigma.vercel.app/)

## Demo Video

Watch the demo of the project here: [Demo Video Link](https://www.loom.com/share/be0fb8a93bbe45069fdda022727db098?sid=e87f4286-0410-4b48-8c4c-83f9397ce4fb)

## Contributing

If you would like to contribute to this project, please fork the repository and submit a pull request. Ensure that your code adheres to the project's coding standards and includes appropriate tests.