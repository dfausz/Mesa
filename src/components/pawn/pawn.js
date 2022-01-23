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

  return (
    <DragAndSnap size={props.size} scale={props.scale}>
        <div className="pawn" onMouseOver={disableBackgroundDrag} onMouseOut={enableBackgroundDrag} 
             style={{height: pawnDiameter + "px", width: pawnDiameter + "px"}} />
    </DragAndSnap>
  );
}

export default Pawn;