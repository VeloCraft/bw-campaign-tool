import { fetchCampaign } from "@/app/lib/campaign";
import EditCampaignForm from "@/components/edit-campaign";


export default async function editCampaignPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params;

  // Fetch campaign data
  const campaign = await fetchCampaign(id);


  //console.log(campaign[0])

  return (
    <EditCampaignForm campaign={campaign} />
  )
}

