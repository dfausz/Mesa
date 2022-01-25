import Draggable from 'react-draggable';
import { useState } from 'react';
import './drag-and-snap.css';
import DrawLine from '../draw-line/draw-line';
import { GetPawnDiameter } from '../../helpers/pawnHelper';
import { useSelector } from 'react-redux';

export default function DragAndSnap(props) {
    const getBonusOffset = () => {
        switch(props.size){
            case "tiny":
                return 15;
            default:
            case "small":
            case "medium":
                return 5;
            case "large":
                return 10;
            case "huge":
                return 15;
            case "gargantuan":
                return 20;
        }
    }

    const scale = useSelector((state) => state.transform.scale) 

    const [startPoint, setStartPoint] = useState({x: 0, y: 0});
    const [endPoint, setEndPoint] = useState({x: 0, y: 0});
    const [showLine, setShowLine] = useState(false);
    
    function onStop() {
        setShowLine(false);
    }

    function onStart(_, target){
        var pawnRadius = GetPawnDiameter(props.size) / 2;
        setStartPoint({x: target.x + pawnRadius, y: target.y + pawnRadius});
        setShowLine(true);
    }
    
    function onDrag(_, target) {
        var pawnDiameter = GetPawnDiameter(props.size);
        var radius = pawnDiameter / 2;
        setEndPoint({x: target.x + radius, y: target.y + radius});
    }

    return (
        <>
            <Draggable defaultPosition={{x: getBonusOffset(), y: getBonusOffset()}} grid={[50 * scale, 50 * scale]} onStart={onStart} 
                       onDrag={onDrag} onStop={onStop} scale={scale}>
                {props.children}
            </Draggable>
            <DrawLine startPoint={startPoint} endPoint={endPoint} showLine={showLine} />
        </>
    );
}