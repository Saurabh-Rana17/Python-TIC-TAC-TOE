import React, { Suspense } from "react";

import { Route, Routes, Navigate } from "react-router-dom";
import LoadingSpinner from "./components/UI/LoadingSpinner";
import Layout from "./components/Layout/Layout";
import AllQuotes from "./pages/AllQuotes";

const NewQuote = React.lazy(() => import("./pages/NewQuote"));
const QuoteDetail = React.lazy(() => import("./pages/QuoteDetail"));
const NotFound = React.lazy(() => import("./pages/NotFound"));

const App = () => {
  return (
    <Layout>
      <Suspense
        fallback={
          <div className="centered">
            <LoadingSpinner />
          </div>
        }
      >
        <Routes>
          <Route path="/" element={<Navigate to="/quotes" />} />
          <Route path="/quotes" element={<AllQuotes />} />
          <Route path="/new-quote" element={<NewQuote />} />
          <Route path="/quotes/:quoteId/*" element={<QuoteDetail />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </Layout>
  );
};

export default App;
