import React from 'react';
import './App.css';
import AddressForm from './components/AddressForm';
import {Helmet} from 'react-helmet';
import { isMobile } from "react-device-detect";


let App=() => {
  
  const mobile = isMobile;

  return (
    <React.Fragment>
      <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"/>
      <Helmet>
                <style>{'body { background-color: blanchedalmond; }'}</style>
            </Helmet>
            <div className='title'>
              <p>Welcome to Find My Politicians</p>
            </div>
        <div className='back' 
          style={{
            alignItems:'center',
          }}>
            
        </div>
        
        <AddressForm mobile={mobile}/>
    </React.Fragment>   
  );
}

export default App;
