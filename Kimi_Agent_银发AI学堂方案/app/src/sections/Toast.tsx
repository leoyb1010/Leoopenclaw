import { CheckCircle2, XCircle, Info, X } from 'lucide-react';
import { useUIStore } from '@/store';

export function Toast() {
  const { toastMessage, toastType, hideToast } = useUIStore();

  if (!toastMessage || !toastType) return null;

  const icons = {
    success: <CheckCircle2 className="w-6 h-6 text-elder-success" />,
    error: <XCircle className="w-6 h-6 text-elder-error" />,
    info: <Info className="w-6 h-6 text-elder-primary" />,
  };

  const bgColors = {
    success: 'bg-green-50 border-green-200',
    error: 'bg-red-50 border-red-200',
    info: 'bg-blue-50 border-blue-200',
  };

  return (
    <div className="fixed top-4 left-1/2 -translate-x-1/2 z-[100] animate-in fade-in slide-in-from-top-4 duration-300">
      <div className={`
        flex items-center gap-3 px-6 py-4 rounded-xl shadow-lg border-2 min-w-[300px]
        ${bgColors[toastType]}
      `}>
        {icons[toastType]}
        <span className="text-lg font-medium text-elder-dark flex-1">
          {toastMessage}
        </span>
        <button
          onClick={hideToast}
          className="text-gray-400 hover:text-gray-600"
        >
          <X className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
