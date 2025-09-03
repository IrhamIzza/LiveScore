import { useEffect } from "react";
import { useState } from "react";
import { Link, useParams } from "react-router-dom";

import { formatTanggal, formatJam } from "@/utils/formatTanggal";

export default function League() {
  const { id } = useParams();
  const [league, setLeague] = useState([]);
  const [nextLeague, setNextLeague] = useState([]);
  const [loading, setLoading] = useState(false);

  async function getData() {
    try {
      setLoading(true);
      const [res1, res2] = await Promise.all([
        fetch("/api/all_leagues.php"),
        fetch(`/api/eventsnextleague.php?id=${id}`),
      ]);
      const data1 = await res1.json();
      const data2 = await res2.json();
      setLeague(data1.leagues);
      setNextLeague(data2.events[0]);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getData();
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
        <div className="w-full">
          <p className="text-4xl font-medium text-center pb-4">
            {nextLeague.strLeague}
          </p>
          <div className="flex flex-col sm:flex-row gap-2">
            {/* thumnail gambar */}
            <div className="rounded-2xl">
              <img
                className="rounded-2xl object-contain max-h-60"
                src={nextLeague.strThumb}
                alt=""
              />
            </div>
            {/* Kotak Jadwal */}
            <div className="p-2 bg-gray-700 rounded-2xl flex flex-col gap-3 flex-1">
              <p className="pt-2 font-medium text-xl">Upcoming Match !!!</p>
              {/* Logo Liga Inggris */}
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
              {/* kotak Pertama */}
              <div className="flex p-2 sm:px-8 py-1 border border-gray-500 rounded-sm items-center gap-1 lg:gap-10">
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
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
