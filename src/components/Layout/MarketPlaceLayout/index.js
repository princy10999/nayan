import React from "react";
import MarketFooter from "../../MarketFooter";
import MarketHeader from "../../MarketHeader";

function MarketPlaceLayout({children}) {
   
    return (
        <>
            <MarketHeader/>
            {children}
            <MarketFooter/>
        </>

    );
}

export default MarketPlaceLayout;