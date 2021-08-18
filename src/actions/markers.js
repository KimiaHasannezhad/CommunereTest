import React from 'react'
import { CREATE_MARKER } from '../constants/markers'


export default function createMarker(name, type, position) {
    return async function (dispatch) {
        const markerData = {
            markerName: name,
            markerType: type,
            markerPosition: position
        }
        dispatch({ type: CREATE_MARKER })
        const response = markerData
        dispatch({
            type: CREATE_MARKER,
            response,
        })
    }
}
