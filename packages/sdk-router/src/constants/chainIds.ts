export enum SupportedChainId {
  ETH = 1,
  OPTIMISM = 10,
  CRONOS = 25,
  BSC = 56,
  POLYGON = 137,
  FANTOM = 250,
  BOBA = 288,
  METIS = 1088,
  MOONBEAM = 1284,
  MOONRIVER = 1285,
  DOGECHAIN = 2000,
  CANTO = 7700,
  KLAYTN = 8217,
  BASE = 8453,
  ARBITRUM = 42161,
  AVALANCHE = 43114,
  DFK = 53935,
  AURORA = 1313161554,
  HARMONY = 1666600000,
}

/**
 * List of supported chain ids, where SynapseBridge is deployed.
 */
export const SUPPORTED_CHAIN_IDS: number[] = Object.values(SupportedChainId)
  .map((chainId) => Number(chainId))
  .filter((chainId) => !isNaN(chainId))

/**
 * List of chain ids where SynapseCCTP is deployed.
 *
 * Note: This is a subset of SUPPORTED_CHAIN_IDS.
 */
export const CCTP_SUPPORTED_CHAIN_IDS: number[] = [
  SupportedChainId.ETH,
  SupportedChainId.ARBITRUM,
  SupportedChainId.AVALANCHE,
  SupportedChainId.OPTIMISM,
]