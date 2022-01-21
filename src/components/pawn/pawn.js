import './pawn.css';
import DragAndSnap from '../drag-and-snap/drag-and-snap';
import { GetPawnDiameter } from '../../helpers/pawnHelper';


/** @param {{size: "tiny"|"small"|"medium"|"large"|"huge"|"gargantuan"]}} props  */
function Pawn(props) {

  const pawnDiameter = () => GetPawnDiameter(props.size);

  return (
    <DragAndSnap size={props.size}>
        <div className="pawn" style={{height: pawnDiameter() + "px", width: pawnDiameter() + "px"}} />
    </DragAndSnap>
  );
}

export default Pawn;