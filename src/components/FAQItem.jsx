import { HiOutlineTrash } from 'react-icons/hi';
import { useState } from 'react';
import {
  HiMiniMinus,
  HiMiniPlus,
  HiMiniChevronUp,
  HiMiniChevronDown,
} from 'react-icons/hi2';

function Icon({ children, className }) {
  return (
    <span
      className={`w-[27px] h-[27px] rounded-sm bg-gray-100 flex items-center justify-center text-lg duration-300 cursor-pointer ${className}`}
    >
      {children}
    </span>
  );
}

export default function FAQItem({
  question,
  answer,
  onDelete,
  onMoveUp,
  onMoveDown,
}) {
  const [isShowAnswer, setIsShowAnswer] = useState(false);

  function showAnswer() {
    setIsShowAnswer((state) => !state);
  }

  return (
    <>
      <div className="grid grid-cols-[auto_1fr_auto_auto_auto] gap-2.5 items-center py-3 duration-300">
        <Icon
          onClick={onDelete}
          className="bg-transparent text-red-500 hover:bg-red-500 hover:text-white"
        >
          <HiOutlineTrash />
        </Icon>
        <p className="font-medium">{question}</p>
        <Icon onClick={onMoveUp}>
          <HiMiniChevronUp />
        </Icon>
        <Icon onClick={onMoveDown}>
          <HiMiniChevronDown />
        </Icon>
        <Icon onClick={showAnswer} active={isShowAnswer}>
          {isShowAnswer ? <HiMiniMinus /> : <HiMiniPlus />}
        </Icon>
      </div>
      <p
        className={`overflow-hidden font-light duration-300 ${isShowAnswer ? 'py-1.25 px-10.5 h-fit' : 'py-0 px-10.5 h-0'}`}
      >
        {answer}
      </p>
    </>
  );
}
