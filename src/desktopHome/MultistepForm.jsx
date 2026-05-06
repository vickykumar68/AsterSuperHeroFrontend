import React, { useState, useContext } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { RotateCcw, Heart, Lock } from "lucide-react";
import heading from "../assets/desktopViewImages/multiStepFormDesk/heading.svg";
import firstFormBg from "../assets/desktopViewImages/multiStepFormDesk/firstFormBg.svg";
import secondFormBg from "../assets/desktopViewImages/multiStepFormDesk/secondFormBg.svg";
import thirdFormBg from "../assets/desktopViewImages/multiStepFormDesk/thirdFormBg.svg";
import forthFormBg from "../assets/desktopViewImages/multiStepFormDesk/forthFormBg.svg";
import step5 from "../assets/desktopViewImages/multiStepFormDesk/step5.png";
import step6 from "../assets/desktopViewImages/multiStepFormDesk/step6.png";
import step7 from "../assets/desktopViewImages/multiStepFormDesk/step7.png";
import leftButton from "../assets/dailyJournal/leftbutton.svg";
import rightButton from "../assets/dailyJournal/rightbutton.svg";
import AuthContext from "../context/AuthContext";
import axios from "axios";
import DailyProgress from "./DailyProgress";
import flossIcon from "../assets/meet_your_hero/flossIcon.svg";
import  brainyIcon from "../assets/meet_your_hero/brainyIcon.svg";
import germIcon from "../assets/meet_your_hero/germIcon.svg";
import gobblerIcon from "../assets/meet_your_hero/gobblerIcon.svg";
import hydralcon from "../assets/meet_your_hero/hydraIcon.svg";
import mightyManIcon from "../assets/meet_your_hero/mightyManIcon.svg";
import doneIcon from "../assets/desktopViewImages/multiStepFormDesk/Done.svg";
import thankYouBg from '../assets/desktopViewImages/multiStepFormDesk/Thankyoucard.svg';
import goodjob from '../assets/desktopViewImages/multiStepFormDesk/goodjob.svg';
import thankbg from '../assets/desktopViewImages/multiStepFormDesk/thankbg.png';
import accessBg from "../assets/accessrestrictedBg.png";

