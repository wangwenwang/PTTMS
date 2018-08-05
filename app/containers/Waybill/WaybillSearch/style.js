/**
 * Created by Administrator on 2017/5/19.
 */
import screen from '../../../utils/screen'
import theme from '../../../utils/theme'

export default style = {
    container: {
        flex: 1,
    },
    banner: {
        width: screen.width,
        height: 180,
    },
    icon: {
        width: 32,
        height: 32,
    },
    btn: {
        backgroundColor: theme.color,
        borderColor: theme.color,
    },
    button: {
        flex: 1,
        height: 30,
        marginLeft: 8,
        marginRight: 8,
    }
}