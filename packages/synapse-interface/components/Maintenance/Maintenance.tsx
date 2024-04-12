import { MaintenanceBanner } from './components/MaintenanceBanner'
import { MaintenanceWarningMessage } from './components/MaintenanceWarningMessage'
import { useMaintenanceCountdownProgress } from './components/useMaintenanceCountdownProgress'
import { useBridgeState } from '@/slices/bridge/hooks'
import { useSwapState } from '@/slices/swap/hooks'
import pausedChains from '@/public/pausedChains.json'

interface ChainPause {
  id: string
  pausedFromChains: number[]
  pausedToChains: number[]
  pauseBridge: boolean
  pauseSwap: boolean
  startTime: Date
  endTime: Date | null // Indefinite if null
  bannerStartTime: Date
  bannerEndTime: Date | null // Indefinite if null
  warningMessage: JSX.Element
  bannerMessage: JSX.Element
  progressBarMessage: JSX.Element
  disableBanner: boolean
  disableWarning: boolean
  disableCountdown: boolean
}

const PAUSED_CHAINS: ChainPause[] = pausedChains.map((pause) => ({
  ...pause,
  startTime: new Date(pause.startTime),
  endTime: pause.endTime ? new Date(pause.endTime) : null,
  bannerStartTime: new Date(pause.bannerStartTime),
  bannerEndTime: pause.bannerEndTime ? new Date(pause.bannerEndTime) : null,
  warningMessage: <p>{pause.warningMessage}</p>,
  bannerMessage: <p>{pause.bannerMessage}</p>,
  progressBarMessage: <p>{pause.progressBarMessage}</p>,
}))

export const MaintenanceBanners = () => {
  return (
    <>
      {PAUSED_CHAINS.map((event) => {
        return (
          <MaintenanceBanner
            id={event.id}
            bannerMessage={event.bannerMessage}
            startDate={event.bannerStartTime}
            endDate={event.bannerEndTime}
            disabled={event.disableBanner}
          />
        )
      })}
    </>
  )
}

export const MaintenanceWarningMessages = ({
  type,
}: {
  type: 'Bridge' | 'Swap'
}) => {
  const { fromChainId: bridgeFromChainId, toChainId: bridgeToChainId } =
    useBridgeState()
  const { swapChainId } = useSwapState()

  if (type === 'Bridge') {
    return (
      <>
        {PAUSED_CHAINS.map((event) => {
          return (
            <MaintenanceWarningMessage
              fromChainId={bridgeFromChainId}
              toChainId={bridgeToChainId}
              startDate={event.startTime}
              endDate={event.endTime}
              pausedFromChains={event.pausedFromChains}
              pausedToChains={event.pausedToChains}
              warningMessage={event.warningMessage}
              disabled={event.disableWarning || !event.pauseBridge}
            />
          )
        })}
      </>
    )
  } else if (type === 'Swap') {
    return (
      <>
        {PAUSED_CHAINS.map((event) => {
          return (
            <MaintenanceWarningMessage
              fromChainId={swapChainId}
              toChainId={null}
              startDate={event.startTime}
              endDate={event.endTime}
              pausedFromChains={event.pausedFromChains}
              pausedToChains={event.pausedToChains}
              warningMessage={event.warningMessage}
              disabled={event.disableWarning || !event.pauseSwap}
            />
          )
        })}
      </>
    )
  } else {
    return null
  }
}

/**
 * Hook that maps through PAUSED_CHAINS to apply the single chain countdown progress logic to each.
 * @returns Array of objects containing maintenance status and components for each paused chain.
 */
export const useMaintenanceCountdownProgresses = ({
  type,
}: {
  type: 'Bridge' | 'Swap'
}) => {
  const { fromChainId: bridgeFromChainId, toChainId: bridgeToChainId } =
    useBridgeState()
  const { swapChainId } = useSwapState()

  if (type === 'Bridge') {
    return PAUSED_CHAINS.map((event) => {
      return useMaintenanceCountdownProgress({
        fromChainId: bridgeFromChainId,
        toChainId: bridgeToChainId,
        startDate: event.startTime,
        endDate: event.endTime,
        pausedFromChains: event.pausedFromChains,
        pausedToChains: event.pausedToChains,
        progressBarMessage: event.progressBarMessage,
        disabled: event.disableCountdown || !event.pauseBridge,
      })
    })
  } else if (type === 'Swap') {
    return PAUSED_CHAINS.map((event) => {
      return useMaintenanceCountdownProgress({
        fromChainId: swapChainId,
        toChainId: null,
        startDate: event.startTime,
        endDate: event.endTime,
        pausedFromChains: event.pausedFromChains,
        pausedToChains: event.pausedToChains,
        progressBarMessage: event.progressBarMessage,
        disabled: event.disableCountdown || !event.pauseSwap,
      })
    })
  }
}
