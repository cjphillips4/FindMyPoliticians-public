import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import ListFetch from './ListFetch';
import PoliCard from './PoliCard';
import { isMobile } from "react-device-detect";



let PoliticianList = (props) => {

    const mobile = isMobile;

    const [state, setState] = useState({
        selectedPoli: {
            Office: null,
            Name: null,
            Division: null,
            Party: null,
            Address: null,
            Phone: null,
            Email: null,
            Socials: null
        }
    });

    const receivePoli = (selected) => {
        setState((state) => ({
            selectedPoli: selected
        }));
    };
    let [url, setUrl] = useState('');

    const [addReady, setAddReady] = useState(false);

    useEffect(() => {
        let address = new String(props.permaAddress);
        let url = 'https://www.googleapis.com/civicinfo/v2/representatives?key=myKey=';
        for (let i = 0; i < address.length; i++) {
            if (address.substring(i, i + 1) == ' ')
                url += '%20';
            else if (address.substring(i, i + 1) == ',')
                continue;
            else
                url += address.substring(i, i + 1);
        }
        if (address != 'undefined')
            setAddReady(true);
        setUrl(url);
    }, [props.permaAddress]);

    return (
        <React.Fragment>
            {addReady && (
                <div className='container mt-3'>
                    <div className='row'>
                        {isMobile == false && (
                            <div className='col-md-9'>
                                <ListFetch url={url} sendPoli={receivePoli} />
                            </div>)}
                        {isMobile == true && (
                            <div className='col-md-5'>
                                <ListFetch url={url} sendPoli={receivePoli} />
                            </div>)}
                        <div className='col-md-1'>
                            <PoliCard selectedPoli={state.selectedPoli} />
                        </div>
                    </div>
                </div>
            )}

        </React.Fragment>
    )
};

export default PoliticianList;