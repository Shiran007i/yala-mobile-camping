// src/pages/UnsubscribePage.jsx
import React from "react";
import { Unsubscribe } from "../components";
import SEO from "../components/SEO.jsx";

const UnsubscribePage = () => {
  const unsubscribeSEO = {
    title: "Unsubscribe | Yala Mobile Camping Newsletter",
    description:
      "Unsubscribe from Yala Mobile Camping newsletter. We're sorry to see you go!",
    keywords: "unsubscribe newsletter, Yala Mobile Camping email",
  };

  return (
    <>
      <SEO
        title={unsubscribeSEO.title}
        description={unsubscribeSEO.description}
        keywords={unsubscribeSEO.keywords}
        canonical="https://yalamobilecamping.com/unsubscribe"
      />
      <Unsubscribe />
    </>
  );
};

export default UnsubscribePage;