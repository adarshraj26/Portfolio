"use client";
import { createContext, useContext, useState } from "react";

const RecruiterModeContext = createContext();

export function RecruiterModeProvider({ children }) {
  const [recruiterMode, setRecruiterMode] = useState(false);
  return (
    <RecruiterModeContext.Provider value={{ recruiterMode, setRecruiterMode }}>
      {children}
    </RecruiterModeContext.Provider>
  );
}

export function useRecruiterMode() {
  return useContext(RecruiterModeContext);
}
