import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import QuoteItem from "./QuoteItem";
import classes from "./QuoteList.module.css";

const SortQuote = (quote, sort) => {
  return quote.sort((q1, q2) => {
    if (sort) {
      return q1.id > q2.id ? 1 : -1;
    } else {
      return q1.id < q2.id ? 1 : -1;
    }
  });
};

const QuoteList = (props) => {
  const navigate = useNavigate();
  const location = useLocation();

  const query = new URLSearchParams(location.search);
  const condition = query.get("sort") === "asc";
  const SortedQuote = SortQuote(props.quotes, condition);

  const SortHandler = () => {
    navigate(`/quotes?sort=${condition ? "dsc" : "asc"}`);
  };

  return (
    <React.Fragment>
      <div className={classes.sorting}>
        <button onClick={SortHandler}>
          Sort {condition === true ? "Descending" : "Ascending"}
        </button>
      </div>
      <ul className={classes.list}>
        {SortedQuote.map((quote) => (
          <QuoteItem
            key={quote.id}
            id={quote.id}
            author={quote.author}
            text={quote.text}
          />
        ))}
      </ul>
    </React.Fragment>
  );
};

export default QuoteList;
