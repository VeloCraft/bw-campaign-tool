import { fetchCampaign } from "@/app/lib/action";
import EditCampaignForm from "@/components/edit-campaign";


export default async function editCampaignPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = await params;

  // Fetch campaign data
  const campaign = await fetchCampaign(id);

  //console.log(campaign[0])

  return (
    <EditCampaignForm campaign={campaign[0]} />
  )
}

