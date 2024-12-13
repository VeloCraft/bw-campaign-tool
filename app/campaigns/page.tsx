import {fetchCampaigns} from '@/app/lib/data';
import { TableWrapper, TableHeader, TableRow } from "@/components/table";
export default async function CampaignsPage() {
  const data = await fetchCampaigns()
  if (!data) {
    return <div>Loading...</div>
  }
  return (
    <div>
      <h1>Campaigns overview</h1>
      <TableWrapper>
      <TableHeader headers={['name']} />
      <tbody>
        {data.map((row, index) => (
          <TableRow key={index} data={[row["name"]]} />
        ))}
      </tbody>
    </TableWrapper>
  </div>);  
}



