// update it as per latest changes

import { useEffect, useState } from "react";

const HydrationComponent = ({ children }: { children: React.ReactNode }) => {
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  if (!isHydrated) {
    return null;
  }

  return children;
};

export default HydrationComponent;
