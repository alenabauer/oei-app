export function calculateMinMaxCoordinates(geojson) {
    let minLon = Infinity;
    let minLat = Infinity;
    let maxLon = -Infinity;
    let maxLat = -Infinity;

    const processCoordinates = (coordinates) => {
        coordinates.forEach((ring) => {
            ring.forEach(([lon, lat]) => {
                minLon = Math.min(minLon, lon);
                minLat = Math.min(minLat, lat);
                maxLon = Math.max(maxLon, lon);
                maxLat = Math.max(maxLat, lat);
            });
        });
    };

    const geometry = geojson.geometry;
    const type = geometry.type;

    if (type === "Polygon") {
        processCoordinates(geometry.coordinates);
    } else if (type === "MultiPolygon") {
        geometry.coordinates.forEach((coordinates) => {
            processCoordinates(coordinates);
        });
    }

    return {
        minLat,
        minLon,
        maxLat,
        maxLon,
    };
}
