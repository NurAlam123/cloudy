'use client';

import { motion, Variants } from 'motion/react';
import { IconButton } from './Button';
import { useCallback, useRef, useState } from 'react';
import { cn } from '@/utils';
import { setTitle } from '@/actions/appAction';
import { usePathname, useRouter } from 'next/navigation';
import useAppStore from '@/store/useAppStore';
import { Payload } from '@/lib/types';

const PromptField = () => {
  const inputField = useRef<HTMLDivElement>(null);
  const inputFieldContainer = useRef<HTMLDivElement>(null);
  const [placeholderShown, setPlaceholderShown] = useState<boolean>(true);
  const [inputValue, setInputValue] = useState<string>('');
  const [submitting, setSubmitting] = useState<boolean>(false);

  const pathname = usePathname();

  const setPromptSubmitting = useAppStore((state) => state.setPromptSubmitting);
  const setPayload = useAppStore((state) => state.setPayload);

  const router = useRouter();

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
    setPromptSubmitting(true);

    const payload: Payload = {
      prompt: inputValue,
      requestType: 'user_prompt',
    };

    setPayload(payload);

    const isConversationPage = pathname.match(/^\/chat\/([^\/]+)$/);
    let conversationID = null;

    if (!isConversationPage) {
      const conversation = await setTitle(payload);
      conversationID = conversation?.$id ?? '';
    } else {
      conversationID = isConversationPage[1];
    }

    const url = `/chat/${conversationID}`;

    setSubmitting(false);

    inputField.current.innerHTML = '';
    handleInputChagne();

    if (!isConversationPage) {
      if (conversationID) {
        history.pushState({ new: true }, '', url);
        router.push(url);
        return;
      } else {
        return router.push('/');
      }
    }

    history.pushState({ new: false }, '', url);
    setPromptSubmitting(false);
  }, [
    handleInputChagne,
    inputValue,
    submitting,
    router,
    setPayload,
    setPromptSubmitting,
    pathname,
  ]);

  return (
    <motion.div
      className='prompt-field-container overflow-y-hidden relative'
      variants={promptFieldVariant}
      initial='hidden'
      animate='visible'
      ref={inputFieldContainer}
    >
      <motion.div
        className={cn(
          'prompt-field min-h-[40px] max-h-[240px] overflow-y-auto overflow-x-hidden whitespace-pre-wrap break-words max-w-[90%]',
          !placeholderShown && 'after:hidden',
        )}
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
          // Handle case where use press only "Ctrl+Enter" key
          if (e.key === 'Enter' && !e.shiftKey && e.ctrlKey) {
            e.preventDefault();
            handleSubmit();
          }
        }}
      />

      <div className='me-2 absolute right-2 top-1/2 -translate-y-1/2 flex justify-center items-center'>
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
