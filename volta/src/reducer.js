const initialState = {
  currentLocation: {
    longitude: 0,
    latitude: 0,
  },
  directions: null,
    error: null,
    waypoints: [],
    from: "",
    to: "",
    stations: null,
    markers: null,
    mVisible: true,
    selectedStations: [],
    selectedCar: {},
    showSelectCar: true,
    range: "",
    suggestedStation: []
};

const reducer = (state = initialState, action) => {
  if (action.type === "SET_POSITION") {
    return {
      ...state,
      currentLocation: {
        longitude: action.payload.position.longitude,
        latitude: action.payload.position.latitude
      }
    };
  }
  else if (action.type === "SUGGESTED_SEARCH_TERMS") {
    console.log(action.payload.results)
    return {
      ...state,
      from: action.payload.results.from,
      to: action.payload.results.to,
      waypoints: [action.payload.results.waypoint],
      selectedStations: [],
      stations: action.payload.results.suggestedStation,
      range: action.payload.results.range,
      markers: action.payload.results.marker,
      suggestedStation: action.payload.results.suggestedStation
      
    }
  }
  else if (action.type === "SEARCH_TERMS") {
    console.log(action.payload.results)
    return {
      ...state,
      from: action.payload.results.from,
      to: action.payload.results.to,
      waypoints: [],
      range: action.payload.results.range,
      mVisible: true,
      suggestedStation: [],
      selectedStations: []
    }
  }
  else if (action.type === "STATIONS") {
    return {
      ...state,
      stations: action.payload.stations
    }
  }
  else if (action.type === "MARKERS") {
    return {
      ...state,
      markers: action.payload.markers
    }
  }
  else if (action.type === "WAYPOINTS") {
    return {
      ...state,
      waypoints: [...state.waypoints, action.payload.wayPoint],
      selectedStations: [...state.selectedStations, action.payload.stationInfo]
    }
  }
  else if (action.type === "SHOWMARKERS") {
    return {
      ...state,
      mVisible: !state.mVisible
    }
  }
  else if (action.type === "SETCAR") {
    return {
      ...state,
      selectedCar: action.payload.car,
      showSelectCar: !state.showSelectCar
    }
  }
  return state;
};

export default reducer;
