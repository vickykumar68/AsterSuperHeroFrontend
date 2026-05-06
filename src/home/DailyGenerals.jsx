import React, { useState, useEffect } from "react";
import { Check, User } from "lucide-react";
import dailyStars from "../assets/dailyJournal/dailyStars.svg";
import missingIcon from "../assets/dailyJournal/Plus.svg";
import bigcard from "../assets/dailyJournal/fullcard.svg";
// Import hero icons
import captainCourage from "../assets/hero-icons/captain-courage.svg";
import flashFloss from "../assets/hero-icons/flashingfloss.png";
import germZapper from "../assets/hero-icons/germzapper.png";
import greenGobbler from "../assets/hero-icons/greengobbler.png";
import hydroHero from "../assets/hero-icons/hydrohero.png";
import mightyMan from "../assets/hero-icons/mightyman.png";
import missBrainy from "../assets/hero-icons/missbrainy.png";
import bigCardBlack from "../assets/dailyJournal/fullCardBlack.svg";
import fullProgressCard from "../assets/dailyJournal/fullProgressCard.svg";
import smallCard from "../assets/dailyJournal/halfCard.svg";
import smallCardBlack from "../assets/dailyJournal/halfCardBlack.svg";
import headingToday from "../assets/dailyJournal/headingToday.svg";
import bgOurJournal from "../assets/dailyJournal/bg_our_journal.svg";
import missingDay from "../assets/dailyJournal/Missing-Day.svg";
import axios from 'axios';
const DailyGenerals = () => {
   const [userId, setUserId] = useState(null);
   const [userName, setUserName] = useState('');
   const [userPersona, setUserPersona] = useState('');
  const [completedDays, setCompletedDays] = useState(new Set());
  const [currentWeek, setCurrentWeek] = useState(1);
  const [currentDay, setCurrentDay] = useState(1);
  const [totalCompleted, setTotalCompleted] = useState(0);
  const [weeks, setWeeks] = useState([
    { week: 1, completedDays: 0, totalDays: 7, isCompleted: false },
    { week: 2, completedDays: 0, totalDays: 7, isCompleted: false },
    { week: 3, completedDays: 0, totalDays: 7, isCompleted: false },
    { week: 4, completedDays: 0, totalDays: 7, isCompleted: false },
  ]);


  const checkAuth = async () => {
    try {
      const res = await axios.get("/api/v1/superhero/auth/check-auth", {
        withCredentials: true,
      });
      setUserId(res.data?.user?.id || null);
      setUserName(res.data?.user?.name || '');
      setUserPersona(res.data?.user?.persona || '');
      // return res.data.user.id;
      //console.log("res", res.data.user.id); // <-- usually data is inside res.data
    } catch (err) {
      console.error("Auth check failed:", err);
    }
  };
  useEffect(() => {
     checkAuth();
  }, []);


  // helper to remove time from date
  const stripTime = (date) =>
    new Date(date.getFullYear(), date.getMonth(), date.getDate());

  useEffect(() => {
    const fetchData = async () => {
      if (!userId) return;
      try {
        const res = await fetch(`/api/v1/superhero/auth/journal/${userId}`);
        const data = await res.json();

        const filledDates = Object.keys(data).map((d) => new Date(d));

        if (filledDates.length === 0) return;

        const startDate = stripTime(new Date(filledDates[0]));
        const today = stripTime(new Date());

        const daysPassed =
          Math.floor((today - startDate) / (1000 * 60 * 60 * 24)) + 1;

        // week/day calc
        const weekNum = Math.ceil(daysPassed / 7);
        const dayNum = ((daysPassed - 1) % 7) + 1;

        setCurrentWeek(weekNum);
        setCurrentDay(dayNum);

        // mark completed days with week/day format
        const completed = new Set();
        filledDates.forEach((date) => {
          const diff =
            Math.floor((stripTime(date) - startDate) / (1000 * 60 * 60 * 24)) +
            1;

          const week = Math.ceil(diff / 7);
          const day = ((diff - 1) % 7) + 1;

          completed.add(`${week}-${day}`);
        });
        setCompletedDays(completed);
        setTotalCompleted(completed.size);

        // update weeks progress
        setWeeks((prev) =>
          prev.map((w) => {
            const completedForWeek = [...completed].filter((d) =>
              d.startsWith(`${w.week}-`)
            ).length;
            return {
              ...w,
              completedDays: completedForWeek,
              isCompleted: completedForWeek === 7,
            };
          })
        );
      } catch (error) {
        console.error("Error fetching journal data:", error);
      }
    };

    fetchData();
  }, [userId]);

  // Build days for current week
  // const days = Array.from({ length: 7 }, (_, index) => {
  //   const dayNumber = index + 1;
  //   const key = `${currentWeek}-${dayNumber}`;
  //   return {
  //     day: dayNumber,
  //     isCompleted: completedDays.has(key),
  //     isCurrent: dayNumber === currentDay,
  //     isDisabled: dayNumber > currentDay,
  //   };
  // });

  const days = Array.from({ length: 7 }, (_, index) => {
  const dayNumber = index + 1;
  const key = `${currentWeek}-${dayNumber}`;
  
  const isCompleted = completedDays.has(key);
  const isCurrent = dayNumber === currentDay;
  const isDisabled = dayNumber > currentDay; // future days

  // A day is missed if it's not completed and it's in the past
  const isMissed = !isCompleted && !isDisabled && !isCurrent;

  return {
    day: dayNumber,
    isCompleted,
    isCurrent,
    isDisabled,
    isMissed,
  };
});


  const ordinalSuffix = (n) => {
    const suffixes = ['', 'st', 'nd', 'rd', 'th'];
    return suffixes[n] || 'th';
  };

  // Hero icons mapping
  const heroIcons = {
    'Captain Courage': captainCourage,
    'Flash Floss': flashFloss,
    'Germ Zapper': germZapper,
    'Green Gobbler': greenGobbler,
    'Hydro Hero': hydroHero,
    'Mighty Man': mightyMan,
    'Miss Brainy': missBrainy
  };

  return (
    <div
      className="bg-cover bg-no-repeat bg-center"
      style={{ backgroundImage: `url(${bgOurJournal})` }}
    >
      <div className="max-w-md mx-auto shadow-xl">
        {/* Header */}
        <img src={headingToday} alt="headingToday" className="w-full" />

        {/* Week Progress Section */}
        <div className="relative w-full max-w-sm mx-auto px-4 mt-8">
          <img src={fullProgressCard} alt="Progress Card" className="w-full" />
          <div className="absolute inset-0 px-10 py-5 flex flex-col mb-2">
            <div className="flex items-center justify-between relative mt-auto">
              <div className="absolute top-[80%] left-0 right-6 h-2 bg-gray-700 -translate-y-1/2 z-0 rounded-full"></div>
                <div
                  className="absolute top-[80%] left-0 h-2 bg-purple-500 -translate-y-1/2 z-0 rounded-full"
                  style={{ width: `${(totalCompleted / 28) * 100}%` }}
                ></div>

              <div className="flex flex-col items-center z-10">
                

            
                <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center border border-black overflow-hidden">
                  {userPersona && heroIcons[userPersona] ? (
                    <img 
                      src={heroIcons[userPersona]} 
                      alt={userPersona}
                      className="w-24 h-24 object-contain"
                    />
                  ) : (
                    <User className="w-8 h-8 text-white mt-1" />
                  )}
                </div>
                    <div className="w-16 h-8 rounded-full bg-blue-500 flex items-center justify-center mt-2 border border-black">
                <span className="text-white text-[13px] font-semibold  [-webkit-text-stroke:0.2px_black] tracking-tighter">
                    {userName
                      ? userName.length > 5
                        ? `${userName.substring(0, 5).toUpperCase()}...`
                        : userName.toUpperCase()
                      : ""}
                  </span>
                  </div>
              </div>
              {weeks.map((week) => (
                <div
                  key={week.week}
                  className="flex flex-col items-center z-10"
                >
                  <span className="text-white text-[14px] mb-1 font-bold ml-4 [-webkit-text-stroke:0.2px_black] tracking-tighter">
                    {week.week}
                    {ordinalSuffix(week.week)} WEEK
                  </span>
                  <div
                    className={`w-10 h-10 rounded-full border-4 flex items-center justify-center ${
                      week.isCompleted
                        ? "bg-green-500 border-green-600"
                        : week.week === currentWeek
                        ? "bg-purple-500 border-purple-600"
                        : "bg-gray-500 border-gray-600"
                    }`}
                  >
                     <span className="text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl font-bold text-white">
                      {week.isCompleted ? "✓" : week.week === currentWeek ? week.week : ""}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Days Grid */}
        <div className="p-10 grid grid-cols-3 gap-3">
          {days.slice(0, 6).map((day) => (
            <div
              key={day.day}
              className="relative aspect-square rounded-lg overflow-hidden flex flex-col items-center justify-center"
            >
              {/* <img
                src={day.isCompleted ? smallCard : smallCardBlack}
                alt=""
                className="absolute inset-0 w-[107px] h-100% object-cover"
              /> */}
              <img
  src={
    day.isCompleted
      ? smallCard
      : day.isMissed
      ? missingDay
      : smallCardBlack
  }
  alt=""
  className="absolute inset-0 w-[107px] h-100% object-cover"
/>

              {day.isCompleted && (
                <img
                  src={dailyStars}
                  alt="daily Progress stars"
                  className="w-8 h-8 mb-1 z-10"
                />
              )}

               {/* Show plus icon only for missed days */}
    {day.isMissed && (
      <img
        src={missingIcon}
        alt="missed day icon"
        className="w-8 h-8 mb-1 z-10"
      />
    )}
              <span className="text-white font-bold text-sm z-10">
                DAY {day.day}
              </span>
            </div>
          ))}
        </div>

        {/* Day 7 Card */}
        <div className="px-10 pb-4 -mt-10">
          <div className="relative w-full h-[120px] flex items-center justify-center overflow-hidden">
            <img
              src={days[6].isCompleted ? bigcard : bigCardBlack}
              alt="day 7 card"
              className="absolute inset-0 w-full h-full object-contain"
            />
            {days[6].isCompleted && (
              <img
                src={dailyStars}
                alt="daily Progress stars"
                className="w-8 h-8 mb-1 z-10"
              />
            )}

             {days[6].isMissed && (
      <img
        src={missingIcon}
        alt="missed day icon"
        className="w-8 h-8 mb-1 z-10"
      />
    )}

            <span className="text-white font-bold z-10">DAY 7</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DailyGenerals;