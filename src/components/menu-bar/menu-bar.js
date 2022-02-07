import './menu-bar.css';
import { AppBar, Toolbar, IconButton, Button, Drawer, List, ListItem, ListItemText, Box, ListItemIcon, Typography, Icon, Divider } from "@mui/material"
import { useRef, useState } from 'react';
import Emitter from '../../helpers/eventEmitter';
import { pink } from '@mui/material/colors';
const electron = window.require('electron');

function MenuBar() {
    const pawnsMenuRef = useRef();

    const [drawerOpen, setDrawerOpen] = useState(false);

    electron.ipcRenderer.on("file-selected", (...all) => console.log(all));

    function showFileDialog() {
        electron.ipcRenderer.invoke("show-file-dialog");
    }

    function closeApp() {
        Emitter.emit('save-app-state');
        electron.ipcRenderer.invoke("window-all-closed");
    }

    return (
        <>
            <AppBar position="static">
                <Toolbar className="menu-bar-toolbar" variant="dense">
                    <IconButton onClick={() => setDrawerOpen(true)} className="material-icons" size="medium" edge="start" color="inherit">menu</IconButton>
                    <Typography variant="h6" component="div" sx={{marginLeft: 2}}>Mesa</Typography>
                    <div className="draggable-app-region">&nbsp;</div>
                    <IconButton className="material-icons" size="small" color="inherit" onClick={() => electron.ipcRenderer.invoke("window-minimize")}>minimize</IconButton>
                    <IconButton className="material-icons-outlined" size="small" onClick={() => electron.ipcRenderer.invoke("window-toggle-maximize")} color="inherit">square</IconButton>
                    <IconButton className="material-icons" size="small" color="inherit" onClick={closeApp}>close</IconButton>
                </Toolbar>
            </AppBar>
            <Drawer open={drawerOpen} onClose={() => setDrawerOpen(false)}>
                <Box className="app-drawer" sx={{width: 250}}>
                    <Box className="drawer-header-container">
                        <Icon className="material-icons-outlined" sx={{fontSize: "56pt", color:"#ffffff33"}}>
                            table_restaurant
                        </Icon>
                    </Box>
                    <Divider sx={{width: "100%"}} />
                    <List>
                        <ListItem button onClick={() => { Emitter.emit('open-backgrounds-dialog'); setDrawerOpen(false); }}>
                            <ListItemIcon className="material-icons-outlined">image</ListItemIcon>
                            <ListItemText primary="Background" />
                        </ListItem>
                        <ListItem button onClick={() => { Emitter.emit('open-new-pawn-dialog'); setDrawerOpen(false); }}>
                            <ListItemIcon className="material-icons-outlined">person</ListItemIcon>
                            <ListItemText primary="Pawns" />
                        </ListItem>
                    </List>
                </Box>
            </Drawer>
        </>
    );
  }
  
  export default MenuBar;