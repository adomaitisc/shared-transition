const Colors = ["bg-emerald-500", "bg-rose-500", "bg-violet-500"];
const DarkColors = ["bg-emerald-900", "bg-rose-900", "bg-violet-900"];

interface GenericUIProps {
  id: number;
  superTitle?: string;
  title: React.ReactElement<HTMLSpanElement>;
  subTitle?: string;
  app: {
    name: string;
    description: string;
    price?: string;
  };
}

export function GenericUI({
  id,
  superTitle,
  title,
  subTitle,
  app,
}: GenericUIProps) {
  return (
    <div
      className={`w-full h-full flex flex-col items-start text-left justify-end ${
        Colors[id % 3]
      }`}
    >
      <div className="px-5 py-4 w-full flex flex-col items-start justify-end gap-1">
        {superTitle ? (
          <p className="text-white/80 text-sm font-semibold uppercase">
            {superTitle}
          </p>
        ) : null}
        <p className="text-white text-2xl font-bold">{title}</p>
        {subTitle ? (
          <p className="text-white/80 text-sm font-medium">{subTitle}</p>
        ) : null}
      </div>
      <div className="bg-black/20 w-full px-5 py-4 flex justify-between gap-8 sticky top-0 items-center">
        {/* Left */}
        <div className="flex items-center shrink-0">
          <div
            className={`size-12 mask mask-squircle shadow-sm rounded-lg ${
              DarkColors[id % 3]
            }`}
          />
          <div className="flex flex-col ml-2">
            <p className="text-white text-sm font-semibold shrink-0 text-nowrap">
              {app.name}
            </p>
            <p className="text-white/80 text-xs font-medium">
              {app.description}
            </p>
          </div>
        </div>

        {/* Right */}
        <div className=" bg-white/30 rounded-2xl py-1.5 px-4.5">
          <p className="text-sm font-semibold leading-snug">
            {app.price ? app.price : "Get"}
          </p>
        </div>
      </div>
    </div>
  );
}
