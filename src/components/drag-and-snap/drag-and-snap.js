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

    const [startPoint, setStartPoint] = useState(getRadiusAjustedStoredPosition() ?? {x: 0, y: 0});
    const [endPoint, setEndPoint] = useState(getRadiusAjustedStoredPosition() ?? {x: 0, y: 0});
    const [showLine, setShowLine] = useState(false);

    function getStoredPosition() {
        let pawns = JSON.parse(localStorage.getItem(props.type + '-pawns'));
        if(pawns && pawns[props.pawnId]) {
            return pawns[props.pawnId].position
        }
        else {
            return null
        }
    }

    function getRadiusAjustedStoredPosition() {
        let position = getStoredPosition();
        if(position == null) return {x: 0, y: 0}
        let pawnRadius = GetPawnDiameter(props.size) / 2;
        return {x: position.x + pawnRadius, y: position.y + pawnRadius};
    }
    
    function savePosition(position) {
        let pawns = JSON.parse(localStorage.getItem(props.type + '-pawns'));
        if(!pawns) pawns = {};
        if(!pawns[props.pawnId]) pawns[props.pawnId] = {};
        pawns[props.pawnId].position = position;
        pawns[props.pawnId].size = props.size;
        localStorage.setItem(props.type + '-pawns', JSON.stringify(pawns));
    }
    
    function onStop() {
        setShowLine(false);
        var pawnDiameter = GetPawnDiameter(props.size);
        var radius = pawnDiameter / 2;
        savePosition({x: endPoint.x - radius, y: endPoint.y - radius});
    }

    function onStart(_, target){
        var pawnRadius = GetPawnDiameter(props.size) / 2;
        setStartPoint({x: target.x + pawnRadius, y: target.y + pawnRadius});
    }
    
    function onDrag(_, target) {
        var pawnDiameter = GetPawnDiameter(props.size);
        var radius = pawnDiameter / 2;
        setEndPoint({x: target.x + radius, y: target.y + radius});
        if(!showLine) setShowLine(true);
    }

    return (
        <>
            <Draggable defaultPosition={getStoredPosition() ?? {x: getBonusOffset(), y: getBonusOffset()}} grid={[50 * scale, 50 * scale]} onStart={onStart} 
                       onDrag={onDrag} onStop={onStop} scale={scale}>
                {props.children}
            </Draggable>
            <DrawLine startPoint={startPoint} endPoint={endPoint} showLine={showLine} />
        </>
    );
}