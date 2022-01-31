import './context-menu.css'
import { useRef, useEffect } from 'react';

function ContextMenu(props) {
    let contextMenuRef = useRef();

    useEffect(() => {
        window.addEventListener('mouseDown', event => {
            if(contextMenuRef.current && !contextMenuRef.current.contains(event.target)) { props.setIsOpen(false) }
        });
    })

    return (
        <div ref={contextMenuRef} className={props.isOpen ? "" : "hidden " + "context-menu"} style={{ left: props.location.x, top: props.location.y}}>
            <button>Upload</button>
        </div>
    )
}

export default ContextMenu;