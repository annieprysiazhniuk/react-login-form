import React from "react";
import getDaysUntilBirthday from "../modules/getDaysUntilBirthday";
import getRandomQuote from "../modules/getRandomQuote";
import useFetchAPI from "../hooks/fetchAPI";

function Quote() {
  const birthday = localStorage.getItem("birthday");
  const userName = localStorage.getItem("userName");

  const daysUntilBirthday = getDaysUntilBirthday(birthday);

  const { data, error } = useFetchAPI("https://type.fit/api/quotes");
  const allQuotes = data;

  const createQuoteMessage = () => {
    if (error) {
      return <div>Error: {error.message}</div>;
    }
    if (Array.isArray(allQuotes) && allQuotes.length > 0) {
      const randomQuote = getRandomQuote(allQuotes);
      return (
        <>
          <h1 className="congrats-title">Happy Birthday, {userName}!</h1>
          <p className="quote-item">{randomQuote.text}</p>
          <p className="quote-author">{randomQuote.author || "Unknown"}</p>
        </>
      );
    } else {
      return <p>Loading quotes...</p>;
    }
  };

  const createDaysToBirthdayMessage = () => {
    return (
      <>
        <h1 className="days-title">{daysUntilBirthday + 1} DAYS LEFT</h1>
        <p>Until your Birthday!</p>
      </>
    );
  };

  const createBirthdayTomorrowMessage = () => {
    return (
      <>
        <h1 className="days-title">1 DAY LEFT</h1>
        <h2>{userName}, your Birthday is tomorrow!</h2>
      </>
    );
  };

  const handleLoginedUserBirthday = () => {
    if (daysUntilBirthday === 365) {
      return createQuoteMessage();
    }
    if (daysUntilBirthday === 0) {
      return createBirthdayTomorrowMessage();
    }
    return createDaysToBirthdayMessage();
  };

  const handleNotLoginedUserBirthday = () => {
    return (
      <>
        <p>
          To get started please{" "}
          <a href="signup" className="accent">
            Create an account
          </a>
        </p>
        <p>
          If you have one, please{" "}
          <a href="/" className="accent">
            Sign in
          </a>
        </p>
      </>
    );
  };

  return (
    <div className="quote-container welcome-container">
      {birthday ? handleLoginedUserBirthday() : handleNotLoginedUserBirthday()}
    </div>
  );
}

export default Quote;
