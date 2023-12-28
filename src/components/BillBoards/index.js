import React, { useContext } from "react";
import Style from "./BillBoards.module.scss";
import CommonLayout from "../Layout/CommonLayout";
//import Assets from "../Layout/CommonLayout/Asset";
//import Actions from "../Actions";
import { Context } from "../../context";
import { TitleCaseConverter } from "../../utils/string-helper";

function BillBoards({ children }) {
    // context state
    const {
        state: { user },
    } = useContext(Context);

    // Filter Functionality Start

    //const [showActions, setActions] = useState(false);

    //const menuFilterRef = useRef();

    /* const useOutsideAlerter = (ref) => {
        useEffect(() => {
            //Alert if clicked on outside of element
            const handleClickOutside = (event) => {
                if (ref.current && !ref.current.contains(event.target)) {
                    //setActions(false);
                    if (
                        event.target.id !== "filter___Btn12" &&
                        event.target.id !== "filter___Btn"
                    ) {
                        setActions(false);
                    }
                }
            };
            // Bind the event listener
            document.addEventListener("mousedown", handleClickOutside);
            return () => {
                // Unbind the event listener on clean up
                document.removeEventListener("mousedown", handleClickOutside);
            };
        }, [ref]);
    }; */

    // Uncomment to invoke the function
    //useOutsideAlerter(menuFilterRef);
    // Filter functionality End

    return (
        <>
            <CommonLayout>
                <div className={Style.billboard_wrapper}>
                    {/*<div className={Style.dashboard_action_wrapper}>
                         <div
                            id="filter___Btn"
                            className={Style.filter_wrapper}
                            onClick={() => setActions((prev) => !prev)}
                        >
                            <img
                                id="filter___Btn12"
                                src={Assets.billicon01}
                                alt=""
                            />
                        </div> 
                        <div className={Style.action_wrapper}>
                            <img src={Assets.billicon02} alt="" />
                        </div>

                        {showActions && (
                            <Actions
                                showActions={showActions}
                                setActions={setActions}
                                menuFilterRef={menuFilterRef}
                            />
                        )} 
                    </div>*/}

                    <div className={Style.main_head}>{TitleCaseConverter(user?.name || "", " ")}</div>

                    {children}
                </div>
            </CommonLayout>
        </>
    );
}

export default BillBoards;
