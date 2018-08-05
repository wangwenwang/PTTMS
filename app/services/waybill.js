/**
 * Created by Administrator on 2017/5/20.
 */
import request from '../utils/request'
import { baseUrl, apiUrl } from '../utils/config'
import { Toast } from 'antd-mobile'
import moment from 'moment'
import { getNowFormatDate } from '../utils/base'
import { getLocation } from './my'
import { Geolocation } from 'react-native-baidu-map'
import { localMemberInfo } from './my'

export async function changeMemberInfo(changeInfo) {
    return request(`${apiUrl}Member/MemberInfo`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body:  JSON.stringify(changeInfo)
    })
}

export async function getIntegral({ pageSize, pageIndex }) {
    const memberId = localStorage.getItem('memberId')
    const data = await request(`${apiUrl}Member/GetMemberInfo_Point?memberId=${memberId}&pageIndex=${pageIndex}&pageSize=${pageSize}`)
    return data.map((item) => ({
        id: item.Pointorderid,                                                                           // 积分id
        integralIntro: item.pointMemo,                                                                 // 积分备注
        integralDate: item.Pointdate.substring(0, 10) + ' ' + item.Pointdate.substring(11, 16),        // 积分日期
        integralSum: Number(item.Pointsum),                                                          // 积分数
    }))
}

// 获取运单列表（含查询）
export async function getWaybill(searchValue, info) {
    const memberInfo = await localMemberInfo()
    // console.warn(JSON.stringify(searchValue))
    // console.warn(JSON.stringify(info))
    let params
    if (searchValue) {
        params = {
            currentPage: info.currentPage,                                                              // 当前第几页
            numberPerPage: info.numberPerPage,                                                         // 每页显示几条
            startDate: searchValue.startTime ? getNowFormatDate(searchValue.startTime) : '',           // 开始时间
            endDate: searchValue.endTime ? getNowFormatDate(searchValue.endTime) : '',                  // 结束时间
            orderStatus: searchValue.orderStatus ? searchValue.orderStatus.join() : null,              // 订单状态
            balanceStatus: searchValue.balanceStatus ? searchValue.balanceStatus.join() : null,        // 结算状态
            businessType: searchValue.businessType ? searchValue.businessType.join() : null,        // 结算状态
            shipmentCodeinput: searchValue.shipmentCodeinput ? searchValue.shipmentCodeinput : '',    // 运单号
            deliveryNoinput: searchValue.deliveryNoinput ? searchValue.deliveryNoinput : '',           // 订单号
            cellphone: memberInfo.memberInfo.phone,                                                                    // 用户账号
        }
    } else {
        params = {
            currentPage: info.currentPage,                  // 当前第几页
            numberPerPage: info.numberPerPage,               // 每页显示几条
            cellphone: memberInfo.memberInfo.phone,         // 用户账号
        }
    }
    // console.warn(JSON.stringify(params))
    const data = await request(`${apiUrl}queryShipmentData.do`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `params=${JSON.stringify(params)}`,
    })
    if (data.status == 1) {
        // console.warn(data.data.length)
        const waybillList = data.data.map((item) => {
            let shipmentStatus, balanceStatus

            // 转换运单状态
            switch (item.shipmentstatus) {
                case 'NEW':
                    shipmentStatus = '新单'
                    break
                case 'AUDIT':
                    shipmentStatus = '派单'
                    break
                case 'INLOC':
                    shipmentStatus = '入库'
                    break
                case 'PLANED':
                    shipmentStatus = '装运'
                    break
                case 'SHIPPED':
                    shipmentStatus = '发运'
                    break
                case 'DELIVERED':
                    shipmentStatus = '交付'
                    break
                case 'PARTIALLY_DELIVERED':
                    shipmentStatus = '部分交付'
                    break
                case 'POD':
                    shipmentStatus = '回单'
                    break
                case 'CANCEL':
                    shipmentStatus = '取消'
                    break
                case 'PENDING':
                    shipmentStatus = '问题'
                    break
                case 'CLOSE':
                    shipmentStatus = '关闭'
                    break
                case 'PARTIAL':
                    shipmentStatus = '部分分解'
                    break
                case 'ALL_UNLOAD':
                    shipmentStatus = '全部卸货'
                    break
                case 'PARTY_UNLOAD':
                    shipmentStatus = '部分卸货'
                    break
                case 'ALLDECOMPOSITION':
                    shipmentStatus = '全部分解'
                    break
            }

            // 转换结算状态
            switch (item.balancestatus) {
                case 'NEW':
                    balanceStatus = '预录入'
                    break
                case 'CONFIRM':
                    balanceStatus = '待结算'
                    break
                case 'NOT_ALL_CHARGE':
                    balanceStatus = '部分结算'
                    break
                case 'ALL_CHARGE':
                    balanceStatus = '结算完成'
                    break
                case 'INVOICE':
                    balanceStatus = '开票完成'
                    break
                case 'PART_INVOICE':
                    balanceStatus = '部分开票'
                    break
            }

            return {
                shipmentTime: item.shipmentTime.substring(0, 16),         // 发车时间
                shipmentCode: item.shipmentcode,          // 运单号
                startCity: item.startcity,                 // 起点城市
                endCity: item.endcity,                     // 终点城市
                vehicleCode: item.vehicleCode,            // 车牌号
                transName: item.transName,                // 承运商
                shipmentStatus: shipmentStatus,           // 运单状态
                balanceStatus: balanceStatus,              // 结算状态
                quantity: item.qty,                         // 数量
                weight: item.wt,                            // 重量
                volume: item.vol,                           // 体积
                arriveStatus: item.dzzt,                   // 到站状态
                id: item.shipmentID,                        // 运单id
                flag: Number(item.daozhanFlag),             // 到站状态
                omsNo: item.omsNo,                         // 订单号
                businessType: item.businessType,          // 结算状态
            }
        })
        return {
            waybillList: waybillList,
        }
    } else {
        Toast.offline(data.Msg, 2, null, true)
        return false
    }
}

