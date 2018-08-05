import { createAction, NavigationActions, delay } from '../../utils'
import * as authService from '../../services/auth'
import { receiptUpload } from '../../services/waybill'

export default {
  namespace: 'receiptUpload',
  state: {
      imagePath: [],
      deliveryNumber: '',
      subLoading: false,
  },
  reducers: {
    save(state, { payload }) {
      return { ...state, ...payload }
    },
  },
  effects: {
    // 回单上传
    *receiptUpload({ payload: info }, { call, put, select }) {
        yield put(createAction('save')({ subLoading: true }))
        const data = yield call(receiptUpload, info)
        if (data.send) {
            yield put(createAction('save')({ subLoading: false }))
            yield put(createAction('save')({
                imagePath: [],
            }))
            yield call(delay, 1000)
            yield put(NavigationActions.back())
            // yield put(NavigationActions.navigate({ routeName: 'Waybill' }))
        } else {
            yield put(createAction('save')({ subLoading: false }))
        }
    },
  },
}
