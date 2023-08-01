"use client";

import { useEffect } from "react";
import { Crisp } from "crisp-sdk-web";

export const CrispChat = () => {
  useEffect(() => {
    Crisp.configure("5a541b20-50e2-49ed-9fe0-0b912b111c28"); // CRISP_WEBSITE_ID
  }, []);

  return null;
};
