// Package messageharness generates abi data for contract MessageHarness.sol
package messageharness

//go:generate go run github.com/synapsecns/sanguine/tools/abigen generate --sol  ../../../../packages/contracts-core/flattened/MessageHarness.sol --pkg messageharness --sol-version 0.8.17 --filename messageharness
// line after go:generate cannot be left blank
