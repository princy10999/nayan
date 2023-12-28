import React from "react";
import BillBoardDesktop from "../components/BillBoardDesktop";
import Header from "../components/Header";
import { useDimensions } from "../logic/Dimensions";
import DirectionMap from "../components/DirectionMap";

function BillBoardDescriptionPage() {
    const { width } = useDimensions();
    return (
        <>
            <Header />
            {width > 767 ? <BillBoardDesktop /> : <DirectionMap />}
        </>
    );
}

export default BillBoardDescriptionPage;
