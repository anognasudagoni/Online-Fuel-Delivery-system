import React, { useEffect, useReducer } from "react";
import { useParams } from "react-router-dom";
import Search from "../../components/Search/Search";
import Tags from "../../components/Tags/Tags";
import Thumbnails from "../../components/Thumbnails/Thumbnails";
import {
  getAll,
  getAllByTag,
  getAllTags,
  search,
} from "../../services/fuelService";
import NotFound from "../../components/NotFound/NotFound";

const initialState = { fuels: [], tags: [] };

const reducer = (state, action) => {
  switch (action.type) {
    case "FUELS_LOADED":
      return { ...state, fuels: action.payload };
    case "TAGS_LOADED":
      return { ...state, tags: action.payload };
    default:
      return state;
  }
};

export default function HomePage() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { fuels, tags } = state;
  const { searchTerm, tag } = useParams();

  useEffect(() => {
    getAllTags().then((tags) =>
      dispatch({ type: "TAGS_LOADED", payload: tags })
    );

    const loadFuels = tag
      ? getAllByTag(tag)
      : searchTerm
      ? search(searchTerm)
      : getAll();

    loadFuels.then((fuels) =>
      dispatch({ type: "FUELS_LOADED", payload: fuels })
    );
  }, [searchTerm, tag]);

  return (
    <>
      <Search />
      <Tags tags={tags} />
      {fuels.length === 0 && <NotFound linkText="Reset Search" />}
      <Thumbnails fuels={fuels} />
    </>
  );
}
