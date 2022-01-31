import './pawn.css';
import { useDispatch } from 'react-redux';
import { setDisableTransform } from '../../store/transformSlice';
import DragAndSnap from '../drag-and-snap/drag-and-snap';
import { GetPawnDiameter } from '../../helpers/pawnHelper';
import { useState } from 'react';


/** @param {{size: "tiny"|"small"|"medium"|"large"|"huge"|"gargantuan"]}} props  */
function Pawn(props) {
  const [isHaloShown, setIsHaloShown] = useState(false);

  const dispatch = useDispatch();

  const pawnDiameter = GetPawnDiameter(props.size);

  const disableBackgroundDrag = () => { dispatch(setDisableTransform(true)) };
  const enableBackgroundDrag = () => { dispatch(setDisableTransform(false)) };

  function clicked() {
    props.onRemove(props)
  }

  function toggleHalo(event) {
    if(event.ctrlKey){
      setIsHaloShown(!isHaloShown);
    }
  }

  return (
    <DragAndSnap pawnId={props.pawnId} type={props.type} size={props.size} scale={props.scale}>
      <div className={`pawn ${props.type}`} onClick={toggleHalo} 
          onMouseOver={disableBackgroundDrag} onMouseOut={enableBackgroundDrag} 
          style={{height: pawnDiameter + "px", width: pawnDiameter + "px"}} onContextMenu={clicked}>
        <div className="pawn-background-color absolute-full" />
        <div className={`${props.image} absolute-full`}  />
        <div className={(isHaloShown ? "" : "hidden ") + "pawn-halo absolute-full"}>&nbsp;</div>
      </div>
    </DragAndSnap>
  );
}

export default Pawn;