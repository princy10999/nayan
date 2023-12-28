import { useReducer, createContext } from "react"; // store user state

// initial state
const initialState = {
    showInfo: false,
    mapDetails: null,
    currentLocation: []
};

// create context
const MapStateContext = createContext();

// root reducer
const rootReducer = (state, action) => {
    switch (action.type) {
        case "SHOW_INFO_MAP":
            return { ...state, mapDetails: action.payload, showInfo: true, currentLocation: [] };
        case "CLOSE_INFO_MAP":
            return { ...state, showInfo: false, mapDetails: null, currentLocation: [] };
        case "SET_CURRENT_LOCATION":
            return { ...state, currentLocation: action.payload }
        default:
            return state;
    }
};

// context provider
const MapStateProvider = ({ children }) => {
    const [mapState, dispatchMapState] = useReducer(rootReducer, initialState);

    return (
        <MapStateContext.Provider value={{ mapState, dispatchMapState }}>
            {children}
        </MapStateContext.Provider>
    );
};

export { MapStateContext, MapStateProvider };
