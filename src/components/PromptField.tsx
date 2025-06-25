'use client';

import { motion, Variants } from 'motion/react';
import { IconButton } from './Button';
import { useCallback, useRef, useState } from 'react';
import { cn } from '@/utils';
import appAction from '@/actions/appAction';

const PromptField = () => {
  const inputField = useRef<HTMLDivElement>(null);
  const inputFieldContainer = useRef<HTMLDivElement>(null);
  const [placeholderShown, setPlaceholderShown] = useState<boolean>(true);
  const [inputValue, setInputValue] = useState<string>('');
  const [submitting, setSubmitting] = useState<boolean>(false);

  const promptFieldVariant: Variants = {
    hidden: { scaleX: 0 },
    visible: {
      scaleX: 1,
      transition: {
        when: 'beforeChildren',
        staggerChildren: 0.2,
        duration: 0.4,
        delay: 0.4,
        ease: [0.05, 0.7, 0.1, 1],
      },
    },
  };

  const promptFieldChildrenVariant: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  // Move cursor to the end
  const moveCursorToEnd = useCallback(() => {
    if (!inputField.current) return;

    const editableElem = inputField.current;
    const range = document.createRange();
    const selection = window.getSelection();

    // set the range to teh last child
    range.selectNodeContents(editableElem);
    range.collapse(false);

    // clear existing selections
    selection?.removeAllRanges();
    selection?.addRange(range);
  }, []);

  // Handle input
  const handleInputChagne = useCallback(() => {
    if (!inputField.current) return;

    if (inputField.current.innerText === '\n')
      inputField.current.innerText = '';

    setPlaceholderShown(!inputField.current.innerText);
    setInputValue(inputField.current.innerText.trim());
  }, []);

  // Handle paste
  const handlePaste = useCallback(
    (e: React.ClipboardEvent<HTMLDivElement>) => {
      if (!inputField.current) return;
      e.preventDefault();
      inputField.current.innerText += e.clipboardData.getData('text');
      handleInputChagne();
      moveCursorToEnd();
    },
    [handleInputChagne, moveCursorToEnd],
  );

  // Handle submit
  const handleSubmit = useCallback(async () => {
    if (!inputField.current) return;

    if (!inputValue || submitting) return;

    setSubmitting(true);

    await appAction({
      prompt: inputValue,
      requestType: 'user_prompt',
    });

    setSubmitting(false);

    inputField.current.innerHTML = '';
    handleInputChagne();
  }, [handleInputChagne, inputValue, submitting]);

  return (
    <motion.div
      className='prompt-field-container'
      variants={promptFieldVariant}
      initial='hidden'
      animate='visible'
      ref={inputFieldContainer}
    >
      <motion.div
        className={cn('prompt-field', !placeholderShown && 'after:hidden')}
        contentEditable
        role='textbox'
        aria-multiline
        aria-label='Enter a prompt here'
        data-placeholder='Enter a prompt here'
        variants={promptFieldChildrenVariant}
        ref={inputField}
        onInput={handleInputChagne}
        onPaste={handlePaste}
        onKeyDown={(e) => {
          // Handle case where use press only "Enter" key
          if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSubmit();
          }
        }}
      />

      <div className='me-2 mt-2'>
        <IconButton
          title='send'
          icon='/send.svg'
          className='grid dark:hidden ms-auto'
          size='w-5 h-5'
          variants={promptFieldChildrenVariant}
          onClick={handleSubmit}
        />
        <IconButton
          title='send'
          icon='/send-dark.svg'
          className='dark:grid hidden ms-auto'
          size='w-5 h-5'
          variants={promptFieldChildrenVariant}
          onClick={handleSubmit}
        />
      </div>
    </motion.div>
  );
};

export default PromptField;
