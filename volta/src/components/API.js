const jsonify = response => response.json();


const searchSuggested = (lat, lng) => {
    return fetch(
        `https://api.openchargemap.io/v3/poi/?output=json&latitude=${lat}&longitude=${lng}&maxresults=1&verbose=false`
,
      {
        method: "GET",
      }
    ).then(jsonify);
  };


  
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
    searchSuggested
  }