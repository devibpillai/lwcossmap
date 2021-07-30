import { LightningElement } from 'lwc';
import  mapboxgl from 'mapbox-gl';
import  MapboxDirections from '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions';
import '@mapbox/mapbox-gl.css'; 
//import mapboxgl from 'mapbox-gl/dist/mapbox-gl-csp';
//import MapboxWorker from 'mapbox-gl/dist/mapbox-gl-csp-worker'; 
export default class App extends LightningElement {
    
    renderedCallback(){
        var map;
        //mapboxgl.workerClass = MapboxWorker;
        mapboxgl.accessToken = 'pk.eyJ1IjoiZmFyYWRheTIiLCJhIjoiTUVHbDl5OCJ9.buFaqIdaIM3iXr1BOYKpsQ';
        const container = this.template.querySelector('[data-id="map"]');
        if(container){
        map = new mapboxgl.Map({
        container: this.template.querySelector('[data-id="map"]'),
        style: 'mapbox://styles/mapbox/streets-v11', // style URL
        center: [-68.137343, 45.137451], // starting position
        zoom: 5 // starting zoom
      });
      console.log(map);
    }
    map.addControl(
        new MapboxDirections({
            accessToken: mapboxgl.accessToken
        }),
        'top-left'
    );

    map.on('load', function () {
      // Add a data source containing GeoJSON data.
      map.addSource('maine', {
          'type': 'geojson',
          'data': {
              'type': 'Feature',
              'geometry': {
                  'type': 'Polygon',
                  // These coordinates outline Maine.
                  'coordinates': [
                      [
                          [-67.13734, 45.13745],
                          [-66.96466, 44.8097],
                          [-68.03252, 44.3252],
                          [-69.06, 43.98],
                          [-70.11617, 43.68405],
                          [-70.64573, 43.09008],
                          [-70.75102, 43.08003],
                          [-70.79761, 43.21973],
                          [-70.98176, 43.36789],
                          [-70.94416, 43.46633],
                          [-71.08482, 45.30524],
                          [-70.66002, 45.46022],
                          [-70.30495, 45.91479],
                          [-70.00014, 46.69317],
                          [-69.23708, 47.44777],
                          [-68.90478, 47.18479],
                          [-68.2343, 47.35462],
                          [-67.79035, 47.06624],
                          [-67.79141, 45.70258],
                          [-67.13734, 45.13745]
                      ]
                  ]
              }
          }
      });

     
      // Add a black outline around the polygon.
      map.addLayer({
          'id': 'outline',
          'type': 'line',
          'source': 'maine',
          'layout': {},
          'paint': {
              'line-color': '#000',
              'line-width': 3
          }
      });
  });
    }
    
}
