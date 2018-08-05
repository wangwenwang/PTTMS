import { createAction, NavigationActions } from '../../utils'
import * as authService from '../../services/auth'
import { getReleaseList } from '../../services/release'

export default {
  namespace: 'release',
  state: {
      currentPage: 1,
      numberPerPage: 5,
      loading: false,
      refreshing: false,
      isOver: false,
      releaseList: [],
  },
  reducers: {
    save(state, { payload }) {
      return { ...state, ...payload }
    },
  },
  effects: {
    // 获取找货列表
    *getReleaseList({ payload: searchValue }, { call, put, select }) {
        const info = yield select(state => state.release)
        yield put(createAction('save')({ loading: true }))

        let data     // 返回数据
        if (searchValue) {
            data = yield call(getReleaseList, searchValue, info)
        } else {
            data = yield call(getReleaseList, false, info)
        }

        if (data) {
            // console.warn('success')
            // console.warn(JSON.stringify(info))
            // console.warn(JSON.stringify(data))
            yield put(createAction('save')({
                releaseList: info.currentPage === 1 ? data.releaseList : [ ...info.releaseList, ...data.releaseList],
                loading: false,
                refreshing: false,
            }))
        } else {
            yield put(createAction('save')({
                loading: false,
                refreshing: false,
            }))
        }
    },
  },
}