function MultistepForm() {
  const { isAuthenticated, loading } = useContext(AuthContext);
  const [currentStep, setCurrentStep] = useState(0);
  const [showThankYou, setShowThankYou] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [totalSelected, setTotalSelected] = useState(1);

  const [steps, setSteps] = useState([ 
    {
      id: 1,
      select:"",
      title: "HYDRATION TRACKING",
      icon: hydralcon,
      subtitle: "How many glasses of water did you drink today?",
      background: firstFormBg,
      color: "text-white",
      bgGradient: "from-blue-400 to-blue-600",
      taskBg: "#77A0FD",
      tasks: [
        { id: "h1", text: "1-2 Glasses", completed: false,points:5 },
        { id: "h2", text: "3-5 Glasses", completed: false ,points:10 },
        { id: "h3", text: "6-8 Glasses", completed: false ,points:15 },
        { id: "h4", text: "8+ Glasses", completed: false ,points:20 },
      ],
    },
    {
      id: 2,
      select:"Select one or more",
      title: "DENTAL HYGIENE",
      icon: flossIcon,
      subtitle: "Which of these did you do today? ",
      background: secondFormBg,
      color: "text-gray-800",
      bgGradient: "from-yellow-300 to-orange-400",
      taskBg: "#FFC33B",
      tasks: [
        { id: "d1", text: "Brushed in the morning ", completed: false,points:5 },
        { id: "d2", text: "Brushed at night ", completed: false ,points:5 },
        { id: "d3", text: "Flossed ", completed: false ,points:5 },
        { id: "d4", text: "Cleaned Tongue", completed: false ,points:5 },
      ],
    },
    {
      id: 3,
      select:"Select one or more",
      title: "PHYSICAL ACTIVITY",
      icon: mightyManIcon,
      subtitle: "What kind of activity did you do today? ",
      background: thirdFormBg,
      color: "text-white",
      bgGradient: "from-pink-400 to-pink-600",
      taskBg: "#D872C7",
      tasks: [
        {
          id: "p1",
          text: "Outdoor Play (football, cricket, etc.) ",
          completed: false,points:5 
        },
        { id: "p2", text: "Running ", completed: false ,points:5 },
        { id: "p3", text: "Dancing ", completed: false ,points:5 },
        { id: "p4", text: "Cycling ", completed: false ,points:5 },
      ],
    },
    {
      id: 4,
      select:"Select one or more",
      title: "HEALTHY EATING",
      icon: gobblerIcon,
      subtitle: "How did you follow healthy eating today? ",
      background: forthFormBg,
      color: "text-white",
      bgGradient: "from-orange-400 to-red-500",
      taskBg: "#EF8274",
      tasks: [
        { id: "e1", text: "Fruits ", completed: false ,points:5 },
        { id: "e2", text: "Vegetables ", completed: false ,points:5 },
        { id: "e3", text: "Home-cooked meal ", completed: false ,points:5 },
        { id: "e4", text: "No junk food  ", completed: false ,points:5 },
      ],
    },
    {
      id: 5,
      select:"",
      title: "Screentime Tracker ",
      icon: germIcon,
      subtitle: "What was your screentime today? ",
      background: step5,
      color: "text-white",
      bgGradient: "from-purple-400 to-purple-600",
      taskBg: "#C590FF",
      tasks: [
        { id: "k1", text: "1 hour or less ", completed: false ,points:20 },
        { id: "k2", text: "2-3 hours ", completed: false ,points:15 },
        { id: "k3", text: "More than 3-4 hours", completed: false ,points:10},
        { id: "k4", text: "5+ hours ", completed: false ,points:5 },
      ],
    },
    {
      id: 6,
      select:"Select one or more",
      title: "Germ Protection",
      icon: brainyIcon,
      subtitle: "How did you protect yourself from germs today?",
      background: step6,
      color: "text-white",
      bgGradient: "bg-orange-400 to-red-500",
      taskBg: "#C590FF",
      tasks: [
        { id: "k1", text: "Handwash for 20 secs ", completed: false ,points:5 },
        { id: "k2", text: "Used hand sanitiser  ", completed: false ,points:5 },
        { id: "k3", text: "Covered mouth while coughing  ", completed: false ,points:5 },
        { id: "k4", text: "Washed hands before meals ", completed: false ,points:5 },
      ],
    },
    {
      id: 7,
      select:"Select one or more",
      title: "ACTS OF KINDNESS",
      icon: germIcon,
      subtitle: "What was your act of kindness for today? ",
      background: step7,
      color: "text-white",
      bgGradient: "bg-green-400 to-blue-500",
      taskBg: "#C590FF",
      tasks: [
        { id: "k1", text: "Helped my parents", completed: false ,points:5 },
        { id: "k2", text: "Recycled waste", completed: false ,points:5 },
        { id: "k3", text: "Watered a plant", completed: false ,points:5 },
        { id: "k4", text: "Took care of a pet ", completed: false ,points:5 },
      ],
    },
  ]);

  const toggleTask = (stepIndex, taskId) => {
    setSteps((prev) =>
      prev.map((step, index) => {
        if (index === stepIndex) {
          // Single-select steps (0 = hydration, 4 = screentime)
          if (stepIndex === 0 || stepIndex === 4) {
            return {
              ...step,
              tasks: step.tasks.map((task) => ({
                ...task,
                completed: task.id === taskId, // only one true
              })),
            };
          }
          // Multi-select steps
          else {
            return {
              ...step,
              tasks: step.tasks.map((task) =>
                task.id === taskId
                  ? { ...task, completed: !task.completed }
                  : task
              ),
            };
          }
        }
        return step;
      })
    );
   // Update totalSelected after toggling
  setTimeout(() => {
    const total = steps.reduce(
      (sum, step) =>
        sum + step.tasks.filter((task) => task.completed).length,
      1
    );
    setTotalSelected(total);
  }, 0);

  setErrorMessage(""); // hide error when selecting something
  };

  const nextStep = async () => {
    const currentTasks = steps[currentStep].tasks;
    const hasCompletedTask = currentTasks.some((task) => task.completed);

    if (!hasCompletedTask) {
      setErrorMessage("⚠️ Please select at least one task.");
      return;
    }

    if (currentStep < steps.length - 1) {
      setCurrentStep((prev) => prev + 1);
    } else {
      await submitForm(); // ✅ wait for backend
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
      setErrorMessage("");
    }
  };

  const restartTask = () => {
    setShowThankYou(false);
    setCurrentStep(0);
    setSteps((prev) =>
      prev.map((step) => ({
        ...step,
        tasks: step.tasks.map((task) => ({ ...task, completed: false })),
      }))
    );
    setErrorMessage("");
  };

  const getCompletedTasksCount = () => {
    return steps.reduce(
      (total, step) =>
        total + step.tasks.filter((task) => task.completed).length,
      0
    );
  };



  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        Loading...
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
       <div
        className="flex items-center justify-center py-8 sm:py-12 md:py-16 lg:py-20 px-4 bg-cover bg-center"
        style={{
          backgroundImage: `url(${accessBg})`,
        }}
      >
        <div className="bg-white p-6 sm:p-8 md:p-10 rounded-2xl shadow-2xl text-center max-w-md w-full">
          <Lock className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 text-blue-500 mx-auto mb-4 sm:mb-6 animate-bounce" />
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800 mb-3 sm:mb-4 font-gtwalsheim">
            Access Restricted
          </h2>
          <p className="text-gray-600 text-sm sm:text-base md:text-lg mb-4 sm:mb-6 font-gtwalsheim">
            Please log in to access this daily journal form and track your
            healthy habits.
          </p>
          <button
            onClick={() => (window.location.hash = "loginForm")}
            className="bg-blue-500 text-white font-bold py-2 sm:py-3 px-4 sm:px-6 rounded-xl shadow-lg hover:bg-blue-600 transition-colors duration-200 font-goldman w-full text-sm sm:text-base"
            style={{
              background:
                "linear-gradient(180deg, #26B3F7 26.5%, #23AAF8 39.5%, #1C95F9 64%, #1983FA 97%)",
              fontWeight: 900,
              verticalAlign: "middle",
              fontVariantNumeric: "lining-nums proportional-nums",
            }}
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }


