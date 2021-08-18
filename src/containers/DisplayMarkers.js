import { marker } from 'leaflet'
import React, { useEffect, useState } from 'react'
import { MapContainer, Marker, TileLayer, Popup } from 'react-leaflet'
import locationIcon from '../assets/locationIcon.png'

function DisplayMarker({ markerDetails }) {
    const position = [51.505, -0.09]
    const [center, setCenter] = useState(position)
    var L = window.L;
    var icon = L.icon({
        iconUrl: locationIcon,
        iconSize: [38, 40], // size of the icon
        iconAnchor: [22, 94], // point of the icon which will correspond to marker's location
        popupAnchor: [-3, -76] // point from which the popup should open relative to the iconAnchor
    });

    useEffect(() => {
        setCenter(markerDetails.markerPosition)
    }, [markerDetails])
    return (
        <div className="form-item-row">
            <MapContainer id="map2" center={center} zoom={13} scrollWheelZoom={false}>
                <TileLayer
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {!!markerDetails &&
                    <Marker position={markerDetails.markerPosition} className="marker" icon={icon}>
                        <Popup>
                            {markerDetails.markerName}<br /> {markerDetails.markerType}
                        </Popup>
                    </Marker>
                }
            </MapContainer>
        </div>
    )
}

export default DisplayMarker