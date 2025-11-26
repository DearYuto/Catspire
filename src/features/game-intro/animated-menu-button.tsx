import { Button } from "@/shared/ui";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { MenuItem } from "./consts/menu-item";

interface AnimatedMenuButtonProps {
  item: MenuItem;
}

const motionConfig = {
  whileHover: { scale: 1.05, x: 5 },
  whileTap: { scale: 0.95 },
};

export const AnimatedMenuButton = ({ item }: AnimatedMenuButtonProps) => {
  const router = useRouter();

  return (
    <motion.div {...motionConfig}>
      <Button
        onClick={() => router.push(item.path)}
        className={`btn btn-${item.variant} min-w-[180px] text-base text-${item.textColor}`}
      >
        {item.label}
      </Button>
    </motion.div>
  );
};
