import { Button } from "@/shared/components";
import { DoubleArrowIcon } from "@/shared/components/icons/double-arrow-icon";
import { motion } from "framer-motion";

interface SkipConfirmModalProps {
  handleShowSkipConfirmModal: (showSkipConfirm: boolean) => void;
  handleSkip: () => void;
}

export const SkipConfirmModal = ({
  handleShowSkipConfirmModal,
  handleSkip,
}: SkipConfirmModalProps) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-opacity-70 absolute inset-0 z-100 flex items-center justify-center backdrop-blur-sm"
      onClick={() => handleShowSkipConfirmModal(false)}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        transition={{ type: "spring", duration: 0.5 }}
        className="mx-4 max-w-md min-w-[450px] rounded-2xl border-1 border-slate-700/20 bg-slate-900/40 p-8 backdrop-blur-md"
        onClick={(e) => e.stopPropagation()}
      >
        <SkipConfirmModalContent />

        <div className="flex flex-col gap-3">
          <SkipButton handleSkip={handleSkip} />
          <ContinueButton
            handleShowSkipConfirmModal={handleShowSkipConfirmModal}
          />
        </div>
      </motion.div>
    </motion.div>
  );
};

const SkipConfirmModalContent = () => {
  return (
    <div className="mb-6 flex flex-col items-center justify-center text-center">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.2, type: "spring" }}
        className="bg-opacity-20 mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full"
      >
        <motion.div initial={{ scale: 1.4 }}>
          <DoubleArrowIcon className="pl-1 text-4xl text-white" />
        </motion.div>
      </motion.div>

      <h3 className="mb-3 text-xl font-bold text-white md:text-2xl">
        프롤로그를 스킵할까요?
      </h3>
      <p className="text-base text-white/60">나중에 다시 볼 수 있어요.</p>
    </div>
  );
};

const SkipButton = ({ handleSkip }: { handleSkip: () => void }) => {
  return (
    <Button onClick={handleSkip} className="btn btn-gold shadow-none">
      SKIP
    </Button>
  );
};

const ContinueButton = ({
  handleShowSkipConfirmModal,
}: {
  handleShowSkipConfirmModal: (showSkipConfirm: boolean) => void;
}) => {
  return (
    <Button
      onClick={() => handleShowSkipConfirmModal(false)}
      className="btn btn-ghost font-medium"
    >
      CONTINUE
    </Button>
  );
};
