import { redirect } from 'next/navigation'

function AdminPage() {
  return redirect('/admin/contents/news')
}

export default AdminPage
