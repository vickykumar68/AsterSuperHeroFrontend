import React, { useState, useContext } from 'react';
import { motion, AnimatePresence } from "framer-motion";
import { RotateCcw, Heart, Lock  } from 'lucide-react';
import step1 from "../assets/dailyJournal/step1.svg";
import step2 from "../assets/dailyJournal/step2.svg"
import step3 from "../assets/dailyJournal/step3.svg"
import step4 from "../assets/dailyJournal/step4.svg"
import step5 from "../assets/dailyJournal/step5.svg"
import leftButton from "../assets/dailyJournal/leftbutton.svg"
import rightButton from "../assets/dailyJournal/rightbutton.svg";
import AuthContext from '../context/AuthContext'; // Adjust the path as needed
import bgOurJournal from "../assets/dailyJournal/bg_our_journal.svg";
import axios from 'axios';
import flossIcon from "../assets/meet_your_hero/flossIcon.svg";
import  brainyIcon from "../assets/meet_your_hero/brainyIcon.svg";
import germIcon from "../assets/meet_your_hero/germIcon.svg";
import gobblerIcon from "../assets/meet_your_hero/gobblerIcon.svg";
import hydralcon from "../assets/meet_your_hero/hydraIcon.svg";
import mightyManIcon from "../assets/meet_your_hero/mightyManIcon.svg";
import doneIcon from "../assets/desktopViewImages/multiStepFormDesk/Done-mob.svg";
import thankYouBg from '../assets/desktopViewImages/multiStepFormDesk/Thankyoucard.svg';
import goodjob from '../assets/desktopViewImages/multiStepFormDesk/goodjob.svg';
import thankbg from '../assets/desktopViewImages/multiStepFormDesk/thankbg.png';
import accessBg from "../assets/accessrestrictedBgmob.png";


