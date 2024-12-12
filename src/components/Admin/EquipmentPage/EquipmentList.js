import React from 'react';
import EquipmentCard from './EquipmentCard';

const EquipmentList = ({ filteredEquipment }) => {
  if (filteredEquipment.length === 0) return <p>No equipment available.</p>;

  return (
    <div className="w-full pl-12 pr-12 pb-4 ml-16 mr-16">
      <div className="grid grid-cols-3 gap-6">
        {filteredEquipment.map((equipment) => (
          <EquipmentCard key={equipment._id} equipment={equipment} />
        ))}
      </div>
    </div>
  );
};

export default EquipmentList;
