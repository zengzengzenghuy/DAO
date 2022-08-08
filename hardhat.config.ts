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
      // used when running test (and npx hardhat deploy)
      chainId:31337,
      allowUnlimitedContractSize: true
    },
    localhost:{
      // used when running "npx hardhat node"
      chainId: 31337,// not the same with hardhat although chainId is the same
    }
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