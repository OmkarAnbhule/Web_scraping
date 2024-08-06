# Project Title

Scrap Shop

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
   git clone <repository-url>
   cd <repository-name>
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
   node index.js

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

Watch the demo of the project below: <div style="position: relative; padding-bottom: 56.25%; height: 0;"><iframe src="https://www.loom.com/embed/be0fb8a93bbe45069fdda022727db098?sid=f52bf6d3-25d6-4eae-b142-6734c6446d9d" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;"></iframe></div>
## Contributing

If you would like to contribute to this project, please fork the repository and submit a pull request. Ensure that your code adheres to the project's coding standards and includes appropriate tests.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.