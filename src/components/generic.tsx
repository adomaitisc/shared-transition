interface GenericUIProps {
  superTitle?: string;
  title: string | React.ReactElement;
  image?: string;
  iconImage?: string;
  subTitle?: string;
  app: {
    name: string;
    description: string;
    price?: string;
  };
}

export function GenericUI(props: GenericUIProps) {
  const { superTitle, title, image, iconImage, subTitle, app } = props;
  return (
    <div className="w-full h-full relative overflow-hidden flex flex-col items-start text-left justify-end">
      <img
        src={image}
        alt="Image"
        className="absolute h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-zinc-900/80"></div>
      <div className="z-10 px-5 py-4 w-full flex flex-col items-start justify-end gap-1">
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
      <div className="bg-black/20 backdrop-blur-sm w-full px-5 py-4 flex justify-between gap-8 items-center">
        {/* Left */}
        <div className="flex items-center shrink-0">
          <div className="size-12 mask overflow-hidden mask-squircle shadow-sm">
            <img
              src={iconImage}
              alt="Icon"
              className="h-full w-full object-cover"
            />
          </div>
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
        <button
          onTouchStart={(e) => {
            e.stopPropagation();
          }}
          onTouchEnd={(e) => {
            e.stopPropagation();
          }}
          onTouchMove={(e) => {
            e.stopPropagation();
          }}
          onClick={(e) => {
            e.stopPropagation();
          }}
          className="bg-white/30 rounded-full py-2 px-5 active:brightness-90 active:scale-95 transition-all duration-100 ease-in-out"
        >
          <p className="text-sm select-none font-semibold leading-snug">
            {app.price ? app.price : "Get"}
          </p>
        </button>
      </div>
    </div>
  );
}

export function GenericContent() {
  return (
    <div className="shrink-0 space-y-2 h-full px-5 py-4">
      <p className="text-zinc-400 py-1 w-full flex-col overflow-hidden font-normal">
        <span className="font-semibold text-white">Lorem ipsum</span> dolor sit
        amet, consectetur adipiscing elit. Morbi vel nisi eros. Vestibulum
        euismod justo eros, ac fringilla nibh blandit eget. Duis vitae nibh
        maximus orci hendrerit gravida. Vestibulum quis tristique dui, id congue
        metus. Fusce convallis arcu sed libero cursus varius.
      </p>
      <p className="text-zinc-400 py-1 w-full font-normal">
        <span className="font-semibold text-white">Phasellus arcu</span> est,
        congue sed neque sit amet, accumsan dapibus justo. Ut eget dui tellus.
        Nam tristique lacus gravida urna dictum volutpat. Phasellus feugiat
        felis at commodo laoreet. Praesent sit amet molestie tortor. Etiam
        pharetra, lacus vitae ullamcorper auctor, arcu urna laoreet risus, at
        feugiat diam turpis quis nisi.
      </p>
      <p className="text-zinc-400 py-1 w-full font-normal">
        <span className="font-semibold text-white">
          Integer nec maximus dui,
        </span>{" "}
        a facilisis massa. Lorem ipsum dolor sit amet, consectetur adipiscing
        elit. Sed ultricies elit ac lectus sollicitudin tincidunt. Donec mi
        eros, hendrerit eu iaculis tincidunt, consectetur ut urna. Donec neque
        ex, efficitur in dapibus ac, iaculis sed dui.
      </p>
      <p className="text-zinc-400 py-1 w-full flex-col overflow-hidden font-normal">
        <span className="font-semibold text-white">Lorem ipsum</span> dolor sit
        amet, consectetur adipiscing elit. Morbi vel nisi eros. Vestibulum
        euismod justo eros, ac fringilla nibh blandit eget. Duis vitae nibh
        maximus orci hendrerit gravida. Vestibulum quis tristique dui, id congue
        metus. Fusce convallis arcu sed libero cursus varius.
      </p>
      <p className="text-zinc-400 py-1 w-full font-normal">
        <span className="font-semibold text-white">Phasellus arcu</span> est,
        congue sed neque sit amet, accumsan dapibus justo. Ut eget dui tellus.
        Nam tristique lacus gravida urna dictum volutpat. Phasellus feugiat
        felis at commodo laoreet. Praesent sit amet molestie tortor. Etiam
        pharetra, lacus vitae ullamcorper auctor, arcu urna laoreet risus, at
        feugiat diam turpis quis nisi.
      </p>
      <p className="text-zinc-400 py-1 w-full font-normal">
        <span className="font-semibold text-white">
          Integer nec maximus dui,
        </span>{" "}
        a facilisis massa. Lorem ipsum dolor sit amet, consectetur adipiscing
        elit. Sed ultricies elit ac lectus sollicitudin tincidunt. Donec mi
        eros, hendrerit eu iaculis tincidunt, consectetur ut urna. Donec neque
        ex, efficitur in dapibus ac, iaculis sed dui.
      </p>
    </div>
  );
}
