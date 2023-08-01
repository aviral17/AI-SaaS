"use client";

import { useEffect, useState } from "react";

import { ProModal } from "@/components/pro-modal";

export const ModalProvider = () => {
  // For preventing hydration error caused by server side rendering instead of client side rendering, also dont forget to pass this ModalProvider component to render in layout.tsx of main app folder, so that Modal provider will be accessible everywhere

  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <ProModal />
    </>
  );
};
