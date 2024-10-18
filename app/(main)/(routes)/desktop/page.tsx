"use client";

import UploadCareButton from "@/components/uploadcare-button";

const DesktopPage = () => {
  const handleUpload = async (cdnUrl: string) => {
    // Implement your upload logic here
    console.log("File uploaded:", cdnUrl);
    // Don't return anything
  };

  return (
    <div>
      <UploadCareButton onUpload={handleUpload} />
    </div>
  );
};

export default DesktopPage;
