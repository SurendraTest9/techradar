import React from 'react';
import Radar from 'react-tech-radar';

export default { 
  title: 'TechRadar/FromGoogleShert',
  component: Radar,
};


const GOOGLE_SHEET_URL = "https://docs.google.com/spreadsheets/d/1N-dKXKWsrFH4lhunFEQ8dWn2VHcakzW7tnGBLRXl9GQ/edit";
export const FromGooglesheet =() => (
  <div style = {{ padding: 20 }}>
    <h3 style={{marginBottom: 12}}>CBG Tech Radar (Google Sheet)</h3>
    <Radar 
      rings={['adopt', 'trial', 'assess', 'hold']}
      quadrants={['Tools', 'Techniques', 'Platforms', 'Languages & Framework']}
      dataUrl={GOOGLE_SHEET_URL}
      width={1200}
      fontSize={12}
    />
  </div>
);