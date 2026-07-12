import CurationTable from "@/components/CurationTable";
import { lines } from "@/data/lines";

export default function Home() {
  return <CurationTable lines={lines} />;
}
