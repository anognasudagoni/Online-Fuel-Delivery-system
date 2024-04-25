import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Price from "../../components/Price/Price";
import StarRating from "../../components/StarRating/StarRating";
import Tags from "../../components/Tags/Tags";
import { useCart } from "../../hooks/useCart";
import { getById } from "../../services/fuelService";
import classes from "./fuelPage.module.css";
import NotFound from "../../components/NotFound/NotFound";
export default function FuelPage() {
  const [fuel, setFuel] = useState({});
  const { id } = useParams();
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const handleAddToCart = () => {
    console.log(fuel);
    addToCart(fuel);
    navigate("/cart");
  };

  useEffect(() => {
    getById(id).then(setFuel);
  }, [id]);
  return (
    <>
      {!fuel ? (
        <NotFound message="Fuel Not Found!" linkText="Back To Homepage" />
      ) : (
        <div className={classes.container}>
          <img
            className={classes.image}
            src={`${fuel.imageUrl}`}
            alt={fuel.name}
          />

          <div className={classes.details}>
            <div className={classes.header}>
              <span className={classes.name}>{fuel.name}</span>
              <span
                className={`${classes.favorite} ${
                  fuel.favorite ? "" : classes.not
                }`}
              >
                ❤
              </span>
            </div>
            <div className={classes.rating}>
              <StarRating stars={fuel.stars} size={25} />
            </div>

            <div className={classes.origins}>
              {fuel.origins?.map((origin) => (
                <span key={origin}>{origin}</span>
              ))}
            </div>

            <div className={classes.tags}>
              {fuel.tags && (
                <Tags
                  tags={fuel.tags.map((tag) => ({ name: tag }))}
                  forFuelPage={true}
                />
              )}
            </div>

            <div className={classes.time}>
              <span>
                Time to Delivery about <strong>{fuel.time}</strong> minutes
              </span>
            </div>

            <div className={classes.price}>
              <Price price={fuel.price} />
            </div>

            <button onClick={handleAddToCart}>Add To Cart</button>
          </div>
        </div>
      )}
    </>
  );
}
