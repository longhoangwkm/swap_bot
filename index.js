const ethers = require('ethers');

const addresses = {
  WBNB: '0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c',
  factory: '0xcA143Ce32Fe78f1f7019d7d551a6402fC5350c73',
  router: '0x10ED43C718714eb63d5aA57B78B54704E256024E',
  CAKE: '0x0e09fabb73bd3ade0a17ecc321fd13a19e81ce82',
  BUSD: '0xe9e7cea3dedca5984780bafc599bd69add087d56'
}

const provider = new ethers.providers.JsonRpcProvider('<json rpc end point>'); // ankr or infura service
const wallet = new ethers.Wallet('private key');
const account = wallet.connect(provider);

const router = new ethers.Contract(
  addresses.router,
  [
    'function getAmountsOut(uint amountIn, address[] memory path) public view returns (uint[] memory amounts)'
  ],
  account
);

async function main() {
  const tokenIn = addresses.CAKE
  const tokenOut = addresses.BUSD

  const amountIn = ethers.utils.parseUnits('1', 'ether');
  const amounts = await router.getAmountsOut(amountIn, [tokenIn, tokenOut]);

  console.log(`${(amounts[0] / 1e18).toString()} CAKE = ${(amounts[1] / 1e18).toString()} BUSD`)
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
