/**
 * Created by Administrator on 2017/5/23.
 */

// 输出日期格式为yy-mm-dd
export function getNowFormatDate(date) {
    const newDate = new Date(date)
    const seperator1 = "-"
    let year = newDate.getFullYear()
    let month = newDate.getMonth() + 1
    let strDate = newDate.getDate()
    if (month >= 1 && month <= 9) {
        month = "0" + month
    }
    if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate
    }
    let currentdate = year + seperator1 + month + seperator1 + strDate
    return currentdate
}

// 验证手机号
export function is_mobile(mobile) {
    if (mobile == "") {
        return false;
    } else {
        if (!/^0{0,1}(13|15|18|14|17)[0-9]{9}$/.test(mobile)) {
            return false;
        }
        return true;
    }
}
