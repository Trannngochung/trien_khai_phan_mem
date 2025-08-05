import DetailMedicalRecordPage from "@/components/doctor/DetailMedicalRecord/DetailMedicalRecordPage";
import React from "react";

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return (
    <div className="container">
      <DetailMedicalRecordPage medicalRecordID={slug} />
    </div>
  );
}