function DailyTask() {
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
      background: step1,
      color: "text-white",
      bgGradient: "from-blue-400 to-blue-600",
      taskBg: "#77A0FD",
      tasks: [
        { id: "h1", text: "1-2 Glasses", completed: false },
        { id: "h2", text: "3-5 Glasses", completed: false },
        { id: "h3", text: "6-8 Glasses", completed: false },
        { id: "h4", text: "8+ Glasses", completed: false }
      ]
    },
    {
      id: 2,
      select:"Select one or more",
      title: "DENTAL HYGIENE",
      icon: flossIcon,
      subtitle: "Which of these did you do today",
      background: step2,
      color: "text-gray-800",
      bgGradient: "from-yellow-300 to-orange-400",
      taskBg: "#FFC33B",
      tasks: [
        { id: "d1", text: "Brushed in the morning", completed: false },
        { id: "d2", text: "Brushed at night ", completed: false },
        { id: "d3", text: "Flossed ", completed: false },
        { id: "d4", text: "Rinsed with mouthwash", completed: false }
      ]
    },
    {
      id: 3,
      select:"Select one or more",
      title: "PHYSICAL ACTIVITY",
       icon: mightyManIcon,
      subtitle: "What kind of activity did you do today?",
      background: step3,
      color: "text-white",
      bgGradient: "from-pink-400 to-pink-600",
      taskBg: "#D872C7",
      tasks: [
        { id: "p1", text: "Outdoor Play (football, cricket, etc.) ", completed: false },
        { id: "p2", text: "Running or Cycling ", completed: false },
        { id: "p3", text: "Dancing ", completed: false },
        { id: "p4", text: "Stretching or Workout", completed: false }
      ]
    },
    {
      id: 4,
      select:"Select one or more",
      title: "HEALTHY EATING",
      icon: gobblerIcon,
      subtitle: "How did you follow healthy eating today?",
      background: step4,
      color: "text-white",
      bgGradient: "from-orange-400 to-red-500",
      taskBg: "#EF8274",
      tasks: [
        { id: "e1", text: "Fruits", completed: false },
        { id: "e2", text: "Vegetables", completed: false },
        { id: "e3", text: "Home Cooked Meal", completed: false },
        { id: "e4", text: "No Junk Food", completed: false },
      ]
    },
    {
      id: 5,
      select:"",
      title: "SCREENTIME TRACKER",
      icon: germIcon,
      subtitle: "What was your screentime today?",
      background: step5,
      color: "text-white",
      bgGradient: "from-purple-400 to-purple-600",
      taskBg: "#C590FF",
      tasks: [
        { id: "k1", text: "1 hour or less", completed: false },
        { id: "k2", text: "2-3 hours", completed: false },
        { id: "k3", text: "More than 3-4 hours", completed: false },
        { id: "k4", text: "5+ hours", completed: false }
      ]
    },
    {
      id: 6,
      select:"Select one or more",
      title: "GERM PROTECTION",
      icon: brainyIcon,
      subtitle: "How did you protect yourself from germs today? ",
      background: step1,
      color: "text-white",
      bgGradient: "from-purple-400 to-purple-600",
      taskBg: "#C590FF",
      tasks: [
        { id: "k1", text: "Washed hands for 20 secs ", completed: false },
        { id: "k2", text: "Used hand sanitiser ", completed: false },
        { id: "k3", text: "Covered mouth while coughing ", completed: false },
        { id: "k4", text: "Showered after coming home ", completed: false }
      ]
    },
    {
      id: 7,
      select:"Select one or more",
      title: "ACTS OF KINDNESS",
      icon: germIcon,
      subtitle: "What was your act of kindness for today?",
      background: step2,
      color: "text-white",
      bgGradient: "from-orange-400 to-red-500",
      taskBg: "#EF8274",
      tasks: [
        { id: "e1", text: "Helped my parents ", completed: false },
        { id: "e2", text: "Recycled waste", completed: false },
        { id: "e3", text: "Watered a plant ", completed: false },
        { id: "e4", text: "Took care of a pet ", completed: false }
      ]
    },
  ]);

  const toggleTask = (stepIndex, taskId) => {
  setSteps(prev =>
    prev.map((step, index) => {
      if (index === stepIndex) {
        // Single-select steps (0 = hydration, 4 = screentime)
        if (stepIndex === 0 || stepIndex === 4) {
          return {
            ...step,
            tasks: step.tasks.map(task => ({
              ...task,
              completed: task.id === taskId, // only one true
            })),
          };
        }
        // Multi-select steps
        else {
          return {
            ...step,
            tasks: step.tasks.map(task =>
              task.id === taskId ? { ...task, completed: !task.completed } : task
            ),
          };
        }
      }
      return step;
    })
  );
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
  const hasCompletedTask = currentTasks.some(task => task.completed);

    if (!hasCompletedTask) {
      setErrorMessage(" Please select at least one task.");
      return;
    }

    if (currentStep < steps.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      await submitForm(); 
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
      setErrorMessage("");
    }
  };

  const restartTask = () => {
    setShowThankYou(false);
    setCurrentStep(0);
    setSteps(prev => prev.map(step => ({
      ...step,
      tasks: step.tasks.map(task => ({ ...task, completed: false }))
    })));
    setErrorMessage("");
  };

  const getCompletedTasksCount = () => {
    return steps.reduce((total, step) => 
      total + step.tasks.filter(task => task.completed).length, 0
    );
  };

  if (loading) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }

  if (!isAuthenticated) {
    return (
      <div
        className="flex items-center justify-center h-[70vh] bg-cover bg-center"
        style={{
          backgroundImage: `url(${accessBg})`,
        }}
      >
        <div className="bg-white p-8 rounded-2xl shadow-2xl text-center max-w-sm w-full mb-60">
          <Lock className="w-12 h-12 text-blue-500 mx-auto mb-4 animate-bounce" />
          <h2 className="text-2xl font-bold text-gray-800 mb-3 font-gtwalsheim">Access Restricted</h2>
          <p className="text-gray-600 text-base mb-4 font-gtwalsheim">Please log in to access this daily journal form and track your healthy habits.</p>
          <button
              onClick={() => (window.location.hash = "loginForm")}
              className="mt-4 w-full py-3 rounded-lg text-white uppercase text-center border-2 border-black transition-all duration-200 hover:opacity-90 [-webkit-text-stroke:0.4px_black] tracking-tighter"
              style={{
                background: "linear-gradient(180deg, #26B3F7 26.5%, #23AAF8 39.5%, #1C95F9 64%, #1983FA 97%)",
                fontWeight: 900,
                fontSize: "18px",
                lineHeight: "100%",
                letterSpacing: "-0.02em",
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
          <div className="bg-[#D18AFF] rounded-full py-3 mx-8 mb-2 shadow-inner w-80 max-w-md">
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
      <div className="text-[24px] font-bold text-white">
        {sessionStorage.getItem("daysPassed")}
      </div>
    </div>
  </div>
</div>
          {/* Encouragement text */}
          <p className="text-white font-goldman text-sm mt-6 mb-2 px-4 text-center leading-relaxed underline">
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
  const hasCompletedTasks = currentStepData.tasks.some(task => task.completed);

//   const submitForm = async () => {
//   if (!isAuthenticated) {
//     setErrorMessage("⚠️ You need to log in before submitting.");
//     return;
//   }

//   const responses = {
//     hydration: steps[0].tasks.find(t => t.completed)?.text || "",
//     dental: steps[1].tasks.filter(t => t.completed).map(t => t.text),
//     physical: steps[2].tasks.filter(t => t.completed).map(t => t.text),
//     healthy: steps[3].tasks.filter(t => t.completed).map(t => t.text),
//     kindness: steps[4].tasks.filter(t => t.completed).map(t => t.text),
//   };

//   try {
//     const response = await axios.post("/api/track/submit", responses, { withCredentials: true });
//     console.log(response)
//     setShowThankYou(true);
//   } catch (err) {
//     console.error("Error submitting form", err);
//     setErrorMessage("⚠️ Something went wrong. Please try again.");
//   }
// };

const submitForm = async () => {
  if (!isAuthenticated) {
    setErrorMessage("⚠️ You need to log in before submitting.");
    return;
  }

  const responses = {
    hydration: steps[0].tasks.find(t => t.completed)?.text || "",
    dental: steps[1].tasks.filter(t => t.completed).map(t => t.text),
    physical: steps[2].tasks.filter(t => t.completed).map(t => t.text),
    healthy: steps[3].tasks.filter(t => t.completed).map(t => t.text),
    screenTime: steps[4].tasks.find(t => t.completed)?.text || "",
    germProtection: steps[5].tasks.filter(t => t.completed).map(t => t.text),
    kindness: steps[6].tasks.filter(t => t.completed).map(t => t.text),
  };

  try {
    const response = await axios.post("/api/v1/superhero/track/submit", responses, { withCredentials: true });
    console.log(response)
    setShowThankYou(true);
  } catch (err) {
    console.error("Error submitting form", err);
    setErrorMessage("⚠️ Something went wrong. Please try again.");
  }
};
 

  return (
    <div className="flex flex-col items-center pt-10 pb-20 bg-cover bg-no-repeat bg-center" id='dailyTask'
          style={{ backgroundImage: `url(${bgOurJournal})` }}>
      <AnimatePresence mode="wait">
        <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 100, scale: 0.95 }}   
            animate={{ opacity: 1, x: 0, scale: 1 }}        
            exit={{ opacity: 0, x: -100, scale: 0.95 }}    
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="relative max-w-md p-3"
            style={{
                backgroundImage: `url(${currentStepData.background})`,
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
                height: "496px",
                width: "360px",
                borderRadius: "6px",
            }}>
          {/* Header */}
          <div className="text-center mb-3">
            <span className="text-[22px] font-black text-white [-webkit-text-stroke:0.8px_black] tracking-tighter "
             
            >
              {currentStep + 1}. {currentStepData.title}
            </span>

            <h2 className="text-lg font-bold text-white mt-8 pb-2 line-clamp-2 font-gtwalsheim"
              style={{
                textShadow: '2px 2px 0px rgba(0,0,0,0.4), 1px 1px 0px rgba(0,0,0,0.6)',
                WebkitTextStroke: '1px rgba(0,0,0,0.2)'
              }}
            >
             
               <img
                src={currentStepData.icon}
                alt={currentStepData.title}
                className="w-6 h-6 inline-block space-x-4 mr-2"
              />
              {currentStepData.subtitle}
            </h2>
          </div>

          {/* Tasks */}
          <div className="space-y-3 mb-5 px-4">
            {currentStepData.tasks.map((task, index) => (
              <motion.div
                key={task.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <label
                  className={`flex items-center space-x-3 cursor-pointer p-2 rounded-full transition-colors duration-200  border-b border-b-white border-t border-t-gray-500 ${
                    task.completed ? "bg-[#D7EEFF]" : "hover:bg-gray-100"
                  }`}
                  style={{
                    backgroundColor: task.completed ? "#D7EEFF" : currentStepData.taskBg,
                  }}
                >
                  <input
                    type={currentStep === 0 ? "radio" : "checkbox"}
                    name={currentStep === 0 ? "hydration" : undefined}
                    checked={task.completed}
                    onChange={() => toggleTask(currentStep, task.id)}
                    className="sr-only"
                  />
                  <div
                    className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-200 ${
                      task.completed
                        ? "bg-green-500 border-green-500 transform scale-110"
                        : "border-gray-300 hover:border-green-400"
                    }`}
                  >
                    {task.completed && (
                      currentStep === 0 ? (
                        <div className="w-3 h-3 bg-white rounded-full"></div>
                      ) : (
                        <svg
                          className="w-4 h-4 text-white"
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
                      )
                    )}
                  </div>
                  <span
                    className="font-bold text-white"
                    style={{
                      textShadow:
                        "2px 2px 0px rgba(0,0,0,0.4), 1px 1px 0px rgba(0,0,0,0.6)",
                      WebkitTextStroke: "1px rgba(0,0,0,0.2)",
                    }}
                  >
                    {task.text}
                  </span>
                </label>
              </motion.div>
            ))}

          </div>

          {/* Error Message */}
          {errorMessage && (
            <p className="text-red-600 text-sm text-center mt-0">{errorMessage}</p>
          )}

          {/* Navigation */}
          <div className="flex justify-center gap-8 items-center px-5 absolute bottom-9 left-1/2 -translate-x-1/2">
            <button onClick={prevStep} disabled={currentStep === 0}>
              <img src={leftButton} alt="" />
            </button>
            <button onClick={nextStep}>
              {isLastStep ? (
                 <img
      src={doneIcon}
      alt="Done"
      className="w-[4.5rem] h-[4.5rem] sm:w-8 sm:h-8 md:w-16 md:h-16"
    />
              ) : (
                <img src={rightButton} alt="" />
              )}
            </button>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Step Dots */}
      <div className="flex gap-1 mt-4">
        {steps.map((_, index) => (
          <div
            key={index}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              index === currentStep
                ? 'bg-gray-800 w-6'
                : index < currentStep
                  ? 'bg-green-500'
                  : 'bg-gray-300'
            }`}
          />
        ))}
      </div>
    </div>
  );
}

export default DailyTask;