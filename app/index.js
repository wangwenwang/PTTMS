import React from 'react'
import { AppRegistry, AsyncStorage } from 'react-native'
import dva from 'dva/mobile'
import { persistStore, autoRehydrate } from 'redux-persist'
import { Toast } from 'antd-mobile'
import './utils/asyncStorage'
import createLoading from 'dva-loading';

import { registerModels } from './models'
import Router from './router'

const app = dva(createLoading({
  initialState: {},
  // extraEnhancers: [autoRehydrate()],
  onError(e) {
    console.log(JSON.stringify(e));
      Toast.offline(e.message, 1, null, true)
  },
}))

registerModels(app)

app.router(() => <Router />)

const App = app.start()

// eslint-disable-next-line no-underscore-dangle
// persistStore(app._store, { storage: AsyncStorage })

AppRegistry.registerComponent('DvaStarter', () => App)
