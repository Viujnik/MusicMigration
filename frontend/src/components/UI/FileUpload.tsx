import React, { useCallback } from 'react';
import { Upload, Music, FileText } from 'lucide-react';
import { toast } from 'react-hot-toast';

interface FileUploadProps {
  onFileSelect: (file: File) => void;
  accept?: string;
  maxSize?: number;
}

export const FileUpload: React.FC<FileUploadProps> = ({
  onFileSelect,
  accept = '.txt',
  maxSize = 5
}) => {
  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    validateAndSetFile(file);
  }, [onFileSelect]);

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      validateAndSetFile(file);
    }
  };

  const validateAndSetFile = (file: File) => {
    if (!file.name.endsWith('.txt')) {
      toast.error('Пожалуйста, загрузите текстовый файл (.txt)');
      return;
    }

    if (file.size > maxSize * 1024 * 1024) {
      toast.error(`Файл слишком большой. Максимальный размер: ${maxSize}MB`);
      return;
    }

    onFileSelect(file);
    toast.success(`Файл "${file.name}" выбран`);
  };

  return (
    <div
      className="glass-card p-8 border-2 border-dashed border-white/20 hover:border-primary-500/50 transition-all duration-300 cursor-pointer group card-hover"
      onDrop={handleDrop}
      onDragOver={(e) => e.preventDefault()}
      onClick={() => document.getElementById('file-input')?.click()}
    >
      <input
        id="file-input"
        type="file"
        accept={accept}
        onChange={handleFileInput}
        className="hidden"
      />

      <div className="flex flex-col items-center justify-center space-y-4">
        <div className="p-4 bg-gradient-to-br from-primary-500/20 to-cyan-500/20 rounded-2xl group-hover:scale-110 transition-transform duration-300">
          <Upload className="w-12 h-12 text-primary-400" />
        </div>

        <div className="text-center space-y-2">
          <h3 className="text-xl font-semibold text-white">
            Перетащите файл сюда
          </h3>
          <p className="text-gray-400">
            или нажмите для выбора файла
          </p>
        </div>

        <div className="flex items-center gap-4 text-sm text-gray-500">
          <div className="flex items-center gap-1">
            <FileText className="w-4 h-4" />
            <span>.txt формат</span>
          </div>
          <div className="flex items-center gap-1">
            <Music className="w-4 h-4" />
            <span>Список треков</span>
          </div>
        </div>

        <div className="text-xs text-gray-500 bg-white/5 px-3 py-1 rounded-full">
          Макс. размер: {maxSize}MB
        </div>
      </div>
    </div>
  );
};