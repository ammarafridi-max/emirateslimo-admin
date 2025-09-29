import { useEffect, useRef, useState } from 'react';
import { useCreateZone } from '../hooks/useCreateZone';
import mapboxgl from 'mapbox-gl';
import MapboxDraw from '@mapbox/mapbox-gl-draw';
import Breadcrumb from '../../../components/Breadcrumb';
import PageHeading from '../../../components/PageHeading';
import Input from '../../../components/FormElements/Input';
import PrimaryButton from '../../../components/PrimaryButton';

mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_TOKEN;

export default function CreateZone() {
  const [value, setValue] = useState('');

  const [zoneName, setZoneName] = useState('');
  const [polygon, setPolygon] = useState(null);

  const mapContainer = useRef(null);
  const mapRef = useRef(null);
  const drawRef = useRef(null);

  const { createZone, isCreating } = useCreateZone();

  // Initialize map
  useEffect(() => {
    if (mapRef.current) return;

    const map = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: [55.296249, 25.276987],
      zoom: 11,
    });

    const draw = new MapboxDraw({
      displayControlsDefault: false,
      controls: { polygon: true, trash: true },
      styles: [
        // Polygon fill
        {
          id: 'gl-draw-polygon-fill',
          type: 'fill',
          paint: {
            'fill-color': '#14948f', // 🔹 your custom color
            'fill-opacity': 0.4,
          },
        },
        // Polygon outline
        {
          id: 'gl-draw-polygon-stroke-active',
          type: 'line',
          paint: {
            'line-color': '#117f7a', // 🔹 outline color
            'line-width': 2,
          },
        },
        // Vertices (circle handles)
        {
          id: 'gl-draw-polygon-and-line-vertex-halo-active',
          type: 'circle',
          paint: {
            'circle-radius': 6,
            'circle-color': '#ffffff',
          },
        },
        {
          id: 'gl-draw-polygon-and-line-vertex-active',
          type: 'circle',
          paint: {
            'circle-radius': 4,
            'circle-color': '#14948f',
          },
        },
      ],
    });

    map.addControl(draw);
    mapRef.current = map;
    drawRef.current = draw;

    function updatePolygons() {
      const data = draw.getAll();
      if (data.features.length === 0) {
        setPolygon(null);
        return;
      }

      if (data.features.length === 1) {
        setPolygon(data.features[0]);
      } else {
        setPolygon({
          type: 'Feature',
          properties: { name: zoneName },
          geometry: {
            type: 'MultiPolygon',
            coordinates: data.features.map((f) => f.geometry.coordinates),
          },
        });
      }
    }

    map.on('draw.create', updatePolygons);
    map.on('draw.update', updatePolygons);
    map.on('draw.delete', updatePolygons);
  }, [zoneName]);

  // Handle form submit
  function handleSubmit(e) {
    e.preventDefault();

    if (!zoneName || !polygon) {
      alert('Please enter zone name and draw a polygon.');
      return;
    }

    const zoneData = {
      name: zoneName,
      areas: [value], // optional: based on your search selection
      geometry: polygon.geometry,
    };

    createZone(zoneData);
  }

  return (
    <>
      <Breadcrumb
        paths={[
          { label: 'Home', href: '/' },
          { label: 'Zones', href: '/zones' },
          { label: 'Create Zone', href: '/zones/create' },
        ]}
      />
      <PageHeading className="mb-5">Create Zones</PageHeading>
      <form onSubmit={handleSubmit}>
        <div className="bg-white p-7 rounded-xl shadow-lg">
          <Input
            placeholder="Enter Zone Name"
            value={zoneName}
            onChange={(e) => setZoneName(e.target.value)}
          />
        </div>
        <div className="h-fit overflow-scroll flex flex-col gap-3 bg-white p-7 mt-5 rounded-xl shadow-lg">
          <div className="gap-5">
            <div
              ref={mapContainer}
              id="map"
              className="w-[100%] h-[600px] bg-gray-200 rounded-md"
            />

            <div className="w-[100%] relative flex flex-col gap-3">
              {/* <Label>Search</Label>
              <SelectCustom
                value={value}
                setValue={setValue}
                className="w-full"
              >
                <div className="min-h-fit max-h-[300px] overflow-scroll bg-white rounded-sm border-1 border-gray-200">
                  {isLoadingLocations && (
                    <>
                      <LoadingLocation />
                      <LoadingLocation />
                      <LoadingLocation />
                    </>
                  )}
                  {locations?.map((location, i) => (
                    <div
                      key={i}
                      className="px-4 py-1.5 font-light text-[15px] cursor-pointer hover:bg-blue-100 duration-300"
                      onClick={() => setValue(location?.name)}
                    >
                      {location?.name}
                    </div>
                  ))}
                </div>
              </SelectCustom> */}

              <PrimaryButton
                type="submit"
                className="mt-4"
                disabled={isCreating}
              >
                {isCreating ? 'Saving...' : 'Save Zone'}
              </PrimaryButton>
            </div>
          </div>
        </div>
      </form>
    </>
  );
}
