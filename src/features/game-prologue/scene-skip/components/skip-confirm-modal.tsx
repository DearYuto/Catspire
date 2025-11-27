import { Button } from "@/shared/components";
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
      className="bg-opacity-70 absolute inset-0 z-100 flex items-center justify-center bg-black backdrop-blur-sm"
      onClick={() => handleShowSkipConfirmModal(false)}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        transition={{ type: "spring", duration: 0.5 }}
        className="bg-opacity-90 mx-4 max-w-md rounded-2xl bg-slate-950 p-8 backdrop-blur-md"
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
    <div className="mb-6 text-center">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.2, type: "spring" }}
        className="bg-opacity-20 mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-linear-to-br from-amber-500 to-orange-600"
      >
        <span className="text-4xl">⏭️</span>
      </motion.div>
      <h3 className="mb-3 text-xl font-bold text-white md:text-2xl">
        프롤로그를 건너뛰시겠습니까?
      </h3>
      <p className="text-base text-gray-400">
        스토리를 나중에 다시 볼 수 있습니다.
      </p>
    </div>
  );
};

const SkipButton = ({ handleSkip }: { handleSkip: () => void }) => {
  return (
    <Button onClick={handleSkip} className="btn btn-gold">
      건너뛰기
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
      className="btn-ghost"
    >
      계속 보기
    </Button>
  );
};
