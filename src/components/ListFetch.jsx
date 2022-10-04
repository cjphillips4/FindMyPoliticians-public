import React from 'react';
import { useState } from 'react';
import axios from 'axios';
import { useEffect } from 'react';
import { isMobile } from "react-device-detect";
import CustomPopup from "./CustomPopup";



const party = value => {
    let string = new String(value);
    if (string == 'Democratic Party')
        return 'Democrat';
    else if (string == 'Republican Party')
        return 'Republican';
    else
        return string;

}

const address = value => {
    try {
        let string = new String(value.geocodingSummaries[0].queryString)
        if (string != null)
            return string
        else
            return null

    }
    catch (e) {
        return null
    }
}

const email = value => {
    try {
        let string = new String(value.emails[0])
        if (string != null)
            return string
        else
            return null;
    }
    catch (e) {
        return null;
    }
}

const officeName = value => {
    try {
        let string = new String(value.name);
        if (string != null)
            return string
        else
            return null;
    }
    catch (e) {
        return null;
    }
}

const officeRealName = value => {
    try {
        let string = new String(value.name);
        if (string != null)
            return string;
        else
            return null;
    }
    catch (e) {
        return null;
    }
}

const division = value => {
    try {
        let string = new String(value.levels[0])
        if (string != null) {
            if (string == 'country')
                return 'Federal'
            else if (string == 'administrativeArea1')
                return 'State'
            else if (string == 'administrativeArea2')
                return 'County'
            else if (string == 'locality')
                return 'Local'
            else
                return string
        }
        else
            return null;
    }
    catch (e) {
        return null;
    }
}

const phone = value => {
    try {
        let string = new String(value.phones[0]);
        if (string != null)
            return string
        else
            return null;
    }
    catch (e) {
        return null;
    }
}

const socials = value => {
    try {
        let urls = Array(2);

        for (let i = 0; i < value.channels.length; i++) {
            if (value.channels[i].type == 'Facebook')
                urls[0] = new String('https://www.facebook.com/' + value.channels[i].id);
            else if (value.channels[i].type == 'Twitter')
                urls[1] = new String('https://www.twitter.com/' + value.channels[i].id);
        }
        return urls;
    }
    catch (e) {
        return null;
    }

}





