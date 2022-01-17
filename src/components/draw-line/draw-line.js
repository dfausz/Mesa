import './draw-line.css';

function DrawLine(props) {

    function getLength() {
        const x1 = props.startPoint.x;
        const y1 = props.startPoint.y;
        const x2 = props.endPoint.x;
        const y2 = props.endPoint.y;

        var length = Math.sqrt(((x2 - x1) * (x2 - x1)) + ((y2 - y1) * (y2 - y1)));
        return length;
    }

    function getCenterX() {
        const x1 = props.startPoint.x;
        const x2 = props.endPoint.x;

        return ((x1 + x2) / 2) - (getLength() / 2);
    }

    function getCenterY() {
        const y1 = props.startPoint.y;
        const y2 = props.endPoint.y;

        return ((y1 + y2) / 2) - 1;
    }

    function getAngle() {
        const x1 = props.startPoint.x;
        const y1 = props.startPoint.y;
        const x2 = props.endPoint.x;
        const y2 = props.endPoint.y;
        
        return Math.atan2((y1 - y2), (x1 - x2)) * (180 / Math.PI);
    }
    
    return (
        <>
            <div className={"dotted-line " + (props.showLine ? "" : "hidden")} style={{
                left: getCenterX() + "px",
                top: getCenterY() + "px",
                width: getLength() + "px",
                transform: "rotate(" + getAngle() + "deg)"
                }} />
            <div className={"length-label " + (props.showLine ? "" : "hidden")} 
                style={{top: props.startPoint.y, left:props.startPoint.x}}>
                {Math.round(getLength()/10) + "ft"}
            </div>
        </>
    )
}

export default DrawLine;