import React from 'react';
import { NextPage } from 'next';

export type NextPageWithLayout<P = {}> = NextPage<P> & {
  getLayout?: (page: React.ReactElement) => React.ReactNode;
};
