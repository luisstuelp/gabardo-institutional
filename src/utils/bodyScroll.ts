export function lockBodyScroll() {
  if (typeof document === 'undefined') return;

  const { body } = document;
  const lockCount = Number(body.dataset.scrollLockCount ?? '0');

  if (lockCount === 0) {
    body.dataset.originalOverflow = body.style.overflow;
    body.style.overflow = 'hidden';
  }

  body.dataset.scrollLockCount = String(lockCount + 1);
}

export function unlockBodyScroll() {
  if (typeof document === 'undefined') return;

  const { body } = document;
  const lockCount = Number(body.dataset.scrollLockCount ?? '0');

  if (lockCount <= 1) {
    const originalOverflow = body.dataset.originalOverflow ?? '';
    if (originalOverflow) {
      body.style.overflow = originalOverflow;
    } else {
      body.style.removeProperty('overflow');
    }
    delete body.dataset.scrollLockCount;
    delete body.dataset.originalOverflow;
    return;
  }

  body.dataset.scrollLockCount = String(lockCount - 1);
}
