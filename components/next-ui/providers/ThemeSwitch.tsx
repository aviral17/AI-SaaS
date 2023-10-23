// // "use client";

// // import { useState, useEffect } from "react";
// // import { Switch as NextThemeSwitch } from "@nextui-org/react";
// // import { MoonIcon } from "../MoonIcon";
// // import { SunIcon } from "../SunIcon";
// // import { useTheme } from "next-themes";

// // export function Switch() {
// //   const [isMounted, setIsMounted] = useState(false);
// //   const { theme, setTheme } = useTheme();

// //   // When the component is mounted, we'll enable the theme switch
// //   useEffect(() => setIsMounted(true), []);

// //   if (!isMounted) return null;

// //   // console.log("Switch rendered", theme);

// //   return (
// //     isMounted && (
// //       <NextThemeSwitch
// //         defaultSelected={theme === "light"}
// //         size="lg"
// //         color="success"
// //         startContent={<SunIcon />}
// //         endContent={<MoonIcon />}
// //         onClick={() => {
// //           setTheme(theme === "dark" ? "light" : "dark");
// //         }}
// //       ></NextThemeSwitch>
// //     )
// //   );
// // }

// "use client";

// import React, { useState, useEffect } from "react";
// import { Switch, VisuallyHidden, useSwitch } from "@nextui-org/react";
// import { MoonIcon } from "../MoonIcon";
// import { SunIcon } from "../SunIcon";
// import { useTheme } from "next-themes";

// const ThemeSwitch = (props: any) => {
//   const [isMounted, setIsMounted] = useState(false);
//   const { theme, setTheme } = useTheme();

//   const {
//     Component,
//     slots,
//     isSelected,
//     getBaseProps,
//     getInputProps,
//     getWrapperProps,
//   } = useSwitch({
//     ...props,
//     isSelected: theme === "light",
//     onChange: () => {
//       setTheme(theme === "dark" ? "light" : "dark");
//       // setTheme((!previousTheme));
//     },
//   });

//   // // When the component is mounted, we'll enable the theme switch
//   // useEffect(() => setIsMounted(true), []);

//   // if (!isMounted) return null;

//   return (
//     <div className="flex flex-col gap-2">
//       <Component {...getBaseProps()}>
//         <VisuallyHidden>
//           <input {...getInputProps()} />
//         </VisuallyHidden>
//         <div
//           {...getWrapperProps()}
//           className={slots.wrapper({
//             class: [
//               "w-8 h-8",
//               "flex items-center justify-center",
//               `rounded-lg ${
//                 isSelected
//                   ? "bg-[#05010127] hover:bg-[#e85454a2]"
//                   : "bg-default-100 hover:bg-default-200"
//               }`, // bg-default-100 hover:bg-default-200
//             ],
//           })}
//         >
//           {isSelected ? <SunIcon /> : <MoonIcon />}
//         </div>
//       </Component>
//       {/* <p className="text-default-500 select-none">
//         Lights: {isSelected ? "on" : "off"}
//       </p> */}
//     </div>
//   );
// };

// export default function App() {
//   return <ThemeSwitch />;
// }

"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function ModeToggle() {
  const { setTheme } = useTheme();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setTheme("light")}>
          Light
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("dark")}>
          Dark
        </DropdownMenuItem>
        {/* <DropdownMenuItem onClick={() => setTheme("system")}>
          System
        </DropdownMenuItem> */}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
