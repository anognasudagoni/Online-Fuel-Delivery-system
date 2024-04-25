import React from "react";
import { Link } from "react-router-dom";
import classes from "./tags.module.css";

export default function Tags({ tags, forFuelPage }) {
  return (
    <div
      className={classes.container}
      style={{
        justifyContent: forFuelPage ? "start" : "center",
      }}
    >
      {tags.map((tag) => (
        <Link key={tag.name} to={`/tag/${tag.name}`}>
          {tag.name}
          {!forFuelPage && `(${tag.count})`}
        </Link>
      ))}
    </div>
  );
}
