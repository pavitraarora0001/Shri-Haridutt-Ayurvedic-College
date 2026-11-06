/**
 * Universal client-side PDF downloader.
 * Ensures the PDF is always downloaded to the user's disk/Downloads folder
 * rather than opening in a new tab or browser PDF previewer.
 */
export async function triggerPdfDownload(fileUrl: string, title?: string): Promise<void> {
  const cleanName = (title || 'document')
    .replace(/[^a-zA-Z0-9-_\s]/g, '')
    .trim()
    .replace(/\s+/g, '-');
  const filename = cleanName.toLowerCase().endsWith('.pdf') ? cleanName : `${cleanName || 'document'}.pdf`;

  try {
    // Fetch binary blob
    const response = await fetch(fileUrl);
    if (!response.ok) throw new Error(`HTTP error ${response.status}`);
    const blob = await response.blob();

    // Create local object URL
    const blobUrl = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = blobUrl;
    link.download = filename;
    link.style.display = 'none';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setTimeout(() => {
      window.URL.revokeObjectURL(blobUrl);
    }, 2000);
  } catch {
    // Fallback to server route with Content-Disposition: attachment
    const apiUrl = `/api/download?file=${encodeURIComponent(fileUrl)}&name=${encodeURIComponent(filename)}`;
    const link = document.createElement('a');
    link.href = apiUrl;
    link.download = filename;
    link.style.display = 'none';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
}
