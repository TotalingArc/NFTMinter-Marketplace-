/** Connect to Moralis server */
const serverUrl = process.env.MORALIS_SERVER_URL; // Use environment variable
const appId = process.env.MORALIS_APP_ID; // Use environment variable
Moralis.start({ serverUrl, appId });
let user = Moralis.User.current();

/** Add from here down, include function calls */
async function login() {
  try {
    if (!user) {
      user = await Moralis.authenticate({ signingMessage: "Hello World!" });
    } else {
      Moralis.enableWeb3();
    }
    initApp();
  } catch (error) {
    console.error("Authentication failed:", error);
    // Handle authentication failure
  }
}

function initApp() {
  try {
    document.querySelector("#app").style.display = "block";
    document.querySelector("#submit_button").onclick = submit;
  } catch (error) {
    console.error("Failed to initialize app:", error);
    // Handle initialization failure
  }
}

async function submit() {
  try {
    const input = document.querySelector('#input_image');
    let data = input.files[0];
    const imageFile = new Moralis.File(data.name, data);
    await imageFile.saveIPFS();
    let imageHash = imageFile.hash();

    let metadata = {
      name: document.querySelector('#input_name').value,
      description: document.querySelector('#input_description').value,
      image: "/ipfs/" + imageHash
    };

    const jsonFile = new Moralis.File("metadata.json", { base64: btoa(JSON.stringify(metadata)) });
    await jsonFile.saveIPFS();

    let metadataHash = jsonFile.hash();

    let res = await Moralis.Plugins.rarible.lazyMint({
      chain: 'rinkeby',
      userAddress: user.get('ethAddress'),
      tokenType: 'ERC721',
      tokenUri: 'ipfs://' + metadataHash,
      royaltiesAmount: 5, // 0.05% royalty. Optional
    });

    document.querySelector('#success_message').innerHTML =
      `NFT minted. <a href="https://rinkeby.rarible.com/token/${res.data.result.tokenAddress}:${res.data.result.tokenId}">View NFT`;
    document.querySelector('#success_message').style.display = "block";
    setTimeout(() => {
      document.querySelector('#success_message').style.display = "none";
    }, 5000);
  } catch (error) {
    console.error("Failed to submit NFT:", error);
    // Handle NFT submission failure
  }
}

login();
