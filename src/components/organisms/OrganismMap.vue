<template>
  <div ref="map-root" class="organism-map">
  </div>
</template>

<script>
// map implemented following this tutorial: https://dev.to/camptocamp-geo/integrating-an-openlayers-map-in-vue-js-a-step-by-step-guide-2n1p
import View from 'ol/View'
import Map from 'ol/Map'
import TileLayer from 'ol/layer/Tile'
import OSM from 'ol/source/OSM'
import 'ol/ol.css'
import VectorLayer from 'ol/layer/Vector'
import VectorSource from 'ol/source/Vector'
import GeoJSON from 'ol/format/GeoJSON'
import {Style, Fill, Stroke} from 'ol/style';

export default {
  name: 'OrganismMap',
  components: {},
  props: {
    geojson: Object,
  },
  data: () => ({
    olMap: null,
    vectorLayer: null
  }),
  mounted() {
    this.vectorLayer = new VectorLayer({
      source: new VectorSource({
        features: [], // empty vector layer
      }),
      // TODO: figure out why style is not applied
      style: new Style({
        fill: new Fill({
          color: 'red'
        }),
        stroke: new Stroke({
          color: 'white',
          width: 3
        }),
        zIndex: 1000,
      }),
    })

    // create the OpenLayers Map instance
    this.olMap = new Map({
      target: this.$refs['map-root'],
      layers: [
        // add a simple OSM tile layer
        new TileLayer({
          source: new OSM() // default OpenStreetMap style,
        }),
      ],

      // the map shows the whole world by default
      view: new View({
        zoom: 0,
        center: [0, 0],
        constrainResolution: true
      }),
    })

    // add the vector layer to the map
    if (this.geojson) {
      this.updateSource(this.geojson)
    }

    this.olMap.getView().on('change:resolution', this.handleViewChange);
    this.olMap.getView().on('change:center', this.handleViewChange);
  },
  inject: {
    updateBbox: {
      from: 'updateBbox'
    }
  },
  watch: {
    geojson(value) {
      // update the vector layer when the geojson data changes
      if (value) {
        this.updateSource(value)
        const bbox = this.calculateBboxFromViewExtent()
        this.updateBbox(bbox)
      }
    },
  },
  methods: {
    updateSource(geojson) {
      const view = this.olMap.getView()
      const source = this.vectorLayer.getSource()

      const features = new GeoJSON({
        featureProjection: 'EPSG:3857',
      }).readFeatures(geojson)

      source.clear();
      source.addFeatures(features);

      view.fit(source.getExtent())
    },
    handleViewChange() {
      const bbox = this.calculateBboxFromView()
      this.updateBbox(bbox)
    },
    calculateBboxFromView() {
      // get extent of the current view
      const extent = this.olMap.getView().calculateExtent(this.olMap.getSize());
      return {
        minLon: extent[0],
        minLat: extent[1],
        maxLon: extent[2],
        maxLat: extent[3],
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.organism-map {
  width: 100vw;
  height: 60vh;

  @media screen and (min-width: 1024px) {
    height: 100vh;
  }
}
</style>