const Colors = ["bg-emerald-500", "bg-rose-500", "bg-violet-500"];

interface SharedUIProps {
  id: number;
}

export function SharedUI({ id }: SharedUIProps) {
  return (
    <div
      className={`w-full h-full flex flex-col items-start text-left justify-end ${
        Colors[id % 3]
      }`}
    >
      <div className="px-5 py-4 w-full flex flex-col items-start justify-end gap-1">
        <p className="text-white/80 text-sm font-semibold">NEW RELEASE</p>
        <p className="text-white text-2xl font-bold">
          Lorem Ipsum
          <br /> Dolor Sit Amet
        </p>
        <p className="text-white/80 text-xs font-medium">The magic is here!</p>
      </div>
      <div className="bg-black/20 w-full px-5 py-4 flex justify-between gap-8 sticky top-0 items-center">
        {/* Left */}
        <div className="flex items-center">
          <div className="size-12 bg-black/80 mask mask-squircle shadow-sm rounded-lg" />
          <div className="flex flex-col ml-2">
            <p className="text-white text-sm font-semibold shrink-0 text-nowrap">
              Lorem Ipsum Explorer
            </p>
            <p className="text-white/80 text-xs font-medium">
              Original texts in Latin
            </p>
          </div>
        </div>

        {/* Right */}
        <div className=" bg-white/30 rounded-2xl py-1.5 px-4.5">
          <p className="text-sm font-semibold leading-snug">$9.99</p>
        </div>
      </div>
    </div>
  );
}
