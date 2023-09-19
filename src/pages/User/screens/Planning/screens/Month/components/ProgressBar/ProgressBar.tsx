import * as React from 'react';

interface Props {
  color: string;
  progress: number;
}

export const ProgressBar: React.FC<Props> = ({
  color,
  progress,
}) => {
  const containerStyles = {
    height: 16,
    backgroundColor: "#e0e0de",
  }

  const fillerStyles = {
    height: '100%',
    width: `${progress}%`,
    backgroundColor: color,
    borderRadius: 'inherit',
  }

  return (
    <div style={containerStyles}>
      <div style={fillerStyles} />
    </div>
  );
};