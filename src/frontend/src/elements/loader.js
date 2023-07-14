
import { CircularProgress } from '@mui/material';
import Box from '@mui/material/Box';
import Fade from '@mui/material/Fade';

export default function Loader(props) {

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Box sx={{ height: 40 }}>
                <Fade
                    in={props.loading}
                    style={{
                        transitionDelay: props.loading ? '800ms' : '0ms',
                    }}
                    unmountOnExit
                >
                    <CircularProgress />
                </Fade>
            </Box>
        </Box>
    )
}