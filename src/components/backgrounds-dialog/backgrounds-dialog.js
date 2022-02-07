import './backgrounds-dialog.css';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import { useEffect, useState } from 'react';
import Emitter from '../../helpers/eventEmitter';
import { List, ListItem, ListItemButton, ListItemText } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import BackgroundModel from '../game-board-background/background-model';

function BackgroundsDialog(props) {

    const [open, setOpen] = useState(false);
    const [backgrounds, setBackgrounds] = useState([]);

    function close() { 
        setOpen(false);
    }

    useEffect(() => {
        Emitter.removeAllListeners('open-backgrounds-dialog');
        Emitter.on('open-backgrounds-dialog', () => {
            loadBackgrounds();
            setOpen(true);
        });
    });

    function changeBackground(background) {
        Emitter.emit('change-background', background);
        setOpen(false);
    }

    function deleteBackground(background) {
        console.log(background);
    }

    function loadBackgrounds() {
        let backgroundsFromStore = JSON.parse(localStorage.getItem('background-store')) ?? {};
        let currentBackground = JSON.parse(localStorage.getItem('current-background')) ?? new BackgroundModel();
        let backgroundsList = [];
        for(let key in backgroundsFromStore) {
            backgroundsList.push(
                <ListItem disablePadding key={key} 
                    secondaryAction={
                        <IconButton disabled={currentBackground.name === key} edge="end" aria-label="delete" onClick={() => deleteBackground(backgroundsFromStore[key])}>
                            <div className='material-icons-outlined'>delete</div>
                        </IconButton>
                    }>
                    <ListItemButton disabled={currentBackground.name === key} onClick={() => changeBackground(backgroundsFromStore[key])}>
                        <ListItemText primary={key} />
                    </ListItemButton>
                </ListItem>
            );
        }
        setBackgrounds(backgroundsList);
    }

    return (
        <Dialog open={open} onClose={close} maxWidth="xs" fullWidth>
            <DialogContent>
                <List>
                    { backgrounds }
                </List>
            </DialogContent>
        </Dialog>
    )
}

export default BackgroundsDialog;