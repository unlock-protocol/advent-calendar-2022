const { ethers } = require("hardhat");

const expirationDuration = ethers.constants.MaxUint256;
const maxNumberOfKeys = ethers.constants.MaxUint256;
const keyPrice = 0;

/**
 * Deploy!
 * @param unlock
 * @returns
 */
const deploy = async (unlock: any) => {
  // all locks
  const locks = await Promise.all(
    [
      "0x6B6CbaA6b44D5949A2a6cac24499aa13D6c1798D",
      "0xff5446f83fFb3Ccd7D5f798C1F1C1D981E2ff2AE",
      "0x27787E46a701CfFaaD8af059917CF0d626556568",
      "0x7608F73A1dFEb206A3A75aCDad6DC9FbA9Ba83D0",
      "0x3e36C285E11DE77e8257Fe7D49e80209C48b295E",
      "0x3Ba3470ffAB4D0bE96C75c5A11AA83DB7DC6501a",
      "0xd1bc4E5100024428E5573e0Cd7b1EB14e2c2aa73",
      "0x412024855fA62752805c96F1dbaD6B4dC0C9AD52",
      "0x2b7cd7B41f3937c09E4242828F08fCBBaf1043a5",
      "0xB3903433B3da787a01Aa30b73Ad1C108F632b297",
      "0x59c55EFD6faa9Dbecb3AdA3d219a898dd42A9Baf",
      "0x82b0728f060919c81F5fa0b74cF0889AC4227DA0",
      "0x3DFD892A1806c91663F2F145DcE9980DA92f186E",
      "0x07791a5C83fec114F4dEd574f62Aa9f78b3F3A73",
      "0x7F85E8cD1739986d9fd14118fA75c0F1d2365C1C",
      "0x4e50c69dcD6DBE9EDAED73e81643258C923d75f3",
      "0x0a051fD5673F8c317B53B0736676E89b1AF07797",
      "0x58D41c526A2D88aE9D08a546d327D3619511B278",
      "0x281522e8073bA6746874aa61bDF81DFa9DB833eC",
      "0x19b24fF3c0C124B91b672Dc8F8Ae077A96E2551C",
      "0x0634905430e4DB8CAaF63b0dd078EEFBF3FC1EdE",
      "0xE5D92b4F0953EeE7B250d2DFaeC955ad95161b22",
      "0xc9221Cf0004A05f04aB5dF82d58eb63D5307C040",
      "0xd8aD6E0C1aa8308e27F537A76032f50d2FE3e65D",
    ].map(async (address) => {
      return await unlock.getLockContract(address);
    })
  );

  // deploy hook
  const Hook = await ethers.getContractFactory("AdventHook");
  const hook = await Hook.deploy(locks.map((lock) => lock.address));

  return [locks, hook];
};

export default deploy;
