import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';

export default function DenseAppBar() {
    return (
        <Box sx={{ flexGrow: 1, backgroundColor: '#0950D5' }}>
            <AppBar position="static" sx={{ backgroundColor: '#0950D5', paddingY: '5px' }}>
                <Toolbar variant="dense" >
                    <Typography variant="h5" color="inherit" component="div">
                        ExpenseTracker
                    </Typography>
                </Toolbar>
            </AppBar>
        </Box>
    );
}