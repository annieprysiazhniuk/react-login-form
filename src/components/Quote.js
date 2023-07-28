import React, { useState, useEffect } from "react";
import getDaysUntilBirthday from "../modules/getDaysUntilBirthday";
import getRandomQuote from "../modules/getRandomQuote";

function Quote() {
  const birthday = localStorage.getItem("birthday");
  const userName = localStorage.getItem("userName");

  const daysUntilBirthday = getDaysUntilBirthday(birthday);
  const [allQuotes, setAllQuotes] = useState([]);

  const quoteUrl = "https://type.fit/api/quotes";

  useEffect(() => {
    const getAllQuotes = async () => {
      try {
        const result = await fetch(quoteUrl);
        if (result.ok) {
          const quotes = await result.json();
          setAllQuotes(quotes);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getAllQuotes();
  }, []);

  const createQuoteMessage = () => {
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
