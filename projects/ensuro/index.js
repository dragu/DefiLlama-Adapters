const ADDRESSES = require('../helper/coreAssets.json')
const { sumTokens2 } = require('../helper/unwrapLPs')

const addressBook = {
  polygon: {
    native_usdc: ADDRESSES.polygon.USDC_CIRCLE,
    aave_v3_native_usdc: "0xA4D94019934D8333Ef880ABFFbF2FDd611C762BD",  // aPolUSDCn - AAVE USDC (Native)
    compound_blue: "0x781FB7F6d845E3bE129289833b04d43Aa8558c42",  // Compound Blue compUSDC
    msv: "0x14F6DFEE761455247C6bf2b2b052a1F6245dD6FB", // MultiStrategyVault (holds tokens besides native_usdc)
    reserves: [
      // eTokens
      {name: "eToken Junior Koala BMA", address: "0xBC33c283A37d46ABA17BC5F8C27b27242688DeC6"},
      {name: "eToken Senior BMA", address: "0xF383eF2D31E1d4a19B3e04ca2937DB6A8DA9f229"},
      {name: "eToken Junior Spot", address: "0x6229D78658305a301E177f9dAEa3a0799fd1528C"},
      {name: "eToken Junior Revo", address: "0x6A0e61C757e384eB1E4A2b94F7E02E68e4b4515e"},
      {name: "eToken Junior StormStrong", address: "0xE36D6585F0c200195b196C66644C519e7674b476"},
      {name: "eToken Junior Barker", address: "0x9F967c614c9573cc4eabE68ae0354E5d11F7eC9D"},
      {name: "eToken Junior DLT", address: "0x9078dDdeA2F82c27791EF78A9ec9ab0f66bfb6F9"},
      {name: "eToken Junior Otonomi", address: "0x32a9CBeb2cA148E55F327c6B4673351dD03eD858"},
      {name: "eToken Junior Bliss", address: "0x71d390C243706b713B5D2b077E942223f7A55d00"},
      {name: "eToken Junior InsureHero", address: "0x15F76F59A29C7c12b4a67751CA525bf9167C1AaB"},
      {name: "eToken Junior Clerity", address: "0x1c7F0c8ba10Db7f2e1c7B5B0A024b66b6baceb45"},
      {name: "eToken Junior FortuneCredit", address: "0xb1Dff6ce862273adcA2B9eFD96A8976764Ac7414"},
      {name: "eToken Junior Azzegura", address: "0x45435f79103472eD62fB9C92F04c50b188b22B99"},
      {name: "eToken Junior Covest", address: "0x92624870dC092C36943682375Df8246BF126D410"},
      {name: "eToken Junior Poncho", address: "0x0AA6623Be5b293fDde18aE0095163785a0b0E4E3"},
      {name: "eToken Junior OneAcre", address: "0x732088771CF528D29937C5aee0b14A29379934A6"},
      {name: "eToken Junior Cliff Horizon", address: "0x623677be20a9Cb9C274c69B00f9d63772d373Cd7"},
      {name: "eToken Junior Rentennials", address: "0x32BEBbfeb5d1B904799729bFaD216baA709615C5"},
      // PremiumsAccounts
      {name: "PremiumsAccount Koala BMA", address: "0xc1A74eaC52a195E54E0cd672A9dAB023292C6100"},
      {name: "PremiumsAccount StormStrong", address: "0x06347eA3dA6a5B44eEAe3B8F4a65992Ae073e6F4"},
      {name: "PremiumsAccount Revo", address: "0x47f35B4876138b5d96FfDed1e46aE6b58E6e7B31"},
      {name: "PremiumsAccount Spot", address: "0x42118Df6EBb18346ca425f1c67AC739E95aD9358"},
      {name: "PremiumsAccount Barker", address: "0xa5A8c6b6cb08dB75F5d487F0838D0743871d80a7"},
      {name: "PremiumsAccount DLT", address: "0x8908d99a4E2fF6b7Bf4563593B02AcBc7bBfaBC1"},
      {name: "PremiumsAccount Otonomi", address: "0xE43587386E6e8FA127dd008770cdC07dE2Df91E9"},
      {name: "PremiumsAccount Bliss", address: "0x11b490292799a0edFE37797592F77151C4483442"},
      {name: "PremiumsAccount InsureHero", address: "0x41B5a105C850014eC594879E8511994F25092460"},
      {name: "PremiumsAccount Clerity", address: "0xD26d5015C57C197AE5e7BC866B49837d22364eAB"},
      {name: "PremiumsAccount FortuneCredit", address: "0xaF48bd33916836F5A3dD8C9095692d240A6A2567"},
      {name: "PremiumsAccount Azzegura", address: "0x6CB730dF6B3DB5BAac5FD96F50b04005c1B3A5F7"},
      {name: "PremiumsAccount Covest", address: "0x1D71E3901dB121F05A4a06F92440108055386355"},
      {name: "PremiumsAccount Poncho", address: "0xa490D80A80c8E547D040CE3aBBDCC8CcAD584e4c"},
      {name: "PremiumsAccount OneAcre", address: "0x2F2b6a02A9870D16a2B7126Aacd18c99bF235806"},
      {name: "PremiumsAccount Cliff Horizon", address: "0x72B74498a400EF16c669D8a23d19e672846a8dcF"},
      {name: "PremiumsAccount Rentennials", address: "0xf7ef82a521D6bD4B2cDAA3a1beB30Fb724930651"},
      // Main CFLs
      {name: "Multi Target CFL", address: "0x6CaCea88486260ef7E6fdE39Bab3236C908D10B5"},
      // MultiStrategy Vault - Vault that aggregates assets of several reserves
      // {name: "MultiStrategy Vault V2", address: "0x14F6DFEE761455247C6bf2b2b052a1F6245dD6FB"},
    ],
  }
};

async function unwrap4626Tokens({ api, tokensAndOwners, }) {
  const tokens = tokensAndOwners.map(i => i[0])
  const bals = await api.multiCall({ abi: 'erc20:balanceOf', calls: tokensAndOwners.map(i => ({ target: i[0], params: i[1] })), })
  const assets = await api.multiCall({ abi: 'address:asset', calls: tokens, })
  const balsInAssets = await api.multiCall({ abi: 'function convertToAssets(uint256) view returns (uint256)', calls: tokensAndOwners.map((i, idx) => ({ target: i[0], params: bals[idx] })), })
  api.addTokens(assets, balsInAssets)
  return api.getBalances()
}

async function tvl(api) {
  const addresses = addressBook[api.chain];
  // Most of the reserves can only have USDC
  const ownerTokens = addresses.reserves.map(i => [[addresses.native_usdc], i.address])
  // The MSV also has AAVE Native USDC and Compound Blue
  ownerTokens.push([[addresses.native_usdc, addresses.aave_v3_native_usdc], addresses.msv]);
  await unwrap4626Tokens({api, tokensAndOwners: [[addresses.compound_blue, addresses.msv]] });
  return sumTokens2({ api, ownerTokens});
}

module.exports = {
  methodology: `Sums the USDC amounts (both liquid and invested in AAVE) of the different protocol reserves (https://docs.ensuro.co/product-docs/smart-contracts/reserves).`,
  polygon: {
    tvl
  },
  start: '2022-02-01',
  hallmarks: [
    [1669852800, "Ensuro V2 Launch"]
  ]
};
