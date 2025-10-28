import React, { useState } from 'react';
import packageData from '../../data/packageData';

const FavPackageTypes = () => {
  const [favorites, setFavorites] = useState(() => {
    return JSON.parse(localStorage.getItem("favoritePackageTypes")) || [];
  });

  const handleRemove = (type) => {
    const updated = favorites.filter(fav => fav !== type);
    setFavorites(updated);
    localStorage.setItem("favoritePackageTypes", JSON.stringify(updated));
  };

  return (
    <div className="container my-4">
      <h3 className="text-center">Your Favorite Package Types</h3>
      <div className="row">
        {favorites.map((type, i) => {
          const [destinationName, packageType] = type.split("-");
          const destination = packageData[destinationName];
          const card = destination?.destinationTypes.find(dt => dt.type === packageType);

          return card ? (
            <div className="col-md-4 py-3" key={i}>
              <div className="card">
                <img src={card.imgUrl} className="card-img-top" alt={card.type} />
                <div className="card-body">
                  <h5 className="card-title">{card.type}</h5>
                  <p className="card-text">{card.description}</p>
                  <button className='btn btn-danger' onClick={() => handleRemove(type)}>Remove</button>
                </div>
              </div>
            </div>
          ) : null;
        })}
      </div>
    </div>
  );
};

export default FavPackageTypes;