import { RecordShell } from "../components/record/record-shell";
import { RecordNotFound } from "../components/record/record-not-found";

export default function NotFound() {
  return (
    <RecordShell>
      <RecordNotFound />
    </RecordShell>
  );
}