// 获取订单详情
export async function getWaybillDetail(info) {
    // alert(JSON.stringify(info))
    // Toast.loading('加载中...', 0)
    let params
    if (info.barCode) {
        params = {
            barcode: info.barCode,                             // 条形码
        }
    } else {
        params = {
            shipmentCode: info.shipmentCode,                     // 运单号
        }
    }
    console.warn(JSON.stringify(params))

    const data = await request(`${apiUrl}queryOrderDataByShipmentId.do`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `params=${JSON.stringify(params)}`,
    })
    if (data.status == 1) {
        // alert(JSON.string(data))
        const orderList = data.data.map((item) => {
            let shipmentStatus

            // 转换订单状态
            switch (item.orderStatus) {
                case 'NEW':
                    shipmentStatus = '新单'
                    break
                case 'AUDIT':
                    shipmentStatus = '派单'
                    break
                case 'INLOC':
                    shipmentStatus = '入库'
                    break
                case 'PLANED':
                    shipmentStatus = '装运'
                    break
                case 'SHIPPED':
                    shipmentStatus = '发运'
                    break
                case 'DELIVERED':
                    shipmentStatus = '交付'
                    break
                case 'PARTIALLY_DELIVERED':
                    shipmentStatus = '部分交付'
                    break
                case 'POD':
                    shipmentStatus = '回单'
                    break
                case 'CANCEL':
                    shipmentStatus = '取消'
                    break
                case 'PENDING':
                    shipmentStatus = '问题'
                    break
                case 'CLOSE':
                    shipmentStatus = '关闭'
                    break
                case 'PARTIAL':
                    shipmentStatus = '部分分解'
                    break
                case 'ALL_UNLOAD':
                    shipmentStatus = '全部卸货'
                    break
                case 'PARTY_UNLOAD':
                    shipmentStatus = '部分卸货'
                    break
                case 'ALLDECOMPOSITION':
                    shipmentStatus = '全部分解'
                    break
            }

            return {
                deliveryNo: item.deliveryNo,             // 送货单号
                rdc: item.jbrdc,                           // 接驳RDC
                startCity: item.startcity,                 // 起点城市
                endCity: item.endcity,                     // 终点城市
                address: item.shdz,                        // 送货地址
                sendType: item.goodsway,                   // 送货方式
                shipmentStatus: shipmentStatus,            // 订单状态
                receiveName: item.actualReceive,           // 交货人
                time: item.deliveryDate,                     // 交货时间
                quantity: item.qty,                         // 数量
                weight: item.wt,                            // 重量
                volume: item.vol,                           // 体积
                deliveryId: item.deliveryID,               // 订单ID
                routeType: item.routeType,
                operateRdcID: item.operateRdcID,
                connectionRdcID: item.connectionRdcID,
                isShowButton: item.displayJFButton,
                omsNo: item.omsNo,                          // 订单号
                send: item.send,                            // 派送要求
                signBill: item.signBill,                   // 签单要求
                pickUpGoods: item.pickUpGoods,            // 提货要求
                loading: item.loading,                      // 装载要求
                showFlag: item.showFlag,                   // 是否显示
                businessType: item.businessType,          // 结算状态
                shipmentID: item.shipmentID               // 运单id
            }
        })
        // console.log(orderList)
        return {
            orderList: orderList,
        }
    } else {
        Toast.offline(data.Msg, 1, null, true)
        return false
    }
}

