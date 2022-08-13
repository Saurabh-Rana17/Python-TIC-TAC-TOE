import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import QuoteForm from "../components/Quotes/QuoteForm";
import useHttp from "../hooks/use-http";
import { addQuote } from "../lib/api";

const NewQuote = () => {
  const navigate = useNavigate();
  const { sendRequest, status } = useHttp(addQuote);

  useEffect(() => {
    if (status === "complete") {
      navigate("/quotes");
    }
  }, [status, navigate]);

  const onAdd = (quote) => {
    sendRequest(quote);
    navigate("/");
  };

  return <QuoteForm isLoading={status === "pending"} onAddQuote={onAdd} />;
};

export default NewQuote;
