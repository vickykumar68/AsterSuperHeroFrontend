import React, { useState, useEffect } from "react";
import progressbar from "../assets/desktopViewImages/multiStepFormDesk/progressbar.png";
import dailystars from "../assets/dailyJournal/dailyStars.svg";
import cardblack from "../assets/dailyJournal/halfCard.svg";
import cardyellow from "../assets/dailyJournal/halfCardBlack.svg";
import missingIcon from "../assets/dailyJournal/Plus.svg";
import missingDay from "../assets/dailyJournal/Missing-Day.svg";
import { User } from "lucide-react";
// Hero icons
import captainCourage from "../assets/hero-icons/captain-courage.svg";
import flashFloss from "../assets/hero-icons/flashingfloss.png";
import germZapper from "../assets/hero-icons/germzapper.png";
import greenGobbler from "../assets/hero-icons/greengobbler.png";
import hydroHero from "../assets/hero-icons/hydrohero.png";
import mightyMan from "../assets/hero-icons/mightyman.png";
import missBrainy from "../assets/hero-icons/missbrainy.png";
import axios from "axios";

const DailyProgress = () => {
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

          if (daysPassed) {
            sessionStorage.setItem("daysPassed", daysPassed);
          }

          console.log("daysPassed",daysPassed);

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
  const isDisabled = dayNumber > currentDay;

  // missed if past day, not completed, not current
  const isMissed = !isCompleted && !isDisabled && !isCurrent;

  return { day: dayNumber, isCompleted, isCurrent, isDisabled, isMissed };
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
    <div className="flex flex-col items-center space-y-6 lg:space-y-8 w-full px-4 py-6">
      {/* Weekly Progress Card */}
      <div className="w-full max-w-7xl">
        <div className="relative w-full aspect-[1280/340] flex items-center justify-center">
          <img
            src={progressbar}
            alt="Progress Bar"
            className="w-full h-full object-contain"
          />

          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-full h-full relative px-8 md:px-12 lg:px-16 py-6 md:py-8">
              {/* Progress Line Container */}
              <div className="absolute bottom-[35%] md:bottom-[35%]  left-16 md:left-20 lg:left-24 right-16 md:right-20 lg:right-24 h-2 md:h-6 bg-gray-400 rounded-full">
                <div
                  className="h-full bg-[#B541FF] rounded-full transition-all duration-500 ease-out"
                  style={{ width: `${Math.min((totalCompleted / 28) * 100, 100)}%` }}
                ></div>
              </div>

              {/* Progress Points Container */}
              <div className="absolute bottom-[25%] md:bottom-[28%]  left-0 right-0 flex items-end justify-between px-4 md:px-8 lg:px-12">
                {/* User Avatar */}
                <div className="flex flex-col items-center pl-3">
                  <div className="w-8 h-8 md:w-12 lg:w-16 md:h-12 lg:h-16 rounded-full bg-blue-500 flex items-center justify-center border-2 md:border-4 border-white shadow-lg mb-4 lg:mb-5 overflow-hidden">
                    {userPersona && heroIcons[userPersona] ? (
                      <img
                        src={heroIcons[userPersona]}
                        alt={userPersona}
                        className="w-6 h-6 md:w-10 md:h-10 lg:w-32 lg:h-32 object-contain"
                      />
                    ) : (
                      <User className="w-4 h-4 md:w-6 lg:w-9 md:h-6 lg:h-9 text-white" />
                    )}
                  </div>
                  <div className="bg-blue-500 px-2 md:px-3 py-2 rounded-full border border-white shadow-md mb-5">
                    <span className="text-white text-xs md:text-sm font-bold tracking-wide">
                      {userName
                        ? userName.length > 5
                          ? `${userName.substring(0, 5).toUpperCase()}...`
                          : userName.toUpperCase()
                        : "USER"}
                    </span>
                  </div>
                </div>

                {/* Week Milestones */}
                {weeks.map((week) => (
                  <div key={week.week} className="flex flex-col items-center font-goldman">
                    <div className="text-center mb-1 md:mb-6">
                      <div className="text-xs md:text-sm lg:text-[24px] [-webkit-text-stroke:0.3px_black] font-black text-white tracking-wide drop-shadow-md">
                        {week.week}
                        <sup className="text-[20px] font-black tracking-tighter [-webkit-text-stroke:0.3px_black]">{ordinalSuffix(week.week).toUpperCase()}</sup>
                      </div>
                      <div className="text-xs md:text-[24px] font-black text-white drop-shadow-md tracking-tighter [-webkit-text-stroke:0.3px_black]">WEEK</div>
                    </div>
                    <div
                      className={`w-8 h-8 md:w-12 lg:w-20 md:h-12 lg:h-20 rounded-full border-2 md:border-4 border-white flex items-center justify-center shadow-lg transition-all duration-300 ${
                        week.isCompleted
                          ? "bg-green-500"
                          : week.week === currentWeek
                          ? "bg-purple-500"
                          : "bg-gray-500"
                      }`}
                    >
                      {week.isCompleted ? (
                        <span className="text-white font-bold text-sm md:text-lg lg:text-xl">✓</span>
                      ) : week.week === currentWeek ? (
                        <span className="text-white font-bold text-sm md:text-lg lg:text-xl">{week.week}</span>
                      ) : null}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Daily Progress Cards */}
      <div className="w-full max-w-7xl px-2">
        <div className="grid grid-cols-4 md:grid-cols-7 gap-2 md:gap-4 lg:gap-6">
          {days.map(({ day, isCompleted, isDisabled, isMissed }) => (
            <div
              key={day}
              className="relative w-full aspect-[4/5] flex flex-col items-center justify-center transition-all duration-300 hover:scale-105"
            >
              {/* Card Background Image */}
              <img
                  src={
                    isCompleted
                      ? cardblack
                      : isMissed
                      ? missingDay
                      : cardyellow
                  }
                  alt={isCompleted ? "Completed Card" : isMissed ? "Missed Day" : "Available Card"}
                  className="absolute inset-0 w-full h-full object-contain"
                />

              {/* Stars for completed days */}
              {isCompleted && (
                <img
                  src={dailystars}
                  alt="Completed Stars"
                  className="absolute top-[15%] md:top-[30%] w-6 h-6 md:w-8 md:h-8 lg:w-12 lg:h-12 object-contain z-10"
                />
              )}

              {isMissed && (
                <img
                  src={missingIcon}
                  alt="Missed Day Icon"
                  className="absolute top-[15%] md:top-[30%] w-6 h-6 md:w-8 md:h-8 lg:w-12 lg:h-12 object-contain z-10"
                />
              )}

              {/* Day Label */}
              <div className="absolute bottom-[15%] md:bottom-[30%] z-10 text-center">
                <span className="text-white text-xs md:text-sm lg:text-[24px] font-black drop-shadow-md tracking-tighter [-webkit-text-stroke:0.5px_black]">
                  DAY {day}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DailyProgress;