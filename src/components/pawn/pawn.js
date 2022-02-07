import './pawn.css';
import { useDispatch } from 'react-redux';
import { setDisableTransform } from '../../store/transformSlice';
import DragAndSnap from '../drag-and-snap/drag-and-snap';
import { GetPawnDiameter } from '../../helpers/pawnHelper';
import { useState } from 'react';


/** @param {{size: "tiny"|"small"|"medium"|"large"|"huge"|"gargantuan"]}} props  */
function Pawn(props) {
  const [isHaloShown, setIsHaloShown] = useState(false);
  const [hover, setHover] = useState(false);
  
  const dispatch = useDispatch();
  
  const pawnDiameter = GetPawnDiameter(props.info.size);
  const pawnRadius = pawnDiameter / 2;
  const pawnSpeed = 30;
  const haloSize = pawnSpeed * 10;

  function disableBackgroundDrag() { 
    dispatch(setDisableTransform(true));
    setHover(true);
  };

  function enableBackgroundDrag() { 
    dispatch(setDisableTransform(false));
    setHover(false);
  };

  function clicked() {
    props.onRemove(props)
  }

  function toggleHalo(event) {
    if(event.ctrlKey){
      setIsHaloShown(!isHaloShown);
    }
  }

  return (
    <DragAndSnap pawnId={props.pawnId} type={props.type} info={props.info}>
      <div className={`pawn ${props.type}`} onClick={toggleHalo} 
          onMouseOver={disableBackgroundDrag} onMouseOut={enableBackgroundDrag} 
          style={{height: pawnDiameter + "px", width: pawnDiameter + "px"}} onContextMenu={clicked}>
        <div className="pawn-background-color absolute-full" style={{backgroundColor: props.info.color ?? 'blue'}} />
        <div className={`${props.image} absolute-full`}  />
        <div className={`pawn-name absolute-full ${hover ? "" : "hidden "}`} style={{transform:`translate(0, ${pawnDiameter + 8}px)`}}>
          {props.info.name}
        </div>
        <div className={(isHaloShown ? "" : "hidden ") + "pawn-halo absolute-full"}
            style={{padding: `${haloSize}px`, transform: `translate(-${haloSize - pawnRadius}px, -${haloSize - pawnRadius}px)`}}>
            &nbsp;
        </div>
      </div>
    </DragAndSnap>
  );
}

export default Pawn;