import { StyleSheet } from 'aphrodite';
import Colors from '../../config/Colors';

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.light,
        height: '100vh',
    },
    
    title: {
        textAlign: 'center',
        color: Colors.primary,
        borderColor: Colors.secondary,
    }
})
export default styles;