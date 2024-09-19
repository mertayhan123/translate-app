"use client";

import { useEffect, useState } from "react";
import countries from "../data";
import { Button } from "@/components/ui/button";

const Translate = () => {
  const [fromText, setFromText] = useState("");
  const [toText, setToText] = useState("");
  const [translateFrom, setTranslateFrom] = useState("");
  const [translateTo, setTranslateTo] = useState("");

  const handleTranslate = async () => {
    if (!fromText.trim() || !translateFrom || !translateTo) return;

    try {
      const apiUrl = `https://api.mymemory.translated.net/get?q=${fromText}&langpair=${translateFrom}|${translateTo}`;
      const response = await fetch(apiUrl);
      const data = await response.json();
      setToText(data.matches[0]?.translation || data.responseData.translatedText);
    } catch (error) {
      console.error("Translation error:", error);
    }
  };

  const exchangeLanguages = () => {
    setTranslateFrom(translateTo);
    setTranslateTo(translateFrom);
    setFromText(toText);
    handleTranslate();
  };

  useEffect(() => {
    handleTranslate();
  }, [fromText, translateFrom, translateTo]);

  return (
    <div className="container max-w-lg mx-auto mt-10">
      <div className="wrapper bg-white shadow-md rounded-lg p-6">
        <div className="controls flex justify-between mb-4">
          <div className="row from w-1/2 pr-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              From Language
            </label>
            <select
              className="w-full border border-gray-300 rounded-md p-2 text-gray-700 focus:outline-none focus:border-blue-500"
              value={translateFrom}
              onChange={(e) => setTranslateFrom(e.target.value)}
            >
              <option value="">Select Language</option>
              {Object.entries(countries).map(([country_code, country_name]) => (
                <option key={country_code} value={country_code}>
                  {country_name}
                </option>
              ))}
            </select>
          </div>

          <div className="exchange flex items-center justify-center cursor-pointer text-blue-600 hover:text-blue-800 transition duration-200">
            <Button
             
              onClick={exchangeLanguages}
            >
              Exchange Languages
            </Button>
          </div>

          <div className="row to w-1/2 pl-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              To Language
            </label>
            <select
              className="w-full border border-gray-300 rounded-md p-2 text-gray-700 focus:outline-none focus:border-blue-500"
              value={translateTo}
              onChange={(e) => setTranslateTo(e.target.value)}
            >
              <option value="">Select Language</option>
              {Object.entries(countries).map(([country_code, country_name]) => (
                <option key={country_code} value={country_code}>
                  {country_name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Enter Text
          </label>
          <textarea
            className="w-full border border-gray-300 rounded-md p-3 text-gray-700 focus:outline-none focus:border-blue-500"
            spellCheck="false"
            value={fromText}
            onChange={(e) => setFromText(e.target.value)}
            placeholder="Enter text"
          ></textarea>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Translation
          </label>
          <textarea
            className="w-full border border-gray-300 rounded-md p-3 bg-gray-100 text-gray-700"
            spellCheck="false"
            readOnly
            disabled
            value={toText}
            placeholder="Translation"
          ></textarea>
        </div>
      </div>
    </div>
  );
};

export default Translate;
