import React from 'react';
import { redirect } from 'next/navigation';

export default function VideoGalleryRedirect() {
  redirect('/gallery?tab=videos');
}
