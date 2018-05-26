import { StyleSheet } from 'aphrodite';
import Colors from '../../config/Colors';

const styles = StyleSheet.create({
    container:{
        margin: 10,
    },
    label: {
        color: Colors.secondary,
    },
    ul: {
        margin: 0,
        padding: 0,
        display: 'inline',
    },
    li : {
        margin: 5,
        padding: 5,
        display: 'inline',
    },

    link : {
        color: Colors.primary,
        textDecoration: 'none'
    }
})
export default styles;