import Carousel from "@/components/Carousel";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { formatTanggal, formatJam } from "@/utils/formatTanggal";

export default function Home() {
  const [league, setLeague] = useState([]);
  const [nextLeague, setNextLeague] = useState([]);
  const [nextLeague2, setNextLeague2] = useState([]);
  const [standings, setStandings] = useState([]);
  const [standings2, setStandings2] = useState([]);
  const [loading, setLoading] = useState(true);

  async function getData() {
    try {
      setLoading(true)
      let response = await fetch("/api/all_leagues.php");
      let data = await response.json();
      let final = data.leagues;
      setLeague(final);

      let res = await fetch("/api/eventsnextleague.php?id=4328");
      let nextLeagueData = await res.json();
      setNextLeague(nextLeagueData.events[0]);

      let res2 = await fetch("/api/eventsnextleague.php?id=4335");
      let nextLeagueData2 = await res2.json();
      setNextLeague2(nextLeagueData2.events[0]);

      let res3 = await fetch("/api/lookuptable.php?l=4328&s=2025-2026");
      let standings = await res3.json();
      setStandings(standings.table);

      let res4 = await fetch("/api/lookuptable.php?l=4335&s=2025-2026");
      let standings2 = await res4.json();
      setStandings2(standings2.table);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
    {loading && (
      <div className="bg-black h-full w-full fixed z-10 flex items-center justify-center opacity-75">
        <i className="ph ph-circle-notch animate-spin text-9xl text-white fixed z-20"></i>
      </div>
    )}
      <div className="flex justify-between p-2 sm:m-5 gap-5">
        {/* Bagian Kiri  */}
        <div className="hidden md:flex lg:basis-2/12 bg-gray-700  rounded-2xl">
          <div className="p-3 flex flex-col gap-4">
            <p className="text-white">League</p>
            <ul className=" ps-1 gap-4 flex flex-col text-sm text-gray-300">
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
            <p className="text-white">Teams</p>
            <p className="text-white">Player</p>
          </div>
        </div>
        {/* Bagian Tengah */}
        <div className="lg:basis-7/12 text-white flex flex-col gap-2 sm:gap-5 rounded-2xl">
          <div className="bg-gray-700 rounded-2xl flex-1">
            <img
              className="rounded-2xl object-fit h-full"
              src={nextLeague.strBanner}
              alt=""
            />
          </div>

          <div className="bg-gray-700 rounded-2xl flex flex-col flex-2 gap-4 p-4 text-sm">
            <p className="ps-2 font-medium text-xl">Upcoming Match !!!</p>
            {/* Logo Liga Inggris */}
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
            {/* kotak Pertama */}
            <div className="flex p-2 sm:px-22 py-1 border border-gray-500 rounded-sm items-center gap-1 lg:gap-10">
              <div className="flex flex-3 ">
                <div className="flex flex-3 items-center md:gap-2 justify-center md:justify-start">
                  <img
                    className="w-10 h-10"
                    src={nextLeague.strHomeTeamBadge}
                    alt=""
                  />
                  {nextLeague.strHomeTeam}
                </div>
                {nextLeague.strTime && (
                  <div className="flex-1 my-auto text-center bg-gray-500 rounded-md">
                    {formatJam(nextLeague.dateEvent, nextLeague.strTime)}
                  </div>
                )}
                <div className="flex flex-3 items-center gap-2 justify-center md:text-right md:justify-end ">
                  {nextLeague.strAwayTeam}
                  <img
                    className="w-10 h-10"
                    src={nextLeague.strAwayTeamBadge}
                    alt=""
                  />
                </div>
              </div>
              {nextLeague.dateEvent && (
                <div className="hidden md:flex flex-1 text-center bg-gray-500 rounded-md px-1">
                  <p className="flex mx-auto">
                    {formatTanggal(nextLeague.dateEvent, nextLeague.strTime)}
                  </p>
                </div>
              )}
            </div>
            {/* Logo Liga Spanyol*/}
            <div className="flex gap-2 items-center">
              <img
                src={`/logos/${nextLeague2.idLeague}.png`}
                className="w-8 h-8"
                alt=""
              />
              <div className="flex flex-col ">
                <span>{nextLeague2.strLeague}</span>
                <span className="text-gray-300">{nextLeague2.strCountry}</span>
              </div>
            </div>
            {/* Kotak Kdua */}
            <div className="flex p-2 sm:px-22 py-1 border border-gray-500 rounded-sm items-center gap-1 lg:gap-10">
              <div className="flex flex-3 text-sm">
                <div className="flex flex-3 items-center md:gap-2 justify-center md:justify-start">
                  <img
                    className="w-10 h-10"
                    src={nextLeague2.strHomeTeamBadge}
                    alt=""
                  />
                  {nextLeague2.strHomeTeam}
                </div>
                {nextLeague2.strTime && (
                  <div className="flex-1 my-auto text-center bg-gray-500 rounded-md">
                    {formatJam(nextLeague2.dateEvent, nextLeague2.strTime)}
                  </div>
                )}
                <div className="flex flex-3 items-center gap-2 justify-center md:text-right md:justify-end">
                  {nextLeague2.strAwayTeam}
                  <img
                    className="w-10 h-10"
                    src={nextLeague2.strAwayTeamBadge}
                    alt=""
                  />
                </div>
              </div>
              {nextLeague2.dateEvent && (
                <div className="hidden md:flex flex-1 text-center bg-gray-500 rounded-md px-1">
                  <p className="flex mx-auto ">
                    {formatTanggal(nextLeague2.dateEvent, nextLeague2.strTime)}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
        {/* Bgaian kanan */}
        <div className="hidden md:flex flex-col lg:basis-3/12 bg-gray-700 text-white rounded-2xl">
          {/* stadings 1 */}
          <div className="p-5 flex flex-col gap-2 text-sm">
            <img
              src={`/logos/${standings[0]?.idLeague}.png`}
              alt=""
              className="w-8 h-8"
            />
            <div className="text-base font-medium">
              {standings[0]?.strLeague} Standings
            </div>
            <div className="flex gap-2 justify-between border-b-1">
              <div className="min-w-2">Pos</div>
              <div className="flex-1">Team</div>
              <div className="text-center min-w-8">P</div>
              <div className="text-center min-w-8">PTS</div>
            </div>

            {standings &&
              standings.map((item, index) => {
                return (
                  <div
                    key={item.idTeam}
                    className="flex gap-2 justify-between border-b-1"
                  >
                    <div className="flex flex-col min-w-[22px] items-center ">
                      {index + 1}
                    </div>
                    <div className="flex-1">{item.strTeam}</div>
                    <div className="text-center min-w-8">{item.intPlayed}</div>
                    <div className="text-center min-w-8">{item.intPoints}</div>
                  </div>
                );
              })}
          </div>
          {/* stadings 2 */}
          <div className="p-5 flex flex-col gap-2 text-sm">
            <img
              src={`/logos/${standings2[0]?.idLeague}.png`}
              alt=""
              className="w-8 h-8"
            />
            <div className="text-base font-medium">
              {standings2[0]?.strLeague} Standings
            </div>
            <div className="flex gap-2 justify-between border-b-1">
              <div className="min-w-2">Pos</div>
              <div className="flex-1">Team</div>
              <div className="text-center min-w-8">P</div>
              <div className="text-center min-w-8">PTS</div>
            </div>

            {standings2 &&
              standings2.map((item, index) => {
                return (
                  <div
                    key={item.idTeam}
                    className="flex gap-2 justify-between border-b-1"
                  >
                    <div className="flex flex-col min-w-[22px] items-center ">
                      {index + 1}
                    </div>
                    <div className="flex-1">{item.strTeam}</div>
                    <div className="text-center min-w-8">{item.intPlayed}</div>
                    <div className="text-center min-w-8">{item.intPoints}</div>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </>
  );
}
