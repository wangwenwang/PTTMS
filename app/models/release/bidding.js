import { createAction, NavigationActions, delay } from '../../utils'
import * as authService from '../../services/auth'
import { bidding } from '../../services/release'
import { localMemberInfo } from '../../services/my'

export default {
  namespace: 'bidding',
  state: {
    releaseList: [],
    memberInfo: {},
      subLoading: false,
  },
  reducers: {
    save(state, { payload }) {
      return { ...state, ...payload }
    },
  },
  effects: {
    // 获取找货列表
    *bidding({ payload: info }, { call, put, select }) {
        yield put(createAction('save')({ subLoading: true }))
        const data = yield call(bidding, info)
        if (data.send) {
            yield put(createAction('save')({ subLoading: false }))
            yield call(delay, 1000)
            // yield put(NavigationActions.back())
            yield put(NavigationActions.navigate({ routeName: 'Release' }))
        } else {
            yield put(createAction('save')({ subLoading: false }))
        }
    },
    // 获取个人信息
    *localMemberInfo({ payload }, { call, put, select }) {
        const data = yield call(localMemberInfo)
        if (data) {
            yield put(createAction('save')(data))
        }
    },
  },
}
