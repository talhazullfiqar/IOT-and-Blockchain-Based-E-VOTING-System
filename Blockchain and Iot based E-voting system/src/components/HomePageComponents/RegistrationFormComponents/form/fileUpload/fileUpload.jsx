"use client";
import { useState } from "react";
import React from "react";
import "./fileUpload.css";

export default function FileUploadComponent({
  imageHash,
  headings,
  fileUploaded,
  fileInputId,
}) {
  const [file, setFile] = useState(null);
  const [filePreview, setFilePreview] = useState(null);
  const [uploadStatus, setUploadStatus] = useState("idle");
  const [ipfsHash, setIpfsHash] = useState("");
  const [uploadedImageUrl, setUploadedImageUrl] = useState("");

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
    setFilePreview(URL.createObjectURL(selectedFile));
    setUploadStatus("idle");
    setIpfsHash("");
    setUploadedImageUrl("");
  };

  const handleUpload = async () => {
    if (!file) return;

    setUploadStatus("pending");

    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch(
        "https://api.pinata.cloud/pinning/pinFileToIPFS",
        {
          method: "POST",
          headers: {
            pinata_api_key: "API",
            pinata_secret_api_key: "SECRET-KEY",
          },
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error("Pinata upload failed");
      }

      const data = await response.json();
      const hash = data.IpfsHash;

      setIpfsHash(hash);
      imageHash(hash);
      setUploadedImageUrl(`https://gateway.pinata.cloud/ipfs/${hash}`);
      setUploadStatus("uploaded");
      fileUploaded(true);
    } catch (error) {
      console.error("Pinata upload failed", error);
      setUploadStatus("idle");
    }
  };

  const handleCancel = () => {
    setFile(null);
    setFilePreview(null);
    setUploadStatus("idle");
    setIpfsHash("");
    setUploadedImageUrl("");
    document.getElementById(fileInputId).value = "";
  };

  const triggerFileInput = () => {
    document.getElementById(fileInputId).click();
  };

  return (
    <div className="upload-container">
      <div className="actions">
        <button
          className="choose-btn"
          onClick={triggerFileInput}
          disabled={uploadStatus === "uploaded"}
        >
          + Choose
        </button>
        <input
          id={fileInputId}
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          style={{ display: "none" }}
          disabled={uploadStatus === "uploaded"}
        />
        {file && uploadStatus !== "uploaded" && (
          <button className="upload-btn" onClick={handleUpload}>
            Upload to Pinata
          </button>
        )}
        {file && uploadStatus !== "uploaded" && (
          <button className="cancel-btn" onClick={handleCancel}>
            Cancel
          </button>
        )}
      </div>

      <div className="file-section">
        {!file && <p className="upload-instruction">{headings}</p>}
        {file && (
          <div className="file-info">
            <div className="file-details">
              <span className="file-name">{file.name}</span>
              <span className="file-size">
                {(file.size / 1024).toFixed(2)} KB
              </span>
              {uploadStatus === "pending" && (
                <span className="file-status pending">Uploading...</span>
              )}
              {uploadStatus === "uploaded" && (
                <span className="file-status uploaded">Uploaded</span>
              )}
            </div>
            {filePreview && (
              <img
                src={filePreview}
                alt="Selected file preview"
                className="file-preview"
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
}
