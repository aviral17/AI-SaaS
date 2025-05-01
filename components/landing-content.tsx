// updated as per latest changes

"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const testimonials = [
  {
    name: "Joel",
    avatar: "J",
    title: "Software Engineer",
    description: "This is the best application I've ever used!",
  },
  {
    name: "Aviral",
    avatar: "A",
    title: "Designer",
    description: "I use this daily for generating new photos!",
  },
  {
    name: "Mark",
    avatar: "M",
    title: "CEO",
    description:
      "This app has changed my life, cannot imagine working without it!",
  },
  {
    name: "Mary",
    avatar: "M",
    title: "CFO",
    description:
      "The best in class, definitely worth the premium subscription!",
  },
];

// update as per latest changes
export const LandingContent = () => {
  return (
    <div className="px-10 pb-20">
      {/* 4xl text-white */}
      <h2 className="text-center text-5xl md:text-6xl text-gray-300  font-extrabold mb-10">
        Testimonials
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {testimonials.map((item) => (
          <Card
            key={item.description}
            className="bg-[#192339] border-none text-white hover:shadow-sm hover:shadow-gray-500"
          >
            <CardHeader className="group">
              <CardTitle className="flex items-center gap-x-2">
                <div>
                  <p className="text-3xl text-purple-400 group-hover:text-purple-500 font-extralight test_style transition-all duration-100 delay-100 ease-in-out">
                    {item.name}
                  </p>
                  <p className="text-zinc-400 text-sm">{item.title}</p>
                </div>
              </CardTitle>
              <CardContent className="pt-4 px-0">
                {item.description}
              </CardContent>
            </CardHeader>
          </Card>
        ))}
      </div>
    </div>
  );
};
