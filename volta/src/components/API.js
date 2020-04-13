const jsonify = response => response.json();

  
const searchWaypoints = (polyline) => {
    return fetch(
        `https://api.openchargemap.io/v3/poi/?output=json&polyline=${polyline}&distance=2&verbose=false`
,
      {
        method: "GET",
      }
    ).then(jsonify);
  };



  export default {
    searchWaypoints,
  }