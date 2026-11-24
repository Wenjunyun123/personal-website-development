import { RecordShell } from "../../components/record/record-shell";

export default function RecordLayout({ children }: { children: React.ReactNode }) {
  return <RecordShell>{children}</RecordShell>;
}
