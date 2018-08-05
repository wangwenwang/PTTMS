import appModel from './app'
import waybill from './waybill/waybill'
import waybillSearchResult from './waybill/waybillSearchResult'
import waybillDetail from './waybill/waybillDetail'
import arriveConfirm from './waybill/arriveConfirm'
import deliveryConfirm from './waybill/deliveryConfirm'
import trace from './waybill/trace'
import receiptUpload from './waybill/receiptUpload'
import waybillSearch from './waybill/waybillSearch'
import find from './find/find'
import inputOrder from './find/inputOrder'
import findSearch from './find/findSearch'
import release from './release/release'
import releaseSearch from './release/releaseSearch'
import releaseSearchResult from './release/releaseSearchResult'
import bidding from './release/bidding'
import login from './my/login'
import signUp from './my/signUp'
import myInfo from './my/myInfo'
import my from './my/my'
import forgetPassword from './my/forgetPassword'
import income from './my/income'
import incomeSearch from './my/incomeSearch'
import incomeSearchResult from './my/incomeSearchResult'
import laungh from './my/laungh'
import router from './router'

export function registerModels(app) {
  app.model(appModel)
  app.model(waybill)
  app.model(waybillSearchResult)
  app.model(waybillDetail)
  app.model(arriveConfirm)
  app.model(deliveryConfirm)
  app.model(trace)
  app.model(receiptUpload)
  app.model(waybillSearch)
  app.model(find)
  app.model(inputOrder)
  app.model(findSearch)
  app.model(release)
  app.model(releaseSearch)
  app.model(releaseSearchResult)
  app.model(bidding)
  app.model(login)
  app.model(signUp)
  app.model(myInfo)
  app.model(my)
  app.model(forgetPassword)
  app.model(income)
  app.model(incomeSearch)
  app.model(incomeSearchResult)
  app.model(laungh)
  app.model(router)
}
