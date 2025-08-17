import Carousel from "@/components/Carousel";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

export default function Home() {
  const [league, setLeague] = useState([]);
  const [nextLeague, setNextLeague] = useState([]);

  async function getData() {
    let response = await fetch("/api/all_leagues.php");
    let data = await response.json();
    let final = data.leagues;
    setLeague(final);

    let res = await fetch("/api/eventsnextleague.php?id=4328");
    let nextLeagueData = await res.json();
    setNextLeague(nextLeagueData.events[0]);
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <div className="flex justify-between m-5 gap-5">
        {/* Bagian Kiri  */}
        <div className="hidden md:flex lg:basis-2/12 bg-gray-700  rounded-2xl">
          <div className="p-3 ">
            <p className="text-white">League</p>
            <ul className="pt-4 ps-1 gap-4 flex flex-col text-sm text-gray-300">
              {league.map((item) => {
                return (
                  <li
                    className="cursor-pointer flex gap-2 items-center"
                    key={item.idLeague}
                  >
                    <img
                      src={`/logos/${item.idLeague}.png`}
                      className="w-6 h-6"
                      alt=""
                    />
                    <span>{item.strLeague}</span>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
        {/* Bagian Tengah */}
        <div className="lg:basis-7/12 text-white flex flex-col gap-5 ">
          <div className="bg-gray-700 rounded-2xl flex-1">
            <img
              className="rounded-2xl object-fit h-full"
              src={nextLeague.strBanner}
              alt=""
            />
          </div>

          <div className="bg-gray-700 rounded-2xl flex flex-col flex-2 gap-4 p-4 text-sm">
            <p className="ps-2 font-medium text-xl">Upcoming Match !!!</p>
            <div className="flex gap-2 items-center">
              <img
                src={`/logos/${nextLeague.idLeague}.png`}
                className="w-8 h-8"
                alt=""
              />
              <div className="flex flex-col ">
                <span>{nextLeague.strLeague}</span>
                <span className="text-gray-300">{nextLeague.strCountry}</span>
              </div>
            </div>
            <div className="flex px-26 lg:px-32 py-1 border border-gray-500 rounded-sm ">
              <div className="flex flex-3 items-center gap-2">
                <img
                  className="w-10 h-10"
                  src={nextLeague.strHomeTeamBadge}
                  alt=""
                />
                {nextLeague.strHomeTeam}
              </div>
              <div className="flex-1 my-auto text-center">VS</div>
              <div className="flex flex-3 items-center gap-2 justify-end">
                {nextLeague.strAwayTeam}
                <img
                  className="w-10 h-10"
                  src={nextLeague.strAwayTeamBadge}
                  alt=""
                />
              </div>
            </div>
          </div>
        </div>
        {/* Bgaian kanan */}
        <div className="hidden md:flex lg:basis-3/12 bg-gray-700 text-white">
          c
        </div>
      </div>
    </>
  );
}
