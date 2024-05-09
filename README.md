NFT Minter
This project is a simple web application that allows users to mint Non-Fungible Tokens (NFTs) using the Moralis platform. Users can authenticate themselves, provide token details such as name, description, and image, and then mint the NFTs. The minted NFTs are stored on IPFS (InterPlanetary File System) and can be viewed on Rarible.

Features
User authentication using Moralis
Input form for token details (name, description, image)
Minting of NFTs with metadata stored on IPFS
Integration with Rarible for NFT minting and viewing
Prerequisites
Before running this application, you need the following:

Moralis server URL
Moralis app ID
Web3 library
Moralis library
Installation
Clone this repository to your local machine:
bash
Copy code
git clone https://github.com/yourusername/nft-minter.git
Install dependencies:
Copy code
npm install
Open the index.html file in your web browser or deploy the application to a web server.
Configuration
Before running the application, make sure to configure the following:

Replace serverUrl and appId with your Moralis server URL and app ID in main.js.
Ensure that you have the correct versions of Web3 and Moralis libraries linked in the HTML file.
Usage
Open the application in your web browser.
Authenticate using Moralis or Metamask.
Fill in the token details (name, description, image).
Click the submit button to mint the NFT.
Wait for the transaction to complete and view the success message with the link to the minted NFT on Rarible.
Resources
Moralis Documentation
Rarible Documentation
Contributing
Contributions are welcome! If you have any ideas for improvement or encounter any issues, feel free to open an issue or submit a pull request.

License
This project is licensed under the MIT License - see the LICENSE file for details.

