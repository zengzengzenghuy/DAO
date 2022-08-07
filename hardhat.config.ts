/** @type import('hardhat/config').HardhatUserConfig */
import "@nomiclabs/hardhat-ethers";
import "hardhat-deploy";
import "@typechain/hardhat";

import{HardhatUserConfig} from "hardhat/config";
// module.exports = {
//   solidity: "0.8.9",
// };
const config: HardhatUserConfig={
  defaultNetwork:"hardhat",
  networks:{
    hardhat:{
      chainId:31337,
    },
    localhost:{
      chainId: 31337, // not the same with hardhat although chainId is the same
    },
    goerli:{
      //TODO
    },
  },
  solidity:{
    version:"0.8.8"
  },
  namedAccounts:{
    deployer:{
      default:0, //indexed 0 and will be the default deployer
    }
  }
}
export default config