import Page from "@/components/page";

export default async function CampaignsDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const id = (await params).id

  /* get campaign data from API */  
  return (

      <div>
        <h1>Campaign detail</h1>
        <p>{id}</p>
        <Page />
      </div>
  );
}
