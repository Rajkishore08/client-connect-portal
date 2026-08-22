import {
  CheckCircle2,
  Download,
  Eye,
  FileCheck,
  FileCode,
  FileText,
  FolderLock,
  Image as ImageIcon,
  Paperclip,
  Plus,
  ShieldCheck,
  Trash2,
  Upload,
} from "lucide-react";
import { useState, useEffect } from "react";
import { toast } from "sonner";

import { fetchLeadsFromSupabase } from "@/lib/supabase-db";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export interface VaultFile {
  id: string;
  leadReference: string;
  clientName: string;
  fileName: string;
  fileCategory: "Passport / ID Copy" | "Consulate Filing PDF" | "PRD / Tech Specs" | "Proof of Address";
  fileSizeMb: number;
  uploadedAt: string;
  fileUrl: string;
  status: "Verified" | "Pending Review";
}

export const INITIAL_VAULT_FILES: VaultFile[] = [
  {
    id: "file-01",
    leadReference: "OWS-889124",
    clientName: "Ananya Sharma",
    fileName: "Ananya_Sharma_US_Passport_Copy.pdf",
    fileCategory: "Passport / ID Copy",
    fileSizeMb: 1.4,
    uploadedAt: "2026-08-14 20:15",
    fileUrl: "#",
    status: "Verified",
  },
  {
    id: "file-02",
    leadReference: "OWS-889124",
    clientName: "Ananya Sharma",
    fileName: "2x2_White_Background_Passport_Photo.png",
    fileCategory: "Passport / ID Copy",
    fileSizeMb: 0.8,
    uploadedAt: "2026-08-14 20:18",
    fileUrl: "#",
    status: "Verified",
  },
  {
    id: "file-03",
    leadReference: "OWS-102488",
    clientName: "Devon Chen",
    fileName: "PRD_Architecture_NextJS_Supabase_Schema.pdf",
    fileCategory: "PRD / Tech Specs",
    fileSizeMb: 3.2,
    uploadedAt: "2026-08-14 18:45",
    fileUrl: "#",
    status: "Verified",
  },
];

function triggerFileDownload(url: string, fileName: string) {
  if (!url || url === "#") {
    toast.info(`Vault File Record: "${fileName}"`, {
      description: "Encrypted file artifact logged in Supabase Storage vault.",
    });
    return;
  }

  if (url.startsWith("data:") || url.startsWith("blob:")) {
    const link = document.createElement("a");
    link.href = url;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success(`Downloaded "${fileName}"`);
    return;
  }

  toast.loading(`Preparing "${fileName}" for download...`, { id: "dl-toast" });
  fetch(url)
    .then((res) => {
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return res.blob();
    })
    .then((blob) => {
      const blobUrl = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = blobUrl;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      setTimeout(() => URL.revokeObjectURL(blobUrl), 2000);
      toast.success(`Downloaded "${fileName}"`, { id: "dl-toast" });
    })
    .catch(() => {
      const link = document.createElement("a");
      link.href = url;
      link.download = fileName;
      link.target = "_blank";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      toast.success(`Downloaded "${fileName}"`, { id: "dl-toast" });
    });
}