// 到站确认
export async function arriveConfirm(info) {
    // console.warn(JSON.stringify(info))
    const memberInfo = await localMemberInfo()
    // 时间处理
    const time = moment(new Date(info.arriveTime)).utcOffset(8).format().substring(0, 16).replace('T', ' ')
    // console.warn(time)

    // 获取经纬度
    const location = await Geolocation.getCurrentPosition()
        .then(data => {
            console.log(JSON.stringify(data))
            return data
        })
        .catch(e =>{
            console.log(e, 'error')
        })

    const params = {
        shipmentID: info.id,                                                        // 运单ID
        currentRdcId: info.arriveCompany.join(),                                    // 分公司
        userName: memberInfo.memberInfo.userName,                                  // 当前登录用户名
        loginName: memberInfo.memberInfo.loginName,                                // 当前登录名
        arrivalTime: time,                                                           // 到站时间
        remark: info.remark ? info.remark : '',                                     // 到站备注
        latLonInfo: `经度：${location.longitude} 纬度：${location.latitude}`,     // 经纬度
        operatPe: memberInfo.memberInfo.userName,                                  // 当前登录用户名
        address: location.address,                                                   // 经纬度对应的标准地址
    }

    // console.warn(JSON.stringify(params))
    const data = await request(`${apiUrl}arriveStation.do`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `params=${JSON.stringify(params)}`,
    })
    // console.warn(data.status)
    if (data.status == 1) {
        Toast.success(data.Msg, 1, null, true)
        return {
            send: true
        }
    } else {
        Toast.offline(data.Msg, 1, null, true)
        return {
            send: false
        }
    }
}

// 交货确认
export async function deliveryConfirm(info) {
    // console.warn(JSON.stringify(info))
    const memberInfo = await localMemberInfo()
    let params
    // 时间处理
    const time = moment(new Date(info.arriveTime)).utcOffset(8).format().substring(0, 16).replace('T', ' ')

    // 获取经纬度
    const location = await Geolocation.getCurrentPosition()
        .then(data => {
            console.log(JSON.stringify(data))
            return data
        })
        .catch(e =>{
            console.log(e, 'error')
        })

    if (!info.deliveryId) {
        params = {
            shipmentID: info.id,                                                    // 运单ID
            currentRdcId: info.arriveCompany.join(),                                // 分公司ID
            deliveryDate: time,                                                     // 实际收货时间
            actualReceive: info.receiveName,                                       // 实际收货人
            userName: memberInfo.memberInfo.userName,                              // 当前登录用户名
            loginName: memberInfo.memberInfo.loginName,                            // 当前登录名
            allDelivery: 'allDelivery',                                             // 全部交付
            operatPe: memberInfo.memberInfo.userName + '(APP)',                     // 当前登录用户名
            remark: location.address,                                                  // 经纬度对应的标准地址
            latLonInfo: `经度：${location.longitude} 纬度：${location.latitude}`,   // 经纬度
        }
    } else {
        params = {
            shipmentID: info.id,                                                          // 运单ID
            deliveryId: info.deliveryId,                                                 // 订单ID
            currentRdcId: info.arriveCompany.join(),                                     // 分公司ID
            deliveryDate: time,                                                          // 实际收货时间
            actualReceive: info.receiveName,                                           // 实际收货人
            userName: memberInfo.memberInfo.userName,                                  // 当前登录用户名
            loginName: memberInfo.memberInfo.loginName,                                // 当前登录名
            operatPe: memberInfo.memberInfo.userName + '(APP)',                        // 当前登录用户名
            remark: location.address,                                                    // 经纬度对应的标准地址
            latLonInfo: `经度：${location.longitude} 纬度：${location.latitude}`,     // 经纬度
        }
    }

    // console.warn(JSON.stringify(params))
    const data = await request(`${apiUrl}payAffirm.do`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `params=${JSON.stringify(params)}`,
    })
    // console.warn(data.status)
    if (data.status == 1) {
        Toast.success('交付成功', 1, null, true)
        return {
            send: true
        }
    } else {
        Toast.offline(data.Msg, 1, null, true)
        return {
            send: false
        }
    }
}

