import { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import MapboxDraw from '@mapbox/mapbox-gl-draw';

import { useZones } from './useZones';
import { useUpdateZone } from './useUpdateZone';
import Breadcrumb from '../../components/Breadcrumb';
import PageHeading from '../../components/PageHeading';
import Label from '../../components/FormElements/Label';
import Input from '../../components/FormElements/Input';
import PrimaryButton from '../../components/PrimaryButton';
import DeleteButton from '../../components/DeleteButton';
import { useParams } from 'react-router-dom';
import { useDeleteZone } from './useDeleteZone';
import { Helmet } from 'react-helmet-async';

mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_TOKEN;

export default function UpdateZone() {
  const { zones } = useZones();
  const { id: zoneId } = useParams();
  const { updateZone, isUpdating } = useUpdateZone();
  const { deleteZone, isDeleting } = useDeleteZone();

  const [zoneName, setZoneName] = useState('');
  const [polygon, setPolygon] = useState(null);

  const mapContainer = useRef(null);
  const mapRef = useRef(null);
  const drawRef = useRef(null);

  // Load zone details into state
  useEffect(() => {
    const zone = zones?.find((z) => z._id === zoneId);
    if (zone) {
      setZoneName(zone.name);
      setPolygon(zone.geometry);
    }
  }, [zones, zoneId]);

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
        // 🔹 Polygon fill
        {
          id: 'gl-draw-polygon-fill',
          type: 'fill',
          paint: {
            'fill-color': '#14948f',
            'fill-opacity': 0.3,
          },
        },
        // 🔹 Polygon outline
        {
          id: 'gl-draw-polygon-stroke-active',
          type: 'line',
          paint: {
            'line-color': '#117f7a',
            'line-width': 2,
          },
        },
        // 🔹 Main vertices (outer white halo)
        {
          id: 'gl-draw-polygon-and-line-vertex-halo-active',
          type: 'circle',
          paint: {
            'circle-radius': 6,
            'circle-color': '#ffffff',
          },
        },
        // 🔹 Main vertices (inner point)
        {
          id: 'gl-draw-polygon-and-line-vertex-active',
          type: 'circle',
          paint: {
            'circle-radius': 4,
            'circle-color': '#14948f', // 👈 main vertex color
          },
        },
        // 🔹 Midpoints (add new vertex handles)
        {
          id: 'gl-draw-polygon-midpoint',
          type: 'circle',
          paint: {
            'circle-radius': 4,
            'circle-color': '#facc15', // 👈 yellow for midpoints only
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
        setPolygon(data.features[0].geometry);
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

  useEffect(() => {
    if (!mapRef.current || !drawRef.current || !polygon) return;

    const draw = drawRef.current;

    const featureIds = draw.getAll().features.map((f) => f.id);
    if (featureIds.length > 0) {
      draw.changeMode('direct_select', { featureId: featureIds[0] });
    }

    draw.add({
      id: 'zone-shape',
      type: 'Feature',
      properties: {},
      geometry: polygon,
    });
  }, [polygon]);

  function handleSubmit(e) {
    e.preventDefault();
    if (!zoneName || !polygon) {
      alert('Please provide zone name and polygon.');
      return;
    }

    updateZone({
      id: zoneId,
      zoneData: {
        name: zoneName,
        geometry: polygon,
      },
    });
  }

  return (
    <>
      <Helmet>
        <title>{`${zoneName}`}</title>
      </Helmet>
      <Breadcrumb
        paths={[
          { label: 'Home', href: '/' },
          { label: 'Zones', href: '/zones' },
          { label: 'Update Zone', href: `/zones/update/${zoneId}` },
        ]}
      />
      <PageHeading className="mb-5">Update Zone</PageHeading>

      <form onSubmit={handleSubmit}>
        <div className="bg-white p-7 rounded-xl shadow-lg">
          <Input
            placeholder="Enter Zone Name"
            value={zoneName}
            onChange={(e) => setZoneName(e.target.value)}
          />
        </div>
        <div className="h-fit overflow-scroll flex flex-col gap-3 bg-white p-7 mt-5 rounded-xl shadow-lg">
          <div>
            <div
              ref={mapContainer}
              className="w-[100%] h-[600px] bg-gray-200 rounded-md"
            />

            <div className="w-full relative flex flex-col gap-1">
              <PrimaryButton
                className="mt-5"
                type="submit"
                disabled={isUpdating || isDeleting}
              >
                {isUpdating ? 'Updating...' : 'Update Zone'}
              </PrimaryButton>
              <DeleteButton
                className="mt-1"
                type="button"
                onClick={() => deleteZone(zoneId)}
                disabled={isUpdating || isDeleting}
              >
                {isDeleting ? 'Deleting...' : 'Delete Zone'}
              </DeleteButton>
            </div>
          </div>
        </div>
      </form>
    </>
  );
}
