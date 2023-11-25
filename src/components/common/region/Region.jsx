import React, { useState } from 'react';
import { region } from 'lib';

export default function Region({ region1, region2, onRegionChange }) {
  const [selectedRegion, setSelectedRegion] = useState(region1 || '');
  const [selectedSubRegion, setSelectedSubRegion] = useState(region2 || '');

  const handleSidoChange = (event) => {
    const selectedValue = event.target.value;
    setSelectedRegion(selectedValue);
    setSelectedSubRegion('');
    if (onRegionChange) {
      onRegionChange(selectedValue, '');
    }
  };

  const handleGugunChange = (event) => {
    const selectedValue = event.target.value;
    setSelectedSubRegion(selectedValue);
    if (onRegionChange) {
      onRegionChange(selectedRegion, selectedValue);
    }
  };

  return (
    <>
      <select value={selectedRegion} onChange={handleSidoChange}>
        <option value="">시/도 선택</option>
        {region[0].map((area, index) => (
          <option key={index} value={area}>
            {area}
          </option>
        ))}
      </select>
      <select value={selectedSubRegion} onChange={handleGugunChange}>
        <option value="">구/군 선택</option>
        {selectedRegion &&
          region[region[0].indexOf(selectedRegion) + 1]?.map((area, index) => (
            <option key={index} value={area}>
              {area}
            </option>
          ))}
      </select>
    </>
  );
}
