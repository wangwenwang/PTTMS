import { createAction, NavigationActions } from '../../utils'
import * as authService from '../../services/auth'
import { getWaybill } from '../../services/waybill'

export default {
  namespace: 'releaseSearch',
  state: {
      startTime: null,
      endTime: null,
      stateOrderStatus: null,
  },
  reducers: {
    save(state, { payload }) {
      return { ...state, ...payload }
    },
  },
  effects: {

  },
}
