import UploadCareButton from "@/components/uploadcare-button";

const DesktopPage = async () => {
  const handleUpload = async (cdnUrl: string) => {
    // Implement your upload logic here
    console.log("Uploaded file URL:", cdnUrl);
    // You might want to save this URL to your database or perform other actions
  };

  return (
    <div>
      <UploadCareButton onUpload={handleUpload} />
    </div>
  );
};

export default DesktopPage;
