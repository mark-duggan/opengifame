'use client';
import React from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { logger } from '@lib/logger';
import { Loading } from '@components';

const UploadPage = () => {
  const router = useRouter();
  const { status } = useSession();
  React.useEffect(() => {
    if (status === 'unauthenticated') {
      router.replace('/auth/signin');
    }
  }, [status, router]);

  return (
    <div>
      <Loading />
    </div>
  );
};

export default UploadPage;
