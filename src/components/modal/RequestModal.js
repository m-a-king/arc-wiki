import * as React from 'react';
import CommonModal from './CommonModal';

export default function RequestModal({
  open,
  onClose,
  title,
}) {
  return (
    <CommonModal
      open={open}
      onClose={onClose}
      title={title}
    >
      <div>Your content goes here</div>
    </CommonModal>
  );
}