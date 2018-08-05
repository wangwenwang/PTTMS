import { createAction, NavigationActions } from '../../utils'
import * as authService from '../../services/auth'
import { getReleaseList } from '../../services/release'

export default {
    namespace: 'releaseSearchResult',
    state: {
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
            console.log(searchValue)
            const data = yield call(getReleaseList, searchValue)
            if (data) {
                yield put(createAction('save')(data))
            }
        },
    },
}
