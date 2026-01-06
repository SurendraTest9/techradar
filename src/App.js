import React from 'react';
import Radar from 'react-tech-radar';

export default function App() {

    const GOOGLE_SHEET_URL = "https://docs.google.com/spreadsheets/d/1N-dKXKWsrFH4lhunFEQ8dWn2VHcakzW7tnGBLRXl9GQ/edit";
    return (
        <div style = {{ padding: '20px' }}>
            <h1>CBG Tech Radar</h1> 
            <Radar 
              rings={['adopt', 'trial', 'assess', 'hold']}
              quadrants={['Tools', 'Techniques', 'Platforms', 'Languages & Framework']}
              dataUrl={GOOGLE_SHEET_URL}
              width={1200}
              fontSize={12}
            />
        </div>
    );
}


