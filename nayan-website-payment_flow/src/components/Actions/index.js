import React from "react";
import Style from "./Actions.module.scss";

function Actions({ setActions, menuFilterRef }) {
    return (
        <div
            ref={menuFilterRef}
            className={`${Style.action_items} ${Style.active}`}
        >
            <h3>ACTIONS</h3>
            <ul>
                <li>
                    <button onClick={() => setActions(false)}>
                        LAUNCH JOB
                    </button>
                </li>
                <li>
                    <button onClick={() => setActions(false)}>
                        REVIEW JOB
                    </button>
                </li>
                <li>
                    <button onClick={() => setActions(false)}>PAUSE JOB</button>
                </li>
            </ul>
        </div>
    );
}

export default Actions;
