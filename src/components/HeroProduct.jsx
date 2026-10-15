import React from 'react';
import { motion } from 'framer-motion';

// A cut-out shoe staged like a studio shot: tilted slightly toe-up, floating
// just above a soft contact shadow. On hover the shoe lifts and its shadow
// tightens and fades, as it would under a real light.
export const HeroProduct = ({ src, rotate }) => (
  <span className="relative block pb-[9%]">
    <span
      aria-hidden="true"
      className="absolute left-[12%] right-[10%] bottom-0 h-[13%] rounded-[50%] bg-[radial-gradient(closest-side,rgba(26,26,23,0.34),rgba(26,26,23,0.12)_60%,transparent)] blur-[5px] transition-[transform,opacity] duration-300 ease-out group-hover:scale-x-[0.88] group-hover:opacity-70"
    />
    <motion.span style={rotate ? { rotate } : undefined} className="relative block">
      <img
        src={src}
        alt=""
        className="w-full -rotate-[7deg] origin-[60%_80%] transition-transform duration-300 ease-out group-hover:-translate-y-2"
      />
    </motion.span>
  </span>
);

export default HeroProduct;
