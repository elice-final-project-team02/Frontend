import React, { useState } from 'react';
import { region } from 'lib';

export default function Region(props) {
  const [selectedRegion, setSelectedRegion] = useState(props.region1 || '');
  const [selectedSubRegion, setSelectedSubRegion] = useState(props.region2 || '');

  const handleSidoChange = (event) => {
    const selectedValue = event.target.value;
    setSelectedRegion(selectedValue);
    setSelectedSubRegion('');
    if (props.onRegionChange) {
      props.onRegionChange(selectedValue, '');
    }
  };

  const handleGugunChange = (event) => {
    const selectedValue = event.target.value;
    setSelectedSubRegion(selectedValue);
    if (props.onRegionChange) {
      props.onRegionChange(selectedRegion, selectedValue);
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
