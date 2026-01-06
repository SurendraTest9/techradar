import React from 'react';
import TechRadar from 'react-tech-radar';

export default function GoogleSpreadSheetDemo () {

const GOOGLE_SHEET_URL = "https://docs.google.com/spreadsheets/d/1N-dKXKWsrFH4lhunFEQ8dWn2VHcakzW7tnGBLRXl9GQ/edit";

return (
   <div style = {{ padding: '20px' }}>
     <h2 style={{marginBottom: 12}}>CBG Tech Radar (Google Sheet)</h2>

     <TechRadar 
        rings={['adopt', 'trial', 'assess', 'hold']}
        quadrants={['Tools', 'Techniques', 'Platforms', 'Languages & Framework']}
        dataUrl={GOOGLE_SHEET_URL}
        width={1200}
        fontSize={12}
     />
   </div>
);
}   
