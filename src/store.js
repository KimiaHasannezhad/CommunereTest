import { createStore, applyMiddleware, combineReducers } from 'redux'
import ReduxThunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import { rootReducer, reducers } from './reducers/index'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web
import { persistReducer } from 'redux-persist'

const persistConfig = {
    key: 'root',
    storage,
}

function configureStore(initialState = {}) {
    const middlewares = [ReduxThunk]
    const enhancers = [
        applyMiddleware(...middlewares),
        // other store enhancers if any
    ]

      const composeEnhancers = composeWithDevTools({
    // other compose enhancers if any
    // Specify here other options if needed
      })

    const persistedReducer = persistReducer(persistConfig, rootReducer)

    const store = createStore(persistedReducer, initialState ,composeEnhancers(...enhancers))

    if (module.hot) {
        // Enable Webpack hot module replacement for reducers
        module.hot.accept('./reducers/index', () => {
            /* eslint-disable global-require */
            const nextRootReducer = combineReducers(reducers)
            store.replaceReducer(
                persistReducer(
                    {
                        key: 'root',
                        storage,
                    },
                    nextRootReducer,
                ),
            )
        })
    }

    return store
}

export default configureStore()
