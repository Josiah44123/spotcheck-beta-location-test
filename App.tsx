import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Sparkles, ChevronRight, RotateCcw, Mail, X } from 'lucide-react';
import confetti from 'canvas-confetti';
import FloatingHearts from './components/FloatingHearts';
import { AppState, Position, Memory } from './types';
import './flower.css'; 

const MEMORIES: Memory[] = [
  {
    id: 1,
    text: "Hai honeyy!",
    image: "/img3.jpg",
    placeholderColor: "bg-pink-100"
  },
  {
    id: 2,
    text: "i appreciate you so much. you are the best thing that ever happened to me and i just wanna say thank you for being you and for loving me. ",
    image: "/img2.jpg",
    placeholderColor: "bg-rose-100"
  },
  {
    id: 3,
    text: "I have something important to ask..",
    image: "/img1.jpg",
    placeholderColor: "bg-purple-100"
  }
];

// ... FlowerIntro Component ...
const FlowerIntro: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  useEffect(() => {
    const timer = setTimeout(onComplete, 8000); 
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <motion.div 
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      transition={{ delay: 7.5, duration: 1 }} 
      className="flower-wrapper"
    >
        <div className="night"></div>
        <div className="flowers">
        <div className="flower flower--1">
          <div className="flower__leafs flower__leafs--1">
            <div className="flower__leaf flower__leaf--1"></div>
            <div className="flower__leaf flower__leaf--2"></div>
            <div className="flower__leaf flower__leaf--3"></div>
            <div className="flower__leaf flower__leaf--4"></div>
            <div className="flower__white-circle"></div>
            {[...Array(8)].map((_, i) => <div key={i} className={`flower__light flower__light--${i + 1}`}></div>)}
          </div>
          <div className="flower__line">
            {[...Array(6)].map((_, i) => <div key={i} className={`flower__line__leaf flower__line__leaf--${i + 1}`}></div>)}
          </div>
        </div>

        <div className="flower flower--2">
          <div className="flower__leafs flower__leafs--2">
            <div className="flower__leaf flower__leaf--1"></div>
            <div className="flower__leaf flower__leaf--2"></div>
            <div className="flower__leaf flower__leaf--3"></div>
            <div className="flower__leaf flower__leaf--4"></div>
            <div className="flower__white-circle"></div>
            {[...Array(8)].map((_, i) => <div key={i} className={`flower__light flower__light--${i + 1}`}></div>)}
          </div>
          <div className="flower__line">
             {[...Array(6)].map((_, i) => <div key={i} className={`flower__line__leaf flower__line__leaf--${i + 1}`}></div>)}
          </div>
        </div>

        <div className="flower flower--3">
          <div className="flower__leafs flower__leafs--3">
            <div className="flower__leaf flower__leaf--1"></div>
            <div className="flower__leaf flower__leaf--2"></div>
            <div className="flower__leaf flower__leaf--3"></div>
            <div className="flower__leaf flower__leaf--4"></div>
            <div className="flower__white-circle"></div>
            {[...Array(8)].map((_, i) => <div key={i} className={`flower__light flower__light--${i + 1}`}></div>)}
          </div>
          <div className="flower__line">
            {[...Array(6)].map((_, i) => <div key={i} className={`flower__line__leaf flower__line__leaf--${i + 1}`}></div>)}
          </div>
        </div>

        <div className="flower__grass flower__grass--1">
            <div className="flower__grass--top"></div>
            <div className="flower__grass--bottom"></div>
            {[...Array(8)].map((_, i) => <div key={i} className={`flower__grass__leaf flower__grass__leaf--${i + 1}`}></div>)}
            <div className="flower__grass__overlay"></div>
        </div>

        <div className="flower__grass flower__grass--2">
            <div className="flower__grass--top"></div>
            <div className="flower__grass--bottom"></div>
            {[...Array(8)].map((_, i) => <div key={i} className={`flower__grass__leaf flower__grass__leaf--${i + 1}`}></div>)}
            <div className="flower__grass__overlay"></div>
        </div>

        <div className="flower__g-long">
           <div className="flower__g-long__top"></div>
           <div className="flower__g-long__bottom"></div>
        </div>
        
        <div className="flower__g-right flower__g-right--1">
           <div className="leaf"></div>
        </div>
        <div className="flower__g-right flower__g-right--2">
           <div className="leaf"></div>
        </div>

        <div className="flower__g-front">
           <div className="flower__g-front__line"></div>
           {[...Array(8)].map((_, i) => (
             <div key={i} className={`flower__g-front__leaf-wrapper flower__g-front__leaf-wrapper--${i + 1}`}>
                <div className="flower__g-front__leaf"></div>
             </div>
           ))}
        </div>
        
        <div className="flower__g-fr">
           <div className="leaf"></div>
           {[...Array(8)].map((_, i) => <div key={i} className={`flower__g-fr__leaf flower__g-fr__leaf--${i + 1}`}></div>)}
        </div>

        {[...Array(7)].map((_, i) => (
            <div key={i} className={`long-g long-g--${i}`}>
                <div className="leaf leaf--0"></div>
                <div className="leaf leaf--1"></div>
                <div className="leaf leaf--2"></div>
                <div className="leaf leaf--3"></div>
            </div>
        ))}

      </div>
      
      <motion.div 
         initial={{ opacity: 0, y: 20 }}
         animate={{ opacity: 1, y: 0 }}
         transition={{ delay: 5, duration: 1 }}
         className="absolute bottom-20 text-rose-200 font-title text-4xl tracking-widest drop-shadow-[0_0_10px_rgba(255,192,203,0.5)] z-[100]"
      >
         For you...
      </motion.div>
    </motion.div>
  );
};

