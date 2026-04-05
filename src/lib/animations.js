export const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { 
    duration: 0.9, 
    ease: [0.25, 0.46, 0.45, 0.94], 
    delay 
  },
});

export const staggerContainer = (staggerChildren = 0.1, delayChildren = 0) => ({
  initial: {},
  animate: {
    transition: {
      staggerChildren,
      delayChildren,
    },
  },
});

export const fadeIn = (duration = 0.6, delay = 0) => ({
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: { duration, ease: "easeOut", delay },
});
