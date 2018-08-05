/**
 * Created by Administrator on 2017/5/19.
 */
import screen from '../../utils/screen'
import theme from '../../utils/theme'

export default style = {
    container: {
        flex: 1,
    },
    itemWrapper: {
        backgroundColor: '#fff',
    },
    search: {
        width: 20,
        height: 20,
        tintColor: theme.color,
    },
    info: {
        flexDirection: 'row',
        paddingLeft: 10,
        paddingRight: 10,
        paddingTop: 10,
        backgroundColor: '#fff',
    },
    info1: {
        paddingLeft: 10,
        paddingRight: 10,
        paddingBottom: 10,
        backgroundColor: '#fff',
    },
    infoLeft: {
        flex: 3,
    },
    infoRight: {
        flex: 2,
    },
    line: {
        paddingTop: 5,
        paddingBottom: 5,
    },
    title: {
        color: '#333',
    },
    button: {
        flex: 1,
        width: screen/4,
        height: 30,
        marginLeft: 8,
        marginRight: 8,
    },
    btn: {
        backgroundColor: theme.color,
        borderColor: theme.color,
    }
}