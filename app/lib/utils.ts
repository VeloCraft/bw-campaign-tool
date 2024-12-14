
export async function HandleDelete(id: string) {
  console.log('delete', id)
  const res = await fetch('/api/campaigns/delete', {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ "id": id })
  })

  if (res.ok) {
    console.log('deleted')

    //revalidateTag('campaigns')
  }
}