// 在途追踪
export async function trace(info) {
    // console.warn(JSON.stringify(info))
    // 获取经纬度
    const location = await Geolocation.getCurrentPosition()
        .then(data => {
            console.log(JSON.stringify(data))
            return data
        })
        .catch(e =>{
            console.log(e, 'error')
        })

    let params
    if (info.id) {
        params = {
            shipmentID: info.id,                                             // 运单ID
            remark: info.remark,                                             // 追踪信息
            latLonInfo: `经度：${location.longitude} 纬度：${location.latitude}`,     // 经纬度
            operatPe: info.name,                                        // 操作人
        }
    } else {
        params = {
            deliveryID: info.deliveryId,                                    // 订单ID
            remark: info.remark,                                             // 追踪信息
            latLonInfo: `经度：${location.longitude} 纬度：${location.latitude}`,     // 经纬度
            operatPe: info.name,                                        // 操作人
        }
    }

    // console.warn(JSON.stringify(params))
    const data = await request(`${apiUrl}abnormalInfo.do`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `params=${JSON.stringify(params)}`,
    })
    // console.warn(data.status)
    if (data.status == 1) {
        Toast.success(data.Msg, 1, null, true)
        return {
            send: true
        }
    } else {
        Toast.offline(data.Msg, 1, null, true)
        return {
            send: false
        }
    }
}

// 运单到站RDC查询
export async function arriveRDC(id) {
    const params = {
        shipmentID: id,     // 运单ID
    }

    // console.warn(JSON.stringify(params))
    const data = await request(`${apiUrl}queryShipmentRdcData.do`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `params=${JSON.stringify(params)}`,
    })
    // console.warn(data.status)
    if (data.status == 1) {
        const RDCList = data.data.map((item) => {
            return {
                label: item.name,         // 名称
                value: item.rdcID.toString(),         // value
            }
        })
        return {
            RDCList: RDCList,
        }
    } else {
        Toast.offline(data.Msg, 1, null, true)
        return false
    }
}

// 交货确认RDC查询
export async function deliveryRDC(info) {
    // console.warn(JSON.stringify(info))
    let params
    if (info.RDCId) {
        params = {
            shipmentID: info.id,                 // 运单ID
            connectionRdcID: info.RDCId,        // 接驳RDCId
        }
    } else {
        params = {
            shipmentID: info.id,                 // 运单ID
        }
    }

    console.warn(JSON.stringify(params))
    const data = await request(`${apiUrl}queryJiaoFuShipmentRdcData.do`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `params=${JSON.stringify(params)}`,
    })

    // console.warn(data.status)
    if (data.status == 1) {
        const RDCList = data.data.map((item) => {
            return {
                label: item.name,         // 名称
                value: item.rdcID.toString(),         // value
            }
        })
        return {
            RDCList: RDCList,
        }
    } else {
        Toast.offline(data.Msg, 1, null, true)
        return false
    }
}

// 回单上传
export async function receiptUpload(info) {
    //console.warn(JSON.stringify(info))
    const memberInfo = await localMemberInfo()
    let formData = new FormData()
    info.imagePath.map((item, index) => {
        let file = {uri: item, type: 'application/octet-stream', name: 'receipt.jpeg'}
        formData.append('fileAddPic', file)
    })
    // const fileAddPic = {uri: info.imagePath[0], type: 'application/octet-stream', name: 'receipt.jpeg'}
    // const fileAddPic = {uri: info.imagePath, type: 'application/octet-stream', name: 'receipt.jpeg'}
    // formData.append('fileAddPic', fileAddPic)
    formData.append('omsNo', info.deliveryNo)
    formData.append('username', memberInfo.memberInfo.userName)
    // console.warn(formData.getAll("fileAddPic"));
    const data = await request(`${apiUrl}uploadReceipt.do`, {
        method: 'POST',
        headers: {
            'Content-Type': 'multipart/form-data;charset=utf-8',
        },
        body: formData,
    })
    // console.warn(JSON.stringify(data))
    if (data.status == 1) {
        Toast.success(data.Msg, 1, null, true)
        return {
            send: true
        }
    } else {
        Toast.offline(data.Msg, 1, null, true)
        return {
            send: false
        }
    }
}