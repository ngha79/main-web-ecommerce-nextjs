"use client";

import * as React from "react";
import Image from "next/image";
import Autoplay from "embla-carousel-autoplay";

import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { ISlider } from "@/lib/interface";

export default function SliderEvent({ sliders }: { sliders: ISlider[] }) {
  const plugin = React.useRef(Autoplay({ delay: 2000 }));
  return (
    <Carousel
      className="w-full"
      plugins={[plugin.current]}
      opts={{
        align: "start",
        loop: true,
        direction: "ltr",
      }}
    >
      <CarouselContent>
        {sliders?.map((slider: ISlider) => (
          <CarouselItem key={slider.id}>
            <div className="p-1">
              <Card>
                <CardContent className="flex h-64 w-full overflow-hidden aspect-square items-center justify-center p-6">
                  <div className="p-1">
                    <Image
                      alt="image"
                      src={slider.url}
                      width={400}
                      height={320}
                      className="object-cover h-full w-full"
                    />
                  </div>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="left-0" />
      <CarouselNext className="right-0" />
    </Carousel>
  );
}
