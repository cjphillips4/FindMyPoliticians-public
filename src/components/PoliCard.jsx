import React from 'react';


let PoliCard = (props) => {

    const twitter = () => {
        window.open(props.selectedPoli.Socials[1]);
    }

    const facebook = () => {
        window.open(props.selectedPoli.Socials[0]);
    }

   
    return (
        <React.Fragment>
            {props.selectedPoli.Office != null && (

                <div className='card shadow-lg sticky-top bg-light'>
                    <div className='card-body' color='red'>
                        <div class="" style={{
                            alignItems: 'center'
                        }}>
                             {props.selectedPoli.Name != null && props.selectedPoli.Party != null && props.selectedPoli.Party == 'Democrat' && (
                                                <h3 className='mb-1'>{props.selectedPoli.Name}{' ('}<font color='blue'>{'D'}</font>{')'}</h3>
                                            )}
                                             {props.selectedPoli.Name != null && props.selectedPoli.Party != null && props.selectedPoli.Party == 'Republican' && (
                                                <h3 className='mb-1'>{props.selectedPoli.Name}{' ('}<font color='red'>{'R'}</font>{')'}</h3>
                                            )}
                                            {props.selectedPoli.Name != null && props.selectedPoli.Party != null && props.selectedPoli.Party != 'Republican' && props.selectedPoli.Party != 'Democrat' && (
                                                <h3 className='mb-1'>{props.selectedPoli.Name}</h3>
                                            )}
                                             {props.selectedPoli.Name != null && props.selectedPoli.Party == null && (
                                                <h3 className='mb-1'>{props.selectedPoli.Name}</h3>
                                            )}
                            {props.selectedPoli.Office != null && (
                                <h6 class="mb-1 text-muted">{props.selectedPoli.Office}</h6>
                            )}
                            <div className='mt-5'/>
                         
                            {props.selectedPoli.Address != null && (
                                <div className='mt-3'>
                                    <span style={{fontWeight:'bold'}}><h9 class="card-title">Mailing Address:</h9></span>
                                    <div className='mt-1'/>
                                    <h7 class="card-subtitle mb-2">{props.selectedPoli.Address}</h7>
                                </div>
                            )}
                            {props.selectedPoli.Phone != null && (
                                <div className='mt-3'>
                                    <span style={{fontWeight:'bold'}}><h9 class="card-title">Phone Number:</h9></span>
                                    <div className='mt-1'/>
                                    <h7 class="card-subtitle mb-2">{props.selectedPoli.Phone}</h7>
                                </div>
                            )}
                            {props.selectedPoli.Email != null && (
                                <div className='mt-3'>
                                    <span style={{fontWeight:'bold'}}><h9 class="card-title">Email:</h9></span>
                                    <div className='mt-1'/>
                                    <h7 class="card-subtitle mb-2">{props.selectedPoli.Email}</h7>
                                </div>
                            )}
                             {props.selectedPoli.Socials != null && props.selectedPoli.Socials[0] != null && props.selectedPoli.Socials[1]==null && (
                                <div className='mt-3'>
                                    <span style={{fontWeight:'bold'}}><h9 class="card-title">Social Media:</h9></span>
                                    <div className='mt-1'/>
                                    <h7 class="card-subtitle mb-2"><img src='facebook.png' className='icon' onClick={() => facebook()} /></h7>
                                </div>
                            )}
                            {props.selectedPoli.Socials != null && props.selectedPoli.Socials[0] == null && props.selectedPoli.Socials[1]!=null && (
                                <div className='mt-3'>
                                    <span style={{fontWeight:'bold'}}><h9 class="card-title">Social Media:</h9></span>
                                    <div className='mt-1'/>
                                    <h7 class="card-subtitle mb-2"><img src='twitter.png' className='icon' onClick={() => twitter()} /></h7>
                                </div>
                            )}
                            {props.selectedPoli.Socials != null && props.selectedPoli.Socials[0] != null && props.selectedPoli.Socials[1]!=null && (
                                <div className='mt-3'>
                                    <span style={{fontWeight:'bold'}}><h9 class="card-title">Social Media:</h9></span>
                                    <div className='mt-1'/>
                                    <h7 class="card-subtitle mb-2"><img  src='facebook.png' className='icon' onClick={() => facebook()} /><img src='twitter.png' className='icon' onClick={() => twitter()} /></h7>
                                </div>
                            )}
                        </div>
                    </div>
                </div>)}
        </React.Fragment>
    )
};

export default PoliCard;