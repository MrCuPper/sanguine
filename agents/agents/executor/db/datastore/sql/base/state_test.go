package base_test

import (
	"encoding/json"
	"github.com/brianvoe/gofakeit/v6"
	"github.com/ethereum/go-ethereum/common"
	"github.com/stretchr/testify/assert"
	"github.com/synapsecns/sanguine/agents/agents/executor/db/datastore/sql/base"
	"github.com/synapsecns/sanguine/agents/agents/executor/types"
	"math/big"
	"testing"
)

func TestDBStateToState(t *testing.T) {
	snapshotRoot := common.BigToHash(big.NewInt(gofakeit.Int64())).String()
	root := common.BigToHash(big.NewInt(gofakeit.Int64())).String()
	chainID := gofakeit.Uint32()
	nonce := gofakeit.Uint32()
	originBlockNumber := gofakeit.Uint64()
	originTimestamp := gofakeit.Uint64()
	proof := []string{common.BigToHash(big.NewInt(gofakeit.Int64())).String(), common.BigToHash(big.NewInt(gofakeit.Int64())).String()}
	treeHeight := gofakeit.Uint32()
	stateIndex := gofakeit.Uint32()

	proofJSON, err := json.Marshal(proof)
	if err != nil {
		panic(err)
	}

	initialDBState := types.DBState{
		SnapshotRoot:      &snapshotRoot,
		Root:              &root,
		ChainID:           &chainID,
		Nonce:             &nonce,
		OriginBlockNumber: &originBlockNumber,
		OriginTimestamp:   &originTimestamp,
		Proof:             (*json.RawMessage)(&proofJSON),
		TreeHeight:        &treeHeight,
		StateIndex:        &stateIndex,
	}

	initialState := base.DBStateToState(initialDBState)

	finalDBState := base.StateToDBState(initialState)

	finalState := base.DBStateToState(finalDBState)

	assert.Equal(t, initialDBState, finalDBState)
	assert.Equal(t, initialState, finalState)
}