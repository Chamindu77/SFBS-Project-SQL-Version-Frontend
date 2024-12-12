import { FETCH_AVAILABLE_EQUIPMENT_SUCCESS, FETCH_AVAILABLE_EQUIPMENT_FAIL } from '../actions/types';

const initialState = {
  availableEquipment: [],
  loading: true,
  error: null,
};

function equipmentReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_AVAILABLE_EQUIPMENT_SUCCESS:
      return {
        ...state,
        availableEquipment: action.payload,
        loading: false,
      };
    case FETCH_AVAILABLE_EQUIPMENT_FAIL:
      return {
        ...state,
        availableEquipment: [],
        loading: false,
        error: 'Failed to load available equipment.',
      };
    default:
      return state;
  }
}

export default equipmentReducer;