const App: React.FC = () => {
  const [appState, setAppState] = useState<AppState>(AppState.ASKING);
  const [currentStep, setCurrentStep] = useState(0);
  const [showIntro, setShowIntro] = useState(true);
  
  const [noBtnPos, setNoBtnPos] = useState<Position>({ x: 0, y: 0 });
  const [isDodging, setIsDodging] = useState(false);
  const noBtnRef = useRef<HTMLButtonElement>(null);

  const [loveNote, setLoveNote] = useState<string>("");
  const [isLetterOpen, setIsLetterOpen] = useState(false);

  const moveNoButton = (e: React.MouseEvent<HTMLButtonElement> | React.TouchEvent<HTMLButtonElement>) => {
     const btn = noBtnRef.current;
     if (!btn) return;
     const btnRect = btn.getBoundingClientRect();
     const btnWidth = btnRect.width;
     const btnHeight = btnRect.height;
     const btnCenterX = btnRect.left + btnWidth / 2;
     const btnCenterY = btnRect.top + btnHeight / 2;
     let cursorX, cursorY;
     if ('touches' in e) {
       cursorX = e.touches[0].clientX;
       cursorY = e.touches[0].clientY;
     } else {
       cursorX = (e as React.MouseEvent).clientX;
       cursorY = (e as React.MouseEvent).clientY;
     }
     let dirX = btnCenterX - cursorX;
     let dirY = btnCenterY - cursorY;
     if (Math.abs(dirX) < 1 && Math.abs(dirY) < 1) {
       dirX = (Math.random() - 0.5) * 10;
       dirY = (Math.random() - 0.5) * 10;
     }
     const len = Math.sqrt(dirX*dirX + dirY*dirY);
     const invLen = len > 0 ? 1/len : 1;
     dirX *= invLen;
     dirY *= invLen;
     const jump = 250;
     const startX = isDodging ? noBtnPos.x : btnRect.left;
     const startY = isDodging ? noBtnPos.y : btnRect.top;
     let nextX = startX + dirX * jump;
     let nextY = startY + dirY * jump;
     const maxX = window.innerWidth - btnWidth - 20;
     const maxY = window.innerHeight - btnHeight - 20;
     if (nextX < 20) nextX = 20 + Math.random() * 100;
     if (nextX > maxX) nextX = maxX - Math.random() * 100;
     if (nextY < 20) nextY = 20 + Math.random() * 100;
     if (nextY > maxY) nextY = maxY - Math.random() * 100;
     setNoBtnPos({ x: nextX, y: nextY });
     setIsDodging(true);
  };

  const handleNext = () => {
    if (currentStep < MEMORIES.length) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handleReset = () => {
    setAppState(AppState.ASKING);
    setCurrentStep(0);
    setIsDodging(false);
    setLoveNote("");
    setIsLetterOpen(false);
    setShowIntro(true); 
  };

  const handleYesClick = async () => {
    setAppState(AppState.ACCEPTED);
    setIsDodging(false);
    
    // Confetti explosion
    const end = Date.now() + 3000;
    const frame = () => {
      confetti({ particleCount: 5, angle: 60, spread: 55, origin: { x: 0 }, colors: ['#ff007f', '#ff1493', '#ffd700'] });
      confetti({ particleCount: 5, angle: 120, spread: 55, origin: { x: 1 }, colors: ['#ff69b4', '#db7093', '#fff0f5'] });
      if (Date.now() < end) requestAnimationFrame(frame);
    };
    frame();

    setLoveNote(`My dearest Yanna,

I'm so happy you said yes! 💖
I just wanna say that you are the most amazing person i]I have ever met. you are so kind, caring, and beautiful inside and out. you make me laugh and smile every day, and I feel so lucky to have you in my life. thank you for being my girlfriend and for loving me. I hope we can spend many more valentine's days together and create more wonderful memories. I love you
You are the most special person in my life, and I can't wait to spend my life with u. Thank you for being my girlfriend and my best friend.

I love you so much!
ya boi lam                    `);
  };

  const isLastStep = currentStep === MEMORIES.length;

  return (
    <div className="relative min-h-screen w-full flex flex-col items-center justify-center p-4 overflow-x-hidden bg-gradient-to-br from-[#1a0b2e] via-[#4a0e4e] to-[#2d1b4e] text-white">
      
      <div 
        className="absolute inset-0 z-0 opacity-20 pointer-events-none"
        style={{
            backgroundImage: 'radial-gradient(rgba(255, 255, 255, 0.5) 1px, transparent 1px)',
            backgroundSize: '24px 24px'
        }}
      ></div>

      <AnimatePresence>
        {showIntro && <FlowerIntro key="intro" onComplete={() => setShowIntro(false)} />}
      </AnimatePresence>
      
      {!showIntro && (
        <>
          <FloatingHearts />
          <div className="blob bg-rose-500 w-[500px] h-[500px] rounded-full top-[-100px] left-[-100px] mix-blend-screen opacity-20 blur-3xl fixed pointer-events-none"></div>
          <div className="blob bg-purple-500 w-[400px] h-[400px] rounded-full bottom-[-50px] right-[-50px] mix-blend-screen opacity-20 animation-delay-2000 blur-3xl fixed pointer-events-none"></div>

          <AnimatePresence mode="wait">
            {appState === AppState.ASKING && (
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -20, scale: 0.95 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="z-10 w-full max-w-lg"
              >
                {currentStep < MEMORIES.length ? (
                  <div className="glass-card bg-white/10 backdrop-blur-lg border border-white/20 p-8 rounded-3xl flex flex-col items-center text-center relative overflow-visible shadow-2xl">
                    <div className="polaroid mb-8 w-64 rotate-2 transform transition-transform hover:rotate-0 duration-500 bg-white p-2 shadow-lg">
                      <div className="aspect-[4/5] bg-gray-100 mb-4 overflow-hidden">
                        <img src={MEMORIES[currentStep].image} alt="Memory" className="w-full h-full object-cover" />
                      </div>
                      <div className="text-right"><Sparkles className="inline text-yellow-400 w-4 h-4" /></div>
                    </div>
                    
                    <h2 className="font-handwriting text-5xl text-rose-100 mb-6 leading-relaxed drop-shadow-md">"{MEMORIES[currentStep].text}"</h2>

                    <button 
                      onClick={handleNext}
                      className="group bg-gradient-to-r from-rose-400 to-purple-500 hover:from-rose-500 hover:to-purple-600 text-white p-4 rounded-full shadow-lg shadow-purple-900/30 transform transition-all hover:scale-110"
                    >
                      <ChevronRight size={28} className="group-hover:translate-x-1 transition-transform" />
                    </button>

                    <div className="mt-8 flex gap-3">
                        {MEMORIES.map((_, idx) => (
                          <div key={idx} className={`h-2 rounded-full transition-all duration-500 ${idx === currentStep ? 'w-8 bg-rose-400' : 'w-2 bg-purple-400/30'}`} />
                        ))}
                    </div>
                  </div>
                ) : (
                  <div className="glass-card bg-white/10 backdrop-blur-lg border border-white/20 p-10 rounded-3xl flex flex-col items-center text-center relative shadow-2xl">
                    <div className="mb-6 relative">
                      <div className="absolute inset-0 bg-rose-400 rounded-full opacity-30 blur-2xl animate-pulse"></div>
                      <div className="relative w-40 h-40 rounded-full border-4 border-rose-200/50 shadow-xl overflow-hidden mx-auto">
                        <img src="https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExcDdtZ2JiZDR0a3lvMDF4OGJyeXp6Z3hucnZ0NzMwdjFjZ2g1b3cwOSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/KztT2c4u8mYYUiMKdJ/giphy.gif" alt="Please?" className="w-full h-full object-cover" />
                      </div>
                    </div>

                    <h1 className="font-title text-7xl text-rose-100 mb-6 drop-shadow-lg leading-snug">Be My Valentine?</h1>
                    <p className="font-handwriting text-3xl text-purple-200 mb-10 max-w-xs mx-auto leading-relaxed">I promise to be the best date ever, buy you snacks, and love you forever! 🥺👉👈</p>

                    <div className="flex gap-6 items-center justify-center w-full min-h-[60px]">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handleYesClick}
                        className="bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white font-bold py-3 px-12 rounded-full text-xl shadow-lg shadow-rose-900/50 transition-all border-2 border-white/30"
                      >
                        YES! 💖
                      </motion.button>
                      
                      {!isDodging && (
                        <button 
                          ref={noBtnRef}
                          onMouseEnter={moveNoButton}
                          onTouchStart={moveNoButton}
                          className="bg-white/10 backdrop-blur-sm text-purple-200 font-bold py-3 px-10 rounded-full text-xl hover:bg-white/20 transition-colors border border-white/10"
                        >
                          No
                        </button>
                      )}
                    </div>
                  </div>
                )}
              </motion.div>
            )}

            {appState === AppState.ASKING && isLastStep && isDodging && (
                <motion.button
                    initial={{ x: noBtnPos.x, y: noBtnPos.y }}
                    animate={{ x: noBtnPos.x, y: noBtnPos.y }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    onMouseEnter={moveNoButton}
                    onTouchStart={moveNoButton}
                    ref={noBtnRef}
                    style={{ position: 'fixed', left: 0, top: 0, zIndex: 100 }}
                    className="bg-gray-800/80 backdrop-blur text-gray-400 font-bold py-3 px-10 rounded-full text-xl shadow-lg border border-gray-600 cursor-not-allowed whitespace-nowrap"
                >
                    No
                </motion.button>
            )}

            {appState === AppState.ACCEPTED && (
              <motion.div
                key="accepted"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ type: "spring", duration: 0.8 }}
                className="z-10 flex flex-col items-center max-w-5xl w-full text-center"
              >
                <div className="glass-card bg-white/10 backdrop-blur-xl p-6 md:p-10 rounded-3xl border border-white/20 w-full mb-8 relative shadow-2xl">
                    <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-12">
                        <motion.img 
                            initial={{ opacity: 0, x: -50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.2 }}
                            src="https://media.giphy.com/media/T86i6yDyOYz7J6dPhf/giphy.gif" 
                            alt="Celebration" 
                            className="w-32 h-32 md:w-56 md:h-56 object-cover rounded-2xl shadow-lg border-4 border-white/20 hidden md:block -rotate-6" 
                        />
                        <div className="flex flex-col items-center z-10 flex-1">
                            <motion.div 
                            animate={{ scale: [1, 1.2, 1], rotate: [0, 5, -5, 0] }}
                            transition={{ repeat: Infinity, duration: 2 }}
                            className="mb-4 inline-block"
                            >
                            <Heart fill="#fb7185" className="w-20 h-20 md:w-28 md:h-28 text-rose-400 drop-shadow-xl" />
                            </motion.div>
                            <h1 className="font-title text-7xl md:text-8xl text-white mb-4 drop-shadow-lg leading-tight">She said YES!</h1>
                            <p className="text-purple-200 font-medium text-lg md:text-xl font-handwriting text-4xl">Best day ever! 🎉</p>
                            <img src="https://media.giphy.com/media/T86i6yDyOYz7J6dPhf/giphy.gif" alt="Celebration" className="w-full h-40 object-cover rounded-xl shadow-inner border border-white/20 md:hidden mt-6" />
                        </div>
                        <motion.img 
                            initial={{ opacity: 0, x: 50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.4 }}
                            src="https://media.giphy.com/media/T86i6yDyOYz7J6dPhf/giphy.gif" 
                            alt="Celebration" 
                            className="w-32 h-32 md:w-56 md:h-56 object-cover rounded-2xl shadow-lg border-4 border-white/20 hidden md:block rotate-6 scale-x-[-1]" 
                        />
                    </div>
                </div>

                <div className="w-full relative max-w-xl">
                    <AnimatePresence mode="wait">
                        {!isLetterOpen ? (
                            <motion.button
                                key="envelope"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.8 }}
                                onClick={() => setIsLetterOpen(true)}
                                className="w-full bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/30 rounded-3xl p-6 flex flex-col items-center gap-4 group cursor-pointer shadow-lg transition-all"
                            >
                                <div className="relative">
                                    <div className="absolute inset-0 bg-rose-400 rounded-full opacity-20 animate-ping"></div>
                                    <Mail className="w-16 h-16 text-rose-300 group-hover:scale-110 transition-transform duration-300" />
                                </div>
                                <span className="font-handwriting text-3xl text-rose-200">You have a new letter! 💌</span>
                                <span className="text-sm text-purple-300 uppercase tracking-widest font-bold">Tap to open</span>
                            </motion.button>
                        ) : (
                            <motion.div
                                key="letter"
                                initial={{ opacity: 0, rotateX: 90, y: 50 }}
                                animate={{ opacity: 1, rotateX: 0, y: 0 }}
                                transition={{ type: "spring", damping: 20 }}
                                className="bg-[#fffbf0] text-gray-800 p-8 rounded-sm shadow-2xl relative rotate-1 max-w-md mx-auto overflow-hidden"
                                style={{ backgroundImage: 'linear-gradient(#e5e5e5 1px, transparent 1px)', backgroundSize: '100% 2em', lineHeight: '2em' }}
                            >
                                <button onClick={() => setIsLetterOpen(false)} className="absolute top-2 right-2 text-gray-400 hover:text-red-500 transition-colors z-20"><X size={24} /></button>
                                <div className="max-h-[60vh] overflow-y-auto pr-2 custom-scrollbar relative z-10">
                                    <div className="font-handwriting text-2xl md:text-3xl leading-loose text-indigo-900 text-left">
                                        {loveNote.split('\n').map((line, i) => <p key={i} className="mb-4">{line}</p>)}
                                    </div>
                                    <div className="mt-8 text-right"><Heart className="inline w-6 h-6 text-red-500 fill-red-500" /></div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                <button onClick={handleReset} className="my-10 flex items-center gap-2 text-purple-300 hover:text-white font-bold transition-colors text-sm uppercase tracking-wide bg-white/10 px-6 py-3 rounded-full hover:bg-white/20">
                  <RotateCcw size={16} /> Replay
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </>
      )}
    </div>
  );
};

export default App;