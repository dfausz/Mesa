import './new-pawn-dialog.css'
import { Dialog, DialogContent, Select, MenuItem, FormControl, InputLabel, DialogActions, Button, TextField } from '@mui/material'
import { useState, useEffect } from 'react'
import Emitter from '../../helpers/eventEmitter';

function NewPawnDialog() {
    const [size, setSize] = useState("medium");
    const [name, setName] = useState("");
    const [isOpen, setIsOpen] = useState(false);
    const open = () => setIsOpen(true);
    const close = () => setIsOpen(false);

    useEffect(() => {
        Emitter.removeAllListeners('open-new-pawn-dialog');
        Emitter.on('open-new-pawn-dialog', () => {
            open();
        });
    });

    function createPawn() {
        Emitter.emit('create-pawn', {size: size, color: `var(--${selectedColor})`, name: name ?? "Monster"});
        close();
    }

    let selectedColor = "blue";
    function selectPawnColor(id) {
        document.getElementById(selectedColor).classList.remove("selected");
        document.getElementById(id).classList.add("selected");
        selectedColor = id;
    }

    function getPawnColors(){
        let colors = ["blue", "gold", "tan", "red", "purple"];
        let pawnColors = [];
        for(let color of colors) {
            pawnColors.push(
                <div className="pawn-color-container" key={color}>
                    <div onClick={() => selectPawnColor(color)} 
                         className={`pawn-color-square ${color === "blue" ? "selected" : ""}`}
                         id={color} 
                         style={{backgroundColor: `var(--${color})`}} />
                </div>
            )
        }
        return pawnColors;
    }

    return (
        <Dialog open={isOpen} onClose={close} maxWidth="xs" fullWidth>
            <DialogContent className="new-pawn-dialog-area">
                <TextField sx={{mb:2}} fullWidth label="Name" value={name} onChange={(event) => setName(event.target.value)} />
                <FormControl fullWidth sx={{mb:2}}>
                    <InputLabel>Size</InputLabel>
                    <Select label="Size" value={size} onChange={(event) => {setSize(event.target.value)}}>
                        <MenuItem value={"tiny"}>Tiny</MenuItem>
                        <MenuItem value={"small"}>Small</MenuItem>
                        <MenuItem value={"medium"}>Medium</MenuItem>
                        <MenuItem value={"large"}>Large</MenuItem>
                        <MenuItem value={"huge"}>Huge</MenuItem>
                        <MenuItem value={"gargantuan"}>Gargantuan</MenuItem>
                    </Select>
                </FormControl>
                <div className="pawn-color-selector">
                    {getPawnColors()}
                </div>
            </DialogContent>
            <DialogActions className="new-pawn-dialog-area">
                <Button onClick={createPawn}>Add</Button>
            </DialogActions>
        </Dialog>
    )
}

export default NewPawnDialog;