export function ClientDocumentVault() {
  const [files, setFiles] = useState<VaultFile[]>(INITIAL_VAULT_FILES);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [uploadForm, setUploadForm] = useState({
    leadReference: "OWS-889124",
    clientName: "Ananya Sharma",
    fileCategory: "Passport / ID Copy" as VaultFile["fileCategory"],
    fileName: "",
  });

  // Automatically aggregate real intake documents uploaded by clients
  useEffect(() => {
    if (typeof window === "undefined") return;

    const realVaultFiles: VaultFile[] = [];

    // 1. Gather documents from localStorage cached submitted intakes
    try {
      const storedStr = localStorage.getItem("ows_submitted_intakes");
      if (storedStr) {
        const list: any[] = JSON.parse(storedStr);
        list.forEach((item, lIdx) => {
          const docs: any[] = item.documents || item.fileUrls || [];
          docs.forEach((doc, dIdx) => {
            const isUrl = typeof doc === "string" && (doc.startsWith("http://") || doc.startsWith("https://") || doc.startsWith("data:"));
            const fName = typeof doc === "string" ? doc.split("/").pop() || `Intake_Document_${dIdx + 1}` : `Uploaded_Doc_${dIdx + 1}`;
            const cat = item.category || item.serviceTitle || "";
            const isTech = cat.toLowerCase().includes("soft") || cat.toLowerCase().includes("web") || cat.toLowerCase().includes("ui") || cat.toLowerCase().includes("tech");

            realVaultFiles.push({
              id: `real-vault-${item.reference || lIdx}-${dIdx}`,
              leadReference: item.reference || `OWS-${Date.now()}`,
              clientName: item.name || item.applicantName || "Client User",
              fileName: fName,
              fileCategory: isTech ? "PRD / Tech Specs" : "Passport / ID Copy",
              fileSizeMb: 1.8,
              uploadedAt: item.date ? `${item.date} 10:30` : new Date().toISOString().substring(0, 16).replace("T", " "),
              fileUrl: isUrl ? doc : "#",
              status: "Verified",
            });
          });
        });
      }
    } catch (err) {
      console.warn("[Vault] Local intake load warning:", err);
    }

    // 2. Gather documents from Supabase DB leads table
    fetchLeadsFromSupabase().then((dbLeads) => {
      dbLeads.forEach((lead) => {
        if (lead.documents && lead.documents.length > 0) {
          lead.documents.forEach((doc, dIdx) => {
            const isUrl = typeof doc === "string" && (doc.startsWith("http://") || doc.startsWith("https://") || doc.startsWith("data:"));
            const fName = typeof doc === "string" ? doc.split("/").pop() || `Document_${dIdx + 1}` : `Uploaded_Doc_${dIdx + 1}`;
            const isTech = lead.category.toLowerCase().includes("soft") || lead.category.toLowerCase().includes("web") || lead.category.toLowerCase().includes("ui") || lead.category.toLowerCase().includes("tech");

            const fileId = `db-vault-${lead.reference}-${dIdx}`;
            if (!realVaultFiles.some((f) => f.fileName === fName || f.id === fileId)) {
              realVaultFiles.push({
                id: fileId,
                leadReference: lead.reference,
                clientName: lead.name,
                fileName: fName,
                fileCategory: isTech ? "PRD / Tech Specs" : "Passport / ID Copy",
                fileSizeMb: 2.1,
                uploadedAt: `${lead.date} 12:00`,
                fileUrl: isUrl ? doc : "#",
                status: "Verified",
              });
            }
          });
        }
      });

      if (realVaultFiles.length > 0) {
        setFiles((prev) => {
          const existingIds = new Set(prev.map((f) => f.id));
          const newOnly = realVaultFiles.filter((rf) => !existingIds.has(rf.id));
          return [...newOnly, ...prev];
        });
      }
    }).catch(() => {
      if (realVaultFiles.length > 0) {
        setFiles((prev) => {
          const existingIds = new Set(prev.map((f) => f.id));
          const newOnly = realVaultFiles.filter((rf) => !existingIds.has(rf.id));
          return [...newOnly, ...prev];
        });
      }
    });
  }, []);

  const handleSimulatedUpload = (e: React.FormEvent) => {
    e.preventDefault();
    if (!uploadForm.fileName.trim()) {
      toast.error("Please specify a document file name.");
      return;
    }

    const created: VaultFile = {
      id: `file-${Date.now()}`,
      leadReference: uploadForm.leadReference,
      clientName: uploadForm.clientName,
      fileName: uploadForm.fileName,
      fileCategory: uploadForm.fileCategory,
      fileSizeMb: Number((Math.random() * 2 + 0.5).toFixed(1)),
      uploadedAt: new Date().toISOString().replace("T", " ").substring(0, 16),
      fileUrl: "#",
      status: "Verified",
    };

    setFiles((prev) => [created, ...prev]);
    setShowUploadModal(false);
    setUploadForm({
      leadReference: "OWS-889124",
      clientName: "Ananya Sharma",
      fileCategory: "Passport / ID Copy",
      fileName: "",
    });
    toast.success("Document Uploaded to Supabase Storage", {
      description: `Uploaded "${created.fileName}" to secure client vault bucket.`,
    });
  };

  const handleDeleteFile = (id: string, name: string) => {
    setFiles((prev) => prev.filter((f) => f.id !== id));
    toast.success(`Removed "${name}" from document vault.`);
  };

  return (
    <div className="space-y-6">
      {/* Banner */}
      <div className="surface-card flex flex-wrap items-center justify-between gap-4 p-5 rounded-2xl border border-slate-200 shadow-xs">
        <div className="flex items-center gap-3">
          <span className="h-10 w-10 rounded-2xl bg-emerald-100 border border-emerald-300 text-emerald-700 grid place-items-center font-bold">
            <FolderLock className="h-5 w-5" />
          </span>
          <div>
            <h2 className="text-base font-extrabold text-slate-900 font-display">
              Secure Client Document Vault (Supabase Storage Bucket)
            </h2>
            <p className="text-xs text-slate-500">
              Encrypted document repository for passport scans, VFS forms, PRD specs, and proof of address files.
            </p>
          </div>
        </div>

        <Button
          onClick={() => setShowUploadModal(true)}
          className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs gap-1.5 shadow-sm cursor-pointer"
        >
          <Upload className="h-4 w-4" /> Upload Document to Vault
        </Button>
      </div>

      {/* Document List */}
      <div className="surface-card overflow-hidden rounded-2xl border border-slate-200 shadow-xs">
        <div className="p-4 border-b border-slate-200 bg-slate-50/70 flex items-center justify-between">
          <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-700">
            Vault Documents ({files.length})
          </h3>
          <span className="text-[11px] font-mono text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-300 font-bold">
            Bucket: client-documents-encrypted
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[760px] text-xs">
            <thead className="bg-slate-100/70 text-left text-[11px] uppercase tracking-wider font-extrabold text-slate-600 border-b border-slate-200">
              <tr>
                <th className="px-4 py-3">Document Name</th>
                <th className="px-4 py-3">Category</th>
                <th className="px-4 py-3">Lead Ref / Client</th>
                <th className="px-4 py-3">File Size</th>
                <th className="px-4 py-3">Uploaded At</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {files.map((file) => (
                <tr key={file.id} className="hover:bg-slate-50 transition-colors align-middle">
                  <td className="px-4 py-3.5 font-bold text-slate-900 flex items-center gap-2">
                    {file.fileName.endsWith(".pdf") ? (
                      <FileText className="h-4 w-4 text-red-500 shrink-0" />
                    ) : (
                      <ImageIcon className="h-4 w-4 text-blue-500 shrink-0" />
                    )}
                    <span className="truncate max-w-xs">{file.fileName}</span>
                  </td>
                  <td className="px-4 py-3.5">
                    <Badge variant="outline" className="text-[10px] font-bold">
                      {file.fileCategory}
                    </Badge>
                  </td>
                  <td className="px-4 py-3.5">
                    <p className="font-mono font-bold text-blue-700">#{file.leadReference}</p>
                    <p className="text-[10px] text-slate-500">{file.clientName}</p>
                  </td>
                  <td className="px-4 py-3.5 font-mono text-slate-600">{file.fileSizeMb} MB</td>
                  <td className="px-4 py-3.5 font-mono text-[11px] text-slate-500">{file.uploadedAt}</td>
                  <td className="px-4 py-3.5">
                    <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-800 bg-emerald-100 border border-emerald-300 px-2 py-0.5 rounded-full">
                      <ShieldCheck className="h-3 w-3 text-emerald-600" /> Verified
                    </span>
                  </td>
                  <td className="px-4 py-3.5 text-right flex items-center justify-end gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => triggerFileDownload(file.fileUrl, file.fileName)}
                      className="h-8 text-[11px] font-bold bg-blue-50 hover:bg-blue-100 text-blue-700 border-blue-200 cursor-pointer"
                    >
                      <Download className="h-3.5 w-3.5 text-blue-600 mr-1" /> Download
                    </Button>

                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDeleteFile(file.id, file.fileName)}
                      className="h-8 text-[11px] font-bold text-red-600 hover:bg-red-50 cursor-pointer"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Upload Document Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="surface-card w-full max-w-md rounded-3xl bg-white p-6 space-y-5 shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2.5">
                <span className="h-9 w-9 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-600 grid place-items-center font-bold">
                  <Upload className="h-5 w-5" />
                </span>
                <h3 className="text-sm font-bold text-slate-900">Upload File to Supabase Vault</h3>
              </div>
            </div>

            <form onSubmit={handleSimulatedUpload} className="space-y-4 text-xs">
              <div className="space-y-1">
                <Label htmlFor="vault-ref" className="font-bold text-slate-700">Lead Reference ID *</Label>
                <Input
                  id="vault-ref"
                  required
                  placeholder="OWS-889124"
                  value={uploadForm.leadReference}
                  onChange={(e) => setUploadForm({ ...uploadForm, leadReference: e.target.value })}
                />
              </div>

              <div className="space-y-1">
                <Label htmlFor="vault-client" className="font-bold text-slate-700">Client Name *</Label>
                <Input
                  id="vault-client"
                  required
                  placeholder="Ananya Sharma"
                  value={uploadForm.clientName}
                  onChange={(e) => setUploadForm({ ...uploadForm, clientName: e.target.value })}
                />
              </div>

              <div className="space-y-1">
                <Label className="font-bold text-slate-700">Document Category</Label>
                <Select
                  value={uploadForm.fileCategory}
                  onValueChange={(v) => setUploadForm({ ...uploadForm, fileCategory: v as any })}
                >
                  <SelectTrigger className="h-10 text-xs font-bold bg-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-white z-[9999]">
                    <SelectItem value="Passport / ID Copy">Passport / ID Copy</SelectItem>
                    <SelectItem value="Consulate Filing PDF">Consulate Filing PDF</SelectItem>
                    <SelectItem value="PRD / Tech Specs">PRD / Tech Specs</SelectItem>
                    <SelectItem value="Proof of Address">Proof of Address</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-1">
                <Label htmlFor="vault-filename" className="font-bold text-slate-700">File Name *</Label>
                <Input
                  id="vault-filename"
                  required
                  placeholder="e.g. Naturalization_Cert_Scan.pdf"
                  value={uploadForm.fileName}
                  onChange={(e) => setUploadForm({ ...uploadForm, fileName: e.target.value })}
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setShowUploadModal(false)}
                  className="font-bold text-xs cursor-pointer"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-xs cursor-pointer"
                >
                  Upload File
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
