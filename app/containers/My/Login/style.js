/**
 * Created by Administrator on 2017/5/9.
 */
import screen from '../../../utils/screen'
import theme from '../../../utils/theme'

export default styles = {
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    logoWrapper: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 80,
        marginBottom: 60,
    },
    logo: {
        width: screen.width/2,
    },
    button: {
        flex: 1,
        width: screen/4,
        marginLeft: 8,
        marginRight: 8,
    },
    btn: {
        backgroundColor: theme.color,
        borderColor: theme.color,
    },
    disableBtn: {
        backgroundColor: '#888',
        borderColor: '#888',
    },
    footer: {
        flexDirection: 'row',
        marginTop: 10,
    },
    forgetPassword: {
        flex: 1,
    },
    signUp: {
        flex: 1,
        textAlign: 'right'
    }
}