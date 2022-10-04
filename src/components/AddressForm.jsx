import { render } from '@testing-library/react';
import React, { useState } from 'react';
import PlacesAutoComplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete'
import PoliticianList from './PoliticianList';
import { TextInput } from '@mantine/core';
let AddressForm = (props) => {

    const [isShown, setIsShown] = useState(false);

    const handleShown = event => {
        setIsShown(true);
        setPermaAddress(address);
    };

    const [address, setAddress] = React.useState('');

    const [permaAddress, setPermaAddress] = React.useState('');

    const [coordinates, setCoordinates] = React.useState({
        lat: null,
        lng: null
    });

    const handleSelect = async value => {
        const results = await geocodeByAddress(value);
        const latlng = await getLatLng(results[0]);
        setAddress(value);
        setCoordinates(latlng);
    };

    const onClickHandler = async (address) => {
        const results = await geocodeByAddress(address);
        const latlng = await getLatLng(results[0]);
        setAddress(address);
        setCoordinates(latlng);
        setSuggestions([]);
    }


    const [suggestions, setSuggestions] = React.useState([]);
    return (
       
        <React.Fragment>
            <div className="container form-container"
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    
                }}>
                <div className="card small-card">
                    <div className='card-body'>
                        <div>

                            <PlacesAutoComplete searchOptions={{ componentRestrictions: { country: ['us'] } }}
                                value={address}
                                onChange={setAddress}
                                onSelect={handleSelect}
                                onClick={onClickHandler}>
                                {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                                    <div>
                                        <span style={{fontWeight:'bold'}}><p>Search for Your Address</p></span>
                                        <TextInput  {...getInputProps({ placeHolder: 'Address' })} placeholder="Address"
                                        ></TextInput>
                                        <div>
                                            {loading ? <div>...loading</div> : null}

                                            {suggestions.map((suggestion) => {

                                                const style = {
                                                    backgroundColor: suggestion.active ? '#41b6e6' : '#fff'
                                                };

                                                return (<div {...getSuggestionItemProps(suggestion, { style })} >{suggestion.description}</div>);
                                            })}

                                        </div>
                                    </div>
                                )}
                            </PlacesAutoComplete>
                            <button className='btn btn-dark mt-3' onClick={handleShown}>Find My Politicians</button>
                        </div>
                    </div>
                </div>
            </div>
            {isShown && (
                <div>
                    <PoliticianList permaAddress={permaAddress} />
                </div>
            )}
        </React.Fragment>
    )
};

export default AddressForm;