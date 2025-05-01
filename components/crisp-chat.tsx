// update as per latest changes

"use client";

import { useEffect } from "react";
import { Crisp } from "crisp-sdk-web";

// update it as per latest changes
export const CrispChat = () => {
  useEffect(() => {
    Crisp.configure("5a541b20-50e2-49ed-9fe0-0b912b111c28"); // CRISP_WEBSITE_ID
  }, []);

  return null;
};
