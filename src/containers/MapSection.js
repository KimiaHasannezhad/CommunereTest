import React, { useState, memo, useMemo, useCallback, useRef, useEffect } from 'react'
import { MapContainer, TileLayer, Marker, Popup, useMapEvent } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import '../styles/map.css';
import '../styles/globalStyle.css'
import locationIcon from '../assets/locationIcon.png'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import store from '../store'
import createMarker from '../actions/markers'
import DisplayMarker from './DisplayMarkers';


let LocationTypes = ["food", "business", "historical places", "shopping center", "public transfer station", "education"]

function MapSection(props) {
    const { dispatch, markerDetails } = props
    // const [markers, setMarkers] = useState([{ name: '', type: '', logo: '', position: [] }])
    const [markerName, setMarkerName] = useState('')
    const [markerType, setMarkerType] = useState('')
    const [center, setCenter] = useState([51.505, -0.09])
    const [markerPosition, setMarkerPosition] = useState([])
    const [active, setActive] = useState(true)
    const [draggable, setDraggable] = useState(false)
    const [changeMarker, setChangeMarker] = useState(false)

    var L = window.L;
    var LocationIcon = L.icon({
        iconUrl: locationIcon,
        iconSize: [38, 40], // size of the icon
        iconAnchor: [22, 94], // point of the icon which will correspond to marker's location
        popupAnchor: [-3, -76] // point from which the popup should open relative to the iconAnchor
    });



    const markerRef = useRef(null)
    const eventHandlers = useMemo(
        () => ({
            dragend() {
                const marker = markerRef.current
                if (marker != null) {
                    let array = [marker.getLatLng().lat, marker.getLatLng().lng]
                    setCenter(array)
                    setMarkerPosition(array)
                    // var chosenLocation = marker.getLatLng()
                }
            },
        }),
        [],
    )
    const toggleDraggable = useCallback(() => {
        setDraggable((d) => !d)
    }, [])



    useEffect(() => {
        if (!!markerName && !!markerType && !!markerPosition && markerPosition.length > 1) {
            setActive(false)
        } else {
            setActive(true)
        }
    }, [markerName, markerType, markerPosition])

    useEffect(() => {
        setLocationName(markerName)
    }, [markerName])

    useEffect(() => {
        setLocationType(markerType)
    }, [markerType])



    const setLocationName = (value) => {
        setMarkerName(value)
    }

    const setLocationType = (value) => {
        setMarkerType(value)
    }

    useEffect(() => {
        if (changeMarker) {
            setMarkerPosition(center)
        }
    }, [changeMarker, center])


    useEffect(() => {
        if (changeMarker) {
            setMarkerPosition(center)
        }
    }, [changeMarker, center])

    const handleCreateMarker = (markerName, markerType, markerPosition) => {
        dispatch(createMarker(markerName, markerType, markerPosition))
        console.log(markerName + markerType + markerPosition)
    }

    return (
        <>
            <div className="add-location-elements">
                <div className="form-item-row">
                    <label>
                        location name :
                    </label>
                    <input type="text" onChange={(e) => setLocationName(e.target.value)}>
                    </input>
                </div>
                <div className="form-item-row">
                    <label>Location on map : </label>
                    <MapContainer className="map-body" center={center} zoom={13} scrollWheelZoom={false}>
                        <TileLayer
                            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                        <Marker
                            icon={LocationIcon}
                            draggable={draggable}
                            eventHandlers={eventHandlers}
                            position={center}
                            ref={markerRef}>
                            <Popup minWidth={90}>
                                <span onClick={toggleDraggable}>
                                    {draggable
                                        ? <>
                                            <p>Now ! put marker in a location you want</p>
                                            <button id="set-location-btn"
                                                onClick={() => {
                                                    setChangeMarker(!changeMarker)
                                                }}>
                                                CONFIRM
                                            </button>
                                        </>
                                        : 'Click here to change the location'
                                    }
                                </span>
                            </Popup>
                        </Marker>
                    </MapContainer>
                </div>
                <div className="form-item-row">
                    <label>Location Type : </label>
                    <select onChange={(e) => setLocationType(e.target.value)}>
                        {!!LocationTypes && LocationTypes.map((item, key) => {
                            return (
                                <option>{item}</option>
                            )
                        })}
                    </select>
                </div>
                <div className="form-item-row">
                    <label> Logo:</label>
                    <input type="file" className="select-logo"></input>
                </div>
                <div className="form-item-row btn-section">
                    <button id="send-btn" disabled={active} onClick={() => handleCreateMarker(markerName, markerType, markerPosition)}>SEND</button>
                    <button id="cancel-btn" >CANCEL</button>
                </div>
            </div>
            <div>
                {!!markerDetails &&
                    <DisplayMarker markerDetails={markerDetails} />
                }
            </div>
        </>

    )
}


MapSection.propTypes = {
    dispatch: PropTypes.func,
    markerDetails: PropTypes.object,
}

function mapStateToProps(state) {
    return {
        dispatch: store.dispatch,
        markerDetails: state.MarkerReducer.markerDetails,
    }
}

const withConnect = connect(mapStateToProps)

export default compose(withConnect, memo)(withRouter(MapSection))
