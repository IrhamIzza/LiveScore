import { useEffect } from "react";
import { useState } from "react";
import { Link, useParams } from "react-router-dom";

import { formatTanggal, formatJam } from "@/utils/formatTanggal";

export default function League() {
  const { id } = useParams();
  const [league, setLeague] = useState([]);
  const [nextLeague, setNextLeague] = useState([]);
  const [pastLeague, setPastLeague] = useState([]);
  const [standings, setStandings] = useState([]);
  const [loading, setLoading] = useState(false);

  async function getData() {
    try {
      setLoading(true);
      const [res1, res2, res3, res4] = await Promise.all([
        fetch("https://www.thesportsdb.com/api/v1/json/123/all_leagues.php"),
        fetch(
          `https://www.thesportsdb.com/api/v1/json/123/eventsnextleague.php?id=${id}`
        ),
        fetch(
          `https://www.thesportsdb.com/api/v1/json/123/lookuptable.php?l=${id}&s=2025-2026`
        ),
        fetch(
          `https://www.thesportsdb.com/api/v1/json/123/eventspastleague.php?id=${id}`
        ),
      ]);
      const data1 = await res1.json();
      const data2 = await res2.json();
      const data3 = await res3.json();
      const data4 = await res4.json();
      setLeague(data1.leagues);
      setNextLeague(data2.events[0]);
      setStandings(data3.table);
      setPastLeague(data4.events[0]);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getData();
    window.scrollTo(0, 0);
  }, [id]);

  return (
    <>
      {loading && (
        <div className="bg-black h-full w-full fixed z-10 flex items-center justify-center opacity-85">
          <i className="ph ph-circle-notch animate-spin text-9xl text-white fixed z-20"></i>
        </div>
      )}
      <div className="flex p-2 sm:m-5 gap-5 text-white">
        {/* Kiri */}
        <div className="hidden md:flex max-w-56  bg-gray-700  rounded-2xl">
          <div className="p-3 flex flex-col gap-4">
            <p className="text-white">League</p>
            <ul className=" ps-1 gap-4 flex flex-col text-sm text-gray-300">
              {league.map((item) => (
                <li
                  className="cursor-pointer flex gap-2 items-center"
                  key={item.idLeague}
                >
                  <Link
                    to={`/league/${item.idLeague}`}
                    className="flex gap-2 items-center"
                  >
                    <img
                      src={`/logos/${item.idLeague}.png`}
                      className="w-6 h-6"
                      alt=""
                    />
                    <span>{item.strLeague}</span>
                  </Link>
                </li>
              ))}
            </ul>
            <p className="text-white">Teams</p>
            <p className="text-white">Player</p>
          </div>
        </div>
        {/* tengagh */}
        <div className="w-full flex flex-col gap-4">
          <p className="text-4xl font-medium text-center ">
            {nextLeague.strLeague}
          </p>
          <div className="flex flex-col sm:flex-row gap-2">
            {/*| thumnail gambar */}
            <div className="rounded-2xl md:order-last max-w-[420px]">
              <img
                className="rounded-2xl object-contain "
                src={nextLeague.strThumb}
                alt=""
              />
            </div>
            {/*| Kotak Jadwal */}
            <div className="p-2 bg-gray-700 rounded-2xl flex flex-col gap-4 flex-1 md:order-first">
              <p className="pt-2 font-medium text-xl">Upcoming Match !!!</p>
              {/*|| Logo Liga */}
              <div className="flex gap-2 items-center ">
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
              {/*|| kotak Pertama */}
              <div className="flex p-2 text-sm md:text-base sm:px-8 py-1 border border-gray-500 rounded-sm items-center gap-1 lg:gap-10">
                <div className="flex flex-3 ">
                  <div className="flex flex-3 items-center md:gap-2 justify-center md:justify-start">
                    <img
                      className="w-8 md:w-10"
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
                      className="w-8 md:w-10"
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
            </div>
          </div>
          <div className="flex gap-2 flex-wrap ">
            {/*| Kotak past */}
            <div className="p-2 bg-gray-700 rounded-2xl flex flex-col gap-4 flex-1">
              <p className="pt-2 font-medium text-xl">Previous Match</p>
              {/*|| Logo Liga Inggris */}
              <div className="flex gap-2 items-center ">
                <img
                  src={`/logos/${pastLeague.idLeague}.png`}
                  className="w-8 h-8"
                  alt=""
                />
                <div className="flex flex-col ">
                  <span>{pastLeague.strLeague}</span>
                  <span className="text-gray-300">{pastLeague.strCountry}</span>
                </div>
              </div>
              {/*|| kotak Pertama */}
              <div className="flex p-2 sm:px-14 py-1 text-sm md:text-base border border-gray-500 rounded-sm items-center gap-1 lg:gap-10">
                <div className="flex flex-3 ">
                  <div className="flex flex-3 items-center md:gap-2 justify-center md:justify-start">
                    <img
                      className="w-8 md:w-10"
                      src={pastLeague.strHomeTeamBadge}
                      alt=""
                    />
                    {pastLeague.strHomeTeam}
                  </div>
                  <div className="flex gap-2">
                    <div className="my-auto text-center px-4 bg-gray-500 rounded-md">
                      {pastLeague.intHomeScore}
                    </div>
                    <div className=" my-auto text-center px-4 bg-gray-500 rounded-md">
                      {pastLeague.intHomeScore}
                    </div>
                  </div>
                  <div className="flex flex-3 items-center gap-2 justify-center md:text-right md:justify-end ">
                    {pastLeague.strAwayTeam}
                    <img
                      className="w-8 md:w-10"
                      src={pastLeague.strAwayTeamBadge}
                      alt=""
                    />
                  </div>
                </div>
              </div>
            </div>
            {/*| stadings 1 */}
            <div className="p-5 flex flex-col flex-1 gap-2 text-sm bg-gray-700 md:max-w-[420px] rounded-2xl">
              <img
                src={`/logos/${standings[0]?.idLeague}.png`}
                alt=""
                className="w-8 h-8"
              />
              <div className="text-base font-medium">
                {standings[0]?.strLeague} Standings
              </div>
              <div className="flex md:gap-2 justify-between border-b-1">
                <div className="min-w-2">No.</div>
                <div className="flex-1">Team</div>
                <div className="text-center min-w-8">P</div>
                <div className="text-center min-w-8">W</div>
                <div className="text-center min-w-8">D</div>
                <div className="text-center min-w-8">L</div>
                <div className="text-center min-w-8">PTS</div>
              </div>

              {standings &&
                standings.map((item, index) => {
                  return (
                    <div
                      key={item.idTeam}
                      className="flex md:gap-2 justify-between border-b-1"
                    >
                      <div className="flex flex-col min-w-[22px] items-center ">
                        {index + 1}
                      </div>
                      <div className="flex-1">{item.strTeam}</div>
                      <div className="text-center min-w-8">
                        {item.intPlayed}
                      </div>
                      <div className="text-center min-w-8">{item.intWin}</div>
                      <div className="text-center min-w-8">{item.intDraw}</div>
                      <div className="text-center min-w-8">{item.intLoss}</div>
                      <div className="text-center min-w-8">
                        {item.intPoints}
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
          {/* Bagian list League  */}
          <div className="md:hidden order-last md:order-first lg:basis-2/12 bg-gray-700  rounded-2xl">
            <div className="p-3 flex flex-col gap-4">
              <p className="text-white">League</p>
              <ul className=" ps-1 gap-4 flex flex-col text-sm text-gray-300">
                {league.map((item) => (
                  <li
                    className="cursor-pointer flex gap-2 items-center"
                    key={item.idLeague}
                  >
                    <Link
                      to={`/league/${item.idLeague}`}
                      className="flex gap-2 items-center"
                    >
                      <img
                        src={`/logos/${item.idLeague}.png`}
                        className="w-6 h-6"
                        alt=""
                      />
                      <span>{item.strLeague}</span>
                    </Link>
                  </li>
                ))}
              </ul>
              <p className="text-white">Teams</p>
              <p className="text-white">Player</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
