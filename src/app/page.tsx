import { Hero } from "@/components/home/Hero";
import { MathMapPreview } from "@/components/home/MathMapPreview";
import { Manifesto } from "@/components/home/Manifesto";
import { ClosingCta } from "@/components/home/ClosingCta";

export default function HomePage() {
  return (
    <>
      <Hero />
      <MathMapPreview />
      <Manifesto />
      <ClosingCta />
    </>
  );
}
