import Head from "next/head";
import { useState } from "react";
import styles from "../styles/Home.module.css";
import questionMark from "../public/question_mark.png";
import Image from "next/image";

export default function Home() {
  const [inputValues, setInputValues] = useState([]);
  const [numberSelection, setNumberSelection] = useState();
  const [winnersNumber, setWinnersNumber] = useState(1);
  const [winner, setWinner] = useState([]);

  const setValuesToArray = (e, index) => {
    const arr = [...inputValues];
    arr[index] = e.target.value;
    setInputValues(arr);
  };

  const randomIndexNumber = () =>
    Math.floor(Math.random() * inputValues.length);

  const getResult = () => {
    const winnersArr = [];

    for (let i = 0; i < winnersNumber; i++) {
      let winnerIndex;
      setIndex();
      function setIndex() {
        winnerIndex = randomIndexNumber();
        winnersArr.includes(inputValues[winnerIndex])
          ? setIndex()
          : winnersArr.push(inputValues[winnerIndex]);
      }
    }
    setWinner(winnersArr);
  };

  return (
    <div className="flex justify-center min-h-screen">
      <Head>
        <title>Online Kura</title>
        <meta name="description" content="Online kura çek" />
        <link rel="icon" href="/question_mark.png" />
      </Head>

      <main>
        <div className="flex justify-evenly mt-8">
          <Image
            alt="questionMark"
            src={questionMark}
            width={96}
            height={96}
          ></Image>
          <h1 className="text-5xl">Online Kura Çek</h1>
          <Image
            alt="questionMark"
            src={questionMark}
            width={96}
            height={96}
          ></Image>
        </div>

        <div className="flex justify-center">
          <input
            type="number"
            placeholder="Kişi Sayısını Gir!"
            min="2"
            onChange={(e) => setNumberSelection(e.target.value)}
            className="text-center border-b-2 border-teal-600"
          ></input>
        </div>

        <div className="flex flex-row flex-wrap mt-10 justify-center">
          <form>
            {Array.from({ length: numberSelection }).map((value, index) => (
              <input
                type="text"
                key={index}
                placeholder={index + 1 + ". Kişi"}
                onChange={(e) => setValuesToArray(e, index)}
                className="text-center border-2 border-black"
              ></input>
            ))}
          </form>
        </div>

        {numberSelection && (
          <div className="flex justify-center mt-10">
            <div className="flex flex-col items-center">
              <p className="mb-2 font-bold"> Kazanan Sayısı </p>
              {numberSelection && (
                <select
                  className="border-b-2 border-teal-600 w-20 text-center"
                  onChange={(e) => setWinnersNumber(e.target.value)}
                >
                  {Array.from({ length: numberSelection - 1 }).map(
                    (value, index) => (
                      <option value={index + 1} key={index}>
                        {index + 1}
                      </option>
                    )
                  )}
                </select>
              )}
            </div>
            <button
              className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-10 text-center ml-20"
              onClick={getResult}
            >
              Kurayı Çek
            </button>
          </div>
        )}

        {winner.length > 0 && (
          <div className="flex flex-col items-center mt-8 bg-green-200 py-5">
            <p className="mb-2 font-bold text-3xl"> Kazananlar </p>
            {winner.map((value, index) => (
              <p className="mt-2 text-xl" key={index}>
                {value}
              </p>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
