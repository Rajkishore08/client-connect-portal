import { FileText, Trash2, UploadCloud } from "lucide-react";
import { useRef, useState, type DragEvent } from "react";

import { Button } from "@/components/ui/button";

export interface LocalFile {
  id: string;
  name: string;
  size: number;
  file?: File;
  dataUrl?: string;
}

function formatSize(bytes: number) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

/**
 * Drag-and-drop uploader with native File object & Base64 Data URL preservation.
 */
export function FileUploader({
  files,
  onChange,
  label = "Upload your documents",
}: {
  files: LocalFile[];
  onChange: (files: LocalFile[]) => void;
  label?: string;
}) {
  const [dragging, setDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const addFiles = (list: FileList | null) => {
    if (!list || list.length === 0) return;
    const fileArray = Array.from(list);
    const newItems: LocalFile[] = [];

    let completed = 0;
    fileArray.forEach((f) => {
      const reader = new FileReader();
      reader.onload = () => {
        newItems.push({
          id: `${f.name}-${f.size}-${Math.random().toString(36).slice(2, 8)}`,
          name: f.name,
          size: f.size,
          file: f,
          dataUrl: reader.result as string,
        });
        completed++;
        if (completed === fileArray.length) {
          onChange([...files, ...newItems]);
        }
      };
      reader.onerror = () => {
        newItems.push({
          id: `${f.name}-${f.size}-${Math.random().toString(36).slice(2, 8)}`,
          name: f.name,
          size: f.size,
          file: f,
        });
        completed++;
        if (completed === fileArray.length) {
          onChange([...files, ...newItems]);
        }
      };
      reader.readAsDataURL(f);
    });
  };

  const onDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragging(false);
    addFiles(e.dataTransfer.files);
  };

  return (
    <div className="space-y-3">
      <div
        onDragOver={(e) => {
          e.preventDefault();
          setDragging(true);
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={onDrop}
        onClick={() => inputRef.current?.click()}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") inputRef.current?.click();
        }}
        className={`flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed px-4 py-8 text-center transition-colors ${
          dragging ? "border-primary bg-primary-soft" : "border-input bg-muted/40 hover:bg-muted"
        }`}
      >
        <UploadCloud className="h-7 w-7 text-primary" />
        <p className="mt-3 text-sm font-medium">{label}</p>
        <p className="mt-1 text-xs text-muted-foreground">
          Drag &amp; drop files here, or tap to browse. PDF, JPG or PNG.
        </p>
        <input
          ref={inputRef}
          type="file"
          multiple
          className="hidden"
          onChange={(e) => {
            addFiles(e.target.files);
            e.target.value = "";
          }}
        />
      </div>

      {files.length > 0 && (
        <ul className="space-y-2">
          {files.map((file) => (
            <li
              key={file.id}
              className="flex items-center gap-3 rounded-lg border border-border bg-card px-3 py-2.5"
            >
              <FileText className="h-4 w-4 shrink-0 text-muted-foreground" />
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium">{file.name}</p>
                <p className="text-xs text-muted-foreground">{formatSize(file.size)}</p>
              </div>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                aria-label={`Remove ${file.name}`}
                onClick={() => onChange(files.filter((f) => f.id !== file.id))}
              >
                <Trash2 className="h-4 w-4 text-destructive" />
              </Button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
