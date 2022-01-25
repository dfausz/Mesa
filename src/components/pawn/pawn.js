import './pawn.css';
import { useDispatch } from 'react-redux';
import { setDisableTransform } from '../../store/transformSlice';
import DragAndSnap from '../drag-and-snap/drag-and-snap';
import { GetPawnDiameter } from '../../helpers/pawnHelper';


/** @param {{size: "tiny"|"small"|"medium"|"large"|"huge"|"gargantuan"]}} props  */
function Pawn(props) {
  const dispatch = useDispatch();

  const pawnDiameter = GetPawnDiameter(props.size);

  const disableBackgroundDrag = () => { dispatch(setDisableTransform(true)) };
  const enableBackgroundDrag = () => { dispatch(setDisableTransform(false)) };

  function clicked(event) {
    props.onRemove(props)
  }

  return (
    <DragAndSnap size={props.size} scale={props.scale}>
        <div className="pawn" onMouseOver={disableBackgroundDrag} onMouseOut={enableBackgroundDrag} 
             style={{height: pawnDiameter + "px", width: pawnDiameter + "px"}} onContextMenu={clicked}>
          <div className="pawn-background-color absolute-full" />
          <div className="pawn-image absolute-full" />
        </div>
    </DragAndSnap>
  );
}

export default Pawn;