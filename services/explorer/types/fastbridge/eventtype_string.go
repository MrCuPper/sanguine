// Code generated by "stringer -type=EventType"; DO NOT EDIT.

package fastbridge

import "strconv"

func _() {
	// An "invalid array index" compiler error signifies that the constant values have changed.
	// Re-run the stringer command to generate them again.
	var x [1]struct{}
	_ = x[BridgeRequestedEvent-0]
	_ = x[BridgeRelayedEvent-1]
}

const _EventType_name = "BridgeRequestedEventBridgeRelayedEvent"

var _EventType_index = [...]uint8{0, 20, 38}

func (i EventType) String() string {
	if i >= EventType(len(_EventType_index)-1) {
		return "EventType(" + strconv.FormatInt(int64(i), 10) + ")"
	}
	return _EventType_name[_EventType_index[i]:_EventType_index[i+1]]
}
