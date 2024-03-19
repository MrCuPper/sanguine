import _ from 'lodash'
import { useCallback, useEffect, useRef, useState } from 'react'
import { useDispatch } from 'react-redux'
import Fuse from 'fuse.js'
import { useKeyPress } from '@hooks/useKeyPress'

import * as ALL_CHAINS from '@constants/chains/master'
import SlideSearchBox from '@pages/bridge/SlideSearchBox'
import { CHAINS_BY_ID, sortChains } from '@constants/chains'
import { segmentAnalyticsEvent } from '@/contexts/SegmentAnalyticsProvider'
import { useBridgeState } from '@/slices/bridge/hooks'
import { setToChainId } from '@/slices/bridge/reducer'
import { setShowToChainListOverlay } from '@/slices/bridgeDisplaySlice'
import { SelectSpecificNetworkButton } from './components/SelectSpecificNetworkButton'
import useCloseOnOutsideClick from '@/utils/hooks/useCloseOnOutsideClick'
import { CloseButton } from './components/CloseButton'
import { SearchResults } from './components/SearchResults'

import { PAUSED_TO_CHAIN_IDS } from '@constants/chains'
/*
export const ToChainListOverlay = () => {
  const { toChainIds, toChainId } = useBridgeState()
  const [currentIdx, setCurrentIdx] = useState(-1)
  const [searchStr, setSearchStr] = useState('')
  const dispatch = useDispatch()
  const overlayRef = useRef(null)

  const dataId = 'bridge-destination-chain-list'

  let possibleChains = _(ALL_CHAINS)
    .pickBy((value) => _.includes(toChainIds, value.id))
    .values()
    .value()
    .filter((chain) => !PAUSED_TO_CHAIN_IDS.includes(chain.id))

  possibleChains = sortChains(possibleChains)

  let remainingChains = sortChains(
    _.difference(
      Object.keys(CHAINS_BY_ID).map((id) => CHAINS_BY_ID[id]),
      toChainIds.map((id) => CHAINS_BY_ID[id])
    )
  ).filter((chain) => !PAUSED_TO_CHAIN_IDS.includes(chain.id))

  const possibleChainsWithSource = possibleChains.map((chain) => ({
    ...chain,
    source: 'possibleChains',
  }))

  const remainingChainsWithSource = remainingChains.map((chain) => ({
    ...chain,
    source: 'remainingChains',
  }))

  const masterList = [...possibleChainsWithSource, ...remainingChainsWithSource]

  const fuseOptions = {
    includeScore: true,
    threshold: 0.0,
    keys: [
      {
        name: 'name',
        weight: 2,
      },
      'id',
      'nativeCurrency.symbol',
    ],
  }

  const fuse = new Fuse(masterList, fuseOptions)

  if (searchStr?.length > 0) {
    const results = fuse.search(searchStr).map((i) => i.item)

    possibleChains = results.filter((item) => item.source === 'possibleChains')
    remainingChains = results.filter(
      (item) => item.source === 'remainingChains'
    )
  }

  const escPressed = useKeyPress('Escape')
  const arrowUp = useKeyPress('ArrowUp')
  const arrowDown = useKeyPress('ArrowDown')

  const onClose = useCallback(() => {
    setCurrentIdx(-1)
    setSearchStr('')
    dispatch(setShowToChainListOverlay(false))
  }, [setShowToChainListOverlay])

  const escFunc = () => {
    if (escPressed) {
      onClose()
    }
  }
  const arrowDownFunc = () => {
    const nextIdx = currentIdx + 1
    if (arrowDown && nextIdx < masterList.length) {
      setCurrentIdx(nextIdx)
    }
  }

  const arrowUpFunc = () => {
    const nextIdx = currentIdx - 1
    if (arrowUp && -1 < nextIdx) {
      setCurrentIdx(nextIdx)
    }
  }

  const onSearch = (str: string) => {
    setSearchStr(str)
    setCurrentIdx(-1)
  }

  useEffect(arrowDownFunc, [arrowDown])
  useEffect(escFunc, [escPressed])
  useEffect(arrowUpFunc, [arrowUp])
  useCloseOnOutsideClick(overlayRef, onClose)

  const handleSetToChainId = (chainId) => {
    const eventTitle = `[Bridge User Action] Sets new toChainId`
    const eventData = {
      previousToChainId: toChainId,
      newToChainId: chainId,
    }

    segmentAnalyticsEvent(eventTitle, eventData)
    dispatch(setToChainId(chainId))
    onClose()
  }

  const [open, setOpen] = useState(true)

  return (
    <div
      ref={overlayRef}
      data-test-id="toChain-list-overlay"
      className={`${
        open ? 'block' : 'hidden'
      } z-20 absolute bg-bgLight border border-separator rounded overflow-visible overflow-y-auto max-h-80 animate-slide-down origin-top`}
    >
      <div className="p-1 flex items-center font-medium">
        <SlideSearchBox
          placeholder="Find"
          searchStr={searchStr}
          onSearch={onSearch}
        />
        <CloseButton onClick={onClose} />
      </div>
      <div data-test-id={dataId}>
        {possibleChains && possibleChains.length > 0 && (
          <>
            <div className="px-2 py-2 text-sm text-secondary sticky top-0 bg-bgLight">
              To…
            </div>
            {possibleChains.map(({ id: mapChainId }, idx) => {
              return (
                <SelectSpecificNetworkButton
                  key={idx}
                  itemChainId={mapChainId}
                  isCurrentChain={toChainId === mapChainId}
                  isOrigin={false}
                  active={idx === currentIdx}
                  onClick={() => {
                    if (toChainId === mapChainId) {
                      onClose()
                    } else {
                      handleSetToChainId(mapChainId)
                    }
                  }}
                  dataId={dataId}
                />
              )
            })}
          </>
        )}
        {remainingChains && remainingChains.length > 0 && (
          <>
            <div className="px-2 py-2 text-sm text-secondary sticky top-0 bg-bgBase">
              All chains
            </div>
            {remainingChains.map(({ id: mapChainId }, idx) => {
              return (
                <SelectSpecificNetworkButton
                  key={idx}
                  itemChainId={mapChainId}
                  isCurrentChain={toChainId === mapChainId}
                  isOrigin={false}
                  active={idx + possibleChains.length === currentIdx}
                  onClick={() => handleSetToChainId(mapChainId)}
                  dataId={dataId}
                  alternateBackground={true}
                />
              )
            })}
          </>
        )}
        <SearchResults searchStr={searchStr} type="chain" />
      </div>
    </div>
  )
}
*/
export const ToChainListArray = (searchStr: string) => {
  const { toChainIds } = useBridgeState()

  let possibleChains = _(ALL_CHAINS)
    .pickBy((value) => _.includes(toChainIds, value.id))
    .values()
    .value()
    .filter((chain) => !PAUSED_TO_CHAIN_IDS.includes(chain.id))

  possibleChains = sortChains(possibleChains)

  let remainingChains = sortChains(
    _.difference(
      Object.keys(CHAINS_BY_ID).map((id) => CHAINS_BY_ID[id]),
      toChainIds.map((id) => CHAINS_BY_ID[id])
    )
  ).filter((chain) => !PAUSED_TO_CHAIN_IDS.includes(chain.id))

  const possibleChainsWithSource = possibleChains.map((chain) => ({
    ...chain,
    source: 'possibleChains',
  }))

  const remainingChainsWithSource = remainingChains.map((chain) => ({
    ...chain,
    source: 'remainingChains',
  }))

  const masterList = [...possibleChainsWithSource, ...remainingChainsWithSource]

  const fuseOptions = {
    includeScore: true,
    threshold: 0.0,
    keys: [
      {
        name: 'name',
        weight: 2,
      },
      'id',
      'nativeCurrency.symbol',
    ],
  }

  const fuse = new Fuse(masterList, fuseOptions)

  if (searchStr?.length > 0) {
    const results = fuse.search(searchStr).map((i) => i.item)

    possibleChains = results.filter((item) => item.source === 'possibleChains')
    remainingChains = results.filter(
      (item) => item.source === 'remainingChains'
    )
  }

  return { possibleChains, remainingChains }
}
