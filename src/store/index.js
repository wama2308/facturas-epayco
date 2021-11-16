import { createStore, applyMiddleware, compose } from 'redux';
import Thunk from 'redux-thunk';
import reducers from '../reducers';

export function configureStore(initialState) {        
    const store = createStore(
        reducers,
        initialState,
        compose(applyMiddleware(Thunk))
    );    
    if (module.hot) {        
        module.hot.accept('../reducers/index', () => {
            const nextRootReducer = require('../reducers/index');
            store.replaceReducer(nextRootReducer);
        });
    }
    return store;
}