import Draggable from 'react-draggable';
import { useState } from 'react';
import './drag-and-snap.css';
import DrawLine from '../draw-line/draw-line';
import { GetPawnDiameter } from '../../helpers/pawnHelper';
import { useSelector } from 'react-redux';

export default function DragAndSnap(props) {
    var bonusOffset;
    switch(props.size){
        case "tiny":
            bonusOffset = 11; break;
            default:
        case "small":
        case "medium":
            bonusOffset = 2; break;
        case "large":
            bonusOffset = 9; break;
        case "huge":
            bonusOffset = 14; break;
        case "gargantuan":
            bonusOffset = 19; break;
    }

    const scale = useSelector((state) => state.transform.scale) 

    const [position, setPosition] = useState({x: bonusOffset, y: bonusOffset});
    const [startPoint, setStartPoint] = useState({x: 0, y: 0});
    const [endPoint, setEndPoint] = useState({x: 0, y: 0});
    const [showLine, setShowLine] = useState(false);

    function getCoordinates(event) {
        var coordinatesString = event.target.style.transform.replaceAll(/translate\(|\)|px/gi, "").split(", ");
        return {x: Number(coordinatesString[0]), y: Number(coordinatesString[1])};
    }
    
    function getNumber(coordinate) {
        var returnVal = 0;
        if((coordinate % 50) > 25) {
            returnVal = 50 - coordinate % 50 + bonusOffset;
        }
        else {
            returnVal = 0 - (coordinate % 50) + bonusOffset;
        }
        return returnVal;
    }
    
    function onStop(e) {
        var coordinates = getCoordinates(e);
        var newX = coordinates.x + getNumber(coordinates.x);
        var newY = coordinates.y + getNumber(coordinates.y);
        setPosition({x: newX, y: newY});
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
            <Draggable onStart={onStart} onDrag={onDrag} onStop={onStop} position={position} scale={scale}>
                {props.children}
            </Draggable>
            <DrawLine startPoint={startPoint} endPoint={endPoint} showLine={showLine} />
        </>
    );
}