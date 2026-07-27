import { BeatLoader } from "react-spinners";

interface LoaderProps {
  loading: boolean;
}

export default function Loader({ loading }: LoaderProps) {
  if (!loading) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/70">
      <BeatLoader color="#a855f7" size={15} margin={5} />
    </div>
  );
}