import { useState, useEffect } from 'react';
import { DefaultEditor } from '../DefaultEditor';

const charCodeMap = {
  '\\n': 13,
  '\\t': 9,
  '\\b': 8,
  '\\\\': 220,
  "\\'": 222,
  '\\"': 34,
};

export const Backslash = () => {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [mode, setMode] = useState('Escape');

  useEffect(() => {
    if (mode === 'Escape') {
      const str = JSON.stringify(input);
      setOutput(str.substring(1, str.length - 1));
    } else {
      let str = input;
      for (const [key, value] of Object.entries(charCodeMap)) {
        str = str.replaceAll(key, String.fromCharCode(value));
      }
      setOutput(str);
    }
  }, [input, mode]);

  return (
    <DefaultEditor
      input={input}
      mode={mode}
      setInput={setInput}
      setMode={setMode}
      output={output}
      modes={['Escape', 'Unescape']}
      sample={mode === 'Escape' ? 'Hello\t"World"' : 'Hello\\t\\"World\\"'}
    />
  );
};

export default Backslash;
