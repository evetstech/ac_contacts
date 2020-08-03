import React, { FunctionComponent, useState, useCallback } from 'react';
import './TextInput.scss';

type TextInputProps = {
  placeholder?: string,
  error?: boolean,
  onTextChange?: (ev: React.ChangeEvent<HTMLInputElement>) => void,
  text?: string,
  disabled?: boolean
};

const TextInput: FunctionComponent<TextInputProps> = ({ placeholder, error, onTextChange = () => {}, text, disabled }) => {
  const [hasFocus, setHasFocus] = useState(false);
  const [compressedText, setCompressedText] = useState(text);

  const onFocus = useCallback(() => {
    setHasFocus(true);
  }, [setHasFocus]);

  const onBlur = useCallback(() => {
    setHasFocus(false);
  }, [setHasFocus]);

  const handleTextChange = useCallback((e) => {
    onTextChange(e.target.value);

    if (e.target.value.length > 26) {
      setCompressedText(e.target.value.substring(0, 24) + '...');
    } else {
      setCompressedText(e.target.value);
    }
  }, [onTextChange]);

  return (
    <input
      className={error ? 'input-error' : 'input-normal'}
      type='text'
      value={hasFocus && text ? text : compressedText}
      onChange={handleTextChange}
      onFocus={onFocus}
      onBlur={onBlur}
      disabled={disabled}
      placeholder={placeholder} />
  );
};

export default TextInput;