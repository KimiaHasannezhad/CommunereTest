import { persistStore } from 'redux-persist'
import store from './store'

let persistor = persistStore(store)

const resetPersistor = () => {
    persistor = persistStore(store);
}

export { persistor, resetPersistor };