let ListFetch = (props) => {

    const [office, setOffice] = useState([]);
    const [official, setOfficial] = useState([]);
    const [send, setSend] = useState(false);
    const mobile = isMobile;
    const [visibility, setVisibility] = useState(false);
    const [popup, setPopup] = useState(false);
    const popupCloseHandler = (e) => {
        setVisibility(e);
        setPopup(false);
    };

    const [state, setState] = useState({
        selectedPoli: {
            Office: '',
            Name: '',
            Division: '',
            Party: '',
            Address: '',
            Phone: '',
            Email: '',
            Socials: ['', '']
        }
    });


    let { selectedPoli } = state;
    const getPoli = () => {

        let link = new String(props.url);
        axios.get(link)
            .then((response) => {
                const myOffice = response.data.offices;
                const myOfficial = response.data.officials;
                setOfficial(myOfficial);
                setOffice(myOffice);

            });
        if (send) {
            props.sendPoli(state.selectedPoli);
            setSend(false);
        }
    };



    useEffect(() => getPoli(), [props.url, send, popup]);

    const twitter = () => {
        window.open(selectedPoli.Socials[1]);
    }

    const facebook = () => {
        window.open(selectedPoli.Socials[0]);
    }

    let clickHandle = (offices, official, i) => {
        setState((state) => ({
            selectedPoli: {
                Office: officeName(offices),
                Name: officeRealName(official[offices.officialIndices[i]]),
                Division: division(offices),
                Party: party(official[offices.officialIndices[i]].party),
                Address: address(official[offices.officialIndices[i]]),
                Phone: phone(official[offices.officialIndices[i]]),
                Email: email(official[offices.officialIndices[i]]),
                Socials: socials(official[offices.officialIndices[i]])
            }

        }));

        setSend(true);
    }

    let clickHandleMobile = (offices, official, i) => {
        setState((state) => ({
            selectedPoli: {
                Office: officeName(offices),
                Name: officeRealName(official[offices.officialIndices[i]]),
                Division: division(offices),
                Party: party(official[offices.officialIndices[i]].party),
                Address: address(official[offices.officialIndices[i]]),
                Phone: phone(official[offices.officialIndices[i]]),
                Email: email(official[offices.officialIndices[i]]),
                Socials: socials(official[offices.officialIndices[i]])
            }

        }));
        setPopup(true);
        setVisibility(!visibility);
    }

    return (

        <div>
            {mobile == false && (
                <div>
                    <div className='card-header mb-3'>
                        <h9>Select a Politican to View Their Contact Info</h9>
                    </div>
                    <div className='bg-white shadow-lg'>
                        <div className=''>
                            <div className='row'>
                                <div className='col'>

                                    <table className='table table-hover text-center table-striped'>
                                        <thead className='bg-dark text-white sticky-top'>
                                            <tr>
                                                <th>Office</th>
                                                <th>Name</th>
                                                <th>Division</th>
                                            </tr>
                                        </thead>

                                        <tbody>
                                            {
                                                office.length > 0 &&
                                                office.map(offices => {
                                                    return (
                                                        offices.officialIndices.length > 0 &&
                                                        offices.officialIndices.map((politicians, i) => {
                                                            return (
                                                                (
                                                                    <tr key={politicians.name} onClick={() => clickHandle(offices, official, i)}>
                                                                        <td>{officeName(offices)}</td>
                                                                        <td>{officeRealName(official[offices.officialIndices[i]])}</td>
                                                                        <td>{division(offices)}</td>
                                                                    </tr>)
                                                            )
                                                        })

                                                    )
                                                })
                                            }
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            {mobile == true && (
                <div>
                    <div className='card-header mb-3'>
                        <h9>Select a Politican to View Their Contact Info</h9>
                    </div>
                    <div className='bg-white shadow-lg'>

                        <div className=''>
                            <div className='row'>
                                <div className='col'>

                                    <table className='table table-hover text-center table-striped'>
                                        <thead className='bg-dark text-white sticky-top'>
                                            <tr>
                                                <th>Office</th>
                                                <th>Name</th>
                                                <th>Division</th>
                                            </tr>
                                        </thead>

                                        <tbody>
                                            {
                                                office.length > 0 &&
                                                office.map(offices => {
                                                    return (
                                                        offices.officialIndices.length > 0 &&
                                                        offices.officialIndices.map((politicians, i) => {
                                                            return (
                                                                (
                                                                    <tr key={politicians.name} onClick={() => clickHandleMobile(offices, official, i)}>
                                                                        <td>{officeName(offices)}</td>
                                                                        <td>{officeRealName(official[offices.officialIndices[i]])}</td>
                                                                        <td>{division(offices)}</td>
                                                                    </tr>)
                                                            )
                                                        })

                                                    )
                                                })
                                            }
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                    {popup == true && (
                        <div>

                            <CustomPopup
                                onClose={popupCloseHandler}
                                show={visibility}
                                style={{
                                    alignItems: 'center'
                                }}
                            >

                                {selectedPoli.Office != null && (

                                    <div className='card shadow-lg bg-light' style={{ width: '80%' }}>

                                        <div class="" style={{
                                            alignItems: 'center'
                                        }}>
                                            {selectedPoli.Name != null && selectedPoli.Party != null && selectedPoli.Party == 'Democrat' && (
                                                <h3 className='mb-1'>{selectedPoli.Name}{' ('}<font color='blue'>{'D'}</font>{')'}</h3>
                                            )}
                                             {selectedPoli.Name != null && selectedPoli.Party != null && selectedPoli.Party == 'Republican' && (
                                                <h3 className='mb-1'>{selectedPoli.Name}{' ('}<font color='red'>{'R'}</font>{')'}</h3>
                                            )}
                                            {selectedPoli.Name != null && selectedPoli.Party != null && selectedPoli.Party != 'Republican' && selectedPoli.Party != 'Democrat' && (
                                                <h3 className='mb-1'>{selectedPoli.Name}</h3>
                                            )}
                                             {selectedPoli.Name != null && selectedPoli.Party == null && (
                                                <h3 className='mb-1'>{selectedPoli.Name}</h3>
                                            )}

                                            {selectedPoli.Office != null && (
                                                <h6 class="mb-1 text-muted">{selectedPoli.Office}</h6>
                                            )}

                                            <div className='mt-5' />
                                            {selectedPoli.Address != null && (
                                                <div className='mt-3'>
                                                    <span style={{ fontWeight: 'bold' }}><h9 class="card-title">Mailing Address:</h9></span>
                                                    <div className='mt-1' />
                                                    <h7 class="card-subtitle mb-2">{selectedPoli.Address}</h7>
                                                </div>
                                            )}

                                            {selectedPoli.Phone != null && (
                                                <div className='mt-3'>
                                                    <span style={{ fontWeight: 'bold' }}><h9 class="card-title">Phone Number:</h9></span>
                                                    <div className='mt-1' />
                                                    <h7 class="card-subtitle mb-2">{selectedPoli.Phone}</h7>
                                                </div>
                                            )}

                                            {selectedPoli.Email != null && (
                                                <div className='mt-3'>
                                                    <span style={{ fontWeight: 'bold' }}><h9 class="card-title">Email:</h9></span>
                                                    <div className='mt-1' />
                                                    <h7 class="card-subtitle mb-2">{selectedPoli.Email}</h7>
                                                </div>
                                            )}

                                            {selectedPoli.Socials != null && selectedPoli.Socials[0] != null && selectedPoli.Socials[1] == null && (
                                                <div className='mt-3'>
                                                    <span style={{ fontWeight: 'bold' }}><h9 class="card-title">Social Media:</h9></span>
                                                    <div className='mt-1' />
                                                    <h7 class="card-subtitle mb-2"><img src='facebook.png' className='icon' onClick={() => facebook()} /></h7>
                                                </div>
                                            )}
                                            {selectedPoli.Socials != null && selectedPoli.Socials[0] == null && selectedPoli.Socials[1] != null && (
                                                <div className='mt-3'>
                                                    <span style={{ fontWeight: 'bold' }}><h9 class="card-title">Social Media:</h9></span>
                                                    <div className='mt-1' />
                                                    <h7 class="card-subtitle mb-2"><img src='twitter.png' className='icon' onClick={() => twitter()} /></h7>
                                                </div>
                                            )}
                                            {selectedPoli.Socials != null && selectedPoli.Socials[0] != null && selectedPoli.Socials[1] != null && (
                                                <div className='mt-3'>
                                                    <span style={{ fontWeight: 'bold' }}><h9 class="card-title">Social Media:</h9></span>
                                                    <div className='mt-1' />
                                                    <h7 class="card-subtitle mb-2"><img src='facebook.png' className='icon' onClick={() => facebook()} /><img src='twitter.png' className='icon' onClick={() => twitter()} /></h7>
                                                </div>

                                            )}
                                        </div>
                                    </div>
                                )}
                            </CustomPopup>
                        </div>
                    )}
                </div>
            )}
        </div>
    )
};

export default ListFetch;