if (showThankYou) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="relative flex items-center justify-center py-10 sm:py-20 bg-cover bg-center p-4 bg-black"
      style={{
        backgroundImage: `url(${thankbg})`
      }}
    >
      {/* Card container */}
      <div className="relative shadow-2xl p-2 text-center overflow-hidden z-10 max-w-lg w-full h-[518px]">
        {/* Card background */}
        <img
          src={thankYouBg}
          alt="Thank You Background"
          className="absolute inset-0 w-full h-full object-cover z-0"
        />

        {/* Overlay content */}
        <div className="relative z-10 h-full flex flex-col items-center justify-start pt-8">
          {/* Coin image */}
          <div className="flex justify-center mb-2">
            <img src={goodjob} alt="Coin" className="w-80 h-auto" />
          </div>

          {/* Message */}
          <p className="text-white/90 mb-4 px-8 font-goldman text-[20px]  "
          style={{
            WebkitTextStroke: '0.4px black',
            textShadow: '0px 0px 6px rgba(0, 0, 0, 0.2)'
          }}
  >
            Your {totalSelected} healthy habits have been noted!
          </p>

          {/* Challenge Progress Box */}
          <div className="bg-[#D18AFF] rounded-full py-3 mx-8 mb-6 shadow-inner w-80 max-w-md">
  <div className="flex items-center justify-center px-6 space-x-4">
    {/* Text content */}
    <div className="text-center">
      <p className="text-white font-bold text-sm leading-tight [-webkit-text-stroke:0.2px_black] tracking-tight">
        YOU'VE SUCCESSFULLY COMPLETED
      </p>
      <p className="text-white font-bold text-sm leading-tight [-webkit-text-stroke:0.2px_black] tracking-tight">DAYS IN THE CHALLENGE.</p>
    </div>
    
    {/* Number circle */}
    <div className="bg-purple-700 rounded-full w-12 h-12 flex items-center justify-center flex-shrink-0">
      <div className="text-[26px] font-bold text-white [-webkit-text-stroke:0.7px_black] tracking-tight">
        {sessionStorage.getItem("daysPassed")}
      </div>
    </div>
  </div>
