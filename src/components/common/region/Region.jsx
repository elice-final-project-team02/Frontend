import React, { useState } from 'react';
import { region } from '../../../lib';

export default function Region(props) {
  const [selectedSido, setSelectedSido] = useState(props.region1 || '');
  const [selectedGugun, setSelectedGugun] = useState(props.region2 || '');

  const handleSidoChange = (event) => {
    setSelectedSido(event.target.value);
    setSelectedGugun('');
    if (props.onRegionChange) {
      props.onRegionChange(event.target.value, '');
    }
  };

  const handleGugunChange = (event) => {
    setSelectedGugun(event.target.value);
    if (props.onRegionChange) {
      props.onRegionChange(selectedSido, event.target.value);
    }
  };

  return (
    <>
      <select value={selectedSido} onChange={handleSidoChange}>
        <option value="">시/도 선택</option>
        {region[0].map((area, index) => (
          <option key={index} value={area}>
            {area}
          </option>
        ))}
      </select>
      <select value={selectedGugun} onChange={handleGugunChange}>
        <option value="">구/군 선택</option>
        {selectedSido &&
          region[region[0].indexOf(selectedSido) + 1]?.map((area, index) => (
            <option key={index} value={area}>
              {area}
            </option>
          ))}
      </select>
    </>
  );
}
