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

  useEffect(() => {
    const zone = zones?.find((z) => z._id === zoneId);
    if (zone) {
      setZoneName(zone.name);
      setPolygon(zone.geometry);
    }
  }, [zones, zoneId]);

  useEffect(() => {
    if (mapRef.current || !polygon) return;

    const map = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: [55.296249, 25.276987],
      zoom: 11,
    });

    const draw = new MapboxDraw({
      displayControlsDefault: false,
      controls: { polygon: true, trash: true },
    });

    map.addControl(draw);
    mapRef.current = map;
    drawRef.current = draw;

    map.on('load', () => {
      // Load existing polygon/multipolygon onto map
      draw.add({
        id: 'zone-shape',
        type: 'Feature',
        properties: {},
        geometry: polygon,
      });
    });

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
  }, [polygon]);

  // Handle update
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
      <Breadcrumb
        paths={[
          { label: 'Home', href: '/' },
          { label: 'Zones', href: '/zones' },
          { label: 'Update Zone', href: `/zones/update/${zoneId}` },
        ]}
      />
      <PageHeading className="mb-5">Update Zone</PageHeading>

      <form onSubmit={handleSubmit}>
        <div className="h-[450px] overflow-scroll flex flex-col gap-3 bg-white p-7 mt-5 rounded-xl shadow-lg">
          <div className="flex gap-5">
            {/* Map */}
            <div
              ref={mapContainer}
              className="w-[60%] h-[350px] bg-gray-200 rounded-md"
            />

            {/* Sidebar */}
            <div className="w-[40%] relative flex flex-col gap-1">
              <Label>Zone Name</Label>
              <Input
                placeholder="Enter Zone Name"
                value={zoneName}
                onChange={(e) => setZoneName(e.target.value)}
              />

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
                {isUpdating ? 'Deleting...' : 'Delete Zone'}
              </DeleteButton>
            </div>
          </div>
        </div>
      </form>
    </>
  );
}
