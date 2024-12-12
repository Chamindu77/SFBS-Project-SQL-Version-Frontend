import React from 'react';
import EquipmentCard from './EquipmentCard';

const EquipmentList = ({ filteredEquipment }) => {
  if (filteredEquipment.length === 0) return <p>No equipment available.</p>;

  return (
    <div className="w-3/4 p-4">
      <div className="grid grid-cols-3 gap-6">
        {filteredEquipment.map((equipment) => (
          <EquipmentCard key={equipment._id} equipment={equipment} />
        ))}
      </div>
    </div>
  );
};

export default EquipmentList;
