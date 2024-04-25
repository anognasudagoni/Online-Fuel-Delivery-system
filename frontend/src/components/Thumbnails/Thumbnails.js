import React from "react";
import { Link } from "react-router-dom";
import Price from "../Price/Price";
import StarRating from "../StarRating/StarRating";
import classes from "./thumbnails.module.css";
export default function Thumbnails({ fuels }) {
  return (
    <ul className={classes.list}>
      {fuels.map((fuel) => (
        <li key={fuel.id}>
          <Link to={`/fuel/${fuel.id}`}>
            <img
              className={classes.image}
              src={`${fuel.imageUrl}`}
              alt={fuel.name}
            />

            <div className={classes.content}>
              <div className={classes.name}>{fuel.name}</div>
              <span
                className={`${classes.favorite} ${
                  fuel.favorite ? "" : classes.not
                }`}
              >
                ❤
              </span>
              <div className={classes.stars}>
                <StarRating stars={fuel.stars} />
              </div>
              <div className={classes.product_item_footer}>
                <div className={classes.origins}>
                  {fuel.origins.map((origin) => (
                    <span key={origin}>{origin}</span>
                  ))}
                </div>
                <div className={classes.time}>
                  <span>🕒</span>
                  {fuel.time}
                </div>
              </div>
              <div className={classes.price}>
                <Price price={fuel.price} />
              </div>
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
}
