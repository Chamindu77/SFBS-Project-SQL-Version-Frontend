import React from 'react';
import SportCard from './SportCard';

const SportsList = ({ availableFacilities, filteredSports }) => {
  const renderSportsByCategory = (category) => {
    const categorySports = filteredSports.length > 0 
      ? filteredSports.filter(facility => facility.sportCategory === category) 
      : availableFacilities.filter(facility => facility.sportCategory === category);

    if (categorySports.length === 0) return null;

    return (
      <>
        <h2 className="text-2xl font-bold mb-4">{category}</h2>
        <div className="grid grid-cols-3 gap-6">
          {categorySports.map(facility => (
            <SportCard key={facility._id} facility={facility} />
          ))}
        </div>
      </>
    );
  };

  return (
    <div className="w-3/4 p-4">
      {filteredSports.length === 0 && (
        <>
          {renderSportsByCategory('Indoor Games')}
          <div className="mt-8">
            {renderSportsByCategory('Outdoor Games')}
          </div>
          <div className="mt-8">
            {renderSportsByCategory('Aquatic Sports')}
          </div>
        </>
      )}
      {filteredSports.length > 0 && (
        <>
          {filteredSports.some(facility => facility.sportCategory === 'Indoor Games') && (
            renderSportsByCategory('Indoor Games')
          )}
          {filteredSports.some(facility => facility.sportCategory === 'Outdoor Games') && (
            <div className="mt-8">
              {renderSportsByCategory('Outdoor Games')}
            </div>
          )}
          {filteredSports.some(facility => facility.sportCategory === 'Aquatic Sports') && (
            <div className="mt-8">
              {renderSportsByCategory('Aquatic Sports')}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default SportsList;
