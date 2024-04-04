package rfq

import "C"
import (
	"math/big"

	"github.com/synapsecns/sanguine/services/explorer/types/rfq"

	"github.com/ethereum/go-ethereum/common"
)

func (e FastBridgeBridgeRequested) GetTxHash() common.Hash {
	return e.Raw.TxHash
}

func (e FastBridgeBridgeRequested) GetContractAddress() common.Address {
	return e.Raw.Address
}
func (e FastBridgeBridgeRequested) GetBlockNumber() uint64 {
	return e.Raw.BlockNumber
}

func (e FastBridgeBridgeRequested) GetEventType() rfq.EventType {
	return rfq.BridgeRequestedEvent
}

func (e FastBridgeBridgeRequested) GetEventIndex() uint64 {
	return uint64(e.Raw.TxIndex)
}

func (e FastBridgeBridgeRequested) GetTransactionID() [32]byte {
	return e.TransactionId
}

func (e FastBridgeBridgeRequested) GetSender() *string {
	str := e.Sender.String()
	return &str
}

func (e FastBridgeBridgeRequested) GetRequest() *[]byte {
	return &e.Request
}

func (e FastBridgeBridgeRequested) GetOriginChainID() *uint32 {
	return nil
}

func (e FastBridgeBridgeRequested) GetDestChainID() *uint32 {
	return &e.DestChainId
}

func (e FastBridgeBridgeRequested) GetOriginToken() common.Address {
	return e.OriginToken
}

func (e FastBridgeBridgeRequested) GetDestToken() common.Address {
	return e.DestToken
}

func (e FastBridgeBridgeRequested) GetOriginAmount() *big.Int {
	return e.OriginAmount
}

func (e FastBridgeBridgeRequested) GetDestAmount() *big.Int {
	return e.DestAmount
}

func (e FastBridgeBridgeRequested) GetSendChainGas() *bool {
	return &e.SendChainGas
}

func (e FastBridgeBridgeRequested) GetChainGasAmount() *big.Int {
	return nil
}

func (e FastBridgeBridgeRequested) GetRelayer() *string {
	return nil
}
func (e FastBridgeBridgeRequested) GetTo() *string {
	return nil
}

func (e FastBridgeBridgeRelayed) GetTxHash() common.Hash {
	return e.Raw.TxHash
}

func (e FastBridgeBridgeRelayed) GetContractAddress() common.Address {
	return e.Raw.Address
}
func (e FastBridgeBridgeRelayed) GetBlockNumber() uint64 {
	return e.Raw.BlockNumber
}

func (e FastBridgeBridgeRelayed) GetEventType() rfq.EventType {

	return rfq.BridgeRelayedEvent
}

func (e FastBridgeBridgeRelayed) GetEventIndex() uint64 {
	return uint64(e.Raw.TxIndex)
}

func (e FastBridgeBridgeRelayed) GetTransactionID() [32]byte {
	return e.TransactionId
}

func (e FastBridgeBridgeRelayed) GetRelayer() *string {
	str := e.Relayer.String()
	return &str
}

func (e FastBridgeBridgeRelayed) GetTo() *string {
	str := e.To.String()
	return &str
}

func (e FastBridgeBridgeRelayed) GetOriginChainID() *uint32 {
	return &e.OriginChainId
}

func (e FastBridgeBridgeRelayed) GetDestChainID() *uint32 {
	return nil
}

func (e FastBridgeBridgeRelayed) GetOriginToken() common.Address {
	return e.OriginToken
}

func (e FastBridgeBridgeRelayed) GetDestToken() common.Address {
	return e.DestToken
}

func (e FastBridgeBridgeRelayed) GetOriginAmount() *big.Int {
	return e.OriginAmount
}

func (e FastBridgeBridgeRelayed) GetDestAmount() *big.Int {
	return e.DestAmount
}

func (e FastBridgeBridgeRelayed) GetChainGasAmount() *big.Int {
	return e.ChainGasAmount
}

func (e FastBridgeBridgeRelayed) GetRequest() *[]byte {
	return nil
}

func (e FastBridgeBridgeRelayed) GetSendChainGas() *bool {
	return nil
}

func (e FastBridgeBridgeRelayed) GetSender() *string {
	return nil
}
