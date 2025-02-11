import Image from "next/image";

const WorkmateHub = (
  props: Omit<
    React.ComponentProps<typeof Image>,
    "src" | "alt" | "width" | "height"
  >
) => (
  <Image
    src="/assets/images/icon.png"
    alt="Workmate Hub Logo"
    width={128}
    height={128}
    {...props}
  />
);

export default WorkmateHub;
