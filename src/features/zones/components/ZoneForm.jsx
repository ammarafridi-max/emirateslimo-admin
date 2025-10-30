import { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import MapboxDraw from '@mapbox/mapbox-gl-draw';
import Input from '../../../components/FormElements/Input';
import PrimaryButton from '../../../components/PrimaryButton';
import DeleteButton from '../../../components/DeleteButton';

mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_TOKEN;

export default function ZoneForm({
  mode = 'create', // "create" | "update"
  initialData = {},
  onSubmit,
  onDelete,
  isLoading = false,
  isDeleting = false,
}) {
  const [zoneName, setZoneName] = useState(initialData.name || '');
  const [polygon, setPolygon] = useState(initialData.geometry || null);

  const mapContainer = useRef(null);
  const mapRef = useRef(null);
  const drawRef = useRef(null);

  const DEFAULT_CENTER = [55.296249, 25.276987];
  const DEFAULT_ZOOM = 10;

  // Initialize map + draw controls
  useEffect(() => {
    if (mapRef.current) return;

    const map = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: DEFAULT_CENTER,
      zoom: DEFAULT_ZOOM,
    });

    const draw = new MapboxDraw({
      displayControlsDefault: false,
      controls: { polygon: true, trash: true },
      styles: [
        // 🔹 Polygon fill
        {
          id: 'gl-draw-polygon-fill',
          type: 'fill',
          paint: { 'fill-color': '#14948f', 'fill-opacity': 0.35 },
        },
        // 🔹 Polygon outline
        {
          id: 'gl-draw-polygon-stroke-active',
          type: 'line',
          paint: { 'line-color': '#0d6e69', 'line-width': 2 },
        },
        // 🔹 Vertices halo
        {
          id: 'gl-draw-polygon-and-line-vertex-halo-active',
          type: 'circle',
          paint: { 'circle-radius': 6, 'circle-color': '#ffffff' },
        },
        // 🔹 Vertices inner point
        {
          id: 'gl-draw-polygon-and-line-vertex-active',
          type: 'circle',
          paint: { 'circle-radius': 4, 'circle-color': '#14948f' },
        },
        // 🔹 Midpoints (always visible)
        {
          id: 'gl-draw-polygon-midpoint',
          type: 'circle',
          paint: {
            'circle-radius': 4,
            'circle-color': '#facc15',
            'circle-stroke-color': '#ffffff',
            'circle-stroke-width': 1.5,
          },
        },
      ],
    });

    map.addControl(draw);
    mapRef.current = map;
    drawRef.current = draw;

    function showMidpoints() {
      const data = draw.getAll();
      data.features.forEach((f) =>
        draw.changeMode('direct_select', { featureId: f.id })
      );
    }

    function updatePolygons() {
      const data = draw.getAll();

      if (data.features.length === 0) {
        setPolygon(null);
        return;
      }

      if (data.features.length === 1) {
        setPolygon(data.features[0].geometry);
        const featureId = data.features[0].id;
        draw.changeMode('direct_select', { featureId });
        showMidpoints();
      } else {
        setPolygon({
          type: 'MultiPolygon',
          coordinates: data.features.map((f) => f.geometry.coordinates),
        });
      }
    }

    map.on('draw.create', updatePolygons);
    map.on('draw.update', updatePolygons);
    map.on('draw.delete', updatePolygons);
  }, []);

  // Load existing polygon (Update mode)
  useEffect(() => {
    if (!mapRef.current || !drawRef.current || !polygon) return;
    const draw = drawRef.current;

    draw.deleteAll();
    const feature = {
      id: 'zone-shape',
      type: 'Feature',
      properties: {},
      geometry: polygon,
    };
    draw.add(feature);
    draw.changeMode('direct_select', { featureId: 'zone-shape' });
  }, [polygon]);

  // 🔹 Reset map (clear polygons + re-center)
  function handleResetMap() {
    if (!mapRef.current || !drawRef.current) return;

    drawRef.current.deleteAll();
    setPolygon(null);
    mapRef.current.flyTo({ center: DEFAULT_CENTER, zoom: DEFAULT_ZOOM });
  }

  // Submit handler
  function handleSubmit(e) {
    e.preventDefault();
    if (!zoneName || !polygon) {
      alert('Please provide a zone name and draw a polygon.');
      return;
    }

    onSubmit({
      name: zoneName,
      geometry: polygon,
    });
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Zone Name Input */}
      <div className="bg-white p-7 rounded-xl shadow-lg">
        <Input
          placeholder="Enter Zone Name"
          value={zoneName}
          onChange={(e) => setZoneName(e.target.value)}
        />
      </div>

      {/* Map Section */}
      <div className="bg-white p-7 rounded-xl shadow-lg">
        <div
          ref={mapContainer}
          className="w-full h-[600px] bg-gray-200 rounded-md"
        />

        {/* Action Buttons */}
        <div className="w-full grid grid-cols-1 sm:grid-cols-3 gap-3 mt-4">
          <PrimaryButton
            type="submit"
            color="success"
            disabled={isLoading || isDeleting}
          >
            {isLoading
              ? mode === 'create'
                ? 'Creating...'
                : 'Updating...'
              : mode === 'create'
                ? 'Create Zone'
                : 'Update Zone'}
          </PrimaryButton>

          <PrimaryButton
            type="button"
            color="secondary"
            onClick={handleResetMap}
            disabled={isLoading || isDeleting}
          >
            Reset Map
          </PrimaryButton>

          {mode === 'update' && onDelete && (
            <DeleteButton
              type="button"
              onClick={onDelete}
              disabled={isDeleting || isLoading}
            >
              {isDeleting ? 'Deleting...' : 'Delete Zone'}
            </DeleteButton>
          )}
        </div>
      </div>
    </form>
  );
}
