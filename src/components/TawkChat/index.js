import { useRef } from 'react';
import TawkMessengerReact from '@tawk.to/tawk-messenger-react';
// import ReactGA from "react-ga4";

export default function TawkMessengerIcon() {

    // const handleEvent=(category,action,label)=>{
    //     return ReactGA.event({
    //         category: category,
    //         action: action,
    //         label: label // optional 
    // })
    // }
    const tawkMessengerRef = useRef();
    
    return (
        <div className="tawk-messenger-icon">
            <TawkMessengerReact
                propertyId="61fbbc96b9e4e21181bd45bf"
                widgetId="1fqvlhbj3"
                useRef={tawkMessengerRef}
                customStyle={{
                    visibility: {
                        desktop: {
                            xOffset: '70',
                            yOffset: '45',
                        },
                    }
                }}
            />
        </div>
    );
}