</div>
          {/* Encouragement text */}
          <p className="text-white font-goldman text-sm mt-6 px-4 text-center leading-relaxed underline">
            Keep up the amazing work and journal your good habits daily.
          </p>

          {/* Button */}
          <div className="mt-auto mb-8">
            <button
              onClick={restartTask}
              className="w-80 text-white text-lg font-bold py-3 px-6 rounded-md border border-black shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 [-webkit-text-stroke:0.6px_black] tracking-tight"
              style={{
                background:
                  'linear-gradient(180deg, #26B3F7 26.5%, #23AAF8 39.5%, #1C95F9 64%, #1983FA 97%)',
                fontWeight: 900,
              }}
            >
              COME BACK TOMORROW
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
  const currentStepData = steps[currentStep];
  const isLastStep = currentStep === steps.length - 1;

  const submitForm = async () => {
    if (!isAuthenticated) {
      setErrorMessage("⚠️ You need to log in before submitting.");
      return;
    }


    console.log("steps data on submit:", steps);
    // const responses = {
    //   hydration: steps[0].tasks.find((t) => t.completed)?.text || "",
    //   dental: steps[1].tasks.filter((t) => t.completed).map((t) => t.text),
    //   physical: steps[2].tasks.filter((t) => t.completed).map((t) => t.text),
    //   healthy: steps[3].tasks.filter((t) => t.completed).map((t) => t.text),
    //   screenTime: steps[4].tasks.find((t) => t.completed)?.text || "",
    //   germProtection: steps[5].tasks
    //     .filter((t) => t.completed)
    //     .map((t) => t.text),
    //   kindness: steps[6].tasks.filter((t) => t.completed).map((t) => t.text),
    // };



    const responses = {
  hydration: steps[0].tasks.find((t) => t.completed)?.text || "",
  hydrationPoints: steps[0].tasks.find((t) => t.completed)?.points || 0,

  dental: steps[1].tasks.filter((t) => t.completed).map((t) => t.text),
  dentalPoints: steps[1].tasks
    .filter((t) => t.completed)
    .reduce((a, c) => a + c.points, 0),

  physical: steps[2].tasks.filter((t) => t.completed).map((t) => t.text),
  physicalPoints: steps[2].tasks
    .filter((t) => t.completed)
    .reduce((a, c) => a + c.points, 0),

  healthy: steps[3].tasks.filter((t) => t.completed).map((t) => t.text),
  healthyPoints: steps[3].tasks
    .filter((t) => t.completed)
    .reduce((a, c) => a + c.points, 0),

  screenTime: steps[4].tasks.find((t) => t.completed)?.text || "",
  screenTimePoints: steps[4].tasks.find((t) => t.completed)?.points || 0,

  germProtection: steps[5].tasks.filter((t) => t.completed).map((t) => t.text),
  germProtectionPoints: steps[5].tasks
    .filter((t) => t.completed)
    .reduce((a, c) => a + c.points, 0),

  kindness: steps[6].tasks.filter((t) => t.completed).map((t) => t.text),
  kindnessPoints: steps[6].tasks
    .filter((t) => t.completed)
    .reduce((a, c) => a + c.points, 0),
};


    let submittedAnswers = 0;
    for (const key in responses) {
      const value = responses[key];
      if (Array.isArray(value)) {
        if (value.length > 0) submittedAnswers++;
      } else if (typeof value === "string") {
        if (value.trim() !== "") submittedAnswers++;
      }
    }
    console.log("submittedAnswers with data:", submittedAnswers);

    responses.submittedAnswers = submittedAnswers;

    try {
      const response = await axios.post("/api/v1/superhero/track/submit", responses, {
        withCredentials: true,
      });
      console.log(response);
      setShowThankYou(true);
    } catch (err) {
      console.error("Error submitting form", err);
      setErrorMessage("⚠️ Something went wrong. Please try again.");
    }
  };

  return (
    <div
      className="flex flex-col items-center bg-[#CCEAFF] h-auto pb-8 sm:pb-10 md:pb-12 lg:pb-14 px-4 sm:px-5"
      id="multistepFrom"
    >
      {/* Heading Image */}
      <img
        src={heading}
        alt="Heading"
        className="mb-4 sm:mb-6 md:mb-8 w-full max-w-[300px] sm:max-w-[400px] md:max-w-[500px] lg:max-w-[600px] xl:max-w-[700px]"
      />

      <DailyProgress />

      <AnimatePresence mode="wait">
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, x: 100, scale: 0.95 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          exit={{ opacity: 0, x: -100, scale: 0.95 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="relative w-full max-w-[1266px] p-2 lg:p-8 overflow-hidden"
          style={{
            backgroundImage: `url(${currentStepData.background})`,
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            height: "400px sm:h-[450px] md:h-[500px] lg:h-[550px] xl:h-[623px]",
            aspectRatio: "1266/623",
          }}
        >
          {/* Header */}
          <div className="text-center mb-2 sm:mb-3 md:mb-4">
            <span className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-black text-white uppercase tracking-tighter [-webkit-text-stroke:0.5px_black] sm:[-webkit-text-stroke:0.7px_black] md:[-webkit-text-stroke:0.9px_black]">
              {currentStep + 1}. {currentStepData.title}
            </span>
          </div>

          {/* Tasks */}
          <div>
            <h2 className="text-base sm:text-lg md:text-xl lg:text-2xl font-black text-white mt-4 sm:mt-6 md:mt-8 lg:mt-10 line-clamp-2 px-4 sm:px-8 md:px-12 lg:px-16 xl:px-20 py-4 sm:py-6 lg:py-10 [-webkit-text-stroke:0.4px_black] sm:[-webkit-text-stroke:0.5px_black] md:[-webkit-text-stroke:0.6px_black] lg:[-webkit-text-stroke:0.7px_black] tracking-tighter text-center sm:text-left">
               <img
                src={currentStepData.icon}
                alt={currentStepData.title}
                className="w-10 h-10 inline-block space-x-4 mr-4"
              />
              {currentStepData.subtitle} 

              {currentStepData.select && currentStepData.select.trim() !== "" && (
                <span className="h-10 inline-block space-x-4 mr-4">
                  &nbsp;&nbsp;&nbsp;({currentStepData.select})
                </span>
              )}
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 md:gap-8 lg:gap-10 mb-4 sm:mb-6 px-4 sm:px-8 md:px-12 lg:px-16 xl:px-20">
              {currentStepData.tasks.map((task, index) => (
                <motion.div
                  key={task.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <label
                    className={`flex items-center space-x-2 sm:space-x-3 md:space-x-4 cursor-pointer p-2 sm:p-3 rounded-full transition-colors duration-200 border-b border-b-white border-t border-t-gray-500 ${
                      task.completed ? "bg-[#D7EEFF]" : "hover:bg-gray-100"
                    }`}
                    style={{
                      backgroundColor: task.completed
                        ? "#D7EEFF"
                        : currentStepData.taskBg,
                    }}
                  >
                    <input
                      type={
                        currentStep === 0 || currentStep === 4
                          ? "radio"
                          : "checkbox"
                      }
                      name={
                        currentStep === 0
                          ? "hydration"
                          : currentStep === 4
                          ? "screenTime"
                          : undefined
                      }
                      checked={task.completed}
                      onChange={() => toggleTask(currentStep, task.id)}
                      className="sr-only"
                    />

                    <div
                      className={`w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 rounded-full border-2 flex items-center justify-center transition-all duration-200 ${
                        task.completed
                          ? "bg-green-500 border-green-500 transform scale-110"
                          : "border-gray-300 hover:border-green-400"
                      }`}
                    >
                      {task.completed &&
                        (currentStep === 0 || currentStep === 4 ? (
                          <div className="w-2 h-2 sm:w-3 sm:h-3 md:w-4 md:h-4 bg-white rounded-full"></div>
                        ) : (
                          <svg
                            className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 text-white"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="3"
                              d="M5 13l4 4L19 7"
                            ></path>
                          </svg>
                        ))}
                    </div>

                    <span className="font-black text-white text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl [-webkit-text-stroke:0.3px_black] sm:[-webkit-text-stroke:0.4px_black] md:[-webkit-text-stroke:0.5px_black] lg:[-webkit-text-stroke:0.6px_black] tracking-tighter break-words">
                      {task.text}
                    </span>
                  </label>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Error Message */}
          {errorMessage && (
            <p className="text-red-600 text-xs sm:text-sm md:text-base text-center mt-0">
              {errorMessage}
            </p>
          )}

          {/* Navigation */}
          <div className="flex justify-center gap-6 sm:gap-8 md:gap-10 lg:gap-12 items-center px-4 sm:px-6 absolute bottom-4 sm:bottom-6 md:bottom-8 lg:bottom-10 xl:bottom-12 left-1/2 -translate-x-1/2">
            <button onClick={prevStep} disabled={currentStep === 0}>
              <img
                src={leftButton}
                alt="Previous"
                className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10"
              />
            </button>
            <button onClick={nextStep}>
              {isLastStep ? (
                <img
                  src={doneIcon}
                  alt="Done"
                  className="w-6 h-6 sm:w-12 sm:h-12 md:w-24 md:h-24"
                />
                ) : (
                <img
                  src={rightButton}
                  alt="Next"
                  className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10"
                />
              )}
            </button>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Step Dots */}
      <div className="flex gap-1 sm:gap-2 mt-4 sm:mt-6">
        {steps.map((_, index) => (
          <div
            key={index}
            className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all duration-300 ${
              index === currentStep
                ? "bg-gray-800 w-4 sm:w-6 md:w-8"
                : index < currentStep
                ? "bg-green-500"
                : "bg-gray-300"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

export default MultistepForm;
