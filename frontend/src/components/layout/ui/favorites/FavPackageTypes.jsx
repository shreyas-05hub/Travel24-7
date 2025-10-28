import React from 'react';
import packageData from '../../data/packageData';

const FavPackageTypes = () => {
  const favorites = JSON.parse(localStorage.getItem("favoritePackageTypes")) || [];

  return (
    <div className="container my-4">
      <h3 className="text-center">Your Favorite Package Types</h3>
      <div className="row">
        {favorites.map((type, i) => {
          const destination = Object.values(packageData).find(dest =>
            dest.destinationTypes.some(dt => dt.type === type)
          );
          const card = destination?.destinationTypes.find(dt => dt.type === type);

          return card ? (
            <div className="col-md-4 py-3" key={i}>
              <div className="card">
                <img src={card.imgUrl} className="card-img-top" alt={card.type} />
                <div className="card-body">
                  <h5 className="card-title">{card.type}</h5>
                  <p className="card-text">{card.description}</p>
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