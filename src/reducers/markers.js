import React from 'react'
import { CREATE_MARKER } from '../constants/markers'

const initialState = {
    markerDetails: {},
}

export default function MarkerReducer(state = initialState, action) {
    switch (action.type) {
        case CREATE_MARKER:
            return {
                ...state,
                markerDetails: action.response,
            }
        default:
            return state
    }

}
