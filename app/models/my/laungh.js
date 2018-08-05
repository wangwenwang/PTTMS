import { createAction, NavigationActions, delay } from '../../utils'
import { getMemberInfo, getLocation, submitLocation, setRegistrationID, getTime, loginOut } from '../../services/my'

export default {
  namespace: 'laungh',
  state: {
  },
  reducers: {
    save(state, { payload }) {
      return { ...state, ...payload }
    },
  },
  effects: {
    // 检测本地是否存在memberInfo
    *checkMemberInfo({ payload }, { call, put, select }) {
        const memberInfo = yield storage.load({
            key: 'memberInfo',
        }).then(ret => {
            return ret
        }).catch(err => {
            // console.warn('没有找到相关数据')
            return false;
        })

        if (memberInfo) {
            yield call(delay, 500)
            yield put(NavigationActions.navigate({ routeName: 'HomeNavigator' }))
        } else {
            yield call(delay, 500)
            yield put(NavigationActions.navigate({ routeName: 'Login' }))
        }
    }
  }
}
