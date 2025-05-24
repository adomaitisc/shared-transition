import { motion } from "motion/react";

export function ExpandedContent() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="w-screen space-y-2 px-5 py-4 h-full"
    >
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
    </motion.div>
  );
}
