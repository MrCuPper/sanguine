package backfill

import (
	"context"

	"github.com/ethereum/go-ethereum/core/types"
)

// GetLogs exports logs for testing.
func (c ContractBackfiller) GetLogs(ctx context.Context, startHeight, endHeight uint64) (<-chan types.Log, <-chan bool) {
	return c.getLogs(ctx, startHeight, endHeight)
}

func (s *ScribeBackfiller) Clients() map[uint32][]ScribeBackend {
	return s.clients
}

func (c ChainBackfiller) ChainID() uint32 {
	return c.chainID
}
